<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <title><?=TITULOSISTEMA?></title>

        <!-- BEGIN META -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="your,keywords">
        <meta name="description" content="Short explanation about this website">
        <!-- END META -->

        <!-- BEGIN STYLESHEETS -->
        <link href='http://fonts.googleapis.com/css?family=Roboto:300italic,400italic,300,400,500,700,900' rel='stylesheet' type='text/css'/>
        <link type="text/css" rel="stylesheet" href="<?=ASSETS?>css/theme-1/bootstrap.css?1422792965" />
        <link type="text/css" rel="stylesheet" href="<?=ASSETS?>css/theme-1/materialadmin.css?1425466319" />
        <link type="text/css" rel="stylesheet" href="<?=ASSETS?>css/theme-1/font-awesome.min.css?1422529194" />
        <link type="text/css" rel="stylesheet" href="<?=ASSETS?>css/theme-1/material-design-iconic-font.min.css?1421434286" />
        <link type="text/css" rel="stylesheet" href="<?=ASSETS?>css/theme-1/libs/rickshaw/rickshaw.css?1422792967" />
        <link type="text/css" rel="stylesheet" href="<?=ASSETS?>css/theme-1/libs/morris/morris.core.css?1420463396" />
        <link href="<?=CSS_FOLDER?>dashboard.css" rel="stylesheet">
        <!-- bootstrap datapicker -->
        <link href="<?=CSS_FOLDER?>datepicker3.css" rel="stylesheet" />
        <!-- BOOTSTRAP MODAL 2.0v -->
        <link href="<?=CSS_FOLDER?>bootstrap-modal-bs3patch.css" rel="stylesheet" />
        <link href="<?=CSS_FOLDER?>bootstrap-modal.css" rel="stylesheet" />
        <!-- bootstrap Select -->
        <link href="<?=CSS_FOLDER?>bootstrap-select.min.css" rel="stylesheet" type="text/css" />
        <!-- END STYLESHEETS -->

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script type="text/javascript" src="<?=ASSETS?>js/libs/utils/html5shiv.js?1403934957"></script>
        <script type="text/javascript" src="<?=ASSETS?>js/libs/utils/respond.min.js?1403934956"></script>
        <![endif]-->

        <!-- BEGIN JAVASCRIPT -->
        <script src="<?=ASSETS?>js/libs/jquery/jquery-1.11.2.min.js"></script>
        <script src="<?=ASSETS?>js/libs/moment/moment.min.js"></script>
        <script src="<?=JS_FOLDER?>moment-timezone.js"></script>
        <script src="<?=JS_FOLDER?>jquery.autocomplete.min.js"></script>
        <!-- END JAVASCRIPt -->


    </head>
    <body class="menubar-hoverable header-fixed ">

    <!-- BEGIN HEADER-->
    <!-- END HEADER-->


    <!-- LOADING FLUTUANTE -->
    <div class="notificacao-loading">
        <div class="ic-loading"></div>
        <div class="pull-left">Processando aguarde</div>
    </div>

    <!-- BOOTSTRAP MODAL -->
    <div id="bootstrap-modal" class="modal fade" tabindex="-1" style="display: none;"></div>

    <!-- MENSAGEM FEEDBACK STATUS -->
    <div class="alert text-center" id="return-status"></div>

    <!-- MODAL PADRÃO -->
    <div id="default-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                <div id="loading-modal" class="display-n text-center"><img src="<?=PORTAL_URL?>img/load.gif"/><br><span>processando...</span></div>
               <div id="default-modal-container" class="display-n"></div>
            </div>
            <div class="modal-footer">
              <img id="default-modal-loading" class="display-none margin-right-1em" src="<?=PORTAL_URL?>img/ajax-loader.gif" alt="" />
              <button id="default-modal-cancelar" type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
              <button id="default-modal-submit" type="button" class="btn" >Salvar</button>
            </div>
          </div>
      </div>
    </div>

    <!-- MODAL PADRÃO DE PERMISSAO -->
    <div id="default-modal-permissao" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
               <div id="default-modal-container"></div>
            </div>
            <div class="modal-footer">
              <img id="default-modal-loading" class="display-none margin-right-1em" src="<?=PORTAL_URL?>img/ajax-loader.gif" alt="" />
              <a id="default-modal-submit" href="<?=PORTAL_URL?>" class="btn btn-default">Ir ao painel</a>
              <!-- <a id="default-modal-logout" href="<?=PORTAL_URL?>logout/" class="btn btn-danger">Sair</a> -->
            </div>
          </div>
      </div>
    </div>
    <!-- AREA DE MENSAGENS PRE-DEFINIDAS -->
    <div id="acesso-negado-area" class="display-n">
        <h2 class="h2aviso text-center">O usuário logado não tem acesso a está área</h2>
        <div class="spAvisopermissao text-center">Por favor consulte o administrador do sistema para rever o seu nível de permissão</div>
    </div>

    <div id="acesso-duplicado-sistema" class="display-n">
        <h2 class="h2aviso text-center">Seu usuário está sendo utilizado em outro acesso</h2>
        <div class="spAvisopermissao text-center">Por favor consulte o administrador do sistema para gerir a duplicidade de login</div>
    </div>

    <!-- BEGIN BASE-->
    <div id="base">

        <!-- BEGIN OFFCANVAS LEFT -->
        <div class="offcanvas">
        </div><!--end .offcanvas-->
        <!-- END OFFCANVAS LEFT -->
