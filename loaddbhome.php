<?php
include_once "jsdb.php";
include_once "jsencoding.php";
include_once "prefix.php";
include_once "connection.php";
include_once "prefix2.php";
include_once "connection2.php";

session_start();

$conn = DatabaseClass::init($host, $username , $password, $dbnamehome);
$conn2 = DatabaseClass::init($host, $username , $password, $dbnamehr);
if (!isset($_SESSION[$prefixhome."userid"])) {
    echo "not logged in";
    exit();
}
$company = $conn2->load($prefixhr."company", "dbname = '".$dbnamehome."'", "id");
$count = count($company);
if ($count == 0){
    echo "failed";
    exit();
}
else {
    $register = $conn2->load($prefixhr."register", "companyid = ".$company[0]['id'], "serviceid");
}
echo "ok";
EncodingClass::echo_x(EncodingClass::fromVariable(array(
    "services" => $conn2->load($prefixhr."services", "", "stt"),
    "register" => $register
)));
?>
