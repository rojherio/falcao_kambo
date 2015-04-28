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

	$stmt = $conn->prepare("SELECT id, nome FROM ava_tipo_opcao ");
	$stmt->execute();
	$resultTipoOpcao = $stmt->fetchAll(PDO::FETCH_ASSOC);

//variareis dos campos
	//GET DATA
	$id														= 0;
	$titulo												= "";
	$descricao										= "";
	$status												= 0;
	$proprietarioId								= 0;

	$perguntas 										= array();

	if( $param != null || $param != '' || $param != NULL ){

	  $id = $param;
	  
	  //carrega dados da pequisa
		$stmt = $conn->prepare("SELECT id, titulo, descricao, link, status, data_cadastro, proprietario_id 
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

			//carrega dados das perguntas da pesquisa
			$stmt = $conn->prepare("SELECT id, titulo, texto_ajuda, obrigatoria, redireciona, status, tipo_opcao_id 
															FROM ava_pergunta 
															WHERE pesquisa_id = :id");
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

				//carrega oçoes das perguntas da pesquisa
				$stmt = $conn->prepare("SELECT id, resposta, valor, direcao, tipo, controle, opcao_pai_id 
												FROM ava_opcao 
												WHERE pergunta_id = :pergunta_id");
				$stmt->bindValue(":pergunta_id", $vPergunta["id"]);
				$stmt->execute();
				$rsOpcao = $stmt->fetchAll(PDO::FETCH_ASSOC);

				//varre o ResultSet de opcoes para preencer os campos em modo de edicao
				foreach($rsOpcao as $kOpcao => $vOpcao){

					$opcao 																		= array();
					$opcao["id"]															=$vOpcao['id'];
					$opcao["resposta"]												=$vOpcao['resposta'];
					$opcao["valor"]														=$vOpcao['valor'];
					$opcao["direcao"]													=$vOpcao['direcao'];
					$opcao["tipo"]														=$vOpcao['tipo'];
					$opcao["controle"]												=$vOpcao['controle'];
					$opcao["pergunta_id"]											=$vPergunta['id'];
					$opcao["opcao_pai_id"]										=$vOpcao['opcao_pai_id'];

					array_push($pergunta['opcoes'], $opcao);

				}

				array_push($perguntas, $pergunta);

			}

		}

	}
?>

<!-- JAVASCRIPT -->
<script type="text/javascript">
	var resultTipoOpcao = <?=json_encode($resultTipoOpcao);?>;
</script>

<form action="javascript;" method="POST" id="form_pesquisa" name="form_pesquisa">

	<input type="hidden" id="proprietario_id" name="proprietario_id" value="1">
	<input type="hidden" id="status" name="status" value="1">

	<h2>Cadastro de Pesquisa</h2>

	<!-- CAMPOS INICIO -->
	<!-- PESQUISA INICIO -->

	<label>Título
		<input type="text" id="titulo" name="titulo" placeholder="Informe o título" value="<?=$titulo?>"/>
	</label><br/>

	<label>Descrição
		<input type="text" id="titulo" name="descricao" placeholder="Informe a descrição" value="<?=$descricao?>"/>
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
