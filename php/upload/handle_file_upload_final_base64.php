<?php
    include_once "../../jsdb.php";
    include_once "../../jsencoding.php";
    include_once "../../prefix.php";
    include_once "../../connection.php";

    $connection = DatabaseClass::init($host, $username, $password, $dbname);
    if ($connection == null){
        echo "Can not connect to database!";
        exit();
    }

    $data = array(
    );

    if (isset($_POST["id"])) {
        $data["id"]=$_POST["id"];
    }else
    {
        echo "Invalid id";
        exit();
    }

    try{
    //website url
    $siteURL = urlencode("https://lab.daithangminh.vn/home_co/Form/listForm/XMLparseForm_getByUrl.php?id=".$data["id"]);

    //call Google PageSpeed Insights API
    $gData = file_get_contents("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=$siteURL&screenshot=true");

    //decode json data
    $gData = json_decode($gData, true);

    //print_r($gData);

    //screenshot data
    $base64 = $gData['lighthouseResult']['audits']['final-screenshot']['details']['data'];

    if (preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
        $base64 = substr($base64, strpos($base64, ',') + 1);
        $type = strtolower($type[1]); // jpg, png, gif

        if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
            throw new \Exception('invalid image type');
        }

        $base64 = base64_decode($base64);

        if ($base64 === false) {
            throw new \Exception('base64_decode failed');
        }
    } else {
        throw new \Exception('did not match data URI with image data');
    }

    $currentDir = dirname(dirname(dirname(__FILE__)));

    file_put_contents($currentDir."/img/survey/img_".$data["id"].".{$type}", $base64);
    $data["image"]="./img/survey/img_".$data["id"].".{$type}";
    $connection->update($prefix.'survey', $data);

    echo "ok";

    echo EncodingClass::fromVariable($data);
    }catch(Exception $e){
        echo "ok";
        echo $e;
    }   
?>