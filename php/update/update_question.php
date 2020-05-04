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

if (isset($_POST["value"])) {
    $data["value"]=$_POST["value"];
}

if (isset($_POST["type"])) {
    $data["type"]=$_POST["type"];
}

if (isset($_POST["style"])) {
    $data["style"]=$_POST["style"];
}

if (isset($_POST["feedback_correct"])) {
    $data["feedback_correct"]=$_POST["feedback_correct"];
}

if (isset($_POST["feedback_incorrect"])) {
    $data["feedback_incorrect"]=$_POST["feedback_incorrect"];
}

if (isset($_POST["important"])) {
    $data["important"]=$_POST["important"];
}

if (isset($_POST["sum"])) {
    $data["sum"]=$_POST["sum"];
}

if (isset($_POST["type_answer"])) {
    $data["type_answer"]=$_POST["type_answer"];
}

if (isset($_POST["content"])) {
    $data["content"]=$_POST["content"];
}else
    $data["content"]="";

$currentDir = dirname(dirname(dirname(__FILE__)));

$idListCurrent = array(
);
$idList = array(
);

$document_xml = new DOMDocument();
$document_xml->loadXML('<body>'.$data["content"].'</body>');
$elements = $document_xml->getElementsByTagName('content');
foreach ($elements as $node) {
    $idCurrent = $node->getElementsByTagName('type');
    $idCurrent = $idCurrent->item(0)->nodeValue;
    if($idCurrent=="image"){
        $idElemCurrent = $node->getElementsByTagName('value');
        $pos = strrpos($idElemCurrent->item(0)->nodeValue,"./img/delete/img");
        if ($pos === false) { 
            $idListCurrent[] = $idElemCurrent->item(0)->nodeValue;
        }else if(is_file($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.')))
        {
            $string = str_replace("./img/delete/img","./img/upload/img",$idElemCurrent->item(0)->nodeValue);
            copy($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.'),$currentDir.trim($string,'.'));
            unlink($currentDir.trim($idElemCurrent->item(0)->nodeValue,'.'));
            $data["content"]=str_replace($idElemCurrent->item(0)->nodeValue,$string,$data["content"]);
            $idListCurrent[] = $string;
        }
    }
}

$dataContent = $connection->load($prefix.'question','id='.$data["id"]);
$document_xml = new DOMDocument();
$document_xml->loadXML('<body>'.$dataContent[0]['content'].'</body>');
$elements = $document_xml->getElementsByTagName('content');
foreach ($elements as $node) {
    $idtest = $node->getElementsByTagName('type');
    $idtest = $idtest->item(0)->nodeValue;
    if($idtest=="image"){
        $idElem = $node->getElementsByTagName('value');
        $idList[] = $idElem->item(0)->nodeValue;
    }
}
if(isset($idList)&&isset($idListCurrent)){
    $new=array_diff($idList,$idListCurrent);
    foreach ($new as $nodenew) {
        if(file_exists($currentDir.trim($nodenew,'.')))
            unlink($currentDir.trim($nodenew,'.'));
    }
}

$search = $connection->load($prefix.'link_form_question','questionid='.$data["id"]);
if (count($search) > 1||count($search) == 0){
    $data["id"] = null;
    $data["id"] = $connection->insert($prefix.'question', $data);
}else
{
    $connection->update($prefix.'question', $data);
}

echo "ok";

echo EncodingClass::fromVariable($data);

?>