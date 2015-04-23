<?php
	$key = isset($_POST['key']) ? $_POST['key'] : 0;
	$keyVisual = $key + 1;
?>

			<!-- PERGUNTA INICIO -->

			<input type="hidden" id="pergunta_id" name="pergunta_id[]" value="0">
			<input type="hidden" id="pergunta_status" name="pergunta_status[]" value="1">

			<h4>Questão <?=$keyVisual;?></h4>

			<label>Título&nbsp;
				<input type="text" id="pergunta_titulo" name="pergunta_titulo[]" placeholder="Informe o título" value=""/>
			</label><br/>

			<label>Texto de ajuda&nbsp;
				<input type="text" id="pergunta_texto_ajuda" name="pergunta_texto_ajuda[]" placeholder="Informe o texto de ajuda" value=""/>
			</label><br/>

			<label>Tipo de Pergunta&nbsp;
				<select id="pergunta_tipo_opcao" name="pergunta_tipo_opcao[]">

				</select>
			</label>

			<label>
				<input type="checkbox" id="pergunta_redireciona" name="pergunta_redireciona_<?=$key;?>"/>
				Ir para página com base em uma resposta
			</label>
			<br/>

			<label>
				<input type="checkbox" id="pergunta_obrigatoria" name="pergunta_obrigatoria_<?=$key;?>"/>
				Obrigatória
			</label><br/>

			<!-- PERGUNTA FIM -->

			<br/>

			<!-- OPCAO INICIO -->

			<h5>Opções</h5>

			<!-- 

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

			 -->

			<div id="div_op">

				<div id="div_op_texto" class="div_op"><input type="text" id="_<?=$key;?>_op_texto" readonly="true" disabled="" placeholder="A resposta deles" value=""></div>

				<div id="div_op_paragrafo" class="div_op"></div>

				<div id="div_op_multipla_escolha" class="div_op"></div>

				<div id="div_op_caixa_selecao" class="div_op"></div>

				<div id="div_op_lista" class="div_op"></div>

				<div id="div_op_escala_numero" class="div_op"></div>

				<div id="div_op_escala_estrela" class="div_op"></div>

				<div id="div_op_escala_rosto" class="div_op"></div>

				<div id="div_op_grade_linha" class="div_op"></div>

				<div id="div_op_grade_coluna" class="div_op"></div>

				<div id="div_op_data" class="div_op"></div>

				<div id="div_op_horario" class="div_op"></div>

				<div id="div_op_curtir" class="div_op"></div>

			</div>

			<!-- OPCAO FIM -->

			<hr align="left" width="600">

		<!-- PESQUISA FIM -->
		<!-- CAMPOS FIM -->
