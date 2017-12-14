<?php

class consultaEncuesta
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

    public static function LeerTodos($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT *
            FROM encuestas"
        );
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function Crear($request, $response) {
        try{
            $parametros = $request->getParams();

            $consulta = self::$objetoPDO->prepare(
                "INSERT INTO encuestas (relevamientoId, satisfaccionGlobal, satisfaccionMShopper, satisfaccionNotas, satisfaccionFotos,
                recomendariaServicio, recomendariaMShopper, concuerdaPuntajePromedio, comentarios)
                VALUES (:relevamientoId, :satisfaccionGlobal, :satisfaccionMShopper, :satisfaccionNotas, :satisfaccionFotos,
                :recomendariaServicio, :recomendariaMShopper, :concuerdaPuntajePromedio, :comentarios)"
            );
            
            $consulta->bindValue(':relevamientoId', $parametros['relevamientoId'], PDO::PARAM_INT);
            $consulta->bindValue(':satisfaccionGlobal', $parametros['satisfaccionGlobal'], PDO::PARAM_STR);
            $consulta->bindValue(':satisfaccionMShopper', $parametros['satisfaccionMShopper'], PDO::PARAM_STR);
            $consulta->bindValue(':satisfaccionNotas', $parametros['satisfaccionNotas'], PDO::PARAM_STR);
            $consulta->bindValue(':satisfaccionFotos', $parametros['satisfaccionFotos'], PDO::PARAM_STR);
            $consulta->bindValue(':recomendariaServicio', $parametros['recomendariaServicio'], PDO::PARAM_STR);
            $consulta->bindValue(':recomendariaMShopper', $parametros['recomendariaMShopper'], PDO::PARAM_STR);
            $consulta->bindValue(':concuerdaPuntajePromedio', $parametros['concuerdaPuntajePromedio'], PDO::PARAM_STR);
            $consulta->bindValue(':comentarios', $parametros['comentarios'], PDO::PARAM_STR);
            $consulta->execute();
            return $response->withJson(true);
        }
        catch(Exception $e){
            return $response->withJson($e->getMessage());
        }
    }
}