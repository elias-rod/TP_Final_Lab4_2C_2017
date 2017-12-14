<?php
require_once "AutentificadorJWT.php";
class consultaUsuario
{
    private static $objetoPDO;

    public function __construct()
    {
        try {
            /*MIPC*/ //self::$objetoPDO = new PDO('mysql:host=localhost;dbname=bd;charset=utf8', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            /*ONLINE*/ self::$objetoPDO = new PDO('mysql:host=localhost;dbname=id2718207_final;charset=utf8', 'id2718207_jose', 'garbarino', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        catch (PDOException $e) {
            print "Error!: " . $e->getMessage();
            die();
        }
    }

    public static function Login($request, $response, $args) {
        $parametros = $request->getParams();
        $consulta = self::$objetoPDO->prepare(
            "SELECT id, nombre, apellido, email, rol
            FROM usuarios
            WHERE email = :email
                AND password = :password"
        );
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
        $consulta->execute();
        $usuario = $consulta->fetch(PDO::FETCH_ASSOC);
        if (!$usuario) {
            return $response->withJson(["error" => 'Usuario inexistente']);
        }
        $response = $response->withHeader('token', AutentificadorJWT::CrearToken(["idUsuario" => $usuario['id'], "rol" => $usuario['rol']]));
        $response = $response->withHeader('Access-Control-Expose-Headers', 'token');
        return $response->withJson($usuario);
    }

    public static function ValidarCaptcha($captcha) {
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = array('secret' => '6Lcr_joUAAAAAN4BywIe7aXC8_lCN7b16OQ5BEM1', 'response' => $captcha);
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        return file_get_contents($url, false, $context);
    }

