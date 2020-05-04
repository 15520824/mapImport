<?php
	include_once "prefix.php";
	include_once "connection.php";
	include_once "common.php";

    function noquote($st) {
        $st = $st."";
        $k = strlen($st);
        $sz = "";
        for ($i = 0; $i < $k; $i++) {
            if (($st[$i] != 39) && ($st[$i] != 40)) $sz .= substr($st, $i, 1);
        }
        return $sz;
    }

    function charToHex($c) {
        if ((48 <= $c) && ($c <= 57)) return $c - 48;
        if (('A' <= $c) && ($c <= 'F')) return $c + 10 - 'A';
        if (('a' <= $c) && ($c <= 'f')) return $c + 10 - 'a';
        return 0;
    }

    function hexToString($v) {
        switch ($v) {
            case 1:
                return "1";
            case 2:
                return "2";
            case 3:
                return "3";
            case 4:
                return "4";
            case 5:
                return "5";
            case 6:
                return "6";
            case 7:
                return "7";
            case 8:
                return "8";
            case 9:
                return "9";
            case 10:
                return "a";
            case 11:
                return "b";
            case 12:
                return "c";
            case 13:
                return "d";
            case 14:
                return "a";
            case 15:
                return "b";
            default:
                return "0";
        }
    }

    $safe_login_key = "000000";
    $adminLevelPrivilege = 2;

	session_start();

    if (!isset($_POST["logincmd"])) {
        echo "Invalid params! No command!\n";
        exit();
    }

    if (!isset($_SESSION[$prefix."safe_login_temp_key"])) $_SESSION[$prefix."safe_login_temp_key"] = trim("".round(microtime(true) * 1000));
    if ($_POST["logincmd"] == "1") {    // get new key
            echo "ok".$_SESSION[$prefix."safe_login_temp_key"]."\n";
            exit();
    }

    if ($_POST["logincmd"] == "2") {    // login
        if (isset($_SESSION[$prefix."userid"])) {
            echo "logged";
    		exit();
    	}
        if (!isset($_POST["username"])) {
            echo "Invalid params! No username!\n";
            exit();
        }
        if (!isset($_POST["encryptedpassword"])) {
            echo "Invalid params! No password!\n";
            exit();
        }
        $username = strtolower($_POST["username"]);
        $result = mysql_query("SELECT * FROM ".$prefix."users WHERE (username='".safeSQL_enc($username)."')");
        $nfield = mysql_num_fields($result);
		$hint = "";
        for($i = 0; $i < $nfield; $i++) {
            $field_info = mysql_fetch_field($result, $i);
            $field_name[$i] = strtolower($field_info->name);
        }
		if ($row = mysql_fetch_row($result)) {
            for ($i = 0; $i < $nfield; $i++) {
                if ($field_name[$i] == "available") {
                    if ($row[$i] != 1) {
                        echo "blocked";
                		exit();
                    }
                    break;
                }
				if ($field_name[$i] == "hint") {
					$hint = $row[$i];
				}
            }
            for ($i = $z = 0; $i < $nfield; $i++) {
                if ($field_name[$i] == "password") {
                    if ($_POST["encryptedpassword"] == md5($username.".".$row[$i].".".$_SESSION[$prefix."safe_login_temp_key"])) $z = 1;
                    break;
                }
            }
            if ($z == 0) {
                echo "failed".$hint;
                $_SESSION[$prefix."safe_login_temp_key"] = trim("".round(microtime(true) * 1000));
                exit();
            }
            $_SESSION[$prefix."n_loginfieldname"] = $nfield;
            $sx = $nfield."<br>";
            for ($i = 0; $i < $nfield; $i++) {
                $_SESSION[$prefix."loginfieldname".$i] = $prefix.$field_name[$i];
                if ($field_name[$i] == "id") {
                    $_SESSION[$prefix."userid"] = intval($row[$i]);
                    $_SESSION[$prefix."loginfieldname".$i] = $prefix."userid";
                    $sx .= "userid = ".intval($_SESSION[$prefix."userid"])."<br>";
                }
                else if ($field_name[$i] == "username") {
                    $_SESSION[$prefix.$field_name[$i]] = safeSQL_dec($row[$i]);
                    $sx .= "username = ".$_SESSION[$prefix."username"]."<br>";
                }
                else if ($field_name[$i] == "privilege") {
                    $_SESSION[$prefix.$field_name[$i]] = intval($row[$i]);
                    $sx .= "privilege = ".$_SESSION[$prefix."privilege"]."<br>";
                }
                else if (isset($_POST["safe_login_header_".$field_name[$i]])) {
                    switch ($_POST["safe_login_header_".$field_name[$i]]) {
                        case 'i':
                            $_SESSION[$prefix.$field_name[$i]] = intval($row[$i]);
                            break;
                        case 'f':
                            $_SESSION[$prefix.$field_name[$i]] = floatval($row[$i]);
                            break;
                        case 's':
                            $_SESSION[$prefix.$field_name[$i]] = safeSQL_dec($row[$i]);
                            break;
                        case 'b':
                            $_SESSION[$prefix.$field_name[$i]] = base64_decode($row[$i]);
                            break;
                        default:
                            $_SESSION[$prefix.$field_name[$i]] = $row[$i];
                            break;
                    }
                    $sx .= $field_name[$i]." = ".$_SESSION[$prefix.$field_name[$i]]."<br>";
                }
                else {
                    $_SESSION[$prefix.$field_name[$i]] = $row[$i];
                    $sx .= $field_name[$i]." = ".$_SESSION[$prefix.$field_name[$i]]."<br>";
                }
            }
            echo "ok";
            $_SESSION[$prefix."safe_login_temp_key"] = trim("".round(microtime(true) * 1000));
            exit();
		}
        else {
            echo "username not found!";
            exit();
        }
    }
    if ($_POST["logincmd"] == "3") {    // logout
		if (isset($_COOKIE[$prefix.'user']) && isset($_SESSION[$prefix."userid"])){
			mysql_query("DELETE FROM ".$prefix."saved_login WHERE (`userid`=".$_SESSION[$prefix."userid"].") AND (`cookies`='".addslashes($_COOKIE[$prefix.'user'])."')");
		}
        if (isset($_SESSION[$prefix."n_loginfieldname"])) {
            $nfield = intval($_SESSION[$prefix."n_loginfieldname"]);
            for ($i = 0; $i < $nfield; $i++) {
                if (isset($_SESSION[$prefix."loginfieldname".$i])) {
                    $st = $_SESSION[$prefix."loginfieldname".$i];
                    if (isset($_SESSION[$st])) unset ($_SESSION[$st]);
                    unset ($_SESSION[$prefix."loginfieldname".$i]);
                }
            }
            unset ($_SESSION[$prefix."n_loginfieldname"]);
        }
		setcookie($prefix."user", "", time()-3600);
        echo "ok";
        $_SESSION[$prefix."safe_login_temp_key"] = trim("".round(microtime(true) * 1000));
        exit();
    }

    if ($_POST["logincmd"] == "4") {    // create new user
        if (!isset($_SESSION[$prefix."userid"])) {
            echo "failed: not logged in!";
            exit();
        }
        if (!isset($_POST["username"])) {
            echo "failed: invalid params!";
            exit();
        }
        if (!isset($_POST["encryptedpassword"])) {
            echo "failed: invalid params!";
            exit();
        }
        if (!isset($_POST["privilege"])) {
            echo "failed: invalid params!";
            exit();
        }
        if (!isset($_SESSION[$prefix."privilege"])) {
            echo "failed: privilege not found!";
            exit();
        }
        if ($_SESSION[$prefix."privilege"] < $adminLevelPrivilege) {
            echo "failed: invalid privilege!";
            exit();
        }
        if (intval($_SESSION[$prefix."privilege"]) < intval($_POST["privilege"])) {
            echo "failed: invalid privilege!";
            exit();
        }
        $st = "INSERT INTO `".$prefix."users` (`username`, `password`, `privilege`";
        $sx = "'".safeSQL_enc($_POST["username"])."', '".noquote($_POST["encryptedpassword"])."', ".intval($_POST["privilege"]);
        for ($i = 0; isset($_POST["safe_login_header_".$i]) && isset($_POST["safe_login_value_".$i]); $i++) {
            $st .= ", `".$_POST["safe_login_header_".$i]."`";
            $sy = $_POST["safe_login_value_".$i];
            switch ($sy[0]) {
                case 's':
                    $sx .= ", '".safeSQL_enc(substr($sy, 1))."'";
                    break;
                case 'b':
                    $sx .= ", '".base64_encode(substr($sy, 1))."'";
                    break;
                case 'n':
                case 'i':
                case 'f':
                    $sx .= ", ".noquote(substr($sy, 1));
                    break;
            }
        }
        $st .= ") VALUES (" .$sx.")";
        mysql_query($st);
        echo "ok";
        exit();
    }

    if ($_POST["logincmd"] == "5") {    // user change password
        if (!isset($_SESSION[$prefix."userid"])) {
            echo "failed: not logged in!";
            exit();
        }
        if (!isset($_POST["newencryptedpassword"])) {
            echo "failed: invalid params!";
            exit();
        }
        if (!isset($_POST["checksum"])) {
            echo "failed: invalid params!";
            exit();
        }
        $s1 = md5($_SESSION[$prefix."password"].$_SESSION[$prefix."safe_login_temp_key"]);
        $s2 = $_POST["newencryptedpassword"];
        $st = "";
        for ($i = 0; $i < 32; $i++) {
            $v1 = charToHex($s1[$i]);
            $v2 = charToHex($s2[$i]);
            $st .= hexToString($v1 ^ $v2);
        }
        if ($_POST["checksum"] == md5($_SESSION[$prefix."username"].".".$st.".".$_SESSION[$prefix."safe_login_temp_key"])) {
            mysql_query("UPDATE ".$prefix."users SET password='".$st."' WHERE ID=".$_SESSION[$prefix."userid"]);
            echo "ok";
        }
        else {
            echo "failed";
        }
        $_SESSION[$prefix."safe_login_temp_key"] = trim("".round(microtime(true) * 1000));
        exit();
    }
    echo "Invalid params! (Unknown command (".$_POST["logincmd"]."))\n";
?>
