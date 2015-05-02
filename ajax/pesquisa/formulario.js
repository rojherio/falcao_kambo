$(document).ready(function() {

  //carrega nova pergunta no formulário ----------------------------------------------------------
  function adiciona_pergunta(){
    var count = $('input#count_pergunta_inc').val();
    var count_p = Number(count)+(1);
    $('div#div_perguntas').append('<div id="div_pergunta_'+count_p+'" class="div_pergunta" contador="'+count_p+'"></div>');
    $('div#div_pergunta_'+count_p).html(pergunta(count_p));
    $('input#count_pergunta_inc').val(count_p);
    carrega_tipo_opcao(count_p);
    renumera_pergunta();
  }
  $('button#add_pergunta').livequery("click", function(){
    adiciona_pergunta();
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
	function carrega_opcao(obj){
    var contador = $(obj).parents('div.div_pergunta').attr('contador');

    clean_pergunta_opcao($(obj));

    if ($(obj).val() == 1) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_texto').html(opcao_texto(contador));
    } else if ($(obj).val() == 2) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_paragrafo').html(opcao_paragrafo(contador));
    } else if ($(obj).val() == 3) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_multipla_escolha').html(opcao_multipla_escolha(contador)).append(button_add_opcao());
    } else if ($(obj).val() == 4) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_caixa_selecao').html(opcao_caixa_selecao(contador)).append(button_add_opcao());
    } else if ($(obj).val() == 5) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_lista').html(opcao_lista(contador)).append(button_add_opcao());
    } else if ($(obj).val() == 6) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_numero').html(opcao_escala_numero(contador));
    } else if ($(obj).val() == 7) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_estrela').html(opcao_escala_estrela(contador));
    } else if ($(obj).val() == 8) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_escala_rosto').html(opcao_escala_rosto(contador));
    } else if ($(obj).val() == 9) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_linha').html(opcao_grade_linha(contador, 1));
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_linha').append(opcao_grade_linha(contador, 2)).append(button_add_opcao());
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_coluna').html(opcao_grade_coluna(contador, 1));
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_grade_coluna').append(opcao_grade_coluna(contador, 2)).append(button_add_opcao());
    } else if ($(obj).val() == 10) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_data').html(opcao_data(contador));
    } else if ($(obj).val() == 11) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_horario').html(opcao_horario(contador));
    } else if ($(obj).val() == 12) {
      $(obj).parents('div#div_pergunta_'+contador).find('#div_op').find('#div_op_curtir').html(opcao_curtir(contador));
    }
  }
  $('select#pergunta_tipo_opcao').livequery("change", function(){
    carrega_opcao($(this));   
		return false;
	});

