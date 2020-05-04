<?php
    include_once "connection.php";
	include_once "common.php";
    include_once "prefix.php";
    include_once "jsdb.php";

    session_start();

    if (!isset($_SESSION[$prefix."userid"])) {
        echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web";
        exit();
    }
    if (!isset($_POST["fullname"])) {
        echo "error: invalid fullname.";
        exit();
    }
    else {
        $fullname = $_POST["fullname"];
    }
    if (!isset($_POST["email"])) {
        echo "error: invalid email.";
        exit();
    }
    else {
        $email = $_POST["email"];
    }
    $connector = DatabaseClass::init($host, $username , $password, $dbname);
    if ($connector == null) {
        echo "Can not connect to database!";
        exit(0);
    }
    $data = array(
        "id" => intval($_SESSION[$prefix."userid"]),
        "fullname" => $fullname,
        "email" => $email,
    );
    if (isset($_POST["newpassword"])) {
        $data["password"] = md5($_POST["newpassword"]."safe.Login.via.normal.HTTP"."000000");
    }
    $connector->update($prefix."users", $data);
    echo "ok";
    exit();
 ?>
