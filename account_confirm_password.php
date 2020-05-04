<?php
    include_once "connection.php";
    include_once "common.php";
    include_once "prefix.php";
    include_once "jsencoding.php";
    include_once "jsdb.php";

    session_start();

    if (!isset($_SESSION[$prefixhome."userid"])) {
        echo "Not logged in!";
        exit();
    }
    $connector = DatabaseClass::init($host, $username , $password, $dbhome);
    if ($connector == null) {
        echo "Can not connect to database!";
        exit(0);
    }
    $id = $_SESSION[$prefixhome."userid"];
    $result = $connector->load($prefixhome."users", " id =".$id, "");
    if (count($result) > 0){
        $password = $_POST["pass"];
        if ($result[0]["password"] == md5($password."safe.Login.via.normal.HTTP"."000000")){
            echo "ok";
            exit();
        }
        else {
            echo "failed";
            exit();
        }
    }
    echo $connector->lastquery;
    exit(0);
?>
