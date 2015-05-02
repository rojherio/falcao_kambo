<?php 
  // session_start();

  // INCLUDE TEMPLATE
  include_once('conf/config.php');
  include('template/header.php');

?>
<?php

	$id    = !isset($_POST['id']) && isset($_GET['id']) ?  $_GET['id'] : isset($_POST['id']) ? $_POST['id'] : 0 ;
	$param = Url::getURL( 3 );
	$param = $param == '' && $id != ''  ? $id : $param;

  $conn = Conexao::getInstance();

	$stmt = $conn->prepare("SELECT id, nome FROM ava_tipo_opcao WHERE status = 1");
	$stmt->execute();
	$resultTipoOpcao = $stmt->fetchAll(PDO::FETCH_ASSOC);

//variareis dos campos
	//GET DATA
	$id														= 0;
	$titulo												= "";
	$descricao										= "";
	$status												= 0;
	$proprietarioId								= 0;
	$periodo_inicio 							= "";
	$periodo_fim									= "";
	$qtd_pergunta_pagina					= "";

	$perguntas 										= array();

	if( $param != null || $param != '' || $param != NULL ){

	  $id = $param;
	  
	  //carrega dados da pequisa
		$stmt = $conn->prepare("SELECT id, titulo, descricao, link, status, data_cadastro, proprietario_id, periodo_inicio, periodo_fim, qtd_pergunta_pagina 
														FROM ava_pesquisa 
														WHERE id = :id");
		$stmt->bindValue(":id", $id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		$rcPesquisa = $stmt->rowCount();
		
		if($rcPesquisa > 0){

			//seta valores para edicao
			$titulo												= $rs[0]["titulo"];
			$descricao										= $rs[0]["descricao"];
			$status												= $rs[0]["status"];
			$proprietarioId								= $rs[0]["proprietario_id"];
			$periodo_inicio 							= $rs[0]["periodo_fim"];
			$periodo_fim									= $rs[0]["periodo_fim"];
			$qtd_pergunta_pagina					= $rs[0]["qtd_pergunta_pagina"];

			//carrega dados das perguntas da pesquisa
			$stmt = $conn->prepare("SELECT id, titulo, texto_ajuda, obrigatoria, redireciona, status, tipo_opcao_id 
															FROM ava_pergunta 
															WHERE pesquisa_id = :id AND status = 1"); //status 1 = ativo
			$stmt->bindValue(":id", $id);
			$stmt->execute();
			$rsPergunta = $stmt->fetchAll(PDO::FETCH_ASSOC);

			//varre o ResultSet de pergunta para preeencher o campos em modo de edicao
			foreach($rsPergunta as $kPergunta => $vPergunta){

				$pergunta 																= array(); //array para armazenar uma pergunta
				$pergunta["perguntaId"]										= $vPergunta["id"];
				$pergunta["perguntaTitulo"]								= $vPergunta["titulo"];
				$pergunta["perguntaTextoAjuda"]						= $vPergunta["texto_ajuda"];
				$pergunta["perguntaObrigatoria"]					= $vPergunta["obrigatoria"];
				$pergunta["perguntaRedireciona"] 					= $vPergunta["redireciona"];
				$pergunta["perguntaStatus"]			 					= $vPergunta["status"];
				$pergunta["perguntaTipoOpcao"] 						= $vPergunta["tipo_opcao_id"];

				$pergunta["opcoes"]												= array(); //variavel que ira armazenar as opcoes de cada pergunta
				$pergunta["gradeLinhas"]									= array(); //variavel que ira armazenar as linhas da grade de cada pergunta do tipo grade

				if ($pergunta["perguntaTipoOpcao"] == 9) {

					//carrega grade linha das perguntas tipo grade da pesquisa
					$stmt = $conn->prepare("SELECT id, titulo, status 
																	FROM ava_grade_linha 
																	WHERE pergunta_id = :pergunta_id AND status = 1"); //status 1 = ativo
					$stmt->bindValue(":pergunta_id", $vPergunta["id"]);
					$stmt->execute();
					$rsGradeLinha = $stmt->fetchAll(PDO::FETCH_ASSOC);

					//varre o ResultSet de opcoes para preencer os campos em modo de edicao
					foreach($rsGradeLinha as $kGradeLinha => $vGradeLinha){

						$gradeLinha 															= array();
						$gradeLinha["gradeLinhaId"]										=$vGradeLinha['id'];
						$gradeLinha["gradeLinhaTitulo"]								=$vGradeLinha['titulo'];
						$gradeLinha["gradeLinhaStatus"]								=$vGradeLinha['status'];

						array_push($pergunta['gradeLinhas'], $gradeLinha);

					}

					//carrega oçoes das perguntas da pesquisa
					$stmt = $conn->prepare("SELECT resposta, valor, direcao, tipo, controle, status 
																	FROM ava_opcao 
																	WHERE pergunta_id = :pergunta_id AND status = 1
																	GROUP BY resposta, valor, direcao, tipo, controle, status"); // status 1 = ativo
					$stmt->bindValue(":pergunta_id", $vPergunta["id"]);
					$stmt->execute();
					$rsOpcao = $stmt->fetchAll(PDO::FETCH_ASSOC);

					//varre o ResultSet de opcoes para preencer os campos em modo de edicao
					foreach($rsOpcao as $kOpcao => $vOpcao){

						$opcao 																		= array();
						$opcao["opcaoResposta"]										=$vOpcao['resposta'];
						$opcao["opcaoValor"]											=$vOpcao['valor'];
						$opcao["opcaoDirecao"]										=$vOpcao['direcao'];
						$opcao["opcaoTipo"]												=$vOpcao['tipo'];
						$opcao["opcaoControle"]										=$vOpcao['controle'];
						$opcao["opcaoPerguntaId"]									=$vPergunta['id'];
						$opcao["opcaoStatus"]											=$vOpcao['status'];

						array_push($pergunta['opcoes'], $opcao);

					}

				}else{

					//carrega oçoes das perguntas da pesquisa
					$stmt = $conn->prepare("SELECT id, resposta, valor, direcao, tipo, controle, status 
																	FROM ava_opcao 
																	WHERE pergunta_id = :pergunta_id AND status = 1"); // status 1 = ativo
					$stmt->bindValue(":pergunta_id", $vPergunta["id"]);
					$stmt->execute();
					$rsOpcao = $stmt->fetchAll(PDO::FETCH_ASSOC);

					//varre o ResultSet de opcoes para preencer os campos em modo de edicao
					foreach($rsOpcao as $kOpcao => $vOpcao){

						$opcao 																		= array();
						$opcao["opcaoId"]													=$vOpcao['id'];
						$opcao["opcaoResposta"]										=$vOpcao['resposta'];
						$opcao["opcaoValor"]											=$vOpcao['valor'];
						$opcao["opcaoDirecao"]										=$vOpcao['direcao'];
						$opcao["opcaoTipo"]												=$vOpcao['tipo'];
						$opcao["opcaoControle"]										=$vOpcao['controle'];
						$opcao["opcaoPerguntaId"]									=$vPergunta['id'];
						$opcao["opcaoStatus"]											=$vOpcao['status'];

						array_push($pergunta['opcoes'], $opcao);

					}

				}

				array_push($perguntas, $pergunta);

			}

		}

	}
?>

<!-- JAVASCRIPT -->
<script type="text/javascript">
	var resultTipoOpcao = <?=json_encode($resultTipoOpcao);?>;
	var perguntas = <?=json_encode($perguntas);?>;
</script>

<form action="javascript;" method="POST" id="form_pesquisa" name="form_pesquisa">

	<input type="hidden" id="proprietario_id" name="proprietario_id" value="1">
	<input type="hidden" id="status" name="status" value="<?=$status?>">

	<h2>Cadastro de Pesquisa</h2>

	<!-- CAMPOS INICIO -->
	<!-- PESQUISA INICIO -->

	<label>Título
		<input type="text" id="titulo" name="titulo" placeholder="Informe o título" value="<?=$titulo?>"/>
	</label><br/>

	<label>Descrição
		<input type="text" id="titulo" name="descricao" placeholder="Informe a descrição" value="<?=$descricao?>"/>
	</label><br/>

	<label>Período de Publicação</label><br/>

	<label>De
		<input type="text" id="periodo_inicio" name="periodo_inicio" placeholder="Ilimitado" value="<?=$periodo_inicio?>"/>&nbsp;
	</label>
	
	<label>Até
		<input type="text" id="periodo_fim" name="periodo_fim" placeholder="Ilimitado" value="<?=$periodo_fim?>"/>
	</label><br/>

	<label>Quantidade de perguntas por página
		<input type="text" id="qtd_pergunta_pagina" name="qtd_pergunta_pagina" placeholder="" value="<?=$qtd_pergunta_pagina?>"/>
	</label><br/>

	<hr>

	<input type="hidden" id="count_pergunta_inc" value="-1">

	<div id="div_perguntas">

	</div>

	<button id="add_pergunta">Adicionar pergunta</button>

	<br/>
	<button id="btn_cancelar" type="submit" value="_cancelar">Cancelar</button>
	<button id="btn_finalizar" type="submit" value="_finalizar">Finalizar</button>
	<button id="btn_pre_visualizar" type="submit" value="_pre_visualizar">Pré-Visualizar</button>

</form>

<?php
	require_once("template/footer.php");
?>
<script src="<?=PORTAL_URL?>ajax/pesquisa/formulario.js"></script>
