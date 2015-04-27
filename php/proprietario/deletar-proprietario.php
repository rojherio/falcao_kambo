<?php
session_start();

include_once('conf/config.php');
include_once "../../utils/funcoes.php";
$oConexao = Conexao::getInstance();

try{

    //executa a instrução de consulta
    $oConexao->beginTransaction();

    //APAGAR DADOS DE FORMA MULTIPLAS
    $contagem = count( isset( $_POST['itemselecionado']) );

    $pacienteNaoDeletado = 0;

    if( isset( $_POST['id'] ) ){

        $idempresa = $_POST['id'];

        $result = $oConexao->prepare("SELECT DISTINCT(proprietario_id) AS idempresa FROM ava_pesquisa WHERE proprietario_id = ?");
        $result->bindValue(1, $idempresa);
        $result->execute();
        $num = $result->rowCount();

        if ( $num <= 0 ) {
            $stmt = $oConexao->prepare("DELETE FROM ava_proprietario WHERE id = ?");
            $stmt->bindValue(1, $idempresa);
            $stmt->execute();
        }else{
            $pacienteNaoDeletado++;
        }

        //CONFIRMAR OS DELETES
        $oConexao->commit();

        if ($pacienteNaoDeletado > 0) {
            $msg['msg'] = 'error';
            $msg['error'] = 'As informações não foram deletadas, pois existe registro de agendamento à este paciente.';
        }else{
            $msg['msg'] = 'success';
        }

        echo json_encode($msg);
        die();

    }


    if( isset( $_POST['itemselecionado'] )  && $contagem > 0 ){

        foreach ( $_POST['itemselecionado'] as $item ) {

            $result = $oConexao->prepare("SELECT DISTINCT(proprietario_id) AS idempresa FROM ava_pesquisa WHERE proprietario_id = ?");
            $result->bindValue(1, $item);
            $result->execute();
            $num = $result->rowCount();

            if ( $num <= 0 ) {
                $stmt = $oConexao->prepare("DELETE FROM ava_proprietario WHERE id = ?");
                $stmt->bindValue(1, $item);
                $stmt->execute();
            }else{
                $pacienteNaoDeletado++;
            }

        }

        //CONFIRMAR OS DELETES
        $oConexao->commit();

        if ($pacienteNaoDeletado > 0) {
            $msg['msg'] = 'error';
            $msg['error'] = 'As informações não foram deletadas, pois existe registro de agendamento à este paciente.';
        }else{
            $msg['msg'] = 'success';
        }

        echo json_encode($msg);
        die();
    }

}catch (PDOException $e){
    $oConexao->rollBack();
    //mensagem de erro
    $msg['msg'] = 'error';
    $msg['error'] = $e->getMessage();
    echo json_encode($msg);
    exit();
}

?>
