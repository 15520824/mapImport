<?php
	include_once "connection.php";
	include_once "common.php";
    include_once "prefix.php";
    include_once "jsdb.php";

	session_start();

    if (!isset($_POST["localString"])) {
		echo "Invalid params!";
		exit();
	}
    $connector = DatabaseClass::init($host, $username , $password, $dbname);
    if ($connector == null) {
        echo "Can not connect to database!";
        exit(0);
    }
    $localString = $_POST["localString"];
    $datetime = new DateTime();
    $timestring = $datetime->getTimestamp();
    $cookvalueString = md5("KOH + HCl = KCL + H2O".$timestring);
    $userid = $_SESSION[$prefix."userid"];
    setcookie($prefix.'user', $cookvalueString, time() + 631152000);
    $id = $connector-> insert($prefix."saved_login", array("userid" => $userid, "cookies" => $cookvalueString, "storage" => $localString));
    echo "ok".$id;
	echo $connector->lastquery;
?>
