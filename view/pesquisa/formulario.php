<?php 
  // session_start();

  // INCLUDE TEMPLATE
  include_once('conf/config.php');
  include('template/header.php');

?>
<?php

  $conn = Conexao::getInstance();

	$stmt = $conn->prepare("SELECT id, nome FROM ava_tipo_opcao ");
	$stmt->execute();
	$resultTipoOpcao = $stmt->fetchAll();

?>

<!-- JAVASCRIPT -->
<script type="text/javascript">
	var resultTipoOpcao = <?=json_encode($resultTipoOpcao);?>;
</script>

<form action="javascript; " method="POST" id="form_pesquisa" name="form_pesquisa">

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

	<button id="add_pergunta" type="button">Adicionar pergunta</button>

	<br/>
	<button>Cancelar</button>
	<a href="#" id="a_finalizar">Finalizar</a>
	<button>Pré-Visualizar</button>

</form>

<?php
	require_once("template/footer.php");
?>
<script src="<?=PORTAL_URL?>ajax/pesquisa/formulario.js"></script>
