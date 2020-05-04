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

if (!isset($_POST["id"])) {
    echo "error: invalid id.";
    exit();
}

$data = array(
);
if (isset($_POST["id"])) {
    $data["id"]=(int)$_POST["id"];
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

$result = $connection->load($prefix."users", "(id=".$data["id"].")", "");

if(sizeof($result) > 0)
{
    $connection->update($prefix.'users', $data);
}else{
    $connection->insert($prefix.'users', $data);
}

echo "ok";

echo EncodingClass::fromVariable($data);

?>