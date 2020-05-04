<?php
include_once "common.php";
include_once "prefix.php";
include_once "connection.php";
include_once "jsdb.php";
include_once "jsencoding.php";

session_start();
if (!isset($_SESSION[$prefixhome."userid"])) {
    echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web!";
    exit();
}

if (!isset($_POST["uk"])) {
    echo "No privilege!";
    exit();
}

if (!isset($_POST["pfid"])) {
    echo "No profileid!";
    exit();
}

if ($_POST["uk"] != md5($_SESSION[$prefixhome."username"])) {
    echo "No privilege!";
    exit();
}

if (!isset($_POST["index"])) {
    echo "No index!";
    exit();
}

$connector = DatabaseClass::init($host, $username , $password, $dbname);
if ($connector == null) {
    echo "Can not connect to database!";
    exit(0);
}
$pfid = intval($_POST["pfid"]);
$index = intval($_POST["index"]);

include "dataload_table.php";
$result = $connector->load($prefix.$tablename, "profileid = ".$pfid, "ID");
if ($result == null) {
    $st = mysql_error();
    if (strcmp($st, "") == 0) {
        $result = array();
    }
    else {
        echo "failed";
        exit(0);
    }
}
echo "ok";
echo_x(EncodingClass::fromVariable($result));
exit(0);
?>
