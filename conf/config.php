<?php

//DEFINIR TIMEZONE PADRÃO
date_default_timezone_set("Brazil/East");

//OCULTAR OS WARNING DO PHP
//error_reporting(E_ALL ^ E_WARNING);
//ini_set("display_errors", 0 );

// DEFININDO OS DADOS DE ACESSO AO BANCO DE DADOS
define("DB",'mysql');
define("DB_HOST","localhost");
define("DB_NAME","avaliacao");
define("DB_USER","root");
define("DB_PASS","root");

//Producao
// define("DB_PASS","S41@s1stem4s");

//Desenvolvimento 
// CONFIGURACOES PADRAO DO SISTEMA
define("PORTAL_URL", 'http://localhost/avaliacao/');
define("TITULOSISTEMA", 'SPECIALITES :: Clínica Odontológica');
define("FAVICONSISTEMA", 'http://localhost/avaliacao/upload/favicon.png');
define("LOGO_DASHBOARD", 'http://localhost/avaliacao/tema/img/logo-gestor-de-cargos.svg');
define("CSS_FOLDER", 'http://localhost/avaliacao/tema/css/');
define("JS_FOLDER", 'http://localhost/avaliacao/tema/js/');
define("UTILS_FOLDER", 'http://localhost/avaliacao/tema/utils/');
define("ASSETS", 'http://localhost/avaliacao/tema/assets/');

//CONFIGURACAO DE ENVIO DE E-MAIL
define ('EMAIL_NOME', 'KAMBO');
define ('EMAIL_ENDERECO','@.com.br');
define ('URL_ENDERECO','http://.gov.br');
define ('EMAIL_TITULO','Notificação - KAMBO');
define ('EMAIL_DESENVOLVIMENTO', nl2br('Kambo Tecnologia e Sistemas LTDA'));

// ADICIONAR CLASSE DE CONECAO
include_once("Conexao.class.php");

?>
