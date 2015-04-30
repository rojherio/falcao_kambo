$(document).ready(function () {

  //mascaras
  $('#empresa_cnpj').inputmask("99.999.999/9999-99");
  $('#empresa_celular').inputmask("(99)9999-9999[9]");
  $('#empresa_telefone').inputmask("(99)9999-9999[9]");
  $('#empresa_cep').inputmask("99999-999");

  $("#createform").validate({
    rules: {
      empresa_cnpj: {required: true, verificaCNPJ: true},
      empresa_email: {required: true, email: true},
      razao_social: {required: true, minlength: 5}
    },
    messages: {
      empresa_cnpj: {required: "O CNPJ é obrigatório", verificaCNPJ: "Por favor digite um CNPJ válido"},
      empresa_email: {required: "O e-mail é obrigatório", email: "Por favor digite um e-mail válido"},
      razao_social: {required: "A razão social é obrigatória", minlength:"Informe no mínimo 5 caracteres"}
    },

    //função para enviar após a validação
    submitHandler: function( form ){

      $('#return-feedback').hide();
      $('#msg-feedback').html('');
      $('.preload-submit').show();

      var options = {
        data: $('#createform').serialize(),
        type: 'post',
        url: PORTAL_URL+'php/proprietario/salvar-proprietario',
        complete: function(obj){
          //converter o resultado em JSON
          obj = JSON.parse( obj.responseText );
          switch( $optionsubmit ){
            case '_save':
              /* salvar e voltar para listagem */
              if( obj.msg == 'success' ){
                $('.preload-submit').hide();
                //enviar paramentros a url de listagem com mensagem
                postToURL(PORTAL_URL+'view/proprietario/index', {id: obj.id, feedback: 'Cadastro efetuado com sucesso', type: 'success'});
              }else if( obj.msg == 'error' ){
                $('.preload-submit').hide();
                postToURL(PORTAL_URL+'view/proprietario/index', {error: obj.error, feedback: 'Ocorreu um erro ao realizar a operação', type: 'error'});
              }else if( obj.msg = 'upload'){
                $('.preload-submit').hide();
                $('#return-status').addClass('alert-danger');
                $('#return-status').html('<i class="glyphicon glyphicon-remove"></i> '+obj.error);
                $('#return-status').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }
            break;
            case '_continue':
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
                $('#msg-feedback').html('<i class="glyphicon glyphicon-remove"></i>'+obj.error+': Ocorreu um erro ao realizar a operação');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }else if( obj.msg = 'upload'){
                $('.preload-submit').hide();
                $('#return-status').addClass('alert-danger');
                $('#return-status').html('<i class="glyphicon glyphicon-remove"></i> '+obj.error);
                $('#return-status').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }
            break;
            case '_addanother':
              /* salvar e adicionar outro */
              if( obj.msg == 'success' ){
                $('.preload-submit').hide();
                $('#return-feedback').show();
                $('#return-feedback').addClass('alert-success');
                $('#msg-feedback').html('<i class="glyphicon glyphicon-ok"></i> Cadastro efetuado com sucesso');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
                $('#createform').parent().find('input:text, input:password, input:file, select, textarea').val('');
                $('#createform').parent().find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
                $('#razao_social').focus();
                $('#empresa_sms').prop("checked", true);
                $('#deletaritem').hide();
                $('#idempresa').val('');
              }else if( obj.msg == 'error' ){
                $('#return-feedback').show();
                $('#return-feedback').addClass('alert-danger');
                $('#msg-feedback').html('<i class="glyphicon glyphicon-remove"></i> Ocorreu um erro ao realizar a operação');
                $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }else if( obj.msg = 'upload'){
                $('.preload-submit').hide();
                $('#return-status').addClass('alert-danger');
                $('#return-status').html('<i class="glyphicon glyphicon-remove"></i> '+obj.error);
                $('#return-status').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
              }
            break;
          }//end switch case
        },
        error: function(response){
          $('#submit-btn').show();
          $('#submit-loading').hide();
          $('#alerta-retorno').addClass('alert-danger');
          $('#alerta-retorno').show();
          $('#mensagem-retorno').html(response.responseText);
          //LIMPAR FORMULARIO
          $('#cadastro_form').resetForm();
          $('html, body').animate({scrollTop:0}, 'slow');
        }
      };

      //ENVIAR DADOS VIA AJAX
      $('#createform').ajaxSubmit(options);

      return false;
    }

  });
  //adicionado um metodo no jquery validate para validar o CNPJ
  jQuery.validator.addMethod("verificaCNPJ", function (cnpj, element) {
    cnpj = jQuery.trim(cnpj);

    // DEIXA APENAS OS NÚMEROS
    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('-', '');

    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;

    if (cnpj.length < 14 && cnpj.length < 15) {
        return this.optional(element) || false;
    }
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }

    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return this.optional(element) || false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return this.optional(element) || false;
        }
        return this.optional(element) || true;
    } else {
        return this.optional(element) || false;
    }
  }, "Informe um CNPJ válido.");


  /* enviar e editar */
  $('button#enviarformulario').livequery( "click", function(){
    $optionsubmit = $(this).val();
  });

  /* enviar e editar */
  $('button#enviareditar').livequery( "click", function(){
    $optionsubmit = $(this).val();
  });

  /* enviar e adicionar outro */
  $('button#enviaradicionar').livequery( "click", function(){
    $optionsubmit = $(this).val();
  });

  /* deletar item */
  //deletar item selecionado
  $('button#deletaritem').livequery( "click", function(){
    bootbox.dialog({
      title: "Confirmação",
      message: "Você deseja realmente excluir a empresa selecionada?",
      buttons: {
        main: {
          label: "Não",
          className: "btn-default"
        },
        danger: {
          label: "Sim",
          className: "btn-danger",
          callback: function() {
            $('body').modalmanager('loading');
            $idempresa = $('#idempresa').val();
            if( $idempresa != '' || $idempresa != null ){
              projetouniversal.util.getjson({
                url : PORTAL_URL+"php/proprietario/deletar-proprietario",
                data : {id: $idempresa},
                success : onSuccessDelete,
                error : onError
              });
            }//end if
            function onSuccessDelete(obj){
              if( obj.msg == 'success' ){
                postToURL(PORTAL_URL+'view/proprietario/index', {feedback: 'As informações foram deletadas com sucesso', type: 'success'});
              }else if( obj.msg == 'error' ){
                postToURL(PORTAL_URL+'view/proprietario/index', {error: obj.error, feedback: '', type: 'error'});
              }
            }
          }
        }
      }
    });
    return false;
  });

  /* buscar CEP */
  $('input#empresa_cep').livequery( "blur", function(){
    var $cep = $(this).val();
    $cep = $cep.replace(/\D/g,"");
    var $url="http://cep.correiocontrol.com.br/"+$cep+".json";
    $('#preload-cep').show();
    $.getJSON( $url, function(resultado) {
      $('#empresa_logradouro').val(resultado.logradouro);
      $('#empresa_bairro').val(resultado.bairro);
      $('#empresa_cidade').val(resultado.localidade);
      $('select#empresa_estado').find('option').each(function() {
          if( $(this).attr('rel') ==  resultado.uf){
            $(this).attr('selected', true);
            $('select#empresa_estado').selectpicker('val', $(this).val());
          }
      });
      $('select#empresa_pais').selectpicker('val', '30');
      $('#preload-cep').hide();
    }).fail(function (resultado) {
      $('#preload-cep').hide();
      if( resultado.status == 0 ){
        $('#return-status').addClass('alert-danger');
        $('#return-status').html('<i class="glyphicon glyphicon-remove"></i> Houve um problema de conexão com servidor, por favor verifique sua conexão de internet');
        $('#return-status').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
      }else if( resultado.status == 200){
        $('#return-status').addClass('alert-danger');
        $('#return-status').html('<i class="glyphicon glyphicon-remove"></i> O CEP informado não está em nossa base de dados, por favor verifique');
        $('#return-status').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );
      }
    });
  });

  /* erro do envio ajax */
  function onError(args) {
    console.log( 'onError: ' + args );
  }

});
