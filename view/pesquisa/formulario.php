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
	$resultTipoOpcao = $stmt->fetchAll();

	if( $param != null || $param != '' || $param != NULL ){

	  $id = $param;
	  // resultado do usuário

	}else{

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
		<input type="text" id="titulo" name="titulo" placeholder="Informe o título" value=""/>
	</label><br/>

	<label>Descrição
		<input type="text" id="titulo" name="descricao" placeholder="Informe a descrição" value=""/>
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
