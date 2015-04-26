$(document).ready(function() {

  //carrega nova pergunta no formulário ----------------------------------------------------------
  $('button#add_pergunta').livequery("click", function(){
    var count = $('input#count_pergunta_inc').val();
    var count_p = Number(count)+(1);
    $('div#div_perguntas').append('<div id="div_pergunta_'+count_p+'" class="div_pergunta" contador="'+count_p+'"></div>');
    $('div#div_pergunta_'+count_p).html(pergunta(count_p));
    $('input#count_pergunta_inc').val(count_p);
    carrega_tipo_opcao(count_p);
    renumera_pergunta();
    return false;
  });

  //remove pergunta no formulário ----------------------------------------------------------
  $('button#remove_pergunta').livequery("click", function(){
    var count_p = ($('div#div_perguntas').find("div.div_pergunta").size());
    if(count_p <= 1){
      $(this).parents('div.div_pergunta').remove();
      $('button#add_pergunta').click();
      carrega_tipo_opcao(0);
    }else{
      $(this).parents('div.div_pergunta').remove();
      renumera_pergunta();
    }
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

  //renumera pergunta ------------------------------------------------------------------------
  function renumera_pergunta(){
    $('div#div_perguntas').find('div.div_pergunta').each(function(i){
      $(this).find('h4').html('Questão '+(i+1));
    });
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
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_multipla_escolha').html(opcao_multipla_escolha(contador)).append(button_add_opcao());
		} else if ($(this).val() == 4) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_caixa_selecao').html(opcao_caixa_selecao(contador)).append(button_add_opcao());
		} else if ($(this).val() == 5) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_lista').html(opcao_lista(contador)).append(button_add_opcao());
		} else if ($(this).val() == 6) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_numero').html(opcao_escala_numero(contador));
		} else if ($(this).val() == 7) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_estrela').html(opcao_escala_estrela(contador));
		} else if ($(this).val() == 8) {
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_rosto').html(opcao_escala_rosto(contador));
		} else if ($(this).val() == 9) {
      $(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_linha').html(opcao_grade_linha(contador, 1));
      $(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_linha').append(opcao_grade_linha(contador, 2)).append(button_add_opcao());
      $(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_coluna').html(opcao_grade_coluna(contador, 1));
			$(this).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_coluna').append(opcao_grade_coluna(contador, 2)).append(button_add_opcao());
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
  
  //OPCAO NAS PERGUNTAS --------------------------------------------------------
  //add uma nova opcão opcao na pergunta multipla_escolha ----------------------------------------------------------
  $('button#add_opcao').livequery('click', function(){
    var contador = $(this).parents('div.div_pergunta').attr('contador');
    var tipo = $(this).parents('div.div_op').attr('id');
    if(tipo == 'div_op_multipla_escolha'){
      $(this).parents('div#div_add_opcao').before(opcao_multipla_escolha(contador));
    }else if(tipo == 'div_op_caixa_selecao'){
      $(this).parents('div#div_add_opcao').before(opcao_caixa_selecao(contador));
    }else if(tipo == 'div_op_lista'){
      $(this).parents('div#div_add_opcao').before(opcao_lista(contador));
    }else if(tipo == 'div_op_grade_linha'){
      $(this).parents('div#div_add_opcao').before(opcao_grade_linha(contador));
    }else if(tipo == 'div_op_grade_coluna'){
      $(this).parents('div#div_add_opcao').before(opcao_grade_coluna(contador));
    }
    return false;
  });

  //remove uma opcao na pergunta caixa_selecao ----------------------------------------------------------
  $('button#remove_opcao').livequery('click', function(){
    var obj_div = $(this).parents('div.div_op');
    $(this).parents('div#div_opcao_row').remove();
    var cont_input = $(obj_div).find('input').length;
    if(cont_input == 0){
      $(obj_div).find('button#add_opcao').click();
    }
    return false;
  });

  //OPCAO MULTIPLA ESCOLHA
  //carrega nova opcao na pergunta multipla_escolha ----------------------------------------------------------
  $('input.op_multipla_escolha').livequery('keyup', function(){
    if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1  || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_multipla_escolha').find('div#div_add_opcao').before(opcao_multipla_escolha(contador));
      }
    }
  });

  //OPCAO CAIXA DE SELECAO
  //carrega nova opcao na pergunta caixa_selecao ----------------------------------------------------------
  $('input.op_caixa_selecao').livequery('keyup', function(){
    if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1  || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_caixa_selecao').find('div#div_add_opcao').before(opcao_caixa_selecao(contador));
      }
    }
  });

  //OPCAO LISTA
  //carrega nova opcao na pergunta lista ----------------------------------------------------------
  $('input.op_lista').livequery('keyup', function(){
    if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1  || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_lista').find('div#div_add_opcao').before(opcao_lista(contador));
      }
    }
  });

  //OPCAO LISTA
  //carrega nova opcao na pergunta grade_linha ----------------------------------------------------------
  $('input.op_grade_linha').livequery('keyup', function(){
    if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1  || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_grade_linha').find('div#div_add_opcao').before(opcao_grade_linha(contador));
      }
    }
  });

  //OPCAO LISTA
  //carrega nova opcao na pergunta grade_coluna ----------------------------------------------------------
  $('input.op_grade_coluna').livequery('keyup', function(){
    if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1  || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_grade_coluna').find('div#div_add_opcao').before(opcao_grade_coluna(contador));
      }
    }
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
  function pergunta(key){
    var retorno = '';
    retorno += '<input type="hidden" id="pergunta_id" name="pergunta_id[]" value="0">';
    retorno += '<input type="hidden" id="pergunta_ordem" name="pergunta_ordem[]" value="'+key+'">';
    retorno += '<input type="hidden" id="pergunta_status" name="pergunta_status[]" value="1">';
    retorno += '<button id="remove_pergunta" type="button">Remover</button>';
    retorno += '<h4>Questão</h4>';
    retorno += '<label>Título&nbsp;';
    retorno += '  <input type="text" id="pergunta_titulo" name="pergunta_titulo[]" placeholder="Informe o título" value=""/>';
    retorno += '</label><br/>';
    retorno += '<label>Texto de ajuda&nbsp;';
    retorno += '  <input type="text" id="pergunta_texto_ajuda" name="pergunta_texto_ajuda[]" placeholder="Informe o texto de ajuda" value=""/>';
    retorno += '</label><br/>';
    retorno += '<label>Tipo de Pergunta&nbsp;';
    retorno += '  <select id="pergunta_tipo_opcao" name="pergunta_tipo_opcao[]">';
    retorno += '  </select>';
    retorno += '</label>';
    retorno += '<label>';
    retorno += '  <input type="checkbox" id="pergunta_redireciona" name="pergunta_redireciona_'+key+'"/>';
    retorno += '  Ir para página com base em uma resposta';
    retorno += '</label>';
    retorno += '<br/>';
    retorno += '<label>';
    retorno += '  <input type="checkbox" id="pergunta_obrigatoria" name="pergunta_obrigatoria_'+key+'"/>';
    retorno += '  Obrigatória';
    retorno += '</label><br/>';
    retorno += '<h5>Opções</h5>';
    retorno += '<div id="div_op">';
    retorno += '  <div id="div_op_texto" class="div_op">';
    retorno += '    <div id="div_opcao_row">';
    retorno += '      <input type="text" id="'+key+'_op_texto" class="op_texto" readonly="true" disabled="" placeholder="A resposta deles" value="">';
    retorno += '    </div>';
    retorno += '  </div>';
    retorno += '  <div id="div_op_paragrafo" class="div_op"></div>';
    retorno += '  <div id="div_op_multipla_escolha" class="div_op"></div>';
    retorno += '  <div id="div_op_caixa_selecao" class="div_op"></div>';
    retorno += '  <div id="div_op_lista" class="div_op"></div>';
    retorno += '  <div id="div_op_escala_numero" class="div_op"></div>';
    retorno += '  <div id="div_op_escala_estrela" class="div_op"></div>';
    retorno += '  <div id="div_op_escala_rosto" class="div_op"></div>';
    retorno += '  <div id="div_op_grade_linha" class="div_op"></div>';
    retorno += '  <div id="div_op_grade_coluna" class="div_op"></div>';
    retorno += '  <div id="div_op_data" class="div_op"></div>';
    retorno += '  <div id="div_op_horario" class="div_op"></div>';
    retorno += '  <div id="div_op_curtir" class="div_op"></div>';
    retorno += '</div>';
    retorno += '<hr align="left" width="600">';
    return retorno;
  }

  //opcos das perguntas---------------------------------------------------------------------------

  function opcao_texto(key){
  	var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="text" id="'+key+'_op_texto" readonly="true" disabled="" placeholder="A resposta deles" value="">';
    retorno += '</div>';
  	return retorno;
  }

  function opcao_paragrafo(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <textarea id="'+key+'_op_paragrafo" readonly="true" disabled="" placeholder="A resposta mais longa deles" value=""></textarea>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_multipla_escolha(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="radio" readonly="true" disabled="" value="">';
    retorno += '  <input type="text" id="'+key+'_op_multipla_escolha" class="op_multipla_escolha" name="'+key+'_op_multipla_escolha[]" value="">';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_caixa_selecao(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="checkbox" readonly="true" disabled="" value="">';
    retorno += '  <input type="text" id="'+key+'_op_caixa_selecao" class="op_caixa_selecao" name="'+key+'_op_caixa_selecao[]" value="">';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_lista(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="text" id="'+key+'_op_lista" class="op_lista" name="'+key+'_op_lista" value="">';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_escala_numero(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <label>De&nbsp;';
    retorno += '    <select id="'+key+'_op_escala_numero" name="'+key+'_op_escala_numero">';
    retorno += '      <option value="0">0</option>';
    retorno += '      <option selected="" value="1">1</option>';
    retorno += '    </select>';
    retorno += '  </label>';
    retorno += '  <label>Até&nbsp;';
    retorno += '    <select id="'+key+'_op_escala_numero" name="'+key+'_op_escala_numero">';
    retorno += '      <option value="2">2</option>';
    retorno += '      <option value="3">3</option>';
    retorno += '      <option value="4">4</option>';
    retorno += '      <option selected="" value="5">5</option>';
    retorno += '      <option value="6">6</option>';
    retorno += '      <option value="7">7</option>';
    retorno += '      <option value="8">8</option>';
    retorno += '      <option value="9">9</option>';
    retorno += '      <option value="10">10</option>';
    retorno += '    </select>';
    retorno += '  </label>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_escala_estrela(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += 'estrelas <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_escala_rosto(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += 'rostos <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_grade_linha(key, keyLine){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <label>Marcador da Linha '+keyLine+'&nbsp;';
    retorno += '    <input type="text" id="'+key+'_op_grade_linha" class="op_grade_linha"  name="'+key+'_op_grade_linha[]" value="">';
    retorno += '  </label>';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_grade_coluna(key, keyColumn){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <label>Marcador da Coluna '+keyColumn+'&nbsp;';
    retorno += '    <input type="text" id="'+key+'_op_grade_coluna" class="op_grade_coluna"  name="'+key+'_op_grade_coluna[]" value="">';
    retorno += '  </label>';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_data(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += 'Data <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_horario(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += 'horario <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_curtir(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += 'curtir <br/>';
    retorno += '</div>';
    return retorno;
  }

  function button_add_opcao(){
    var retorno = '';
    retorno += '<div id="div_add_opcao">';
    retorno += '  <button id="add_opcao">Adicionar opção<br/>';
    retorno += '</div>';
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

  //carrega primeira pergunta no formulário ----------------------------------------------------------
  var count_p = ($('div#div_perguntas').find("div.div_pergunta").size());
  if(count_p == 0){
    $('button#add_pergunta').click();
  }

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
