$(document).ready(function () {

  //mascaras
  $('#empresa_cnpj').inputmask("99.999.999/9999-99");
  $('#empresa_celular').inputmask("(99)9999-9999[9]");
  $('#empresa_telefone').inputmask("(99)9999-9999[9]");
  $('#empresa_cep').inputmask("99999-999");

  $("#createform").validate({
    rules: {
      empresa_cnpj: {required: true},
      razao_social: {required: true, minlength: 5}
    },
    messages: {
      empresa_cnpj: {required: "O CNPJ é obrigatório"},
      razao_social: {required: "A razão social é obrigatória", minlength:"Informe no mínimo 5 caracteres" }
    },
    //função para enviar após a validação
    submitHandler: function(form){

      $('#return-feedback').hide();
      $('#msg-feedback').html('');
      $('.preload-submit').show();
      projetouniversal.util.getjson({
        url: PORTAL_URL+"php/proprietario/salvar-proprietario",
        data: $(form).serialize(),
        success: onSuccessSend,
        error: onError
      });
      function onSuccessSend(obj){
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
              }
            break;
          }
        }//end function
        return false;
      }
  });

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
