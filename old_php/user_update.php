<?php
    include_once "../connection.php";
	include_once "common.php";
    include_once "../prefix.php";
    include_once "../jsencoding.php";
    include_once "../jsdb.php";


    session_start();

    if (!isset($_SESSION[$prefixhome."userid"])) {
        echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web";
        exit();
    }
    // if (intval($_SESSION[$prefix."privilege"]) < 2) {
    //     echo "error: insufficent privilege.";
    //     exit();
    // }
    if (!isset($_POST["id"])) {
        echo "error: invalid param.";
        exit();
    }
    if (!isset($_POST["homeid"])) {
        echo "error: invalid homeid.";
        exit();
    }
    if (!isset($_POST["username"])) {
        echo "error: invalid param.";
        exit();
    }
    if (!isset($_POST["hint"])) {
        $hint = "";
    }
    else {
        $hint = $_POST["hint"];
    }
    $connector = DatabaseClass::init($host, $username , $password, $dbname);
    $connector2 = DatabaseClass::init($host, $username , $password, $dbnamehome);
    $email = $_POST["email"];
    $id = intval($_POST["id"]);
    $homeid = intval($_POST["homeid"]);
    $username = strtolower($_POST["username"]);
    $data = array(
        "privilege" => intval($_POST["priv"]),
        "privupdate" => new Datetime(),
        "comment" => ($_POST["comment"]),
        "language" => "VN",
        "theme" => 1,
        "available" => 1
    );
    $datahome = array(
        "fullname" => ($_POST["fullname"]),
        "username" => ($username),
        "hint" => ($hint),
        "privilege" => intval($_POST["priv"]),
        "privupdate" => new Datetime(),
        "lastprofileid" => intval($_POST["pfid"]),
        "t_year" => intval($_POST["year"]),
        "comment" => ($_POST["comment"]),
        "language" => "VN",
        "theme" => 1,
        "available" => 1,
        "email" => ($email)
    );
    if ($id == 0) {
        $password = $_POST["password"];
        $usernamex = $datahome["username"];
        $emailx = $datahome["email"];
        $resultx = $connector2->load($prefixhome."users", "(username='".$usernamex."')", "");
        if (count($resultx) > 0){
            $resultb = $connector->load($prefix."users", "(homeid='".$resultx[0]["id"]."')", "");
            if (count($resultb) > 0){
                echo "Tên tài khoản đã tồn tại!";
                exit();
            }
            else {
                echo "check".EncodingClass::fromVariable($resultx[0]);
                exit();
            }
        }
        $resultx = $connector2->load($prefixhome."users", "(email='".$emailx."')", "");
        if (count($resultx) > 0){
            echo "Email đã tồn tại!";
            exit();
        }
        $datahome["password"] = md5($password."safe.Login.via.normal.HTTP"."000000");
        $datahome["log"] = 1;
        $lpid2 = $connector2-> insert($prefixhome."users", $datahome);
        $data["homeid"] = $lpid2;
        $lpid = $connector-> insert($prefix."users", $data);
        if ($lpid == 0) {
            echo mysql_error();
            return;
        }
        echo "ok";
    }
    else {
        if (isset($_POST["password"])) {
            $datahome["password"] = md5($_POST["password"]."safe.Login.via.normal.HTTP"."000000");
        }
        $data["id"] = $id;
        $r = $connector->update($prefix."users", $data);
        $datahome["id"] = $homeid;
        $r = $connector2->update($prefixhome."users", $datahome);
        echo "ok";
    }
 ?>
