<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './composer/vendor/autoload.php';
require_once './clases/consultaUsuario.php';
require_once './clases/consultaRelevamiento.php';
require_once './clases/consultaLocal.php';
require_once './clases/consultaEncuesta.php';
require_once './clases/AutentificadorJWT.php';
require_once './clases/MWparaCORS.php';
require_once './clases/MWparaAutentificar.php';

$app = new Slim\App([
  "settings"  => [
      "displayErrorDetails" => true,
      "determineRouteBeforeAppMiddleware" => true
  ]
]);

$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Credentials', 'true')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, token')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->add(\MWparaAutentificar::class . ':VerificarUsuario');

//Usuarios
$app->get('/consultaUsuarios/leerTodos', \consultaUsuario::class . ':LeerTodos');
$app->post('/consultaUsuarios/login', \consultaUsuario::class . ':Login');
$app->post('/consultaUsuarios/crear', \consultaUsuario::class . ':Crear');
$app->get('/consultaUsuarios/leer/{id}', \consultaUsuario::class . ':Leer');
$app->post('/consultaUsuarios/actualizar', \consultaUsuario::class . ':Actualizar');

//Relevamientos
$app->get('/consultaRelevamientos/leer/{id}', \consultaRelevamiento::class . ':Leer');
$app->get('/consultaRelevamientos/leerTodos', \consultaRelevamiento::class . ':LeerTodos');
$app->post('/consultaRelevamientos/crear', \consultaRelevamiento::class . ':Crear');
$app->post('/consultaRelevamientos/eliminar', \consultaRelevamiento::class . ':Eliminar');
$app->post('/consultaRelevamientos/actualizar', \consultaRelevamiento::class . ':Actualizar');
$app->post('/consultaRelevamientos/reasignar', \consultaRelevamiento::class . ':Reasignar');

//Locales
$app->get('/consultaLocales/leerTodos', \consultaLocal::class . ':LeerTodos');

//Encuestas
$app->get('/consultaEncuestas/leerTodos', \consultaEncuesta::class . ':LeerTodos');
$app->post('/consultaEncuestas/crear', \consultaEncuesta::class . ':Crear');

$app->run();