<?

include_once('conf/config.php');

$conn = Conexao::getInstance();

$id = !isset($_POST['id']) && isset($_GET['id']) ? $_GET['id'] : $_POST['id'];
$param = Url::getURL(3);
$param = $param == '' && $id != '' ? $id : $param;

if($param != null || $param != '' || $param != NULL){

  $id = $param;
  //consulta do resultado do proprietário
  $result = $conn->prepare("SELECT id, cnpj, razaosocial, inscricaoestadual, nomefantasia, logo, email, telefone, celular, sms, nomeresponsavel, date_format(datacadastro, '%d/%m/%Y %h:%i') as datacadastro, cep, logradouro, numero, complemento, bairro, cidade, idestado, idpais
                            FROM ava_proprietario
                            WHERE id = ?");
  $result-> bindValue(1, $id);
  $result->execute();
  $dados = $result->fetch(PDO::FETCH_ASSOC);

  $idempresa                           = $dados['id'];
  $empresa_cnpj                        = $dados['cnpj'];
  $razao_social                        = $dados['razaosocial'];
  $inscricao_estadual                  = $dados['inscricaoestadual'];
  $nome_fantasia                       = $dados['nomefantasia'];
  $empresa_logo                        = $dados['logo'];
  $empresa_email                       = $dados['email'];
  $empresa_telefone                    = $dados['telefone'];
  $empresa_celular                     = $dados['celular'];
  $empresa_sms                         = $dados['sms'];
  $nome_responsavel                    = $dados['nomeresponsavel'];
  $empresa_datacadastro                = $dados['datacadastro'];
  $empresa_cep                         = $dados['cep'];
  $empresa_logradouro                  = $dados['logradouro'];
  $empresa_complemento                 = $dados['complemento'];
  $empresa_numero                      = $dados['numero'];
  $empresa_bairro                      = $dados['bairro'];
  $empresa_cidade                      = $dados['cidade'];
  $empresa_estado                      = $dados['idestado'];
  $empresa_pais                        = $dados['idpais'];

   $result = $oConexao->prepare("SELECT id, nome, uf
                                FROM estado
                                WHERE id = ?");
  $result->bindValue(1, $empresa_estado);
  $result->execute();
  $row = $result->fetch(PDO::FETCH_ASSOC);
  $empresa_estado = $row['nome'].'/'.$row['uf'];

  $result = $oConexao->prepare("SELECT idpais, nome
                                FROM pais
                                WHERE idpais = ?");
  $result->bindValue(1, $empresa_pais);
  $result->execute();
  $row = $result->fetch(PDO::FETCH_ASSOC);
  $empresa_pais = $row['nome'];

}
?>

<div class="modal-content">
  <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      <h3 class="modal-title">Empresa</h3>
  </div>
  <div class="modal-body">

      <fieldset class="clear">
      <div class="section">Informações básicas</div>
          <div class="row">
            <div class="col-sm-12 controls">
              Razão Social: <span class="help-text"><?=$razao_social != '' ? $razao_social : '-'?></span>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 controls">
              Nome Fantasia: <span class="help-text"><?=$nome_fantasia != '' ? $nome_fantasia : '-'?></span>
            </div>
          </div><!-- END -->

          <div class="row">
            <div class="col-sm-6 controls">
              Inscrição Estadual: <span class="help-text"><?=$inscricao_estadual != '' ? $inscricao_estadual : '-'?></span>
            </div>

            <div class="col-sm-6 controls">
              CNPJ: <span class="help-text"><?=$empresa_cnpj != '' ? $empresa_cnpj : '-'?></span>
            </div>
          </div>
      </fieldset><!-- END FIELDSET -->

      <fieldset class="clear">
      <div class="section">Contato</div>
          <div class="row">
            <div class="col-sm-12 controls">
              Nome do Responsável: <span class="help-text"><?=$nome_responsavel != '' ? $nome_responsavel : '-'?></span>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6 controls">
              Celular: <span class="help-text"><?=$empresa_celular?></span>
            </div>
            <div class="col-sm-6 controls">
              Gostaria de receber SMS? <span class="help-text"><?=$empresa_sms == '1' ? 'Sim' : 'Não'?></span>
            </div>
          </div><!-- END -->

          <div class="row">
            <div class="col-sm-12 controls">
              Telefone: <span class="help-text"><?=$empresa_telefone != '' ? $empresa_telefone : '-'?></span>
            </div>
          </div><!-- END-->

          <div class="row">
            <div class="col-sm-12 controls">
              Email: <span class="help-text"><?=$empresa_email != '' ? $empresa_email : '-'?></span>
            </div>
          </div><!-- END-->
      </fieldset><!-- END FIELDSET -->

      <?php if( $empresa_cep != '' || $empresa_logradouro != '' ){ ?>
      <fieldset class="clear">
        <div class="section">Endereço</div>
          <div class="row">
            <div class="col-sm-12 controls">
              CEP: <span class="help-text"><?=$empresa_cep != '' ? $empresa_cep : '-'?></span>
            </div>
          </div><!-- END -->

          <div class="row">
            <div class="col-sm-6 controls">
              Logradouro: <span class="help-text"><?=$empresa_logradouro != '' ? $empresa_logradouro : '-'?></span>
            </div>
            <div class="col-sm-6 controls">
              Complemento: <span class="help-text"><?=$empresa_complemento != '' ? $empresa_complemento : '-'?></span>
            </div>
          </div><!-- END-->

          <div class="row">
            <div class="col-sm-6 controls">
              Número: <span class="help-text"><?=$empresa_numero != '' ? $empresa_numero : '-'?></span>
            </div>
            <div class="col-sm-6 controls">
              Bairro: <span class="help-text"><?=$empresa_bairro != '' ? $empresa_bairro : '-'?></span>
            </div>
          </div><!-- END-->

          <div class="row">
            <div class="col-sm-6 controls">
              Cidade: <span class="help-text"><?=$empresa_cidade != '' ? $empresa_cidade : '-'?></span>
            </div>
            <div class="col-sm-6 controls">
              Estado: <span class="help-text"><?=$empresa_estado != '' ? $empresa_estado : '-'?></span>
            </div>
          </div><!-- END-->

          <div class="row">
            <div class="col-sm-12 controls">
              Pais: <span class="help-text"><?=$empresa_pais != '' ? $empresa_pais : '-'?></span>
            </div>
          </div><!-- END -->
      </fieldset><!-- END FIELDSET -->
    <?php } ?>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
  </div>
</div>
