<?php 
include_once "../jsdb.php";
include_once "../jsencoding.php";
include_once "../prefix.php";
include_once "../connection.php";

$connection = DatabaseClass::init($host, $username, $password, $dbname);
if ($connection == null){
    echo "Can not connect to database!";
    exit();
}

$data = array(
);
if (isset($_POST["homeid"])) {
$data["homeid"]=(int)$_POST["homeid"];
}
if (isset($_POST["privilege"])) {
    $data["privilege"]=(int)$_POST["privilege"];
}
if (isset($_POST["language"])) {
    $data["language"]=$_POST["language"];
}
if (isset($_POST["available"])) {
    $data["available"]=(int)$_POST["available"];
}
if (isset($_POST["comment"])) {
    $data["comment"]=$_POST["comment"];
}
if (isset($_POST["theme"])) {
    $data["theme"]=(int)$_POST["theme"];
}

$connection->insert($prefix.'users', $data);
$data["privupdate"]=new Datetime("now");
echo "ok";

echo EncodingClass::fromVariable($data);

?>