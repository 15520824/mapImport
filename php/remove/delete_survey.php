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

$data = $connection->load($prefix.'survey','id='.$id);
if(isset($data))
$data=$data[0];
else{
    echo "Invalid data";
    exit();
}


$currentDir = dirname(dirname(dirname(__FILE__)));
if(file_exists($currentDir.trim($data["image"],'.')))
    unlink($currentDir.trim($data["image"],'.'));


$search = $connection->load($prefix.'link_survey_form','surveyid='.$id);
if (count($search) > 0){
    $connection->query("DELETE FROM ".$prefix."link_survey_form WHERE surveyid=".$id);
    for($i=0;$i<count($search);$i++)
    {
        $search1 = $connection->load($prefix.'link_form_question','formid='.$search[$i]["formid"]);
        $connection->query("DELETE FROM ".$prefix."form WHERE id=".$search[$i]["formid"]);
        $connection->query("DELETE FROM ".$prefix."link_form_question WHERE formid=".$search[$i]["formid"]);
        if (count($search1) > 0){
            for($j=0;$j<count($search1);$j++)
                {
                    $connection->query("DELETE FROM ".$prefix."question WHERE id=".$search[$j]["questionid"]);
                    $connection->query("DELETE FROM ".$prefix."answer WHERE questionid=".$search[$j]["questionid"]);
                }
        }
    }
}else
{

}
$connection->query("DELETE FROM ".$prefix."survey WHERE id=".$id);

echo "ok";

echo EncodingClass::fromVariable($id);

?>