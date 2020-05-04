<?php
	include_once "../connection.php";
	include_once "common.php";
    include_once "../prefix.php";
    include_once "../jsencoding.php";
    include_once "../jsdb.php";

	session_start();

	if (!isset($_SESSION[$prefixhome."userid"])) {
		echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web!";
		exit();
	}
    if (!isset($_POST["data"])) {
		echo "Invalid params: no data!";
		exit();
	}
    $connector = DatabaseClass::init($host, $username , $password, $dbname);
    if ($connector == null) {
        echo "Can not connect to database!";
        exit(0);
    }
    $data = EncodingClass::toVariable($_POST["data"]);
    $uid = $connector-> insert($prefix."users", $data);
	echo "ok";
?>
