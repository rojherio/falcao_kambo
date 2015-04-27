<?
//session_start90;

include_once('conf/config.php');
include_once "../../utils/funcoes.php";

$oConexao = Conexao::getInstance();

$idempresa                           = isset( $_POST['idempresa'] ) ? ( $_POST['idempresa'] != '' ? $_POST['idempresa'] : 0 ) : 0;
$empresa_cnpj                        = strip_tags($_POST['empresa_cnpj']);
$razao_social                        = strip_tags($_POST['razao_social']);
$inscricao_estadual                  = strip_tags($_POST['inscricao_estadual']);
$nome_fantasia                       = strip_tags($_POST['nome_fantasia']);
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

$foto                               = ''; //VAZIO
$pasta                              = "upload/empresa/";

try {

  $oConexao->beginTransaction();

  if($idempresa != 0){//inicio if alterar
/*
        // VERIFICO SE EXISTE O CAMPO DE FOTO, CASO EXISTA ELE FAZ O UPLOAD DA IMAGEM E FAZ A INSERCAO NO BANNCO
    if(isset($_FILES["empresa_logo"])){
      //VERIFICAR A FOTO E UPLOAD
      $foto_arq           = $_FILES["empresa_logo"];
      if ($_FILES["empresa_logo"]["error"] > 0){
        //MENSAGEM DE ERROR DE UPLOAD
        $msg['msg']         = 'upload';
        $msg['error'] = 'Error ao tentar fazer o upload da imagem, tente novamento mais tarde, erro: '.$foto_arq["error"];
        echo json_encode($msg);
        die();
      }else{
        //VERIFICA SE É UMA IMAGEM
        if(!preg_match("/^image\/(pjpeg|jpeg|png)$/", $foto_arq["type"])){
          //MENSAGEM DE ERROR DE UPLOAD
          $msg['msg']         = 'upload';
          $msg['error'] = 'Por favor, selecione um arquivo de formato válido ou verifique o tamanho de arquivo, tamanho máximo de 2MB';
          echo json_encode($msg);
          die();
        }else{
          // Pega extensão da imagem
          preg_match("/\.(png|jpg|jpeg){1}$/i", $foto_arq["name"], $ext_arq);
          // Gera um nome único para a imagem
          $foto = md5(uniqid(time())).".".$ext_arq[1];
          //Move arquivo para a pasta informada
          move_uploaded_file($foto_arq["tmp_name"],$pasta.$foto);
        }
      }
    }*/

    $stmt = $oConexao->prepare("UPDATE ava_proprietario SET cnpj = ?, razaosocial = ?, inscricaoestadual = ?, nomefantasia = ?, email = ?, telefone = ?, celular = ?, sms = ?, nomeresponsavel = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, idestado = ?, idpais = ? WHERE id = ?");
    $stmt->bindValue(1, $empresa_cnpj);
    $stmt->bindValue(2, $razao_social);
    $stmt->bindValue(3, $inscricao_estadual);
    $stmt->bindValue(4, $nome_fantasia);
    //$stmt->bindValue(5, $foto);
    $stmt->bindValue(5, $empresa_email);
    $stmt->bindValue(6, $empresa_telefone);
    $stmt->bindValue(7, $empresa_celular);
    $stmt->bindValue(8, $empresa_sms);
    $stmt->bindValue(9, $nome_responsavel);
    $stmt->bindValue(10, $empresa_cep);
    $stmt->bindValue(11, $empresa_logradouro);
    $stmt->bindValue(12, $empresa_numero);
    $stmt->bindValue(13, $empresa_complemento);
    $stmt->bindValue(14, $empresa_bairro);
    $stmt->bindValue(15, $empresa_cidade);
    $stmt->bindValue(16, $empresa_estado);
    $stmt->bindValue(17, $empresa_pais);
    $stmt->bindValue(18, $idempresa);

    $stmt->execute();

    $oConexao->commit();

    //Mensagem de Sucesso
    $msg['msg'] = 'success';
    $msg['idempresa'] = $idempresa;

    echo json_encode($msg);
    exit();

  } else {// inicio salvar
/*
    // VERIFICO SE EXISTE O CAMPO DE FOTO, CASO EXISTA ELE FAZ O UPLOAD DA IMAGEM E FAZ A INSERCAO NO BANNCO
    if(isset($_FILES["empresa_logo"])){
      //VERIFICAR A FOTO E UPLOAD
      $foto_arq           = $_FILES["empresa_logo"];
      if ($_FILES["empresa_logo"]["error"] > 0){
        //MENSAGEM DE ERROR DE UPLOAD
        $msg['msg']         = 'upload';
        $msg['error'] = 'Error ao tentar fazer o upload da imagem, tente novamento mais tarde, erro: '.$foto_arq["error"];
        echo json_encode($msg);
        die();
      }else{
        //VERIFICA SE É UMA IMAGEM
        if(!preg_match("/^image\/(pjpeg|jpeg|png)$/", $foto_arq["type"])){
          //MENSAGEM DE ERROR DE UPLOAD
          $msg['msg']         = 'upload';
          $msg['error'] = 'Por favor, selecione um arquivo de formato válido ou verifique o tamanho de arquivo, tamanho máximo de 2MB';
          echo json_encode($msg);
          die();
        }else{
          // Pega extensão da imagem
          preg_match("/\.(png|jpg|jpeg){1}$/i", $foto_arq["name"], $ext_arq);
          // Gera um nome único para a imagem
          $foto = md5(uniqid(time())).".".$ext_arq[1];
          //Move arquivo para a pasta informada
          move_uploaded_file($foto_arq["tmp_name"],$pasta.$foto);
        }
      }
    }
*/
    $stmt = $oConexao->prepare("INSERT INTO ava_proprietario(cnpj, razaosocial, inscricaoestadual, nomefantasia, email, telefone, celular, sms, nomeresponsavel, datacadastro, cep, logradouro, numero, complemento, bairro, cidade, idestado, idpais, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?, ?, ?, ?, ?, ?, ?, ?, 1);");
    $stmt->bindValue(1, $empresa_cnpj);
    $stmt->bindValue(2, $razao_social);
    $stmt->bindValue(3, $inscricao_estadual);
    $stmt->bindValue(4, $nome_fantasia);
    //$stmt->bindValue(5, $foto);
    $stmt->bindValue(5, $empresa_email);
    $stmt->bindValue(6, $empresa_telefone);
    $stmt->bindValue(7, $empresa_celular);
    $stmt->bindValue(8, $empresa_sms);
    $stmt->bindValue(9, $nome_responsavel);
    $stmt->bindValue(10, $empresa_cep);
    $stmt->bindValue(11, $empresa_logradouro);
    $stmt->bindValue(12, $empresa_numero);
    $stmt->bindValue(13, $empresa_complemento);
    $stmt->bindValue(14, $empresa_bairro);
    $stmt->bindValue(15, $empresa_cidade);
    $stmt->bindValue(16, $empresa_estado);
    $stmt->bindValue(17, $empresa_pais);
    $stmt->execute();
    //recupera o ultimo id inserido
    $idEmpresaNew = $oConexao->lastInsertId('id');

    $oConexao->commit();

    $msg['msg'] = 'success';
    $msg['idempresa'] = $idEmpresaNew;
    echo json_encode($msg);
    exit();
  }//fim if salvar
} catch (PDOException $e){
  $oConexao->rollback();
  //mensagem erro
  $msg['msg'] = 'error';
  $msg['error'] = $e->getMessage();
  echo json_encode($msg);
  exit();
}
?>
