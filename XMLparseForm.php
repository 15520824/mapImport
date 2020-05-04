<!DOCTYPE html>
<html>
<head>
    <title>Azar</title>
    <meta charset="UTF-8">
    <script>
        <?php
            include_once "./absol/absol_full.php";
        ?>
    </script>
    <?php
    include_once "common.php";
    include_once "jsencoding.php";
    include_once "jsform_new.php";
    include_once "jsform.php";
    ?>
    <link rel="stylesheet" href="./css/form.css">
    <link rel="stylesheet" href="./css/list.css">
    <link rel="stylesheet" href="./css/test_parse.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="./css/important.css">
    <script src="./js/component.js?time=<?php echo time(); ?>"></script>
    <script src="js/data_module.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_db_load.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_db_record.js?time=<?php echo time(); ?>"></script>
    <script src="js/modal_drag_drop_image.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_list.js?time=<?php echo time(); ?>"></script>
    <script src="./js/main.js?time=<?php echo time(); ?>"></script>
</head>

<body>

    <?php
            EncodingClass::write_script();
            FormClass::write_script();
            write_common_script();
            write_form_script();
    ?>
    <script>
        main(document);
    </script>
</body>
</html>