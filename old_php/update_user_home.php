<?php 
include_once "../jsdb.php";
include_once "../jsencoding.php";
include_once "../prefix.php";
include_once "../connection.php";

$connection = DatabaseClass::init($host, $username, $password, $dbhome);
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
if (isset($_POST["fullname"])) {
    $data["fullname"]=$_POST["fullname"];
}
if (isset($_POST["email"])) {
    $data["email"]=$_POST["email"];
}
if (isset($_POST["password"])) {
    $data["password"]=md5($_POST["password"]."safe.Login.via.normal.HTTP"."000000");
}

$result = $connection->load($prefixhome."users", "(id=".$data["id"].")", "");

if(sizeof($result) > 0)
{
    $connection->update($prefixhome.'users', $data);
}else{
    $connection->insert($prefixhome.'users', $data);
}

echo "ok";
echo EncodingClass::fromVariable($data);
?>