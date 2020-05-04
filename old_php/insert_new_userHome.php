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
if (isset($_POST["username"])) {
    $data["username"]=$_POST["username"];
    }
if (isset($_POST["fullname"])) {
$data["fullname"]=$_POST["fullname"];
}
if (isset($_POST["email"])) {
    $data["email"]=(int)$_POST["email"];
}
if (isset($_POST["privilege"])) {
    $data["privilege"]=$_POST["privilege"];
}
if (isset($_POST["language"])) {
    $data["language"]=$_POST["language"];
}
if (isset($_POST["available"])) {
    $data["available"]=$_POST["available"];
}
if (isset($_POST["comment"])) {
    $data["comment"]=$_POST["comment"];
}
if (isset($_POST["theme"])) {
    $data["theme"]=$_POST["theme"];
}
if (isset($_POST["t_year"])) {
    $data["t_year"]=$_POST["t_year"];
}

$data["id"] = $connection->insert($prefixhome.'users', $data);

echo "ok";

echo EncodingClass::fromVariable($data);

?>