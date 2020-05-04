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
    <script src="js/component.js?time=<?php echo time(); ?>"></script>
    <script src="js/modal_drag_drop_image.js?time=<?php echo time(); ?>"></script>
    <script src="js/modal_drag_drop_question.js?time=<?php echo time(); ?>"></script>
    <script src="./js/modal_feedback_correct_or_incorrect.js?time=<?php echo time(); ?>"></script>
    <script src="js/data_module.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_db_load.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_db_create.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_create.js?time=<?php echo time(); ?>"></script>
    <script src="./js/XML_list_create.js?time=<?php echo time(); ?>"></script>
    <script src="./js/main_create.js?time=<?php echo time(); ?>"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="./css/form.css">
    <link rel="stylesheet" href="./css/form_create.css">
    <link rel="stylesheet" href="./css/list.css">
    <link rel="stylesheet" href="./css/test_parse.css">
    <link rel="stylesheet" href="./css/test.css">
    <link rel="stylesheet" href="./css/test_question.css">
    <link rel="stylesheet" href="./css/important.css">
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