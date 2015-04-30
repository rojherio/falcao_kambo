<?
//session_start();

//INCLUDE TEMPLATE
include_once('conf/config.php');
include('template/header.php');

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
 // $empresa_logo                        = $dados['logo'];
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
} else {
  $idempresa                           = '';
  $empresa_cnpj                        = '';
  $razao_social                        = '';
  $inscricao_estadual                  = '';
  $nome_fantasia                       = '';
  //$empresa_logo                        = '';
  $empresa_email                       = '';
  $empresa_telefone                    = '';
  $empresa_celular                     = '';
  $empresa_sms                         = '';
  $nome_responsavel                    = '';
  $empresa_datacadastro                = '';
  $empresa_cep                         = '';
  $empresa_logradouro                  = '';
  $empresa_complemento                 = '';
  $empresa_numero                      = '';
  $empresa_bairro                      = '';
  $empresa_cidade                      = '';
  $empresa_estado                      = '';
  $empresa_pais                        = '';
}
?>

<div class="form-content" id="container-dashboard">
  <div class="main-formulario">
    <h4>Adicionar empresa</h4>
    <h5>
      <a href="<?=PORTAL_URL?>view/proprietario/index">« voltar à lista</a>
      <?=$empresa_datacadastro != '' ? '<br><i>Empresa cadastrada em '.$empresa_datacadastro.'</i>' : ''?>
    </h5>
  </div>

  <div id="return-feedback" class="alert display-n">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <div id="msg-feedback"></div>
  </div>

  <form id="createform" name="createform" class="form-horizontal" method="post" action="" enctype="multipart/form-data">

    <input type="hidden" id="idempresa" name="idempresa" value="<?=$idempresa?>"/>

    <fieldset>
      <div>Informações básicas</div>

      <div>
        <label for="razao_social">Razão Social *</label>
        <div>
          <input type="text" placeholder="Informe a razão social" id="razao_social" name="razao_social" maxlength="80" tabindex="1" value="<?=$razao_social?>">
        </div>
      </div>

      <div>
        <label for="nome_fantasia">Nome Fantasia</label>
        <div>
          <input type="text" placeholder="Informe a nome fantasia" id="nome_fantasia" name="nome_fantasia" maxlength="80" tabindex="2" value="<?=$nome_fantasia?>">
        </div>
      </div>

      <div>
        <label for="empresa_cnpj">CNPJ *</label>
        <div>
          <input type="text" placeholder="Informe o CNPJ" id="empresa_cnpj" name="empresa_cnpj" tabindex="3" value="<?=$empresa_cnpj?>">
        </div>
      </div>

      <div>
        <label for="inscricao_estadual">Inscrição Estadual</label>
        <div>
          <input type="text" placeholder="Informe a inscrição estadual" id="inscricao_estadual" name="inscricao_estadual" tabindex="4" value="<?=$inscricao_estadual?>">
        </div>
      </div>

      <div>
        <label for="empresa_logo">Foto</label>
        <div>
          <input type="file" id="empresa_logo" name="empresa_logo" class="fileArquivo" tabindex="5">
          <p class="help-block">Arquivos válidos: (.jpg, .jpeg, .png)</p>
        </div>
      </div><!-- END INPUT -->

    </fieldset>

    <fieldset>
      <div>Contato</div>

      <div>
        <label for="nome_responsavel">Nome do Responsável *</label>
        <div>
          <input type="text" placeholder="Informe o nome do responsável" id="nome_responsavel" name="nome_responsavel" maxlength="80" tabindex="6" value="<?=$nome_responsavel?>">
        </div>
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_celular">Celular *</label>
        <div>
          <input type="text" pattern="[0-9]{10}" placeholder="Informe o celular" id="empresa_celular" name="empresa_celular" tabindex="7" value="<?=$empresa_celular?>">
        </div>

        <label for="empresa_sms"><input type="checkbox" id="empresa_sms" name="empresa_sms" tabindex="8" value="1" <?=$empresa_sms == '1' || $empresa_sms == '' ? 'checked="true"' : '' ?> > Receber SMS</label>
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_telefone">Telefone</label>
        <div>
          <input type="text" pattern="[0-9]{10}" placeholder="Informe o telefone" id="empresa_telefone" name="empresa_telefone" tabindex="9" value="<?=$empresa_telefone?>">
        </div>
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_email">E-mail</label>
        <div>
          <input type="text" placeholder="Informe o e-mail" id="empresa_email" name="empresa_email" maxlength="100" tabindex="10" value="<?=$empresa_email?>">
        </div>
      </div>
    </fieldset><!-- END FIELDSET -->

    <fieldset>
      <div>Endereço</div>

      <div>
        <label for="empresa_cep">CEP</label>
        <div>
          <input type="text" placeholder="Informe o CEP" id="empresa_cep" name="empresa_cep" tabindex="11" value="<?=$empresa_cep?>">
        </div>
        <img id="preload-cep" class="display-n" src="<?=PORTAL_URL?>imagens/ajax.gif">
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_logradouro">Logradouro</label>
        <div>
          <input type="text" placeholder="Informe o logradouro" id="empresa_logradouro" name="empresa_logradouro" tabindex="12" value="<?=$empresa_logradouro?>">
        </div>

        <label for="empresa_complemento">Complemento</label>
        <div>
          <input type="text" placeholder="Informe o complemento" id="empresa_complemento" name="empresa_complemento" maxlength="40" tabindex="13" value="<?=$empresa_complemento?>">
        </div>
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_numero">Número</label>
        <div>
          <input type="text" placeholder="Informe o número" id="empresa_numero" name="empresa_numero" maxlength="11" tabindex="14" value="<?=$empresa_numero?>">
        </div>

        <label for="empresa_bairro">Bairro</label>
        <div>
          <input type="text" placeholder="Informe o bairro" id="empresa_bairro" name="empresa_bairro" tabindex="15" value="<?=$empresa_bairro?>">
        </div>
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_cidade">Cidade</label>
        <div>
          <input type="text" placeholder="Informe a cidade" id="empresa_cidade" name="empresa_cidade" maxlength="60" tabindex="16" value="<?=$empresa_cidade?>">
        </div>

        <label for="empresa_estado">Estado</label>
        <div>
          <select id="empresa_estado" class="selectpicker" name="empresa_estado" tabindex="17">
            <option value=""></option>
            <? $result = $oConexao->prepare("SELECT id, nome, uf FROM estado"); $result->execute();
            while( $dados = $result->fetch(PDO::FETCH_ASSOC) ){?>
              <option value="<?=$dados['id']?>" rel="<?=$dados['uf']?>" <?=$empresa_estado == $dados['id'] ? 'selected="true"' : '' ?> ><?=utf8_encode($dados['nome'])?></option>
            <? } ?>
          </select>
        </div>
      </div><!-- END INPUT -->

      <div>
        <label for="empresa_pais">País</label>
        <div>
          <select id="empresa_pais" class="selectpicker" name="empresa_pais" tabindex="19">
            <option value=""></option>
            <? $result = $oConexao->prepare("SELECT idpais, nome FROM pais"); $result->execute();
            while( $dados = $result->fetch(PDO::FETCH_ASSOC) ){?>
              <option value="<?=$dados['idpais']?>" <?=$empresa_pais == $dados['idpais'] ? 'selected="true"' : '' ?> ><?=utf8_encode($dados['nome'])?></option>
            <? } ?>
          </select>
        </div>
      </div><!-- END INPUT -->

    </fieldset><!-- END FIELDSET -->

    <fieldset>
        <button id="enviarformulario" type="submit" value="_save">Salvar</button>
        <button id="enviareditar" type="submit" value="_continue">Salvar e continuar editando</button>
        <button id="enviaradicionar" type="submit" value="_addanother">Salvar e adicionar outro</button>
        <?if( $idempresa != '' || $idempresa != NULL ){ ?>
          <button id="deletaritem" type="button" value="_delete"><i class="glyphicon glyphicon-trash"></i> Excluir</button>
        <? } ?>
        <img class="preload-submit display-n" src="<?=PORTAL_URL?>imagens/load.gif">
    </fieldset><!-- END FIELDSET -->
  </form>
</div>

<!-- INCLUDE JAVASCRIPT -->
<script src="<?=PORTAL_URL?>ajax/proprietario/formulario.js"></script>
<?include('template/footer.php');?>
