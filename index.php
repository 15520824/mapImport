<?php
    include_once "prefix.php";
    include_once "connection.php";
    include_once "common.php";
    include_once "jsdb.php";
    include_once "jsdom.php";
    include_once "jsdomelement.php";
    include_once "jsencoding.php";
    include_once "jsform_new.php";
    include_once "jsform.php";
    include_once "jsmodalelement.php";
    include_once "menu.php";
    include_once "jsbootstrap.php";
    include_once "style_kpi.php";
    include_once "content_module.php";
    include_once "jsbutton_071218.php";
    include_once "bsc2kpi_111218.php";
    include_once "newlogin.php";
    include_once "blackTheme.php";
    include_once "reporter_survey.php";
    include_once "reporter_survey_information.php";
    include_once "reporter_type_survey.php";
    include_once "reporter_type_survey_information.php";
    include_once "reporter_record.php";
    include_once "reporter_record_information.php";
    include_once "reporter_feedback.php";
    include_once "reporter_feedback_information.php";
    include_once "languagemodule.php";
    include_once "./old_php/reporter_users.php";
    include_once "./old_php/reporter_users_information.php";

    LanguageModule_load("FORM",$prefix."uitext");
        if (isset($_SESSION[$prefixhome."language"])) {
            $LanguageModule_v_defaultcode = $_SESSION[$prefixhome."language"];
        }
    session_start();
    $add =  $_SERVER['REQUEST_URI'];
    $protocal =  isset($_SERVER['HTTPS'])? "https://":"http://";
    $temp = substr($add, 1);
    $temp2 = strpos($temp, "/");
    if (!isset($_SESSION[$prefixhome."userid"])) {
        $x = $_SERVER['SERVER_NAME']."/".substr($temp, 0, $temp2)."?id=".substr($temp,$temp2+1);
        header("Location:".$protocal.$x);
        exit();
    }
    $conn = DatabaseClass::init($host, $username , $password, $dbname);
    $result = $conn->load($prefix."users", "(homeid = ".$_SESSION[$prefixhome."userid"].")", "id");
    if ((count($result) == 0)){
        $_SESSION[$prefix.'userid'] = 0;
        $x = $_SERVER['SERVER_NAME']."/".substr($temp, 0, $temp2);
        $pfid = 0;
    }
    else {
        $_SESSION[$prefix.'userid'] = $result[0]['id'];
        $_SESSION[$prefix.'privilege'] = $result[0]['privilege'];
        $x = $_SERVER['SERVER_NAME']."/".substr($temp, 0, $temp2);
    }

    ?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <style>
        .bodyFrm .resetClass {
            font-size: inherit;
        }
        </style>
        <script src="js/component.js?time=<?php echo time(); ?>"></script>
        <script src="js/formTestComponent.js?time=<?php echo time(); ?>"></script>
        <script src="js/modal_drag_drop_image.js?time=<?php echo time(); ?>"></script>
        <script src="js/modal_drag_drop_question.js?time=<?php echo time(); ?>"></script>
        <script src="js/modal_feedback_correct_or_incorrect.js?time=<?php echo time(); ?>"></script>
        <script src="js/data_module.js?time=<?php echo time(); ?>"></script>
        <script src="js/XML_db_load.js?time=<?php echo time(); ?>"></script>
        <script src="js/XML_db_create.js?time=<?php echo time(); ?>"></script>
        <script src="js/XML_create_edit.js?time=<?php echo time(); ?>"></script>
        <script src="js/XML_list_create.js?time=<?php echo time(); ?>"></script>
        <script src="js/XML.js?time=<?php echo time(); ?>"></script>
        <script src="js/XML_db_record.js?time=<?php echo time(); ?>"></script>

        <script>
            <?php
                    include_once "absol/absol_full.php";
                    include_once "module_define.php";
                    include_once "module_style.php";
            ?>
            var systemconfig = {
                separateSign: ",",
                commaSign: "."
            };
        </script>
        <?php
            write_login_header();
            DOMClass::write_script();
            DOMElementClass::write_script();
            EncodingClass::write_script();
            FormClass::write_script();
            ModalElementClass::write_script();
            BootstrapElementClass::write_script();
            write_common_script();
            write_form_script();
            write_bsc2kpi1112_script();
            write_module_define_script();
            write_module_style_script();
        ?>
        <title>FORM TEST CREATE<?php if (isset($company_name)) {if ($company_name != "") echo " - ".$company_name;}?></title>
        <script type="text/javascript">
        "use strict";
            
            var database = {};
            var formTest = {
                menu: {},
                account: {},
                reporter_surveys: {},
                reporter_surveys_information: {},
                reporter_type_surveys: {},
                reporter_type_surveys_information: {},
                reporter_record: {},
                reporter_record_information: {},
                reporter_feedback: {},
                reporter_feedback_information: {},
                reporter_users:{},
                reporter_users_information:{}
            };
            var blackTheme = {
                reporter_surveys: {},
                reporter_type_surveys:{},
                reporter_questions:{},
                reporter_record: {},
                reporter_feedback: {},
                reporter_users:{} 
            };
        </script>
        <style media="screen">
            .bodyFrm .resetClass{
                font-family:Arial;
            }
        </style>
        <?php
        $thememode = 1;
        write_button_071218_style_black();
        write_content_script();
        write_kpi_script();
        write_menu_script();
        LanguageModule_writeJavascript("FORM", $LanguageModule_v_defaultcode);
        write_reporter_script_black();
        write_reporter_surveys_script();
        write_reporter_surveys_information_script();
        write_reporter_type_surveys_script();
        write_reporter_type_surveys_information_script();
        write_reporter_record_script();
        write_reporter_record_information_script();
        write_reporter_feedback_script();
        write_reporter_feedback_information_script();
        write_reporter_users_script();
        write_reporter_users_information_script();
        ?>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="css/form.css">
        <link rel="stylesheet" href="css/form_create_edit.css">
        <link rel="stylesheet" href="css/list.css">
        <link rel="stylesheet" href="css/test_parse.css">
        <link rel="stylesheet" href="css/test.css">
        <link rel="stylesheet" href="css/test_question.css">
        <link rel="stylesheet" href="css/test_feedback.css">
        <link rel="stylesheet" href="css/important.css">
        <script type="text/javascript">
            var init = function () {
                var userid = parseInt("<?php if (isset($_SESSION[$prefix.'userid'])) echo $_SESSION[$prefix.'userid']; else echo 0; ?>", 10);
                if (userid == 0){
                    ModalElement.alert({
                        message: "Tài khoản không có quyền truy cập ứng dụng này",
                        func: function(){
                            var link = "<?php echo $protocal.$x ?>";
                            location.href = link;
                        },
                        class: "btn btn-primary"
                    });
                    return;
                }
                ModalElement.alert = function (params) {
                    var message = params.message, func = params.func, h;
                    if (message === undefined) message = "";
                    if (func === undefined) func = function () {};
                    h = DOMElement.table({data: [
                        [{attrs: {style: {fontSize: "4px",height: "10px"}}}],
                        [{
                            attrs: {
                                align: "center",
                                style: {
                                    border: "0",
                                    minWidth: "200px"
                                }
                            },
                            text: message
                        }],
                        [{
                            attrs: {
                                style: {
                                    border: "0",
                                    fontSize: "4px",
                                    height: "20px"
                                }
                            }
                        }],
                        [{
                            attrs: {
                                align: "center",
                                style: {
                                    border: "0"
                                }
                            },
                            children: [
                                absol.buildDom({
                                tag: "iconbutton",
                                on: {
                                    click: function() {
                                        return function (event, me) {
                                        ModalElement.close();
                                        func();
                                        }
                                    }
                                },
                                child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'done'
                                        }
                                    },
                                    '<span>' + 'OK' + '</span>'
                                ]})]
                        }]
                    ]});
                    ModalElement.show({
                        bodycontent: h,
                        overflow: params.overflow
                    });
                };
                var holder = DOMElement.div({});
                DOMElement.bodyElement.appendChild(holder);
   
                    ModalElement.question = function (params) {
                    var message = params.message,title = params.title, h, func = params.onclick;
                    if (message === undefined) message = "";
                    if (title === undefined) title = "Question";
                    if (func === undefined) func = function(){};
                    var data = [
                        [{attrs: {style: {fontSize: "4px",height: "10px"}}}],
                        [{
                            attrs: {
                                align: "center",
                                style: {
                                    border: "0",
                                    minWidth: "300px",
                                }
                            },
                            text: message
                        }]
                    ];
                    data.push([{
                        attrs: {
                            style: {
                                border: "0",
                                fontSize: "4px",
                                height: "20px"
                            }
                        }
                    }],
                    [{
                        attrs: {
                            align: "center",
                            style: {
                                border: "0"
                            }
                        },
                        children: [DOMElement.table({
                            attrs: {
                                style: {
                                    border: "0"
                                }
                            },
                            data: [[
                                {
                                    attrs: {
                                        align: "center",
                                        style: {
                                            border: "0"
                                        }
                                    },
                                    children: [
                                        absol.buildDom({
                                            tag: "iconbutton",
                                            on: {
                                                click: function(func) {
                                                    return function (event, me) {
                                                        ModalElement.close();
                                                        func(0);
                                                    }
                                                } (func)
                                            },
                                            child: [{
                                                    tag: 'i',
                                                    class: 'material-icons',
                                                    props: {
                                                        innerHTML: 'done'
                                                    }
                                                },
                                                '<span>' + 'Có' + '</span>'
                                            ]
                                        })]
                                },
                                {
                                    attrs: {style: {width: "20px"}}
                                },
                                {
                                    attrs: {
                                        align: "center",
                                        style: {
                                            border: "0"
                                        }
                                    },
                                    children: [
                                        absol.buildDom({
                                            tag: "iconbutton",
                                            on: {
                                                click: function(func) {
                                                    return function (event, me) {
                                                        ModalElement.close();
                                                        func(1);
                                                    }
                                                } (func)
                                            },
                                            child: [{
                                                    tag: 'i',
                                                    class: 'material-icons',
                                                    props: {
                                                        innerHTML: 'clear'
                                                    }
                                                },
                                                '<span>' + 'Không' + '</span>'
                                            ]
                                        })]
                                }
                            ]]
                        })]
                    }]);
                    h = DOMElement.table({data: data});
                    ModalElement.showWindow({
                        title: title,
                        bodycontent: h
                    });
                };
                    formTest.menu.init(holder);
                    formTest.prefix = "<?php if (isset($prefix)) {echo $prefix;}?>";
                    formTest.dbname = "<?php if (isset($dbname)) {echo $dbname;}?>";
                    formTest.dbnamelibary = "<?php if (isset($dbnamelibary)) {echo $dbnamelibary;}?>";
            };
        </script>
    </head>
	<body onload="setTimeout('init();',  10);"></body>
</html>
