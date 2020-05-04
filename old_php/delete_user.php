<?php
    include_once "../jsdb.php";
    include_once "../jsencoding.php";
    include_once "../prefix.php";
    include_once "../connection.php";

    //$connection = DatabaseClass::init($host, $username, $password, $dbname);
    $connection = DatabaseClass::init($host, $username, $password, $dbname);
    if ($connection == null){
        echo "Can not connect to database!";
        exit();
    }
    //$connection->insert($prefix.'categories', array('parentid' => 0, 'name' => "Tin tức", 'type' => ""));
    
    if (!isset($_POST['id'])){
        echo "Invalid idUser";
        exit();
    }
    $id=$_POST['id'];
    $data["id"]=$id;
    $connection->query("DELETE FROM ".$prefix."users WHERE ID=".$id);
    $zero=0;
    $connection->query("UPDATE ".$prefix."datauser SET userid=".$zero." WHERE userid=".$id);

    echo "ok";
    echo EncodingClass::fromVariable($data);
?>