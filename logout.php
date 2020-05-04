<?php
include_once "jsdb.php";
include_once "jsencoding.php";
include_once "prefix.php";
include_once "connection.php";

session_start();
$connector = DatabaseClass::init($host, $username , $password, $dbhome);
if ($connector == null) {
    echo "Can not connect to database!";
    exit();
}
if (isset($_COOKIE[$prefixhome.'user']) && isset($_SESSION[$prefixhome."userid"])){
//     $a = $connector->load($prefixhome."saved_login", "", "id");
//     $count = count($a);
//     for ($i = 0; $i < $count; $i++){
//         if (($a[$i]['userid'] == $_SESSION[$prefixhome."userid"]) && (strcasecmp($a[$i]['cookies'], $_COOKIE[$prefixhome.'user']) == 0)){
            $connector->query("DELETE FROM ".$prefixhome."saved_login WHERE (userid=".$_SESSION[$prefixhome."userid"].") AND (cookies ='".$_COOKIE[$prefixhome.'user']."')");
            // print_r($connector->lastquery);
            // break;
    //     }
    // }
}
if (isset($_SESSION[$prefixhome."n_loginfieldname"])) {
    $nfield = intval($_SESSION[$prefixhome."n_loginfieldname"]);
    for ($i = 0; $i < $nfield; $i++) {
        if (isset($_SESSION[$prefixhome."loginfieldname".$i])) {
            $st = $_SESSION[$prefixhome."loginfieldname".$i];
            if (isset($_SESSION[$st])) unset ($_SESSION[$st]);
            unset ($_SESSION[$prefixhome."loginfieldname".$i]);
        }
    }
    unset ($_SESSION[$prefixhome."n_loginfieldname"]);
}
setcookie($prefixhome."user", "", time()-3600);
echo "ok";
$_SESSION[$prefixhome."safe_login_temp_key"] = trim("".round(microtime(true) * 1000));
exit();

?>
