<?php
	// session_start();

include_once('conf/config.php');
// include_once('../../utils/funcoes.php');

	//GET DATA
	$id														= isset($_POST['id']) ? ($_POST['id'] != '' ? $_POST['id'] : 0 ) : 0;
	$titulo												= strip_tags($_POST['titulo']);
	$descricao										= strip_tags($_POST['descricao']);
	$status												= strip_tags($_POST['status']);
	$proprietarioId								= strip_tags($_POST['proprietario_id']);
	$periodoInicio								= strip_tags($_POST['periodo_inicio']);
	$periodoFim										= strip_tags($_POST['periodo_fim']);
	$qtdPerguntaPagina						= strip_tags($_POST['qtd_pergunta_pagina']);

	$perguntaId										= $_POST['pergunta_id'];
	$perguntaOrdem								= $_POST['pergunta_ordem'];
	$perguntaTitulo								= $_POST['pergunta_titulo'];
	$perguntaTextoAjuda						= $_POST['pergunta_texto_ajuda'];
	$perguntaObrigatoria					= array();
	$perguntaRedireciona 					= array();
	$perguntaStatus			 					= $_POST['pergunta_status'];
	$perguntaTipoOpcao 						= $_POST['pergunta_tipo_opcao'];
	if(sizeof($perguntaOrdem) > 0){	
		foreach ($perguntaOrdem as $key => $value) {
			array_push($perguntaObrigatoria, (isset($_POST['pergunta_obrigatoria_'.$key]) ? true : false));
			array_push($perguntaRedireciona, (isset($_POST['pergunta_redireciona_'.$key]) ? true : false));
			// array_push($perguntaTipoOpcao, (isset($_POST['pergunta_redireciona_'.$key]) ? $_POST['pergunta_redireciona_'.$key] : 0));
		}
	}

	$returnJson = array();

	$conn = Conexao::getInstance();

	$conn->beginTransaction();

	// $returnJson['teste'] = $_POST['5_op_escala_numero'];
	// $returnJson['teste1'] = $_POST['5_op_escala_numero'][0];
	// $returnJson['teste2'] = $_POST['5_op_escala_numero_fim'][1];
	// echo json_encode($returnJson);
	// die();
	// exit();

