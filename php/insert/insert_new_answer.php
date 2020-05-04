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

if (isset($_POST["questionid"])) {
    $data["questionid"]=$_POST["questionid"];
}else
{
    echo "Invalid questionid";
    exit();
}
$currentDir = dirname(dirname(dirname(__FILE__)));
if (isset($_POST["content"])) {
    $data["content"]=$_POST["content"];
    $document_xml = new DOMDocument();
    $document_xml->loadXML($data["content"]);
    $elements = $document_xml->getElementsByTagName('content');
    foreach ($elements as $node) {
        $idCurrent = $node->getElementsByTagName('type');
        $idCurrent = $idCurrent->item(0)->nodeValue;
        $isFile = false;
        if($idCurrent=="image"){
            $idElemCurrent = $node->getElementsByTagName('value');
            $pos = strrpos($idElemCurrent->item(0)->nodeValue,"./img/delete/img");
            $pos1 = strrpos($idElemCurrent->item(0)->nodeValue,"./img/upload/img");
            if (!($pos === false)) { 
                $string = str_replace("./img/delete/img","./img/upload/img",$idElemCurrent->item(0)->nodeValue);
                if(!is_file($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.')))
                {
                    $data["content"]=str_replace($idElemCurrent->item(0)->nodeValue,$string,$data["content"]);
                    $idElemCurrent->item(0)->nodeValue=$string;
                    $isFile=true;
                }
                else{
                    copy($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.'),$currentDir.trim($string,'.'));
                    unlink($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.'));
                    $data["content"]=str_replace($idElemCurrent->item(0)->nodeValue,$string,$data["content"]);
                }
            }
            if ((!($pos1 === false))||$isFile)
            {
                if(is_file($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.')))
                {
                    if(!isset($data["changeImg"])){
                        $data["changeImg"]=array();
                    }
                    $string=$idElemCurrent->item(0)->nodeValue;
                    do {
                        $string = str_replace("./img/upload/img","./img/upload/img_new",$string);
                    } while(is_file($currentDir.trim($string,'.')));
                    copy($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.'),$currentDir.trim($string,'.'));
                    $data["content"]=str_replace($idElemCurrent->item(0)->nodeValue,$string,$data["content"]);
                    array_push($data["changeImg"],[$idElemCurrent->item(0)->nodeValue,$string]);
                }
            }
        }
    }
}

if (isset($_POST["number_order"])) {
    $data["number_order"]=$_POST["number_order"];
}

$data["id"] = $connection->insert($prefix.'answer', $data);

echo "ok";

echo EncodingClass::fromVariable($data);

?>