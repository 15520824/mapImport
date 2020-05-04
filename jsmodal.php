<?php

/*
php:
    function write_modal_style();
    function write_modal_body();
javascript:
    function hideModal(index);
    function isModalReady();
    function showModal(index, bodycontent);
    function showWindowedModal(index, title, bodycontent);
    function updateModal(index, bodycontent);
    function currentModalContent(index);
    function closeModal(index);
    function closeAllModal();
    function hideModal(index);
    function repaintModal(index);
    function modal_lockInput();
    function modal_unlockInput();
    function modal_newlayer(); // return highest layer index
    function modal_loading();
    function modal_alert(message, function());
    function modal_question(message, choicelist, function(selectedindex));
    function modal_prompt(message, defaultvalue, function(returnvalue));
    function modal_singleInput(message, defaultvalue, optional inputsize, function(returnvalue));
    function modal_multipleInput(message, inputarray [][name, defaultvalue, align(0 = left, 1 = right)]], optional inputsize, function(returnvaluelist));
    function modal_fullInput(message, inputarray [][name, type, defaultvalue, align(0 = left, 1 = right)]], optional inputsize, clickArray ["ok", "cancel"...], function(clickbutton, returnvaluelist));
*/

include_once "common.php";
include_once "jsbutton.php";
include_once "jsmodal_new.php";


$modal_style_written = 0;
$modal_body_written = 0;

function write_modal_style() {
    global $modal_style_written;
    ModalClass::write_script();
    if ($modal_style_written == 1) return 0;
?><script>
    function isModalReady() {
        return ModalClass.isReady();
    }

    function updateModal(index, bodycontent, bodytitle) {
        var t;
        if (bodycontent === undefined) {
            ModalClass.update({
                index: 0,
                bodycontent: index
            });
            return;
        }
        t = {
            index: index,
            bodycontent: bodycontent,
        }
        if (bodytitle !== undefined) t.bodytitle = bodytitle;
        ModalClass.update(t);
    }

    function showModal(index, bodycontent) {
        if (bodycontent === undefined) {
            ModalClass.show({
                index: 0,
                bodycontent: index
            });
        }
        else {
            ModalClass.show({
                index: index,
                bodycontent: bodycontent
            })
        }
    }

    function showWindowedModal(index, title, bodycontent) {
        if (bodycontent === undefined) {
            bodycontent = title;
            title = "";
        }
        ModalClass.showWindow({
            index: index,
            title: title,
            bodycontent: bodycontent
        });
    }

    function currentModalContent(index) {
        if (index === undefined) index = 0;
        return ModalClass.currentContentString(index);
    }

    function modal_lockInput() {
        ModalClass.lockInput();
    }
    function modal_unlockInput() {
        ModalClass.unlockInput();
    }

    function modal_loading() {
        ModalClass.show_loading();
    }

    function modal_alert(message, func) {
        if (func === undefined) {
            return ModalClass.alert({
                message: message
            });
        }
        else {
            return ModalClass.alert({
                message: message,
                func: func
            });
        }
    }

    function modal_question(message, choicelist, func) {
        if (func !== undefined) {
            ModalElement.question({
                message: message,
                choicelist: choicelist,
                onclick: func
            })
        }
        else {
            ModalClass.question({
                message: message,
                choicelist: choicelist,
            });
        }
    }

    function modal_singleInput(message, defaultvalue, inputsize, func) {

        if (func === undefined) {
            func = inputsize;
            inputsize = 35;
        }
        ModalClass.singleInput({
            message: message,
            defaultvalue: defaultvalue,
            inputsize: inputsize,
            func: func
        });
    }

    function modal_prompt(message, defaultvalue, func) {
        return modal_singleInput(message, defaultvalue, func);
    }

    function modal_multipleInput(message, inputarray, inputsize, func) {
        var i, t;
        if (func === undefined) {
            func = inputsize;
            inputsize = 30;
        }
        t = {
            message: message,
            inputlist: [],
            inputsize: inputsize,
            func: func
        };
        for (i = 0; i < inputarray.length; i++) t.inputlist.push({
            name: inputarray[i][0],
            defaultvalue: inputarray[i][1],
            align: inputarray[i][2]
        });
        ModalClass.multipleInput(t);
    }

    function modal_fullInput(message, inputarray, inputsize, clickArray, func) {
        var i, t;
        if (func === undefined) {
            func = clickArray;
            clickArray = inputsize;
            inputsize = 30;
        }
        t = {
            message: message,
            inputlist: [],
            buttonList: clickArray,
            inputsize: inputsize,
            func: func
        };
        for (i = 0; i < inputarray.length; i++) t.inputlist.push({
            name: inputarray[i][0],
            defaultvalue: inputarray[i][1],
            type: inputarray[i][2],
            align: inputarray[i][3],
        });
        ModalClass.fullInput(t);
    }

    function hideModal(index) {
        if (index === undefined) index = 0;
        ModalClass.hide(index);
    }

    function repaintModal(index) {
        ModalClass.repaint(index);
    }

    function closeModal(index) {
        if (index === undefined) index = 0;
        ModalClass.close(index);
    }

    function closeAllModal() {
        ModalClass.closeAll();
    }

    function modal_newlayer() {
        return ModalClass.newlayer();
    }

    </script><?php
    $modal_style_written = 1;
    return 1;
}

function write_modal_body() {
    return ModalClass::write_body();
}
?>
