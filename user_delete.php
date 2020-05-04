<?php
    include_once "connection.php";
	include_once "common.php";
    include_once "prefix.php";
    include_once "jsencoding.php";
    include_once "jsdb.php";


    session_start();

    if (!isset($_SESSION[$prefix."userid"])) {
        echo "Not logged in";
        exit();
    }
    if (!isset($_POST["uid"])) {
        echo "error: invalid param.";
        exit();
    }

    if (intval($_POST["uid"]) == intval($_SESSION[$prefix."userid"])){
        echo 'onlyone';
        exit();
    }

    $connector = DatabaseClass::init($host, $username , $password, $dbname);

    $result = $connector->load($prefix.'users', "", "id");
    if (count($result) == 1) {
        echo "onlyone";
        exit();
    }

    $connector->query("DELETE FROM ".$prefix."users WHERE id=".$_POST["uid"]);
    echo 'ok';
    exit();
 ?>
