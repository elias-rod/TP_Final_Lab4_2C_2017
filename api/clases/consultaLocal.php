<?php

class consultaLocal
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

    public static function LeerTodos($request, $response, $args) {
        $consulta = self::$objetoPDO->prepare(
            "SELECT *
            FROM locales"
        );
		$consulta->execute();
        return $response->withJson($consulta->fetchAll(PDO::FETCH_ASSOC));
    }
}