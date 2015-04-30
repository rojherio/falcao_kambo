$(document).ready(function(){

  var $bootstrapmodal   = $('#bootstrap-modal');
  var $itemSelecionado  = [];

  //mostrar mensagem
  $('#return-feedback').slideDown( 300 ).delay( 5000 ).fadeOut( 800 );

  //detalhe do item
  $('a#detalhe-item').livequery( "click", function(){
    id = $(this).attr('rel');
    $('body').modalmanager('loading');
    projetouniversal.util.gethtml({
          url : PORTAL_URL+'view/proprietario/detalhe/',
          data : {id: id},
          success : onSuccessDetails,
          error : onError
        });
        function onSuccessDetails(obj){
          $bootstrapmodal.html(obj);
          $bootstrapmodal.modal();
        }
        return false;
  });

  //deletar item selecionado
  $('a#rmv-item-slc').livequery( "click", function(){
    bootbox.dialog({
      title: "Confirmação",
      message: "Você deseja realmente excluir as empresas selecionadas?",
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
            $itemSelecionadoa = [];
                $('input[name="itemselecionado[]"]').each(function() {
                    if(this.checked == true){
                      $itemSelecionado.push( $(this).val() );
                    }
                });
                projetouniversal.util.getjson({
                  url : PORTAL_URL+"php/proprietario/deletar-proprietario",
                  data : $('#form-table').serialize(),
                  success : onSuccessDelete,
                  error : onError
                });
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

  /* filtro por status */
  $('a#filtro-item-status').livequery( "click", function(){
    $filtrotipo   = 'status';
    $filtrocampo  = $(this).attr('rel');
    postToURL(PORTAL_URL+'view/proprietario/index', {filtrotipo: $filtrotipo, filtrocampo: $filtrocampo});
  });

  $('a#filtro-item-todos').livequery( "click", function(){
    $filtrotipo   = 'todos';
    $filtrocampo  = $(this).attr('rel');
    postToURL(PORTAL_URL+'view/proprietario/index', {filtrotipo: $filtrotipo, filtrocampo: $filtrocampo});
  });

  /* erro do envio ajax */
  function onError(args) {
    console.log( 'onError: ' + args );
  }

});