//---------------------------------------------------------------------------------------------------------------------------
  
  //OPCAO NAS PERGUNTAS --------------------------------------------------------
  //add uma nova opcão opcao na pergunta ----------------------------------------------------------
  function adiciona_opcao(obj){
    var contador = $(obj).parents('div.div_pergunta').attr('contador');
    var tipo = $(obj).parents('div.div_op').attr('id');
    if(tipo == 'div_op_multipla_escolha'){
      $(obj).parents('div#div_add_opcao').before(opcao_multipla_escolha(contador));
    }else if(tipo == 'div_op_caixa_selecao'){
      $(obj).parents('div#div_add_opcao').before(opcao_caixa_selecao(contador));
    }else if(tipo == 'div_op_lista'){
      $(obj).parents('div#div_add_opcao').before(opcao_lista(contador));
    }else if(tipo == 'div_op_grade_linha'){
      $(obj).parents('div#div_add_opcao:first').before(opcao_grade_linha(contador));
      renumera_opcao_grade_linha(contador);
    }else if(tipo == 'div_op_grade_coluna'){
      $(obj).parents('div#div_add_opcao:last').before(opcao_grade_coluna(contador));
      renumera_opcao_grade_coluna(contador);
    }
  }
  $('button#add_opcao').livequery('click', function(){
    adiciona_opcao($(this));
    return false;
  });

  //remove uma opcao na pergunta ----------------------------------------------------------
  $('button#remove_opcao').livequery('click', function(){
    var tipo = $(this).parents('div.div_op').attr('id');
    var obj_div = $(this).parents('div.div_op');
    var contador = $(obj_div).parents('div.div_pergunta').attr('contador');
    $(this).parents('div#div_opcao_row').remove();
    var cont_input = $(obj_div).find('input').length;
    if(tipo == 'div_op_grade_linha' || tipo == 'div_op_grade_coluna'){
      if(cont_input == 1 && tipo == 'div_op_grade_linha'){
        $(obj_div).find('button#add_opcao:first').click();
      }else if(cont_input == 1 && tipo == 'div_op_grade_coluna'){
        $(obj_div).find('button#add_opcao:last').click();
      }
      renumera_opcao_grade_linha(contador);
      renumera_opcao_grade_coluna(contador);
    }else{
      if(cont_input == 0){
        $(obj_div).find('button#add_opcao').click();
      }
    }
    return false;
  });

  //OPCAO MULTIPLA ESCOLHA
  //carrega nova opcao na pergunta multipla_escolha ----------------------------------------------------------
  $('input.op_multipla_escolha').livequery('keyup', function(){
    // if($(this).val().length == 1){
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
    // }
  });

  //OPCAO CAIXA DE SELECAO
  //carrega nova opcao na pergunta caixa_selecao ----------------------------------------------------------
  $('input.op_caixa_selecao').livequery('keyup', function(){
    // if($(this).val().length == 1){
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
    // }
  });

  //OPCAO LISTA
  //carrega nova opcao na pergunta lista ----------------------------------------------------------
  $('input.op_lista').livequery('keyup', function(){
    // if($(this).val().length == 1){
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
    // }
  });

  //OPCAO LISTA
  //carrega nova opcao na pergunta grade_linha ----------------------------------------------------------
  $('input.op_grade_linha').livequery('keyup', function(){
    // if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1 || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_grade_linha').find('div#div_add_opcao').before(opcao_grade_linha(contador));
        renumera_opcao_grade_linha(contador);
      }
    // }
  });

  //OPCAO LISTA
  //carrega nova opcao na pergunta grade_coluna ----------------------------------------------------------
  $('input.op_grade_coluna').livequery('keyup', function(){
    // if($(this).val().length == 1){
      var cont_vazio = 0;
      var cont_input = 0;
      $(this).parents('div.div_op').find("input[type='text']").each(function(i, input){
        cont_vazio += $(input).val().length == 0 ? 1 : 0;
        cont_input ++;
      });
      if(cont_input == 1  || (cont_vazio < 1 && cont_input > 1)){
        var contador = $(this).parents('div.div_pergunta').attr('contador');
        $(this).parents('div#div_op_grade_coluna').find('div#div_add_opcao').before(opcao_grade_coluna(contador));
        renumera_opcao_grade_coluna(contador);
      }
    // }
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

  //renumera opcoes de pergunta do tipo grade ------------------------------------------------------------------------
  function renumera_opcao_grade_linha(key){
    $('div#div_pergunta_'+key).find('div#div_op_grade_linha').find('label#label_op_grade_linha').each(function(i, label){
      $(this).find('span').html('Marcador da Linha '+(i+1)+'&nbsp;');
    });
  }
  function renumera_opcao_grade_coluna(key){
    $('div#div_pergunta_'+key).find('div#div_op_grade_coluna').find('label#label_op_grade_coluna').each(function(i, label){
      $(this).find('span').html('Marcador da Coluna '+(i+1)+'&nbsp;');
    });
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
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '  <input type="text" id="'+key+'_op_texto" readonly="true" disabled="" placeholder="A resposta deles" value="">';
    retorno += '</div>';
  	return retorno;
  }

  function opcao_paragrafo(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '  <textarea id="'+key+'_op_paragrafo" readonly="true" disabled="" placeholder="A resposta mais longa deles" value=""></textarea>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_multipla_escolha(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '  <input type="radio" readonly="true" disabled="" value="">';
    retorno += '  <input type="text" id="'+key+'_op_multipla_escolha" class="op_multipla_escolha" name="'+key+'_op_multipla_escolha[]" value="">';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_caixa_selecao(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '  <input type="checkbox" readonly="true" disabled="" value="">';
    retorno += '  <input type="text" id="'+key+'_op_caixa_selecao" class="op_caixa_selecao" name="'+key+'_op_caixa_selecao[]" value="">';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_lista(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '  <input type="text" id="'+key+'_op_lista" class="op_lista" name="'+key+'_op_lista[]" value="">';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_escala_numero(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <label>De&nbsp;';
    retorno += '    <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '    <select id="'+key+'_op_escala_numero_ini" name="'+key+'_op_escala_numero[]">';
    retorno += '      <option value="0">0</option>';
    retorno += '      <option selected="" value="1">1</option>';
    retorno += '    </select>';
    retorno += '  </label>';
    retorno += '  <label>Até&nbsp;';
    retorno += '    <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '    <select id="'+key+'_op_escala_numero_fim" name="'+key+'_op_escala_numero[]">';
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
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += 'estrelas <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_escala_rosto(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += 'rostos <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_grade_linha(key, keyLine){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <label id="label_op_grade_linha">';
    retorno += '    <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '    <span>Marcador da Linha '+keyLine+'&nbsp;</span>';
    retorno += '    <input type="text" id="'+key+'_op_grade_linha" class="op_grade_linha"  name="'+key+'_op_grade_linha[]" value="">';
    retorno += '  </label>';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_grade_coluna(key, keyColumn){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <label id="label_op_grade_coluna">';
    retorno += '    <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += '    <span>Marcador da Coluna '+keyColumn+'&nbsp;</span>';
    retorno += '    <input type="text" id="'+key+'_op_grade_coluna" class="op_grade_coluna"  name="'+key+'_op_grade_coluna[]" value="">';
    retorno += '  </label>';
    retorno += '  <button id="remove_opcao">X</button><br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_data(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += 'Data <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_horario(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
    retorno += 'horario <br/>';
    retorno += '</div>';
    return retorno;
  }

  function opcao_curtir(key){
    var retorno = '';
    retorno += '<div id="div_opcao_row">';
    retorno += '  <input type="hidden" id="'+key+'_op_id" name="'+key+'_op_id" value="0">';
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

//---------------------------------------------------------------------------------------------------------------------------

  //finalizar cadastro de formulário de pesquisa--------------------------------------------------
  
  /* variaveis */
  var $optionsubmit = null;

  /* enviar formulário */
  $("#form_pesquisa").validate({
      rules: {
        titulo: { required: true, minlength: 5 },
      },
      messages: {
        titulo: { required: "O titulo da pesquisa é obrigatório", minlength:"Informe no mínimo 5 caracteres" },
      },
      //função para enviar após a validação
      submitHandler: function( form ){

        $('#return-feedback').hide();
        $('#msg-feedback').html('');
        $('.preload-submit').show();
        projetouniversal.util.getjson({
          url : PORTAL_URL+"php/pesquisa/pesquisa_salvar",
          data : $(form).serialize(),
          success : onSuccessSend,
          error : onError
        });
        function onSuccessSend(obj){
          switch( $optionsubmit ){
            case '_finalizar':
              /* salvar e voltar para listagem */
              if( obj.msg == 'success' ){
                $('.preload-submit').hide();
                //enviar paramentros a url de listagem com mensagem
                // postToURL(PORTAL_URL+'view/pesquisa/index', {id: obj.id, feedback: 'Cadastro efetuado com sucesso', type: 'success'});
                console.log(obj.id);
              }else if( obj.msg == 'error' ){
                $('.preload-submit').hide();
                console.log(obj.error);
                // postToURL(PORTAL_URL+'view/pesquisa/index', {error: obj.error, feedback: 'Ocorreu um erro ao realizar a operação', type: 'error'});
              }
            break;
            case '_cancelar':
              /* salvar e continuar na pagina */
              if( obj.msg == 'success' ){
                $('.preload-submit').hide();
                $('#return-feedback').show();
                $('#return-feedback').addClass('alert-success');
                $('#msg-feedback').html('<i class="glyphicon glyphicon-ok"></i> Cadastro efetuado com sucesso');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }else if( obj.msg == 'error' ){
                $('#return-feedback').show();
                $('#return-feedback').addClass('alert-danger');
                $('#msg-feedback').html('<i class="glyphicon glyphicon-remove"></i> Ocorreu um erro ao realizar a operação');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }
            break;
            case '_pre_visualizar':
              /* salvar e adicionar outro */
              if( obj.msg == 'success' ){
                $('.preload-submit').hide();
                $('#return-feedback').show();
                $('#return-feedback').addClass('alert-success');
                $('#msg-feedback').html('<i class="glyphicon glyphicon-ok"></i> Cadastro efetuado com sucesso');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
                $('#createform').parent().find('input:text, input:password, input:file, select, textarea').val('');
                $('#createform').parent().find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
                $('#paciente_nome').focus();
                $('#paciente_status').prop("checked", true);
                $('#paciente_sms').prop("checked", true);
                $('#deletaritem').hide();
                $('#idpaciente').val('');
              }else if( obj.msg == 'error' ){
                $('#return-feedback').show();
                $('#return-feedback').addClass('alert-danger');
                $('#msg-feedback').html('<i class="glyphicon glyphicon-remove"></i> Ocorreu um erro ao realizar a operação');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }
            break;
          }
        }//end function
        return false;
      }
  });

  /* enviar e editar */
  $('button#btn_finalizar').livequery( "click", function(){
    $optionsubmit = $(this).val();
  });

  /* enviar e editar */
  $('button#btn_cancelar').livequery( "click", function(){
    $optionsubmit = $(this).val();
  });

  /* enviar e adicionar outro */
  $('button#btn_pre_visualizar').livequery( "click", function(){
    $optionsubmit = $(this).val();
  });


  // $('button#_finalizaree').livequery( "click", function(){

  //   //contagem de error validate
  //   var formValido = 1;

  //     if( formValido ){
  //       var queryString = $('#form_pesquisa').formSerialize();
  //       // console.log(queryString);
  //       var options = { 
  //         data: queryString,
  //         type: 'POST',
  //         url: '/avaliacao/dao/pesquisa/add.php',
  //         beforeSend: function(){
  //             // $('#myModalProgressBar').modal('show');
  //             // $("#progress").show();
  //             // $("#progress-bar").width('0%');
  //             // $("#progress-bar").html("0%");
  //         },
  //         uploadProgress: function(event, position, total, percentComplete){
  //             // $("#progress-bar").width(percentComplete+'%');
  //             // $("#progress-bar").html(percentComplete+'%');
  //         },
  //         success: function(data){
  //             // $("#progress-bar").width('100%');
  //             // $("#progress-bar").html('100%');
  //             // $('#myModalProgressBar').modal('hide');
  //         },
  //         complete: function(returnJSON){
  //           // console.log(data.responseText);
  //           // converter o resultado em x
  //           // var returnJSON = JSON.parse( data.responseText );

  //           if(returnJSON.msg == 'error'){
  //             // $('#alerta-retorno').addClass('alert-danger');
  //             // $('#alerta-retorno').show();
  //             // $('#mensagem-retorno').html('Error ao tentar efetuar o cadastro.');
  //             console.log("erro");
  //           }else if(returnJSON.msg == 'success' ){
  //             // $('#alerta-retorno').addClass('alert-success');
  //             // $('#alerta-retorno').show();
  //             // $('#mensagem-retorno').html('Cadastro efetuado com sucesso.');
  //             console.log("sucesso");
  //           }

  //           // $('#myModalProgressBar').modal('hide');
  //           // $('#prev-modal').hide();
  //           //$('.modal-backdrop').addClass('display-none');
  //         },
  //         error: function(response){
  //           // $('#myModalProgressBar').modal('hide');

  //           //converter o resultado em JSON
  //           var returnJSON = JSON.parse( data.responseText );
  //           if(returnJSON.msg == 'error'){
  //             // $('#alerta-retorno').addClass('alert-danger');
  //             // $('#alerta-retorno').show();
  //             // $('#mensagem-retorno').html('Error ao tentar efetuar o cadastro.');
  //             console.log("error: erro")
  //           }
  //         }
  //       };
  //       //ENVIAR DADOS VIA AJAX
  //       $('#form_pesquisa').ajaxSubmit(options);
  //     }//END IF
  //   return false;
  // });


//---------------------------------------------------------------------------------------------------------------------------

  //MODO EDIÇAO ----------------------------------------------------------
  if(perguntas.length > 0){

    $.each(perguntas, function(key, value){

      adiciona_pergunta();
      $('div#div_pergunta_'+key).find('input#pergunta_id').val(value['perguntaId']);
      $('div#div_pergunta_'+key).find('input#pergunta_status').val(value['perguntaStatus']);
      $('div#div_pergunta_'+key).find('input#pergunta_titulo').val(value['perguntaTitulo']);
      $('div#div_pergunta_'+key).find('input#pergunta_texto_ajuda').val(value['perguntaTextoAjuda']);
      $('div#div_pergunta_'+key).find('select#pergunta_tipo_opcao').val(value['perguntaTipoOpcao']);
      $('div#div_pergunta_'+key).find('input#pergunta_redireciona').prop('checked', (value['perguntaRedireciona'] == 0 ? false : true));
      $('div#div_pergunta_'+key).find('input#pergunta_obrigatoria').prop('checked', (value['perguntaObrigatoria'] == 0 ? false : true));
      var perg_tp_op = $('div#div_pergunta_'+key).find('select#pergunta_tipo_opcao');

      carrega_opcao(perg_tp_op);

      if(value['perguntaTipoOpcao'] == 1 ||  value['perguntaTipoOpcao'] == 2){

        $('div#div_pergunta_'+key).find('input#'+key+'_op_id').val(value['opcoes']['opcaoId']);

      }else if(value['perguntaTipoOpcao'] == 3){

        $.each(value['opcoes'], function(kOp, vOp){
          $('div#div_pergunta_'+key).find('input#'+key+'_op_id:last').val(vOp['opcaoId']);
          $('div#div_pergunta_'+key).find('input#'+key+'_op_multipla_escolha:last').val(vOp['opcaoResposta']);
          var btn_add_op = $('div#div_pergunta_'+key).find('button#add_opcao');
          if(kOp < (value['opcoes'].length - 1)){
            adiciona_opcao(btn_add_op);
          }
        });

      }else if(value['perguntaTipoOpcao'] == 4){

        $.each(value['opcoes'], function(kOp, vOp){
          $('div#div_pergunta_'+key).find('input#'+key+'_op_id:last').val(vOp['opcaoId']);
          $('div#div_pergunta_'+key).find('input#'+key+'_op_caixa_selecao:last').val(vOp['opcaoResposta']);
          var btn_add_op = $('div#div_pergunta_'+key).find('button#add_opcao');
          if(kOp < (value['opcoes'].length - 1)){
            adiciona_opcao(btn_add_op);
          }
        });

      }else if(value['perguntaTipoOpcao'] == 5){

        $.each(value['opcoes'], function(kOp, vOp){
          $('div#div_pergunta_'+key).find('input#'+key+'_op_id:last').val(vOp['opcaoId']);
          $('div#div_pergunta_'+key).find('input#'+key+'_op_lista:last').val(vOp['opcaoResposta']);
          var btn_add_op = $('div#div_pergunta_'+key).find('button#add_opcao');
          if(kOp < (value['opcoes'].length - 1)){
            adiciona_opcao(btn_add_op);
          }
        });

      }else if(value['perguntaTipoOpcao'] == 6){

        var op_aux = value['opcoes'][0]['opcaoResposta'];
        $('div#div_pergunta_'+key).find('select#'+key+'_op_escala_numero_ini option[value="'+op_aux+'"]').prop('selected', 'selected');
        op_aux = value['opcoes'].length - 1;
        $('div#div_pergunta_'+key).find('select#'+key+'_op_escala_numero_fim option[value="'+op_aux+'"]').prop('selected', 'selected');

      }else if(value['perguntaTipoOpcao'] == 9){

        $.each(value['gradeLinhas'], function(kOp, vOp){
          var op_div_row = kOp <= 0 ? 'first' : 'last';
          $('div#div_pergunta_'+key).find('div#div_op_grade_linha').find('input#'+key+'_op_id:'+op_div_row).val(vOp['gradeLinhaId']);
          $('div#div_pergunta_'+key).find('div#div_op_grade_linha').find('input#'+key+'_op_grade_linha:'+op_div_row).val(vOp['gradeLinhaTitulo']);
          var btn_add_op = $('div#div_pergunta_'+key).find('button#add_opcao:first');
          if(kOp < (value['gradeLinhas'].length - 1) && kOp >= 1){
            adiciona_opcao(btn_add_op);
          }
        });

        $.each(value['opcoes'], function(kOp, vOp){
          var op_div_row = kOp <= 0 ? 'first' : 'last';
          // $('div#div_pergunta_'+key).find('div:last').find('input#'+key+'_op_id:last').val(vOp['opcaoId']);
          $('div#div_pergunta_'+key).find('div#div_op_grade_coluna').find('input#'+key+'_op_grade_coluna:'+op_div_row).val(vOp['opcaoResposta']);
          var btn_add_op = $('div#div_pergunta_'+key).find('button#add_opcao:last');
          if(kOp < (value['opcoes'].length - 1) && kOp >= 1){
            adiciona_opcao(btn_add_op);
          }
        });

      } 

    });

  }else{

    var count_p = ($('div#div_perguntas').find("div.div_pergunta").size());
    if(count_p == 0){
      $('button#add_pergunta').click();
    }

  }

//---------------------------------------------------------------------------------------------------------------------------
  //carrega primeira pergunta no formulário ----------------------------------------------------------

  //onError --------------------------------------------------------------------------------------
  function onError(args) {
    //console.log( 'onError: ' + args );
    $.each(args, function(key, value){
      console.log(key +' - '+ value);
    });
    console.log("Error: "+args);
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
