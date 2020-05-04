<?php
    include_once "connection.php";
	include_once "common.php";

    if (!isset($_POST["id"])) {
        echo "error: invalid param.";
        exit();
    }
    if (!isset($_POST["value"])) {
        echo "error: invalid param.";
        exit();
    }
    if (!isset($_POST["tablename"])) {
        echo "error: invalid param.";
        exit();
    }
    $id = intval($_POST["id"]);
    $value = $_POST["value"];
    $tablename = strtolower($_POST["tablename"]);
    if ($id == 0) {
        $st = "INSERT INTO ".$tablename." (`key`, `code`, `value`) ";
        $st .= "VALUES ('".($_POST["key"])."', '".($_POST["code"])."', '".($value)."')";
        mysql_query($st);
        $lpid = mysql_insert_id();
        if ($lpid == 0) {
            echo mysql_error();
            return;
        }
        echo "ok".$lpid;
    }
    else {
        $st = "UPDATE `".$tablename."` SET value='".$value."' WHERE ID=".$id;
        mysql_query($st);
        echo "ok";
    }
 ?>
