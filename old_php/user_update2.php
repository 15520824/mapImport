<?php
    include_once "../connection.php";
	include_once "common.php";
    include_once "../prefix.php";
    include_once "../jsdb.php";

    session_start();

    if (!isset($_SESSION[$prefixhome."userid"])) {
        echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web";
        exit();
    }
    // if (!isset($_POST["fullname"])) {
    //     echo "error: invalid fullname.";
    //     exit();
    // }
    // else {
    //     $fullname = $_POST["fullname"];
    // }
    // if (!isset($_POST["email"])) {
    //     echo "error: invalid email.";
    //     exit();
    // }
    // else {
    //     $email = $_POST["email"];
    // }
    // if (!isset($_POST["comment"])) {
    //     echo "error: invalid comment.";
    //     exit();
    // }
    // else {
    //     $comment = $_POST["comment"];
    // }
    // if (!isset($_POST["hint"])) {
    //     echo "error: invalid hint.";
    //     exit();
    // }
    // else {
    //     $hint = $_POST["hint"];
    // }
    // if (!isset($_POST["pfid"])) {
    //     echo "error: invalid pfid.";
    //     exit();
    // }
    // else {
    //     $profileid = $_POST["pfid"];
    // }
    $connector = DatabaseClass::init($host, $username , $password, $dbname);
    if ($connector == null) {
        echo "Can not connect to database!";
        exit(0);
    }
    $connector2 = DatabaseClass::init($host, $username , $password, $dbhome);

    $homeid = intval($_SESSION[$prefixhome."userid"]);

    $dataUser = $connector2->load($prefixhome."users","id=".$homeid);

    $dataUser=$dataUser[0];

    if (isset($_POST["id"])&&$_POST["id"]==0) {
    $data = array(
        "id"    => $homeid,
        "language"  => $dataUser["language"],
        "privilege" => $dataUser["privilege"],
        "theme" => $dataUser["theme"],
        "available" => $dataUser["available"],
        "homeid" => $homeid,
    );
    }
    // if (isset($_POST["language"])) {
    //     $data["language"] = $_POST["language"];
    // }

    $data["id"] = $connector->insert($prefix.'users', $data);
    $_SESSION[$prefix.'userid'] = $data["id"];
    echo "ok";
    
    echo EncodingClass::fromVariable($data);
 ?>
