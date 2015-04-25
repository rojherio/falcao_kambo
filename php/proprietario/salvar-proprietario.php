<?
//session_start90;

include_once "../../utils/funcoes.php";

$oConexao = Conexao::getInstance();

$idempresa                           = isset( $_POST['idempresa'] ) ? ( $_POST['idempresa'] != '' ? $_POST['idempresa'] : 0 ) : 0;
$empresa_cnpj                        = strip_tags($_POST['empresa_cnpj']);
$razao_social                        = strip_tags($_POST['razao_social']);
$inscricao_estadual                  = strip_tags($_POST['inscricao_estadual']);
$nome_fantasia                       = strip_tags($_POST['nome_fantasia']);
$empresa_logo                        = '';
$empresa_email                       = strip_tags($_POST['empresa_email']);
$empresa_telefone                    = $_POST['empresa_telefone'];
$empresa_celular                     = $_POST['empresa_celular'];
$empresa_sms                         = $_POST['empresa_sms'];
$nome_responsavel                    = strip_tags($_POST['nome_responsavel']);
$empresa_cep                         = $_POST['empresa_cep'];
$empresa_logradouro                  = $_POST['empresa_logradouro'];
$empresa_complemento                 = $_POST['empresa_complemento'];
$empresa_numero                      = $_POST['empresa_numero'];
$empresa_bairro                      = $_POST['empresa_bairro'];
$empresa_cidade                      = $_POST['empresa_cidade'];
$empresa_estado                      = $_POST['empresa_estado'];
$empresa_pais                        = $_POST['empresa_pais'];

$msg = array();
header('Content-type: application/json');

try {

  $oConexao->beginTransaction();

  if($idempresa != 0){
    $stmt = $oConexao->prepare("UPDATE proprietario SET cnpj = ?, razaosocial = ?, inscricaoestadual = ?, nomefantasia = ?, logo, email = ?, telefone = ?, celular = ?, sms = ?, nomeresponsavel = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, idestado = ?, idpais = ? WHERE id = ?");
    $stmt->bindValue(1, $paciente_nome);
    $stmt->bindValue(1, $paciente_nome);
  }
}
?>