/*

Valores fixos de referência para Tipo de Opcao das perguntas

ava_tipo_opcao

'id','nome'

'1','Texto'
'2','Parágrafo'
'3','Multipla escolha'
'4','Caixa de seleção'
'5','Escolha de uma lista'
'6','Escala em número'
'7','Escala em estrela'
'8','Escala em rosto'
'9','Grade'
'10','Data'
'11','Horário'
'12','Curtir'
)

*/

	try{

		if($id == 0){

			$stmt = $conn->prepare("INSERT INTO ava_pesquisa (titulo, descricao, status, data_cadastro, proprietario_id, periodo_inicio, periodo_fim, qtd_pergunta_pagina ) 
																VALUES (:titulo, :descricao, :status, NOW(), :proprietario_id, :periodo_inicio, :periodo_fim, :qtd_pergunta_pagina)");
			$stmt->bindValue(":titulo", $titulo);
			$stmt->bindValue(":descricao", $descricao);
			$stmt->bindValue(":status", $status);
			$stmt->bindValue(":proprietario_id", $proprietarioId);
			$stmt->bindValue(":periodo_inicio", $periodoInicio);
			$stmt->bindValue(":periodo_fim", $periodoFim);
			$stmt->bindValue(":qtd_pergunta_pagina", $qtdPerguntaPagina);
			$stmt->execute();

			$idNew = $conn->lastInsertId();
			
			foreach ($perguntaOrdem as $key => $value) {
				$stmt = $conn->prepare("INSERT INTO ava_pergunta (titulo, texto_ajuda, obrigatoria, redireciona, status, data_cadastro, pesquisa_id, tipo_opcao_id) 
																	VALUES (:titulo, :texto_ajuda, :obrigatoria, :redireciona, :status, NOW(), :pesquisa_id, :tipo_opcao_id)");
				$stmt->bindValue(":titulo", $perguntaTitulo[$key]);
				$stmt->bindValue(":texto_ajuda", $perguntaTextoAjuda[$key]);
				$stmt->bindValue(":obrigatoria", $perguntaObrigatoria[$key]);
				$stmt->bindValue(":redireciona", $perguntaRedireciona[$key]);
				$stmt->bindValue(":status", $perguntaStatus[$key]);
				$stmt->bindValue(":pesquisa_id", $idNew);
				$stmt->bindValue(":tipo_opcao_id", $perguntaTipoOpcao[$key]);
				$stmt->execute();

				$perguntaIdNew = $conn->lastInsertId();

				if ($perguntaTipoOpcao[$key] == 1 || $perguntaTipoOpcao[$key] == 2) {
					$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																		VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
					$stmt->bindValue(":resposta", "");
					$stmt->bindValue(":valor", 0);
					$stmt->bindValue(":direcao", "");
					$stmt->bindValue(":tipo", "");
					$stmt->bindValue(":controle", 0);
					$stmt->bindValue(":pergunta_id", $perguntaIdNew);
					$stmt->bindValue(":status", 1); //status 1 = ativo
					$stmt->execute();

				} else if ($perguntaTipoOpcao[$key] == 3 ) {

					if (isset($_POST[$value.'_op_multipla_escolha'])) {

						$countOp = 0;
						foreach ($_POST[$value.'_op_multipla_escolha'] as $keyOp => $valueOp) {

							if ($valueOp != "") {
								$countOp++;
								$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																					VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
								$stmt->bindValue(":resposta", $valueOp);
								$stmt->bindValue(":valor", 0);
								$stmt->bindValue(":direcao", "");
								$stmt->bindValue(":tipo", "");
								$stmt->bindValue(":controle", $countOp);
								$stmt->bindValue(":pergunta_id", $perguntaIdNew);
								$stmt->bindValue(":status", 1); //status 1 = ativo
								$stmt->execute();

							}

						}

					}

				} else if ($perguntaTipoOpcao[$key] == 4 ) {

					if (isset($_POST[$value.'_op_caixa_selecao'])) {

						$countOp = 0;
						foreach ($_POST[$value.'_op_caixa_selecao'] as $keyOp => $valueOp) {

							if ($valueOp != "") {
								$countOp++;
								$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																					VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
								$stmt->bindValue(":resposta", $valueOp);
								$stmt->bindValue(":valor", 0);
								$stmt->bindValue(":direcao", "");
								$stmt->bindValue(":tipo", "");
								$stmt->bindValue(":controle", $countOp);
								$stmt->bindValue(":pergunta_id", $perguntaIdNew);
								$stmt->bindValue(":status", 1); //status 1 = ativo
								$stmt->execute();

							}

						}

					}

				} else if ($perguntaTipoOpcao[$key] == 5 ) {

					if (isset($_POST[$value.'_op_lista'])) {

						$countOp = 0;
						foreach ($_POST[$value.'_op_lista'] as $keyOp => $valueOp) {

							if ($valueOp != "") {
								$countOp++;
								$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																					VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
								$stmt->bindValue(":resposta", $valueOp);
								$stmt->bindValue(":valor", 0);
								$stmt->bindValue(":direcao", "");
								$stmt->bindValue(":tipo", "");
								$stmt->bindValue(":controle", $countOp);
								$stmt->bindValue(":pergunta_id", $perguntaIdNew);
								$stmt->bindValue(":status", 1); //status 1 = ativo
								$stmt->execute();

							}

						}

					}
				} else if ($perguntaTipoOpcao[$key] == 6 ) {

					if (isset($_POST[$value.'_op_escala_numero'])) {
						$countOp = 0;
						for ($keyOp = $_POST[$value.'_op_escala_numero'][0] ; $keyOp <= $_POST[$value.'_op_escala_numero'][1] ; $keyOp++ ) {

							$countOp++;
							$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																			VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
							$stmt->bindValue(":resposta", $keyOp);
							$stmt->bindValue(":valor", 0);
							$stmt->bindValue(":direcao", "");
							$stmt->bindValue(":tipo", "numero");
							$stmt->bindValue(":controle", $countOp);
							$stmt->bindValue(":pergunta_id", $perguntaIdNew);
							$stmt->bindValue(":status", 1); //status 1 = ativo
							$stmt->execute();
						}

					}

				} else if ($perguntaTipoOpcao[$key] == 7 ) {

					$countOp = 0;
					for ($keyOp = 1 ; $keyOp <= 5 ; $keyOp++ ) {

						$countOp++;
						$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																		VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
						$stmt->bindValue(":resposta", $keyOp);
						$stmt->bindValue(":valor", 0);
						$stmt->bindValue(":direcao", "");
						$stmt->bindValue(":tipo", "estrela");
						$stmt->bindValue(":controle", $countOp);
						$stmt->bindValue(":pergunta_id", $perguntaIdNew);
						$stmt->bindValue(":status", 1); //status 1 = ativo
						$stmt->execute();

					}

				} else if ($perguntaTipoOpcao[$key] == 8 ) {

					$countOp = 0;
					for ($keyOp = 1 ; $keyOp <= 5 ; $keyOp++ ) {

						$countOp++;
						$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																		VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
						$stmt->bindValue(":resposta", $keyOp);
						$stmt->bindValue(":valor", 0);
						$stmt->bindValue(":direcao", "");
						$stmt->bindValue(":tipo", "rosto");
						$stmt->bindValue(":controle", $countOp);
						$stmt->bindValue(":pergunta_id", $perguntaIdNew);
						$stmt->bindValue(":status", 1); //status 1 = ativo
						$stmt->execute();

					}

				} else if ($perguntaTipoOpcao[$key] == 9 ) {

					if (isset($_POST[$value.'_op_grade_linha']) && isset($_POST[$value.'_op_grade_coluna'])) {

						if (sizeof($_POST[$value.'_op_grade_linha']) > 1 && sizeof($_POST[$value.'_op_grade_linha']) > 1) {

							$countOp = 0;
							foreach ($_POST[$value.'_op_grade_linha'] as $keyOp => $valueOp) {

								if ($valueOp != "") {
									$countOp++;
									$stmt = $conn->prepare("INSERT INTO ava_grade_linha (titulo, status, pergunta_id, data_cadastro) 
																						VALUES (:titulo, :status, :pergunta_id, NOW())");
									$stmt->bindValue(":titulo", $valueOp);
									$stmt->bindValue(":status", 1); //status 1 = ativo
									$stmt->bindValue(":pergunta_id", $perguntaIdNew);
									$stmt->execute();

									$gradeLinhaIdNew = $conn->lastInsertId();

									$countOpAux = 0;
									foreach ($_POST[$value.'_op_grade_coluna'] as $keyOpAux => $valueOpAux) {

										if ($valueOpAux != "") {
											$countOpAux++;
											$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, grade_linha_id, status) 
																								VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :grade_linha_id, :status)");
											$stmt->bindValue(":resposta", $valueOpAux);
											$stmt->bindValue(":valor", 0);
											$stmt->bindValue(":direcao", "");
											$stmt->bindValue(":tipo", "");
											$stmt->bindValue(":controle", $countOpAux);
											$stmt->bindValue(":pergunta_id", $perguntaIdNew);
											$stmt->bindValue(":grade_linha_id", $gradeLinhaIdNew);
											$stmt->bindValue(":status", 1); //status 1 = ativo
											$stmt->execute();

										}

									}

								}

							}

						}

					}

				} else if ($perguntaTipoOpcao[$key] == 10 ) {

					// $countOp = 0;
					// for ($keyOp = 1 ; $keyOp <= 2 ; $keyOp ) {

					// 	$countOp++;
					// 	$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id) 
					// 														VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id)");
					// 	$stmt->bindValue(":resposta", "$keyOp");
					// 	$stmt->bindValue(":valor", 0);
					// 	$stmt->bindValue(":direcao", "");
					// 	$stmt->bindValue(":tipo", "curtir");
					// 	$stmt->bindValue(":controle", $countOp);
					// 	$stmt->bindValue(":pergunta_id", $perguntaIdNew);
					// 	$stmt->execute();

					// }

				} else if ($perguntaTipoOpcao[$key] == 11 ) {

					// $countOp = 0;
					// for ($keyOp = 1 ; $keyOp <= 2 ; $keyOp ) {

					// 	$countOp++;
					// 	$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id) 
					// 														VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id)");
					// 	$stmt->bindValue(":resposta", "$keyOp");
					// 	$stmt->bindValue(":valor", 0);
					// 	$stmt->bindValue(":direcao", "");
					// 	$stmt->bindValue(":tipo", "curtir");
					// 	$stmt->bindValue(":controle", $countOp);
					// 	$stmt->bindValue(":pergunta_id", $perguntaIdNew);
					// 	$stmt->execute();

					// }

				} else if ($perguntaTipoOpcao[$key] == 12 ) {

					$countOp = 0;
					for ($keyOp = 1 ; $keyOp <= 2 ; $keyOp++ ) {

						$countOp++;
						$stmt = $conn->prepare("INSERT INTO ava_opcao (resposta, valor, direcao, tipo, controle, data_cadastro, pergunta_id, status) 
																			VALUES (:resposta, :valor, :direcao, :tipo, :controle, NOW(), :pergunta_id, :status)");
						$stmt->bindValue(":resposta", $keyOp);
						$stmt->bindValue(":valor", 0);
						$stmt->bindValue(":direcao", "");
						$stmt->bindValue(":tipo", "curtir");
						$stmt->bindValue(":controle", $countOp);
						$stmt->bindValue(":pergunta_id", $perguntaIdNew);
						$stmt->bindValue(":status", 1); //status 1 = ativo
						$stmt->execute();

					}

				}

			}

			$returnJson['id'] = $idNew;

		} else {

			$stmt = $conn->prepare("UPDATE ava_pesquisa SET titulo = :titulo, descricao = :descricao, status = :status, 
																proprietario_id = :proprietario_id, data_cadastro = NOW() 
																WHERE id = :id");
			$stmt->bindValue(":titulo", $titulo);
			$stmt->bindValue(":descricao", $descricao);
			$stmt->bindValue(":status", $status);
			$stmt->bindValue(":proprietario_id", $proprietarioId);
			$stmt->bindValue(":id", $id);
			$stmt->execute();
			
			foreach ($perguntaTitulo as $key => $value) {

				if($pergunta_id[$key] == 0){

					$stmt = $conn->prepare("INSERT INTO ava_pergunta (titulo, texto_ajuda, obrigatoria, redireciona, status, data_cadastro, pesquisa_id, tipo_opcao_id) 
																		VALUES (:titulo, :texto_ajuda, :obrigatoria, :redireciona, :status, NOW(), :pesquisa_id, :tipo_opcao_id)");
					$stmt->bindValue(":titulo", $perguntaTitulo[$key]);
					$stmt->bindValue(":texto_ajuda", $perguntaTextoAjuda[$key]);
					$stmt->bindValue(":obrigatoria", $perguntaObrigatoria[$key]);
					$stmt->bindValue(":redireciona", $perguntaRedireciona[$key]);
					$stmt->bindValue(":status", $perguntaStatus[$key]);
					$stmt->bindValue(":pesquisa_id", $id);
					$stmt->bindValue(":tipo_opcao_id", $perguntaTipoOpcao[$key]);
					$stmt->execute();

				} else {

					$stmt = $conn->prepare("UPDATE ava_pergunta SET titulo = :titulo, texto_ajuda = :texto_ajuda, obrigatoria = :obrigatoria, 
																		redireciona = :redireciona, status = :status, data_cadastro = NOW(), pesquisa_id = :pesquisa_id, tipo_opcao_id = :tipo_opcao_id 
																		WHERE id = :id");
					$stmt->bindValue(":titulo", $perguntaTitulo[$key]);
					$stmt->bindValue(":texto_ajuda", $perguntaTextoAjuda[$key]);
					$stmt->bindValue(":obrigatoria", $perguntaObrigatoria[$key]);
					$stmt->bindValue(":redireciona", $perguntaRedireciona[$key]);
					$stmt->bindValue(":status", $perguntaStatus[$key]);
					$stmt->bindValue(":pesquisa_id", $id);
					$stmt->bindValue(":tipo_opcao_id", $perguntaTipoOpcao[$key]);
					$stmt->bindValue(":id", $perguntaId[$key]);

				}

			}

		}

		$conn->commit();
		
		$returnJson['msg'] = "success";
		echo json_encode($returnJson);

	}catch(Exception $e){
		$conn->rollback();
		$returnJson['msg'] = "error";
		$returnJson['error'] = "Erro: ".$e;
		echo json_encode($returnJson);
	}

?>