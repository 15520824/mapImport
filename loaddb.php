<?php
include_once "jsdb.php";
include_once "jsencoding.php";
include_once "prefix.php";
include_once "connection.php";

session_start();

$conn = DatabaseClass::init($host, $username , $password, $dbname);
$conn2 = DatabaseClass::init($host, $username , $password, $dbnamesys);
if (!isset($_SESSION[$prefixhome."userid"])) {
    echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web";
    exit();
}
echo "ok";
EncodingClass::echo_x(EncodingClass::fromVariable(array(
)));
?>
