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
    if (!isset($_POST["id"])) {
        echo "error: invalid param.";
        exit();
    }
    if (!isset($_POST["username"])) {
        echo "error: invalid param.";
        exit();
    }
    if (!isset($_POST["hint"])) {
        $hint = "";
    }
    else {
        $hint = $_POST["hint"];
    }
    $connector = DatabaseClass::init($host, $username , $password, $dbname);
    $email = $_POST["email"];
    $id = intval($_POST["id"]);
    $username = strtolower($_POST["username"]);
    $data = array(
        "fullname" => ($_POST["fullname"]),
        "username" => ($username),
        "hint" => ($hint),
        "available" => 1,
        "email" => ($email)
    );
    if ($id == 0) {
        $password = $_POST["password"];
        $usernamex = $data["username"];
        $emailx = $data["email"];
        $resultx = $connector->load($prefix."users", "(username='".$usernamex."')", "");
        if (count($resultx) > 0){
            echo "Tên tài khoản đã tồn tại!";
            exit();
        }
        $resultx = $connector->load($prefix."users", "(email='".$emailx."')", "");
        if (count($resultx) > 0){
            echo "Email đã tồn tại!";
            exit();
        }
        $data["password"] = md5($password."safe.Login.via.normal.HTTP"."000000");
        $lpid = $connector-> insert($prefix."users", $data);
        if ($lpid == 0) {
            echo mysql_error();
            return;
        }
        echo "ok";
    }
    else {
        if (isset($_POST["password"])) {
            $data["password"] = md5($_POST["password"]."safe.Login.via.normal.HTTP"."000000");
        }
        $data["id"] = $id;
        $r = $connector->update($prefix."users", $data);
        if ($r == 0) {
            echo mysql_error();
            return;
        }
        echo "ok";
    }
 ?>
