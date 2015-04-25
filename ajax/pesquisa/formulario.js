$(document).ready(function() {

  //carrega option do primeiro select da pergunta tipo de opção-----------------------------------
  carrega_tipo_opcao(0);

  //carrega nova pergunta no formulário ----------------------------------------------------------
  $('button#a_add_pergunta').livequery("click", function(){
    var count_p = ($('div#div_perguntas').find("div.div_pergunta").size());
    $('div#div_perguntas').append('<div id="div_pergunta_'+count_p+'" class="div_pergunta" contador="'+count_p+'"></div>');
    $('div#div_pergunta_'+count_p).load(PORTAL_URL+'view/pergunta/formulario.php', {'key': count_p}, function(){
      carrega_tipo_opcao(count_p);
    });
    return false;
  });

  //carrega tipo de opcao ------------------------------------------------------------------------
  function carrega_tipo_opcao(key){
    var retorno = '';
    $.each(resultTipoOpcao, function (i, obj){
      retorno += ' <option value="'+obj['id']+'">'+obj['nome']+'</option>';
    });
    $('div#div_pergunta_'+key).find('select#pergunta_tipo_opcao').html(retorno);
    return false;
  }

//---------------------------------------------------------------------------------------------------------------------------

  //alterar opcoes da pergunta baseado no tipo de opcao da pergunta--------------------------------
	$('select#pergunta_tipo_opcao').livequery("change", function(){
    
    var contador = $(this).parents('div.div_pergunta').attr('contador');

    clean_pergunta_opcao($(this));

		if ($(this).val() == 1) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_texto').html(opcao_texto(contador));
		} else if ($(this).val() == 2) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_paragrafo').html(opcao_paragrafo(contador));
		} else if ($(this).val() == 3) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_multipla_escolha').html(opcao_multipla_escolha(contador));
		} else if ($(this).val() == 4) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_caixa_selecao').html(opcao_caixa_selecao(contador));
		} else if ($(this).val() == 5) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_lista').html(opcao_lista(contador));
		} else if ($(this).val() == 6) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_numero').html(opcao_escala_numero(contador));
		} else if ($(this).val() == 7) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_estrela').html(opcao_escala_estrela(contador));
		} else if ($(this).val() == 8) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_rosto').html(opcao_escala_rosto(contador));
		} else if ($(this).val() == 9) {
      $(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_linha').html(opcao_grade_linha(contador, 1));
      $(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_linha').append(opcao_grade_linha(contador, 2));
      $(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_coluna').html(opcao_grade_coluna(contador, 1));
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_coluna').append(opcao_grade_coluna(contador, 2));
		} else if ($(this).val() == 10) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_data').html(opcao_data(contador));
		} else if ($(this).val() == 11) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_horario').html(opcao_horario(contador));
		} else if ($(this).val() == 12) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_curtir').html(opcao_curtir(contador));
		}
		return false;
	});

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------


  //carrega tipo de opcao ------------------------------------------------------------------------
  function clean_pergunta_opcao(obj){
    $(obj).parents('div.div_pergunta').find('div.div_op').each(function(i, div){
      $(div).html('');
    });
    return false;
  }

  //tipos opcos das perguntas no banco de dados------------------------------------------------------------------------

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

  //opcos das perguntas---------------------------------------------------------------------------

  function opcao_texto(key){
  	var retorno = '';
    retorno += '  <input type="text" id="'+key+'_op_texto" readonly="true" disabled="" placeholder="A resposta deles" value="">';
  	return retorno;
  }

  function opcao_paragrafo(key){
    var retorno = '';
    retorno += '  <textarea id="'+key+'_op_paragrafo" readonly="true" disabled="" placeholder="A resposta mais longa deles" value=""></textarea>';
    return retorno;
  }

  function opcao_multipla_escolha(key){
    var retorno = '';
    retorno += '  <input type="radio" readonly="true" disabled="" value="">';
    retorno += '  <input type="text" id="'+key+'_op_multipla_escolha" name="'+key+'_op_multipla_escolha[]" value=""><br/>';
    return retorno;
  }

  function opcao_caixa_selecao(key){
    var retorno = '';
    retorno += '  <input type="checkbox" readonly="true" disabled="" value="">';
    retorno += '  <input type="text" id="'+key+'_op_caixa_selecao" name="'+key+'_op_caixa_selecao[]" value=""><br/>';
    return retorno;
  }

  function opcao_lista(key){
    var retorno = '';
    retorno += '  <input type="text" id="'+key+'_op_lista" name="'+key+'_op_lista" value=""><br/>';
    return retorno;
  }

  function opcao_escala_numero(key){
    var retorno = '';
    retorno += '  <select id="'+key+'_op_escala_numero" name="'+key+'_op_escala_numero">';
    retorno += '    <option value="0">0</option>';
    retorno += '    <option selected="" value="1">1</option>';
    retorno += '  </select>';
    retorno += '  <select id="'+key+'_op_escala_numero" name="'+key+'_op_escala_numero">';
    retorno += '    <option value="2">2</option>';
    retorno += '    <option value="3">3</option>';
    retorno += '    <option value="4">4</option>';
    retorno += '    <option selected="" value="5">5</option>';
    retorno += '    <option value="6">6</option>';
    retorno += '    <option value="7">7</option>';
    retorno += '    <option value="8">8</option>';
    retorno += '    <option value="9">9</option>';
    retorno += '    <option value="10">10</option>';
    retorno += '  </select>';
    return retorno;
  }

  function opcao_escala_estrela(key){
    var retorno = '';
    retorno += 'estrelas <br/>';
    return retorno;
  }

  function opcao_escala_rosto(key){
    var retorno = '';
    retorno += 'rostos <br/>';
    return retorno;
  }

  function opcao_grade_linha(key, keyLine){
    var retorno = '';
    retorno += '  <label>Marcador da Linha '+keyLine+'&nbsp;';
    retorno += '    <input type="text" id="'+key+'_op_grade_linha" name="'+key+'_op_grade_linha[]" value="">';
    retorno += '  </label><br>';
    return retorno;
  }

  function opcao_grade_coluna(key, keyColumn){
    var retorno = '';
    retorno += '  <label>Marcador da Coluna '+keyColumn+'&nbsp;';
    retorno += '    <input type="text" id="'+key+'_op_grade_coluna" name="'+key+'_op_grade_coluna[]" value="">';
    retorno += '  </label><br>';
    return retorno;
  }

  function opcao_data(key){
    var retorno = '';
    retorno += 'Data <br/>';
    return retorno;
  }

  function opcao_horario(key){
    var retorno = '';
    retorno += 'horario <br/>';
    return retorno;
  }

  function opcao_curtir(key){
    var retorno = '';
    retorno += 'curtir <br/>';
    return retorno;
  }

  //onError --------------------------------------------------------------------------------------
  function onError(args) {
    //console.log( 'onError: ' + args );
    alert("Error: "+args);
  }

