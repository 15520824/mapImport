<?php
include_once "jsdb.php";
include_once "jsencoding.php";
include_once "prefix.php";
include_once "connection.php";

function loadCompany(){
    global $host, $username , $password;
    $connector = DatabaseClass::init($host, $username , $password, 'hr_db');
    $companies = $connector->load('hr_company', '', 'id');
    $services = $connector->load('hr_services', '', 'id');
    $register = $connector->load('hr_register', '', 'id');
    return array('companies' => $companies, 'services' => $services, 'register' => $register);
}

function loadUser_Profile($conn){
    global $prefix;
    if (isset($_SESSION[$prefix.'userid'])) $uid = $_SESSION[$prefix.'userid'];
    else $uid = 0;
    $result = $conn->load($prefix."users", "(id = ".$uid.")", "id");
    if (count($result) == 0){
        return "notlogin";
    }
    return array('user' => $result[0]);
}

function loadUserContent($conn){
    global $prefix;
    if (isset($_SESSION[$prefix.'userid'])) $uid = $_SESSION[$prefix.'userid'];
    else $uid = 0;
    if ($uid == 0){
        echo 'failed';
        exit();
    }
    $result = $conn->load($prefix.'users', "id =".$uid, 'id');
    if (count($result) == 0){
        return 'notlogin';
    }
    return $result[0];
}

function loadUserList($conn){
    global $prefix;
    $result = $conn->load($prefix.'users', "", "id");
    return $result;
}

function loadUserById($conn){
    global $prefix;
    if (!isset($_POST['id'])){
        echo "Invalid params";
        exit();
    }
    if ($_POST['id'] == 0){
        return array();
    }
    $result = $conn->load($prefix.'users', "id=".$_POST['id'], "id");
    if (count($result) == 0){
        echo "notfound";
        exit();
    }
    return $result[0];
}

session_start();
if (!isset($_POST['task'])){
    echo "Invalid params";
    exit();
}

$conn = DatabaseClass::init($host, $username , $password, $dbname);

if (!isset($_SESSION[$prefix."userid"])) {
    echo "Bạn đã đăng xuất, bạn cần đăng nhập lại để tiếp tục sử dụng phần mềm
        Để đăng nhập lại bạn nhấn F5 hoặc tải lại trang web";
    exit();
}
$task = $_POST['task'];

switch ($task) {
    case 'account_edit_user':
        $content = loadUserById($conn);
        break;
    case 'users_list':
        $content = loadUserList($conn);
        break;
    case 'menu_user':
        $content = loadUserContent($conn);
        break;
    case 'load_company':
        $content = loadCompany();
        break;
    case 'menu_user_profile':
        $content = loadUser_Profile($conn);
        break;
    default:
        // code...
        break;
}
echo "ok".EncodingClass::fromVariable($content);
?>
