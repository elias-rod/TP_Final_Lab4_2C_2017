<?php

class consultaRelevamiento
{
    private static $objetoPDO;

    public function __construct()
    {
        try {
            /*MIPC*/ self::$objetoPDO = new PDO('mysql:host=localhost;dbname=bd;charset=utf8', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            /*ONLINE*/ //self::$objetoPDO = new PDO('mysql:host=localhost;dbname=id2718207_final;charset=utf8', 'id2718207_jose', 'garbarino', array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        }
        catch (PDOException $e) {
            print "Error!: " . $e->getMessage();
            die();
        }
    }

    public static function Leer($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT *
            FROM relevamientos
            WHERE id = :id"
        );
        $consulta->bindValue(':id', $args['id'], PDO::PARAM_INT);
		$consulta->execute();
        return $response->withJson($consulta->fetch(PDO::FETCH_ASSOC));
    }

    public static function Eliminar($request, $response, $args) {
        $parametros = $request->getParams();
        $consulta = self::$objetoPDO->prepare(
            "DELETE FROM  relevamientos
            WHERE id = :id"
        );
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
		$consulta->execute();
        return $response->withJson(true);
    }

    public static function LeerTodos($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT r.id, r.momentoAsignacion, r.momentoRealizacion, l.nombre AS localNombre, l.id AS localId, l.direccion AS localDireccion,
                r.estado, u.nombre AS mysteryNombre, u.apellido AS mysteryApellido, r.mysteryShopperId, r.puntajePromedio, r.cantidadFotos, r.notas
            FROM relevamientos AS r, locales AS l, usuarios AS u
            WHERE r.localId = l.id
                AND r.mysteryShopperId = u.id"
        );
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function Crear($request, $response) {
        try{
            $parametros = $request->getParams();

            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO relevamientos (momentoAsignacion, momentoRealizacion, localId, estado, encargadoId,
                    mysteryShopperId, puntajePromedio, notas, cantidadFotos)
                VALUES (:momentoAsignacion, '0', :localId, 'incompleto', :encargadoId, :mysteryShopperId, 0, '', 0)"
            );
            $consulta->bindValue(':momentoAsignacion', $parametros['momentoAsignacion'], PDO::PARAM_STR);
            $consulta->bindValue(':localId', $parametros['localId'], PDO::PARAM_INT);
            $consulta->bindValue(':encargadoId', $parametros['encargadoId'], PDO::PARAM_INT);
            $consulta->bindValue(':mysteryShopperId', $parametros['mysteryShopperId'], PDO::PARAM_INT);
            $consulta->execute();
            return $response->withJson(true);
        }
        catch(Exception $e){
            return $response->withJson($e->getMessage());
        }
    }

    public static function Reasignar($request, $response) {
        $parametros = $request->getParams();
        //ACTUALIZACIÓN DEL USUARIO
        $consulta = self::$objetoPDO->prepare(
            "UPDATE relevamientos
            SET momentoAsignacion = :momentoAsignacion, encargadoId = :encargadoId, localId = :localId, mysteryShopperId = :mysteryShopperId
            WHERE id = :id"
        );
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->bindValue(':momentoAsignacion', $parametros['momentoAsignacion'], PDO::PARAM_STR);
        $consulta->bindValue(':localId', $parametros['localId'], PDO::PARAM_INT);
        $consulta->bindValue(':encargadoId', $parametros['encargadoId'], PDO::PARAM_INT);
        $consulta->bindValue(':mysteryShopperId', $parametros['mysteryShopperId'], PDO::PARAM_INT);
        $consulta->execute();
        return $response->withJson(true);
    }

    public static function Actualizar($request, $response) {
        $parametros = $request->getParams();
        for ($i=0; $i < $parametros['cantidadFotos']; $i++) { 
            //SI SE SUBIO LA FOTO, REEMPLAZAR LA ACTUAL
            if (isset($_FILES['foto'.$i]) && $_FILES['foto'.$i]['tmp_name'] != '' && is_uploaded_file($_FILES['foto'.$i]['tmp_name'])) {
                //VALIDACION DEL TAMAÑO DE LA IMAGEN
                if ($_FILES['foto'.$i]['size'] > (1  * 1024 * 1024)) { //1MB
                    return $response->withJson(["error" => 'Cambie la imagen, solo se permiten tamaños imagenes de tamaño inferior a 1 MB']);
                }
                //VALIDACION DE TIPO DE IMAGEN MEDIANTE EL INTENTO DE PROCESARLA COMO IMAGEN, SI IMAGENINICIAL ES FALSE, FALLO LA VALIDACION
                else if(!($imagenInicial = imagecreatefromstring(file_get_contents($_FILES['foto'.$i]['tmp_name'])))) {
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
                imagepng($imagenFinal, 'fotosRelevamientos/' . $parametros['id'] .'foto'.$i. '.png');
                //LIBERACION DE LA MEMORIA DE LA IMAGEN FINAL
                imagedestroy($imagenFinal);
            }
        }
        //ACTUALIZACIÓN DEL USUARIO
        $consulta = self::$objetoPDO->prepare(
            "UPDATE relevamientos
            SET momentoRealizacion = :momentoRealizacion, estado = 'completo' , puntajePromedio = :puntajePromedio, notas = :notas, cantidadFotos = :cantidadFotos
            WHERE id = :id"
        );
        $consulta->bindValue(':id', $parametros['id'], PDO::PARAM_INT);
        $consulta->bindValue(':momentoRealizacion', $parametros['momentoRealizacion'], PDO::PARAM_STR);
        $consulta->bindValue(':puntajePromedio', $parametros['puntajePromedio'], PDO::PARAM_INT);
        $consulta->bindValue(':notas', $parametros['notas'], PDO::PARAM_STR);
        $consulta->bindValue(':cantidadFotos', $parametros['cantidadFotos'], PDO::PARAM_INT);
        $consulta->execute();
        return $response->withJson(true);
    }
}