//---------------------------------------------------------------------------------------------------------------------------

  //finalizar cadastro de formulário de pesquisa--------------------------------------------------
  $('a#a_finalizar').livequery( "click", function(){

    //contagem de error validate
    var formValido = 1;

      if( formValido ){
        var queryString = $('#form_pesquisa').formSerialize();
        // console.log(queryString);
        var options = { 
          data: queryString,
          type: 'POST',
          url: '/avaliacao/dao/pesquisa/add.php',
          beforeSend: function(){
              // $('#myModalProgressBar').modal('show');
              // $("#progress").show();
              // $("#progress-bar").width('0%');
              // $("#progress-bar").html("0%");
          },
          uploadProgress: function(event, position, total, percentComplete){
              // $("#progress-bar").width(percentComplete+'%');
              // $("#progress-bar").html(percentComplete+'%');
          },
          success: function(data){
              // $("#progress-bar").width('100%');
              // $("#progress-bar").html('100%');
              // $('#myModalProgressBar').modal('hide');
          },
          complete: function(returnJSON){
            // console.log(data.responseText);
            // converter o resultado em JSON
            // var returnJSON = JSON.parse( data.responseText );

            if(returnJSON.msg == 'error'){
              // $('#alerta-retorno').addClass('alert-danger');
              // $('#alerta-retorno').show();
              // $('#mensagem-retorno').html('Error ao tentar efetuar o cadastro.');
              console.log("erro");
            }else if(returnJSON.msg == 'success' ){
              // $('#alerta-retorno').addClass('alert-success');
              // $('#alerta-retorno').show();
              // $('#mensagem-retorno').html('Cadastro efetuado com sucesso.');
              console.log("sucesso");
            }

            // $('#myModalProgressBar').modal('hide');
            // $('#prev-modal').hide();
            //$('.modal-backdrop').addClass('display-none');
          },
          error: function(response){
            // $('#myModalProgressBar').modal('hide');

            //converter o resultado em JSON
            var returnJSON = JSON.parse( data.responseText );
            if(returnJSON.msg == 'error'){
              // $('#alerta-retorno').addClass('alert-danger');
              // $('#alerta-retorno').show();
              // $('#mensagem-retorno').html('Error ao tentar efetuar o cadastro.');
              console.log("error: erro")
            }
          }
        };
        //ENVIAR DADOS VIA AJAX
        $('#form_pesquisa').ajaxSubmit(options);
      }//END IF
    return false;
  });

});
//ready fim ---------------------------------------------------------------------------------------------------------------------------

function pacienteValidator(){
  var valido = true;

  $('input#paciente_nome').removeClass('error').next('label.error').remove();
  if($('input#paciente_nome').val() == ''){
    $('input#paciente_nome').addClass('error').after( '<label id="error" class="error">Campo obrigatório!</label>' );
    valido = false;
  }
  $('input#paciente_data_nascimento').removeClass('error').next('label.error').remove();
  if($('input#paciente_data_nascimento').val() == ''){
    $('input#paciente_data_nascimento').addClass('error').after( '<label id="error" class="error">Campo obrigatório!</label>' );
    valido = false;
  }
  $('input#paciente_telefone').removeClass('error').next('label.error').remove();
  if($('input#paciente_telefone').val() == ''){
    $('input#paciente_telefone').addClass('error').after( '<label id="error" class="error">Campo obrigatório!</label>' );
    valido = false;
  }
  $('input#paciente_email').removeClass('error').next('label.error').remove();
  if($('input#paciente_email').val() == ''){
    $('input#paciente_email').addClass('error').after( '<label id="error" class="error">Campo obrigatório!</label>' );
    valido = false;
  }
  return valido;
}