    public static function Crear($request, $response) {
        try{
            $parametros = $request->getParams();
            //Validacion del captcha
            if(json_decode(self::ValidarCaptcha($parametros['captcha']))->success !== true){
                return $response->withJson(["error" => 'El captcha fallo la validacion']);
            }
            //VERIFICACION CONTRA USUARIO DUPLICADO
            $consulta = self::$objetoPDO->prepare(
                "SELECT *
                FROM usuarios
                WHERE email = :email"
            );
            $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
            $consulta->execute();

            $usuario = $consulta->fetch(PDO::FETCH_ASSOC);
            if ($usuario) {
                return $response->withJson(["error" => 'Email ocupado']);
            }
            
            //IMAGEN-------------------------------------------------------
            //VALIDACION DEL TAMAÑO DE LA IMAGEN
            if ($_FILES['foto']['size'] > (1  * 1024 * 1024)) { //1MB
                return $response->withJson(["error" => 'Cambie la imagen, solo se permiten tamaños imagenes de tamaño inferior a 1 MB']);
            }
            //VALIDACION DE TIPO DE IMAGEN MEDIANTE EL INTENTO DE PROCESARLA COMO IMAGEN, SI IMAGENINICIAL ES FALSE, FALLO LA VALIDACION
            else if(!($imagenInicial = imagecreatefromstring(file_get_contents($_FILES['foto']['tmp_name'])))) {
                return $response->withJson(["error" => 'Cambie la imagen, sólo se permiten imágenes con extensión .jpg .jpeg .bmp .gif o .png']);
            }
            //---------------------------------------------------------------
            
            //CREACIÓN DEL USUARIO
            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO usuarios (nombre, apellido, email, password, rol, habilitado)
                VALUES (:nombre, :apellido, :email, :password, :rol, 1)"
            );
            $consulta->bindValue(':nombre', $parametros['nombre'], PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $parametros['apellido'], PDO::PARAM_STR);
            $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
            $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
            $consulta->bindValue(':rol', $parametros['rol'], PDO::PARAM_STR);
            $consulta->execute();

            $idUsuario = self::$objetoPDO->lastInsertId();
            
            //CONTINUACION DE CREACION DE IMAGEN-------------------------------------
            //OBTENCION DE LAS DIMENSIONES DE LA IMAGEN INICIAL
            $imagenInicialAncho = imagesx($imagenInicial);
            $imagenInicialAlto = imagesy($imagenInicial);
            //CREACION DE UNA IMAGEN VACIA CON LAS DIMENSIONES DE LA IMAGEN INCIAL
            $imagenFinal = imagecreatetruecolor($imagenInicialAncho, $imagenInicialAlto);
            //COPIA DE LA IMAGEN INCIAL EN LA FINAL
            imagecopy($imagenFinal, $imagenInicial, 0, 0, 0, 0, $imagenInicialAncho, $imagenInicialAlto);
            //LIBERACION DE LA MEMORIA DE LA IMAGEN INICIAL
            imagedestroy($imagenInicial);
            //GUARDADO DEFINITIVO DE LA IMAGEN EN EL SERVIDOR CONVIRTIENDOLA EN FORMATO PNG
            imagepng($imagenFinal, 'fotosUsuarios/' . $idUsuario . '.png');
            //LIBERACION DE LA MEMORIA DE LA IMAGEN FINAL
            imagedestroy($imagenFinal);
            //-----------------------------------------------------------------------------
            return $response->withJson(true);
        }
        catch(Exception $e){
            return $response->withJson($e->getMessage());   
        }
    }

    public static function Leer($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT *
            FROM usuarios
            WHERE id = :id"
        );
        $consulta->bindValue(':id', $args['id'], PDO::PARAM_INT);
		$consulta->execute();
        return $response->withJson($consulta->fetch(PDO::FETCH_ASSOC));
    }

    public static function LeerTodos($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT id, nombre, apellido, email, rol
            FROM usuarios
            WHERE habilitado = 1"
        );
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }
    
    public static function Actualizar($request, $response) {
        $parametros = $request->getParams();
        //VERIFICACION CONTRA USUARIO DUPLICADO (se verifica si el email esta siendo usado por alguien que no es el actual usuario que modifica)
        $consulta = self::$objetoPDO->prepare(
            "SELECT *
            FROM usuarios
            WHERE email = :email AND NOT id = :id"
        );
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->execute();

        $usuario = $consulta->fetch(PDO::FETCH_ASSOC);
        if ($usuario) {
            return $response->withJson(["error" => 'Email o alias ocupado']);
        }
        //SI SE SUBIO LA FOTO, REEMPLAZAR LA ACTUAL
        if (isset($_FILES['foto']) && $_FILES['foto']['tmp_name'] != '' && is_uploaded_file($_FILES['foto']['tmp_name'])) {
            //IMAGEN-------------------------------------------------------
            //VALIDACION DEL TAMAÑO DE LA IMAGEN
            if ($_FILES['foto']['size'] > (1  * 1024 * 1024)) { //1MB
                return $response->withJson(["error" => 'Cambie la imagen, solo se permiten tamaños imagenes de tamaño inferior a 1 MB']);
            }
            //VALIDACION DE TIPO DE IMAGEN MEDIANTE EL INTENTO DE PROCESARLA COMO IMAGEN, SI IMAGENINICIAL ES FALSE, FALLO LA VALIDACION
            else if(!($imagenInicial = imagecreatefromstring(file_get_contents($_FILES['foto']['tmp_name'])))) {
                return $response->withJson(["error" => 'Cambie la imagen, sólo se permiten imágenes con extensión .jpg .jpeg .bmp .gif o .png']);
            }
            //OBTENCION DE LAS DIMENSIONES DE LA IMAGEN INICIAL
            $imagenInicialAncho = imagesx($imagenInicial);
            $imagenInicialAlto = imagesy($imagenInicial);
            //CREACION DE UNA IMAGEN VACIA CON LAS DIMENSIONES DE LA IMAGEN INCIAL
            $imagenFinal = imagecreatetruecolor($imagenInicialAncho, $imagenInicialAlto);
            //COPIA DE LA IMAGEN INCIAL EN LA FINAL
            imagecopy($imagenFinal, $imagenInicial, 0, 0, 0, 0, $imagenInicialAncho, $imagenInicialAlto);
            //LIBERACION DE LA MEMORIA DE LA IMAGEN INICIAL
            imagedestroy($imagenInicial);
            //GUARDADO DEFINITIVO DE LA IMAGEN EN EL SERVIDOR CONVIRTIENDOLA EN FORMATO PNG
            imagepng($imagenFinal, 'fotosUsuarios/' . $parametros['id'] . '.png');
            //LIBERACION DE LA MEMORIA DE LA IMAGEN FINAL
            imagedestroy($imagenFinal);
            //-----------------------------------------------------------------------------
        }
        //ACTUALIZACIÓN DEL USUARIO
        $consulta = self::$objetoPDO->prepare(
            "UPDATE usuarios
            SET nombre = :nombre, apellido = :apellido, email = :email, password = :password, rol = :rol, habilitado = :habilitado
            WHERE id = :id"
        );
        $consulta->bindValue(':nombre', $parametros['nombre'], PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $parametros['apellido'], PDO::PARAM_STR);
        $consulta->bindValue(':email', $parametros['email'], PDO::PARAM_STR);
        $consulta->bindValue(':password', $parametros['password'], PDO::PARAM_STR);
        $consulta->bindValue(':rol', $parametros['rol'], PDO::PARAM_STR);
        $consulta->bindValue(':habilitado', $parametros['habilitado'], PDO::PARAM_INT);
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->execute();
        return $response->withJson(true);
    }
}