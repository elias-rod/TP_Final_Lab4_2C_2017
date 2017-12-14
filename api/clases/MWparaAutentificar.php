<?php
require_once "AutentificadorJWT.php";

class MWparaAutentificar
{
	public function VerificarUsuario($request, $response, $next) {
		$ruta = $request->getAttribute('route')->getPattern();
		$parametros = $request->getParams();
		try{			
			//Si es login o pagina inicial no se pide autentificación
			if($ruta == '/consultaUsuarios/login' || '/consultaUsuarios/crear' || $ruta == ''){
				return $response = $next($request, $response);
			}
			//Si se pretende registrar un rol diferente a cliente
			else if($ruta == '/consultaUsuarios/crear' && $parametros['rol'] != 'cliente'){
				//Obtenemos el token
				$token = $request->getHeader('token')[0];
				//Verificamos token (si lanza alguna excepción salta el catch)
				AutentificadorJWT::verificarToken($token);
				//Si el usuario es un encargado se permite la operacion
				if(AutentificadorJWT::ObtenerData($token)->rol == 'encargado'){
					return $response = $next($request, $response);
				}
				//Si el usuario NO es encargado, se prohibe la operacion
				else{
					return $response->withJson(['error' => "Usted no tiene permiso para llevar a cabo esta acción"]);
				}
			}
			//Si pretende actualizar usuario
			else if($ruta == '/consultaUsuarios/actualizar'){
				//Obtenemos el token
				$token = $request->getHeader('token')[0];
				//Verificamos token (si lanza alguna excepción salta el catch)
				AutentificadorJWT::verificarToken($token);

				//Si es administrador puede actualizar todo
				if(AutentificadorJWT::ObtenerData($token)->rol == 'encargado'){
					return $response = $next($request, $response);
				}
				//El usuario puede actualizar su propio usuario y solo usando como rol 'cliente'
				else if(AutentificadorJWT::ObtenerData($token)->idUsuario == $parametros['id']
				&& $parametros['rol'] == 'cliente'){
					return $response = $next($request, $response);
				}
				else{
					return $response->withJson(['error' => "Usted no tiene permiso para llevar a cabo esta acción"]);
				}
			}
			//Si pretende actualizar usuario
			else if($ruta == '/consultaRelevamientos/crear' || '/consultaRelevamientos/eliminar' || '/consultaRelevamientos/reasignar'){
				//Obtenemos el token
				$token = $request->getHeader('token')[0];
				//Verificamos token (si lanza alguna excepción salta el catch)
				AutentificadorJWT::verificarToken($token);

				//Si es administrador puede actualizar todo
				if(AutentificadorJWT::ObtenerData($token)->rol == 'encargado'){
					return $response = $next($request, $response);
				}
				else{
					return $response->withJson(['error' => "Usted no tiene permiso para llevar a cabo esta acción"]);
				}
			}
			//Si pretende actualizar usuario
			else if($ruta == '/consultaRelevamientos/actualizar'){
				//Obtenemos el token
				$token = $request->getHeader('token')[0];
				//Verificamos token (si lanza alguna excepción salta el catch)
				AutentificadorJWT::verificarToken($token);

				//Si es administrador puede actualizar todo
				if(AutentificadorJWT::ObtenerData($token)->rol == 'empleado'){
					return $response = $next($request, $response);
				}
				else{
					return $response->withJson(['error' => "Usted no tiene permiso para llevar a cabo esta acción"]);
				}
			}
			//Cualquier otra acción está permitida solo para usuarios logueados
			else{
				//Obtenemos el token
				$token = $request->getHeader('token')[0];
				//Verificamos token (si lanza alguna excepción salta el catch)
				AutentificadorJWT::verificarToken($token);
				return $response = $next($request, $response);
			}
		}
		catch(Exception $e){
			return $response->withJson(['error' => $e->getMessage()]);
		}
	}
}