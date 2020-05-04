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


if (isset($_POST["id"])) {
    $id=$_POST["id"];
}else
{
    echo "Invalid id";
    exit();
}


if (isset($_POST["formid"])) {
    $formid=$_POST["formid"];
}else
{
    echo "Invalid formid";
    exit();
}

$data = $connection->load($prefix.'question','id='.$id);
$document_xml = new DOMDocument();
$document_xml->loadXML('<body>'.$data[0]['content'].'</body>');
$elements = $document_xml->getElementsByTagName('content');
foreach ($elements as $node) {
    $idtest = $node->getElementsByTagName('type');
    $idElem = $node->getElementsByTagName('value');
    $idList[] = [$idtest->item(0)->nodeValue,$idElem->item(0)->nodeValue];
}

if(isset($idList)){
    $currentDir = dirname(dirname(dirname(__FILE__)));
    for($i=0;$i<count($idList);$i++)
    {
        if($idList[$i][0]==="image")
        if(file_exists($currentDir.trim($idList[$i][1],'.')))
        unlink($currentDir.trim($idList[$i][1],'.'));
    }
}


$search = $connection->load($prefix.'link_form_question','questionid='.$id);
if (count($search) == 1){
    $connection->query("DELETE FROM ".$prefix."answer WHERE id=".$id);
    $connection->query("DELETE FROM ".$prefix."link_form_question WHERE questionid=".$id);
}else
{
    $connection->query("DELETE FROM ".$prefix."link_form_question WHERE questionid=".$id.' AND formid='.$formid);
}


echo "ok";

echo EncodingClass::fromVariable($id);

?>