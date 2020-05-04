<?php
include_once "../jsdb.php";
include_once "../jsencoding.php";
include_once "../prefix.php";
include_once "../connection.php";


    session_start();
    
    $connection = DatabaseClass::init($host, $username, $password, $dbname);
    if ($connection == null){
        echo "Can not connect to database!";
        exit();
    }
    if (!isset($_POST["oauth_uid"])) {
        echo "No id!";
        exit();
    }
    if (!isset($_POST["oauth_provider"])) {
        echo "No oauth_provider!";
        exit();
    };
    $account = $connection->load("users","oauth_uid=".$_POST["oauth_uid"]);

    $data = json_decode($account[0]["data"]);
    if(!isset($data)||count($data)==0)
    {
        $result=array();
        echo "ok";
        echo EncodingClass::fromVariable($result);
        exit(0);
    }
    $count = count($data);
    for ($i = 0; $i < $count; $i++){
        $result[$i]['id'] = $account[0]['id'];
        // $result[$i]['nameCompany'] = $data[$i]->nameCompany;
        // $result[$i]['address'] = $data[$i]->address;
        $result[$i]['country'] = $data[$i]->country;
        // $result[$i]['webSite'] = $data[$i]->webSite;
        $result[$i]['position'] = $data[$i]->position;
        $result[$i]['department'] = $data[$i]->department;
        $result[$i]['jobCode'] = $data[$i]->jobCode;
        $result[$i]['jobReplace'] = $data[$i]->jobReplace;
        $result[$i]['note'] = $data[$i]->note;
        $result[$i]['data'] = json_encode($data[$i]->data);
    }
    echo "ok";
    echo EncodingClass::fromVariable($result);
    exit(0);
?>
