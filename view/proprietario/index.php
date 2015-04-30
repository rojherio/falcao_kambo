<?
//session_start();

//INCLUDE TEMPLATE
include_once('conf/config.php');
include('template/header.php');

?>
<div>

  <?if(isset($_POST['type'])){
    $alert_type = $_POST['type'] == 'success' ? 'alert-success' : 'alert-danger';
    $alert_icon = $_POST['type'] == 'success' ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
  ?>
  <div><!-- FEEDBACK MESSAGE -->
    <div id="return-feedback" class="alert <?=$alert_type?>">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      <div id="msg-feedback"><?=$alert_icon?>  <?=$_POST['feedback']?> <?=$_POST['error']?></div>
    </div>
  </div>
  <? } ?>

  <aside>
    <h2>Empresas</h2>
    <p>Buca por:</p>
    <form id="filtro" name="filtrolista" method="post" action="" enctype="multipart/form-data">
      <div>
        <select name="filtrotipo">
          <option value="cnpj" <?=isset($_REQUEST['filtrotipo']) && $_REQUEST['filtrotipo'] == 'cnpj' ? "select='true'" : ''?> >CNPJ</option>
          <option value="razaosocial" <?=isset($_REQUEST['filtrotipo']) && $_REQUEST['filtrotipo'] == 'razaosocial' ? "select='true'" : ''?>>Razão Social</option>
        </select>
      </div>
      <div>
        <input name="filtrocampo" id="filtrocampo" type="text" placeholder="Busca" value="<?=isset($_REQUEST['filtrocampo']) ? $_REQUEST['filtrocampo'] : ''; ?>">
        <button type="submit" name="filtrobusca" id="filtrobusca" ><i class="glyphicon glyphicon-search"></i></button>
      </div>
    </form>
  </aside>

  <div> <!-- BEGIN PANEL -->
    <div class="row options">
      <div id="check" class="pull-left">
          <!-- Single button -->
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <i class="glyphicon glyphicon-cog"></i> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li id="rmv-li-slc" class="disabled"><a id="rmv-item-slc" href="#">Remover selecionados</a></li>
              <li><a id="filtro-item-status" rel="1" href="#">Ativos</a></li>
              <li><a id="filtro-item-status" rel="0" href="#">Inativos</a></li>
              <li><a id="filtro-item-todos" href="#">Todos</a></li>
            </ul>
          </div>
      </div>
      <div id="actions" class="list-commands pull-right">
          <a href="<?=PORTAL_URL?>view/proprietario/formulario" class="btn btn-success btn-sm pull-right"><i class="glyphicon glyphicon-plus"></i> Adicionar</a>
      </div>
    </div><!-- END ACTIONS -->

    <div>
      <form id="form-table" method="post" action="" enctype="multipart/form-data">
        <div>
          <table id="tabela-lista-dados">
            <thead>
              <tr>
                <th width="1%" scope="col">
                  <input type="checkbox" name="marcatodos" id="marcatodos" value="all">
                </th>
                <th width="1%" scope="col">#</th>
                <th width="29%" scope="col">Razão Social</th>
                <th width="17%" scope="col">Nome Fantasia</th>
                <th width="13%" scope="col">CNPJ</th>
                <th width="15%" scope="col">Responsável</th>
                <th width="15%" scope="col">E-mail</th>
                <th width="5%" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <?
                //dados da consulta
                $sql = "SELECT id, razaosocial, nomefantasia, cnpj, nomeresponsavel, email FROM ava_proprietario";
                $dadosPesquisa .= isset($_REQUEST['filtrocampo']) && $_REQUEST['filtrocampo'] != '' && $_REQUEST['filtrotipo'] == 'razaosocial' ? " WHERE UPPER(razaosocial) LIKE '%" . strtoupper($_REQUEST['filtrocampo']) . "%'" : '';
                $dadosPesquisa .= isset($_REQUEST['filtrocampo']) && $_REQUEST['filtrocampo'] != '' && $_REQUEST['filtrotipo'] == 'cnpj' ? " WHERE cnpj LIKE '%" . strtoupper($_REQUEST['filtrocampo']) . "%'" : '';
                $dadosPesquisa .= isset($_REQUEST['filtrocampo']) && $_REQUEST['filtrocampo'] != '' && $_REQUEST['filtrotipo'] == 'status' ? " WHERE status = " . $_REQUEST['filtrocampo'] . "" : '';
                if(isset($_REQUEST['filtrocampo']) && $_REQUEST['filtrocampo'] != '' && $_REQUEST['filtrotipo'] == 'todos'){
                  $dadosPesquisa .= '';
                }
                $orderby = " ORDER BY razaosocial ASC";

                //total de paginaçao
                $total = 10;
                $paginacao = isset( $_GET['paginacao'] ) ? $_GET['paginacao'] : 1;
                $inicio = ( $paginacao - 1 ) * $total;
                $limite = " LIMIT $inicio, $total";

                //PEGAR O DADOS DE ACORDO COM A CONSULTA NO BANCO DE DADOS
                $resultado = $oConexao->query($sql.$dadosPesquisa.$orderby.$limite);

                //PEGAR O TOTAL DE DADOS NA TABELA
                $totalresultado = $oConexao->query($sql.$dadosPesquisa)->rowCount();

                //CALCULAR O TOTAL DE PAGINAS
                $totaldepaginas = ceil( $totalresultado / $total );

                // Calcula os intervalos iniciais e finais
                // para saber quais registros vamos mostrar
                $fim = $total * $paginacao;
                $inicio = ($fim - $total);

                //CONTAGEM DE DADOS
                $contador = 0;

                if($totalresultado <= 0 || $totalresultado == NULL){?>
                  <tr><td colspan="8">Nenhum registro encontrado.</td></tr>
                <?} else {
                  $contador = $inicio;
                  while ($row = $resultado->fetch(PDO::FETCH_ASSOC)){?>
                    <tr id="tr-id-<?=$row['id']?>">
                      <th>
                        <input type="checkbox" name="itemselecionado[]" value="<?=$row['id']?>">
                      </th>
                      <td><?=$contador+1?></td>
                      <td>
                        <a href="<?=PORTAL_URL?>view/proprietario/formulario/<?=$row['id']?>" title="editar item" rel="<?=$row['id']?>">
                          <?=$row['razaosocial']?>
                        </a>
                      </td>
                      <td><?=$row['nomefantasia']?></td>
                      <td><?=$row['cnpj'] != '' ? $row['cnpj'] : '-' ?></td>
                      <td><?=$row['nomeresponsavel']?></td>
                      <td><?=$row['email'] != '' ? $row['email'] : '-' ?></td>
                      <td>
                        <a id="detalhe-item" href="javascript:;" title="visualizar item" rel="<?=$row['id']?>"><i class="glyphicon glyphicon-zoom-in"></i></a>
                      </td>
                    </tr>
                  <?$contador++;
                  }
                }?>
            </tbody>
          </table>
        <?php if($totalresultado >= 1 || $totalresultado != NULL){ ?>
          <!-- INICIO DA PAGINACAO -->
          <ul class="pagination pagination-sm no-margin pull-right">
              <?php if ($paginacao == 1): ?>
                  <li class="disabled"><span>Primeira</span></li>
                  <li class="disabled"><span>Anterior</span></li>
              <?php else: ?>
                  <li><a href="?paginacao=1&filtrocampo=<?=$_REQUEST['filtrocampo']?>&filtrotipo=<?=$_REQUEST['filtrotipo']?>"><span>Primeira</span></a></li>
                  <li><a href="?paginacao=<?php print $paginacao-1;?>&filtrocampo=<?=$_REQUEST['filtrocampo']?>&filtrotipo=<?=$_REQUEST['filtrotipo']?>"><span>Anterior</span></a></li>
              <?php endif; ?>
              <!-- mostra até cinco páginas antes da página atual -->
              <?php foreach(array_reverse(range($paginacao-1, $paginacao-5)) as $pagina): ?>
                  <?php if ($pagina > 0): ?>
                      <li><a href="?paginacao=<?php print $pagina; ?>&filtrocampo=<?=$_REQUEST['filtrocampo']?>&filtrotipo=<?=$_REQUEST['filtrotipo']?>"><?php print $pagina; ?></a></li>
                  <?php endif; ?>
              <?php endforeach; ?>
              <!-- mostra a página atual para o usuário -->
             <li class="disabled"><span><?php print $paginacao; ?></span></li>
              <!-- mostra até cinco página após a página atual -->
              <?php foreach( range($paginacao+1, $paginacao+5) as $pagina): ?>
                  <?php if ($pagina < $totaldepaginas): ?>
                  <li><a href="?paginacao=<?php print $pagina; ?>&filtrocampo=<?=$_REQUEST['filtrocampo']?>&filtrotipo=<?=$_REQUEST['filtrotipo']?>"><?php print $pagina; ?></a></li>
                  <?php endif; ?>
              <?php endforeach; ?>
              <!-- mostra os links para a próxima página
              e para a última página da lista -->
              <?php if ($paginacao == $totaldepaginas): ?>
                  <li class="active"><span>Pr&oacute;xima</span></li>
                  <li class="active"><span>&Uacute;ltima</span></li>
              <?php else: ?>
                  <li><a href="?paginacao=<?php print $paginacao+1; ?>&filtrocampo=<?=$_REQUEST['filtrocampo']?>&filtrotipo=<?=$_REQUEST['filtrotipo']?>"><span>Pr&oacute;xima</span></a></li>
                  <li><a href="?paginacao=<?php print $totaldepaginas;?>&filtrocampo=<?=$_REQUEST['filtrocampo']?>&filtrotipo=<?=$_REQUEST['filtrotipo']?>"><span>&Uacute;ltima</span></a></li>
              <?php endif; ?>
          </ul>
          <!-- FIM DA PAGINACAO -->
          <div class="pull-left text-pagination">
            <?php echo "Mostrando $paginacao de $totaldepaginas com $totalresultado registros.";?>
          </div>
          <?php } ?>

          </div>
        </form>
    </div><!-- END LIST TABLE -->

  </div><!-- END PANEL -->

</div><!-- END CONTENT -->
<!-- INCLUDE JAVASCRIPT -->
<script src="<?=PORTAL_URL?>ajax/proprietario/lista.js"></script>

<?php  include('template/footer.php'); ?>
