<?php

include_once "prefix.php";

if (version_compare(PHP_VERSION, '7.0.0') >= 0) {
    include_once  "connection_7.php";
} else {
    include_once  "connection_4.php";
}
?>
