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
    if (!isset($_POST["id"])) {
        echo "No id!";
        exit();
    }
    $account = $connection->load($prefix."users","id=".$_POST["id"]);
    
    if($account[0]["privilege"]==1||$account[0]["privilege"]==2){
        $data = $connection->load($prefix."datauser");  
        $data = $data;
    }
    else
    $data = $connection->load($prefix."datauser","userid=".$_POST["id"]);

    
    $count = count($data);
    if(!isset($data)||count($data)==0)
    {
        $result=array();
        echo "ok";
        echo EncodingClass::fromVariable($result);
        exit(0);
    }
    
    $index=0;
    
    for ($i = 0; $i < $count; $i++){
        $temp=json_decode($data[$i]["data"]);
        $count1=count($temp);
            $result[$index]['id'] = $data[$i]['id'];
            $result[$index]['country'] = $temp->country;
            // $result[$i]['webSite'] = $data[$i]->webSite;
            $result[$index]['position'] = $data[$i]["positionid"];
            $result[$index]['direct'] = $temp->direct;
            $result[$index]['indirect'] = $temp->indirect;
            $result[$index]['ransack'] = $temp->ransack;
            $result[$index]['working_time'] = $temp->working_time;
            $result[$index]['jobCode'] = $temp->jobCode;
            $result[$index]['jobReplace'] = $temp->jobReplace;
            $result[$index]['note'] = $temp->note;
            $result[$index]['data'] = json_encode($temp->data);
            $result[$index]['userid'] =$data[$i]["userid"];
            $index++;
    }

    
    echo "ok";
    if($index==0){
        $result=array();
        echo EncodingClass::fromVariable($result);
    }
    echo EncodingClass::fromVariable($result);
    exit(0);
?>
