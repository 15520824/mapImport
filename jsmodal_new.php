<?php
include_once "jsmodalelement.php";

/*
php:
    function ModalClass::write_script();
    function ModalClass::write_body();
javascript:
    function ModalClass.hide(index);
    function ModalClass.isReady();
    function ModalClass.show({
        [optional] index,
        [optional] overflow,
        [option1] element,
        [option2] bodycontent
    })
    function ModalClass.showWindow({
        [optional] index,
        [optional] title,
        [option1] element
        [option2] bodycontent
    });
    function ModalClass.update({
        [optional] index,
        [option1] element,
        [option2] bodycontent
    });
    function ModalClass.currentContent(index);
    function ModalClass.currentContentString(index);
    function ModalClass.close(index);
    function ModalClass.closeAll();
    function ModalClass.hide(index);
    function ModalClass.repaint(index);
    function ModalClass.lockInput();
    function ModalClass.unlockInput();
    function ModalClass.newlayer(); // return highest layer index
    function ModalClass.show_loading();
    function ModalClass.alert ({
        message: message,
        [optional] buttontype: "white-gray",
        [optional] func: function()
    });
    function ModalClass.question ({
        message: "select car brand",
        choicelist: ["ford", "chevrolet", "nissan", "toyota"],
        [optional] buttontype: "white-gray",
        func: function(selectedindex)
    });
    function ModalClass.prompt ({
        message: "enter your age",
        [optional] defaultvalue: "18",
        [optional] buttontype: "white-gray",
        [optional] inputsize: 35,
        func: function(returnvalue)
    });
    function ModalClass.singleInput ({
        [optional] message: "enter your age",
        [optional] defaultvalue: "18",
        [optional] buttontype: "white-gray",
        [optional] inputsize: 35,
        func: function(returnvalue)
    });
    function ModalClass.multipleInput ({
        message: "enter your information",
        inputlist: [
                        {
                            name: "fullname",
                            [optional] defaultvalue: "",
                            align: ModalClass.align.left
                        },
                        {
                            name: "age",
                            [optional] defaultvalue: "18",
                            align: ModalClass.align.right
                        },
                ],
        [optional] inputsize: 30,
        [optional] buttontype: "white-gray",
        func: function(returnvaluearray)
    });
    function ModalClass.fullInput ({
        message: "enter your information",
        inputlist: [
                        {
                            name: "fullname",
                            [optional] defaultvalue: "",
                            type: "text",
                            align: ModalClass.align.left
                        },
                        {
                            name: "age",
                            type: "text",
                            [optional] defaultvalue: "18",
                            align: ModalClass.align.right
                        },
                ],
        [optional] inputsize: 30,
        buttonList: ["ok", "cancel"...],
        func: function(clickbutton, returnvaluelist)
    });
*/

include_once "common.php";
include_once "jsbutton.php";
include_once "jsdom.php";

$modal_new_style_written = 0;
$modal_body_written = 0;

class   ModalClass {

    public static function write_script() {
        global $modal_new_style_written;
        if ($modal_new_style_written == 1) return 0;
        write_common_script();
        DOMClass::write_script();
        buttonClass::write_script();
        ModalElementClass::write_script();
        ?><script type="text/javascript">

            var ModalClass = {
                align : {
                        left: 0,
                        right: 1,
                        center: 2
                },

                isReady : function () {
                    return ModalElement.isReady();
                },

                update : function (params) {
                    ModalElement.update(params);
                },

                show : function (params) {
                    ModalElement.show(params);
                },

                showWindow : function (params) {
                    ModalElement.showWindow(params);
                },

                currentContent : function (index) {
                    return ModalElement.currentContent();
                },

                currentContentString : function (index) {
                    return ModalElement.currentContentString();
                },

                lockInput : function () {
                    ModalElement.lockInput();
                },

                unlockInput : function () {
                    ModalElement.unlockInput();
                },

                show_loading : function () {
                    ModalElement.show_loading();
                },

                show_testConsole: function () {
                    var st;
                    st = DOMClass.table.generate({
                        data: [
                            {cells: [{style: "height: 20px;"}]},
                            {cells: [
                                {innerHTML: DOMClass.inputTextString({
                                    elementid: "modal_testcmd_inputtext",
                                    width: 700
                                })},
                                {style: "width: 20px; height: 34px;"},
                                {innerHTML: buttonClass.generate({
                                    type: "white-gray",
                                    caption: "Exec",
                                    command: "var x=document.getElementById('modal_testcmd_inputtext'); eval(x.value); x.value='';",
                                    width: 128,
                                    height: 24,
                                })}
                            ]},
                            {cells: [{style: "width: 20px;"}]},
                            {cells: [{
                                align: "center",
                                colspan: 3,
                                innerHTML: buttonClass.generate({
                                    type: "white-gray",
                                    caption: "Close",
                                    command: "ModalClass.close(-1);",
                                    width: 128,
                                    height: 24,
                                })
                            }]},
                            {cells: [{style: "width: 20px;"}]},
                        ]
                    })
                    + DOMClass.onloadString("document.getElementById('modal_testcmd_inputtext').focus();");
                    ModalClass.show({
                        index: -1,
                        bodycontent: st
                    });
                },

                alert : function (params) {
                    if (params.buttontype !== undefined) {
                        switch (params.buttontype) {
                            case "black-gray":
                                params.class = "button-black-gray";
                                break;
                            case "black-red":
                                params.class = "button-black-red";
                                break;
                        }
                    }
                    ModalElement.alert(params);
                },

                question : function (params) {
                    return ModalElement.question(params);
                },

                singleInput : function (params) {
                    ModalElement.singleInput(params);
                },

                modal_prompt : function (params) {
                    ModalElement.singleInput(params);
                },

                multipleInput : function (params) {
                    ModalElement.multipleInput(params);
                },

                fullInput : function (params) {
                    ModalElement.fullInput(params);
                },

                hide : function (index) {
                    ModalElement.hide(index);
                },

                repaint : function (index) {
                    ModalElement.repaint(index);
                },

                close : function (index) {
                    ModalElement.close(index);
                },

                closeAll : function () {
                    ModalElement.closeAll();
                },

                newlayer : function () {
                    return ModalElement.newlayer();
                },

            };

        </script><?php
    }

    public static function write_body() {
        global $modal_body_written;
        if ($modal_body_written == 1) return 0;
        $modal_body_written = 1;
        ?>
        <script type="text/javascript">
            //ModalElement.init();
        </script>
        <?php
        return 1;
    }
}?>
