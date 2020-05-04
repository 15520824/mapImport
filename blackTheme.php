<?php
    function write_reporter_script_black() {
        global $prefix;

?>
<script type="text/javascript">
blackTheme.reporter_surveys.generateTableDatasurvey = function(host) {
    var data = [];
    var celldata = [];
    var indexlist = [];
    var temp;
    var i, k, sym, con;

    for (i = 0; i < data_module.survey.items.length; i++) {
        indexlist.push(i);
    }
    for (k = 0; k < data_module.survey.items.length; k++) {
        i = indexlist[k];
        celldata = [k + 1];
        celldata.push({
            text: data_module.survey.items[i].value
        });
        celldata.push({
            text: data_module.type.getById(data_module.survey.items[i].type).value
        });
        list = [];

        if (true) {
            sym = DOMElement.i({
                attrs: {
                    className: "material-icons",
                    style: {
                        fontSize: "20px",
                        color: "#929292"
                    }
                },

                text: "mode_edit"
            });
            con = DOMElement.div({
                attrs: {
                    style: {
                        width: "100px"
                    }
                },
                text: 'Sửa'
            });
            sym.onmouseover = con.onmouseover = function(sym, con) {
                return function(event, me) {
                    sym.style.color = "black";
                    con.style.color = "black";
                }
            }(sym, con);
            sym.onmouseout = con.onmouseout = function(sym, con) {
                return function(event, me) {
                    sym.style.color = "#929292";
                    con.style.color = "#929292";
                }
            }(sym, con);
            list.push({
                attrs: {
                    style: {
                        width: "170px"
                    }
                },
                symbol: sym,
                content: con,
                onclick: function(tempabc, index, host) {
                    return function(){
                    var temp1 = blackTheme.reporter_surveys.addSurvey(host,tempabc.id);
                    host.frameList.addChild(temp1);
                    host.frameList.activeFrame(temp1);
                    DOMElement.cancelEvent(event);
                    return false;
                    }
                }(data_module.survey.items[i], i, host)
            });
        }
        sym = DOMElement.i({
                attrs: {
                    className: "material-icons",
                    style: {
                        fontSize: "20px",
                        color: "#929292"
                    }
                },

                text: "playlist_add_check"
            });
            con = DOMElement.div({
                attrs: {
                    style: {
                        width: "100px"
                    }
                },
                text: 'Thực hiện'
            });
            sym.onmouseover = con.onmouseover = function(sym, con) {
                return function(event, me) {
                    sym.style.color = "black";
                    con.style.color = "black";
                }
            }(sym, con);
            sym.onmouseout = con.onmouseout = function(sym, con) {
                return function(event, me) {
                    sym.style.color = "#929292";
                    con.style.color = "#929292";
                }
            }(sym, con);
            list.push({
                attrs: {
                    style: {
                        width: "170px"
                    }
                },
                symbol: sym,
                content: con,
                onclick: function(tempabc, index, host) {
                    return function(){
                    var temp1 = blackTheme.reporter_surveys.performSurvey(host,tempabc.id);
                    host.frameList.addChild(temp1);
                    host.frameList.activeFrame(temp1);
                    DOMElement.cancelEvent(event);
                    return false;
                    }
                }(data_module.survey.items[i], i, host)
        });
        sym = DOMElement.i({
                attrs: {
                    className: "material-icons",
                    style: {
                        fontSize: "20px",
                        color: "#929292"
                    }
                },
                text: "delete_sweep"
            }),
            con = DOMElement.div({
                attrs: {
                    style: {
                        width: "100px"
                    }
                },
                text: 'Xóa'
            });
        sym.onmouseover = con.onmouseover = function(sym, con) {
            return function(event, me) {
                sym.style.color = "black";
                con.style.color = "black";
            }
        }(sym, con);
        sym.onmouseout = con.onmouseout = function(sym, con) {
            return function(event, me) {
                sym.style.color = "#929292";
                con.style.color = "#929292";
            }
        }(sym, con);
        list.push({
            attrs: {
                style: {
                    width: "170px"
                }
            },
            symbol: sym,
            content: con,
            onclick: function(id, host) {
                return function(event, me) {
                    blackTheme.reporter_surveys.removesurvey(id);
                    DOMElement.cancelEvent(event);
                    return false;
                }
            }(data_module.survey.items[i].id, host)
        });
        h = DOMElement.choicelist({
            textcolor: "#929292",
            align: "right",
            symbolattrs: {
                style: {
                    width: "40px"
                }
            },
            list: list
        });
        celldata.push({
            attrs: {
                style: {
                    width: "40px",
                    textAlign: "center"
                }
            },
            children: [
                DOMElement.i({
                    attrs: {
                        className: "material-icons " + DOMElement.dropdownclass.button,
                        style: {
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "#929292"
                        },
                        onmouseover: function(event, me) {
                            me.style.color = "black";
                        },
                        onmouseout: function(event, me) {
                            me.style.color = "#929292";
                        },
                        onclick: function(host1) {
                            return function(event, me) {
                                host1.toggle();
                                DOMElement.cancelEvent(event);
                                return false;
                            }
                        }(h)
                    },
                    text: "more_vert"
                }), h
            ]
        });
        data.push(celldata);
    }
    return data;
};

blackTheme.reporter_surveys.removesurvey = function(id) {
    ModalElement.question({
        title: 'Xóa bài khảo sát',
        message: 'Bạn có chắc muốn xóa : ' + "" + data_module.survey.getByID(id).value,
        choicelist: [
                {
                    text: "Đồng ý"
                },
                {
                    text: "Hủy"
                }
        ],
        onclick: function(id) {
            return function(selectedindex) {
                switch (selectedindex) {
                    case 0:
                        data_module.survey.removeOne(id);
                        break;
                    case 1:
                        // do nothing
                        break;
                }
            }
        }(id)
    });
}

blackTheme.reporter_surveys.addSurvey = function(host,id){
    var containerList = absol.buildDom({
        tag:"div",
        class:"update-catergory"
    })
    var temp = absol.buildDom({
        tag:'singlepage',
        child:[
            {
                class: 'absol-single-page-header',
                child:[
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                temp.selfRemove();
                                var arr=host.frameList.getAllChild();
                                host.frameList.activeFrame(arr[arr.length-1]);
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'close'
                                },
                            },
                            '<span>' + "Đóng" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        class:"info",
                        on: {
                            click: function(evt) {
                                if(containerList.childNodes[0]!==undefined)
                                {
                                    ModalElement.show_loading();
                                    xmlDbCreate.saveAll(containerList.childNodes[0].getValue()).then(function(){
                                        ModalElement.close(-1);
                                        var arrSrc = document.getElementsByTagName("img");
                                        for(var i=0;i<arrSrc.length;i++)
                                        {
                                            if(arrSrc[i].getAttribute("src")!==null)
                                            if(arrSrc[i].getAttribute("src").indexOf("./img/delete/img")!==-1)
                                            arrSrc[i].src=arrSrc[i].getAttribute("src").replace("./img/delete/img", "./img/upload/img");
                                        }
                                        xmlModalDragImage.deleteAllTrash();
                                    })
                                }
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                if(containerList.childNodes[0]!==undefined)
                                {
                                    ModalElement.show_loading();
                                    xmlDbCreate.saveAll(containerList.childNodes[0].getValue()).then(function(){
                                        ModalElement.close(-1);
                                        var arrSrc = document.getElementsByTagName("img");
                                        for(var i=0;i<arrSrc.length;i++)
                                        {
                                            if(arrSrc[i].getAttribute("src")!==null)
                                            if(arrSrc[i].getAttribute("src").indexOf("./img/delete/img")!==-1)
                                            arrSrc[i].src=arrSrc[i].getAttribute("src").replace("./img/delete/img", "./img/upload/img");
                                        }
                                        xmlModalDragImage.deleteAllTrash();
                                        temp.selfRemove();
                                        var arr=host.frameList.getAllChild();
                                        host.frameList.activeFrame(arr[arr.length-1]);
                                    })
                                }
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu và đóng" +
                            '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                if(containerList.childNodes[0]!==undefined)
                                {
                                    var popUp = window.open("http://lab.daithangminh.vn/home_co/Form/listForm/XMLparseFormPreview.php",'');
                                    popUp.xmlData=containerList.childNodes[0].getValue();
                                } 
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'remove_red_eye'
                                },
                            },
                            '<span>' + "Xem trước" + '</span>'
                        ]
                    }
                ]
            },
            {
                class: 'absol-single-page-footer'
            }
        ]})
    var cloneXmlRequestCreateEdit = {...xmlRequestCreateEdit};
    ModalElement.show_loading();
    var opposite = cloneXmlRequestCreateEdit.readXMLFromDB(id,containerList,host).then(function(e){
        ModalElement.close(-1);
    })
    temp.addChild(containerList);
    formTest.menu.footer(absol.$('.absol-single-page-footer', temp));
    return temp;
}

blackTheme.reporter_surveys.performSurvey = function(host,id){
    var containerList = absol.buildDom({
        tag:"div",
        class:"update-catergory"
    })
    var temp = absol.buildDom({
        tag:'singlepage',
        child:[
            {
                class: 'absol-single-page-header',
                child:[
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                temp.close();
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'close'
                                },
                            },
                            '<span>' + "Đóng" + '</span>'
                        ]
                    }
                ]
            },
            {
                class: 'absol-single-page-footer'
            }
        ]})
    var cloneXmlRequest = {...xmlRequest};
    ModalElement.show_loading();
    cloneXmlRequest.readXMLFromDB(id,containerList).then(function(e){
        ModalElement.close(-1);
    })
    console.log(temp);
    temp.close = function()
    {
        temp.selfRemove();
        var arr=host.frameList.getAllChild();
        host.frameList.activeFrame(arr[arr.length-1]);
    }
    temp.addChild(containerList);
    formTest.menu.footer(absol.$('.absol-single-page-footer', temp));
    return temp;
}

blackTheme.reporter_surveys.updateSurvey = function(host, param) {
    var temp = absol.buildDom({
        tag:'singlepage',
        child:[
            {
                class: 'absol-single-page-header',
                child:[
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                temp.selfRemove();
                                var arr=host.frameList.getAllChild();
                                host.frameList.activeFrame(arr[arr.length-1]);
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Đóng" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                var paramEdit = [{
                                        name: "id",
                                        value: param.id
                                    },
                                    {
                                        name: "value",
                                        value: name.childNodes[1].value
                                    },
                                ]
                                data_module.type.updateOne(paramEdit)
                                    .then(function() {
                                    })


                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                var paramEdit = [{
                                        name: "id",
                                        value: param.id
                                    },
                                    {
                                        name: "value",
                                        value: name.childNodes[1].value
                                    },
                                ]
                                data_module.type.updateOne(paramEdit)
                                    .then(function() {
                                        temp.selfRemove();
                                        var arr=host.frameList.getAllChild();
                                        host.frameList.activeFrame(arr[arr.length-1]);
                                    })


                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu và đóng" +
                            '</span>'
                        ]
                    }
                ]
            },
            {
                class: 'absol-single-page-footer'
            }
        ]})
        formTest.menu.footer(absol.$('.absol-single-page-footer', temp));
        temp.addChild(DOMElement.div({
                attrs: {
                    className: "update-catergory",
                },
                children: [
                    name,
                ]
            }));
    return temp;
}

blackTheme.reporter_type_surveys.generateTableDatatype_survey = function(host)
{
    var data = [];
    var celldata = [];
    var indexlist = [];
    var temp;
    var i, k, sym, con;

    for (i = 0; i < data_module.type.items.length; i++) {
        indexlist.push(i);
    }
    for (k = 0; k < data_module.type.items.length; k++) {
        i = indexlist[k];
        celldata = [k + 1];
        celldata.push({
            text: data_module.type.items[i].value
        });
        list = [];

        if (true) {
            sym = DOMElement.i({
                attrs: {
                    className: "material-icons",
                    style: {
                        fontSize: "20px",
                        color: "#929292"
                    }
                },
                text: "mode_edit"
            });
            con = DOMElement.div({
                attrs: {
                    style: {
                        width: "100px"
                    }
                },
                text: 'Sửa'
            });
            sym.onmouseover = con.onmouseover = function(sym, con) {
                return function(event, me) {
                    sym.style.color = "black";
                    con.style.color = "black";
                }
            }(sym, con);
            sym.onmouseout = con.onmouseout = function(sym, con) {
                return function(event, me) {
                    sym.style.color = "#929292";
                    con.style.color = "#929292";
                }
            }(sym, con);
            list.push({
                attrs: {
                    style: {
                        width: "170px"
                    }
                },
                symbol: sym,
                content: con,
                onclick: function(tempabc, index, host) {
                    return function(){
                        var temp1 = blackTheme.reporter_type_surveys.updateType(host,tempabc);
                        host.frameList.addChild(temp1);
                        host.frameList.activeFrame(temp1);
                        DOMElement.cancelEvent(event);
                        return false;
                    }
                }(data_module.type.items[i], i, host)
            });
        }
        sym = DOMElement.i({
                attrs: {
                    className: "material-icons",
                    style: {
                        fontSize: "20px",
                        color: "#929292"
                    }
                },
                text: "delete_sweep"
            }),
        con = DOMElement.div({
                attrs: {
                    style: {
                        width: "100px"
                    }
                },
                text: 'Xóa'
            });
        sym.onmouseover = con.onmouseover = function(sym, con) {
            return function(event, me) {
                sym.style.color = "black";
                con.style.color = "black";
            }
        }(sym, con);
        sym.onmouseout = con.onmouseout = function(sym, con) {
            return function(event, me) {
                sym.style.color = "#929292";
                con.style.color = "#929292";
            }
        }(sym, con);
        list.push({
            attrs: {
                style: {
                    width: "170px"
                }
            },
            symbol: sym,
            content: con,
            onclick: function(id, host) {
                return function(event, me) {
                    blackTheme.reporter_type_surveys.removeType(id);
                    DOMElement.cancelEvent(event);
                    return false;
                }
            }(data_module.type.items[i].id, host)
        });
        h = DOMElement.choicelist({
            textcolor: "#929292",
            align: "right",
            symbolattrs: {
                style: {
                    width: "40px"
                }
            },
            list: list
        });
        celldata.push({
            attrs: {
                style: {
                    width: "40px",
                    textAlign: "center"
                }
            },
            children: [
                DOMElement.i({
                    attrs: {
                        className: "material-icons " + DOMElement.dropdownclass.button,
                        style: {
                            fontSize: "20px",
                            cursor: "pointer",
                            color: "#929292"
                        },
                        onmouseover: function(event, me) {
                            me.style.color = "black";
                        },
                        onmouseout: function(event, me) {
                            me.style.color = "#929292";
                        },
                        onclick: function(host1) {
                            return function(event, me) {
                                host1.toggle();
                                DOMElement.cancelEvent(event);
                                return false;
                            }
                        }(h)
                    },
                    text: "more_vert"
                }), h
            ]
        });
        data.push(celldata);
    }
    return data;
}

blackTheme.reporter_type_surveys.addType = function(host){
    var name = formTestComponent.spanInput("Tên", "");
    var note = formTestComponent.spanInput("Ghi chú", "", false);
    var temp = absol.buildDom({
        tag:'singlepage',
        child:[
            {
                class: 'absol-single-page-header',
                child:[
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                temp.selfRemove();
                                var arr=host.frameList.getAllChild();
                                host.frameList.activeFrame(arr[arr.length-1]);
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Đóng" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                var paramEdit = [
                                    {
                                        name: "value",
                                        value: name.childNodes[1].value
                                    },
                                    {
                                        name: "note",
                                        value: note.childNodes[1].value,
                                    }
                                ]
                                data_module.type.addOne(paramEdit)
                                    .then(function() {
                                    })


                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                var paramEdit = [
                                    {
                                        name: "value",
                                        value: name.childNodes[1].value,
                                    },
                                    {
                                        name: "note",
                                        value: note.childNodes[1].value,
                                    }
                                ]
                                data_module.type.addOne(paramEdit)
                                    .then(function() {
                                        temp.selfRemove();
                                        var arr=host.frameList.getAllChild();
                                        host.frameList.activeFrame(arr[arr.length-1]);
                                    })


                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu và đóng" +
                            '</span>'
                        ]
                    }
                ]
            },
            {
                class: 'absol-single-page-footer'
            }
        ]})
     temp.addChild(DOMElement.div({
                attrs: {
                    className: "update-catergory",
                    style: {},
                },
                children: [
                    name,
                    note
                ]
            }))
    formTest.menu.footer(absol.$('.absol-single-page-footer', temp));
    return temp;
}

blackTheme.reporter_type_surveys.updateType = function(host, param) {
    var name = formTestComponent.spanInput("Tên", param.value);
    var note = formTestComponent.spanInput("Ghi chú", param.note, false);
    var temp = absol.buildDom({
        tag:'singlepage',
        child:[
            {
                class: 'absol-single-page-header',
                child:[
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                temp.selfRemove();
                                var arr=host.frameList.getAllChild();
                                host.frameList.activeFrame(arr[arr.length-1]);
                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Đóng" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                var paramEdit = [{
                                        name: "id",
                                        value: param.id
                                    },
                                    {
                                        name: "value",
                                        value: name.childNodes[1].value
                                    },
                                    {
                                        name: "note",
                                        value: note.childNodes[1].value,
                                    }
                                ]
                                data_module.type.updateOne(paramEdit)
                                    .then(function() {
                                    })


                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu" + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        on: {
                            click: function(evt) {
                                var paramEdit = [{
                                        name: "id",
                                        value: param.id
                                    },
                                    {
                                        name: "value",
                                        value: name.childNodes[1].value
                                    },
                                    {
                                        name: "note",
                                        value: note.childNodes[1].value,
                                    }
                                ]
                                data_module.type.updateOne(paramEdit)
                                    .then(function() {
                                        temp.selfRemove();
                                        var arr=host.frameList.getAllChild();
                                        host.frameList.activeFrame(arr[arr.length-1]);
                                    })


                            }
                        },
                        child: [{
                                tag: 'i',
                                class: 'material-icons',
                                props: {
                                    innerHTML: 'save'
                                },
                            },
                            '<span>' + "Lưu và đóng" +
                            '</span>'
                        ]
                    }
                ]
            },
            {
                class: 'absol-single-page-footer'
            }
        ]})
        formTest.menu.footer(absol.$('.absol-single-page-footer', temp));
        temp.addChild(DOMElement.div({
                attrs: {
                    className: "update-catergory",
                },
                children: [
                    name,
                    note
                ]
            }));
    return temp;
}

blackTheme.reporter_type_surveys.removeType= function(id) {
    ModalElement.question({
        title: 'Xóa bài khảo sát',
        message: 'Bạn có chắc muốn xóa : ' + "" + data_module.type.getById(id).value,
        choicelist: [
                {
                    text: "Đồng ý"
                },
                {
                    text: "Hủy"
                }
        ],
        onclick: function(id) {
            return function(selectedindex) {
                switch (selectedindex) {
                    case 0:
                        data_module.type.removeOne(id);
                        break;
                    case 1:
                        // do nothing
                        break;
                }
            }
        }(id)
    });
}

blackTheme.reporter_questions.removequestion = function(text) {
    return new Promise(function(resolve,reject){
            ModalElement.question({
            title: 'Xóa câu hỏi',
            message: 'Bạn có chắc muốn xóa câu hỏi : ' + '"' + text+'"',
            choicelist: [
                    {
                        text: "Đồng ý"
                    },
                    {
                        text: "Hủy"
                    }
            ],
            onclick: function(text) {
                return function(selectedindex) {
                    switch (selectedindex) {
                        case 0:
                            resolve();
                            break;
                        case 1:
                            reject();
                            break;
                    }
                }
            }(text)
        });
    });
}

blackTheme.reporter_users.generateTableDataUsers = function(host) {

var data = [];
var celldata = [];
var indexlist = [];
var temp;
var i, k, sym, con;
var array = []
array = data_module.usersList.items
var stringCategory;

for (i = 0; i < array.length; i++) {
    indexlist.push(i);
}
var stringPrivilege;
var stringPrivilegeAccount;
var stringAvailable;

for (k = 0; k < array.length; k++) {
    i = indexlist[k];
    stringPrivilege = LanguageModule.text("txt_no");
    stringPrivilegeAccount = LanguageModule.text("txt_no");
    stringAvailable = LanguageModule.text("txt_no");
    if (array[i].privilege !== 0) {
        stringPrivilege = LanguageModule.text("txt_yes");
        if (array[i].privilege !== 1)
            stringPrivilegeAccount = LanguageModule.text("txt_yes");
    } else {

    }
    if (array[i].available !== 0)
        stringAvailable = LanguageModule.text("txt_yes");
    celldata = [k + 1];
    celldata.push({
        text: data_module.usersListHome.getID(array[i].homeid).username
    });
    celldata.push({
        text: data_module.usersListHome.getID(array[i].homeid).fullname
    });
    celldata.push({
        text: data_module.usersListHome.getID(array[i].homeid).email
    });
    celldata.push({
        text: formTestComponent.formatDate(array[i].privupdate) +" "+ formTestComponent.formatHour(array[i].privupdate)
    });
    celldata.push({
        text: stringPrivilege
    });
    celldata.push({
        text: stringPrivilegeAccount
    });
    celldata.push({
        text: stringAvailable
    });
    celldata.push({
        text: array[i].language
    });
    celldata.push({
        text: array[i].comment
    });
    list = [];
    if (true) {
        sym = DOMElement.i({
            attrs: {
                className: "material-icons",
                style: {
                    fontSize: "20px",
                    color: "#929292"
                }
            },

            text: "mode_edit"
        });
        con = DOMElement.div({
            attrs: {
                style: {
                    width: "100px"
                }
            },
            text: LanguageModule.text("ctrl_edit")
        });
        sym.onmouseover = con.onmouseover = function(sym, con) {
            return function(event, me) {
                sym.style.color = "black";
                con.style.color = "black";
            }
        }(sym, con);
        sym.onmouseout = con.onmouseout = function(sym, con) {
            return function(event, me) {
                sym.style.color = "#929292";
                con.style.color = "#929292";
            }
        }(sym, con);
        list.push({
            attrs: {
                style: {
                    width: "170px"
                }
            },
            symbol: sym,
            content: con,
            onclick: function(tempabc) {
                return function(event, me) {
                    //to do something o day'
                    console.log(tempabc)
                    var temp1 = formTestComponent.formAddUser(host, tempabc);
                    host.frameList.addChild(temp1);
                    host.frameList.activeFrame(temp1);
                    DOMElement.cancelEvent(event);
                    return false;
                }
            }(array[i])
        });

    }
    sym = DOMElement.i({
            attrs: {
                className: "material-icons",
                style: {
                    fontSize: "20px",
                    color: "#929292"
                }
            },
            text: "delete"
        }),
        con = DOMElement.div({
            attrs: {
                style: {
                    width: "100px"
                }
            },
            text: LanguageModule.text("ctrl_delete")
        });
    sym.onmouseover = con.onmouseover = function(sym, con) {
        return function(event, me) {
            sym.style.color = "red";
            con.style.color = "black";
        }
    }(sym, con);
    sym.onmouseout = con.onmouseout = function(sym, con) {
        return function(event, me) {
            sym.style.color = "#929292";
            con.style.color = "#929292";
        }
    }(sym, con);
    list.push({
        attrs: {
            style: {
                width: "170px"
            }
        },
        symbol: sym,
        content: con,
        onclick: function(id, host) {
            return function(event, me) {
                console.log(id)
                blackTheme.reporter_users.removeUser(host, id);
                DOMElement.cancelEvent(event);
                return false;
            }
        }(array[i].id, host)
    });
    h = DOMElement.choicelist({
        textcolor: "#929292",
        align: "right",
        symbolattrs: {
            style: {
                width: "40px"
            }
        },
        list: list
    });
    // h.style.position = "absolute";
    // h.style.marginTop = "-110px";
    // h.style.marginLeft = "-10px";
    celldata.push({
        attrs: {
            style: {
                width: "40px",
                textAlign: "center"
            }
        },
        children: [
            DOMElement.i({
                attrs: {
                    className: "material-icons " + DOMElement.dropdownclass.button,
                    style: {
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#929292"
                    },
                    onmouseover: function(event, me) {
                        me.style.color = "black";
                    },
                    onmouseout: function(event, me) {
                        me.style.color = "#929292";
                    },
                    onclick: function(host) {
                        return function(event, me) {
                            host.toggle();
                            DOMElement.cancelEvent(event);
                            return false;
                        }
                    }(h)
                },
                text: "more_vert"
            }), h
        ]
    });
    data.push(celldata);
}
return data;
};

blackTheme.reporter_users.UpdataFunction = function(host,param) {
    if (param !== undefined) {
        var paramEdit = [{
                name: "id",
                value: param.homeid
            },
            {
                name: "fullname",
                value: host.fullname.childNodes[1].value
            },
            {
                name: "email",
                value: host.email.childNodes[1].value
            },
        ];
        
        if (host.Password.childNodes[1].style.display !== "none" && host.Password.childNodes[1].value === host.checkPassword.childNodes[1].value&&host.Password.childNodes[1].value!==""){
            paramEdit.push({
                name: "password",
                value: host.Password.childNodes[1].value
            });
        }
        console.log(paramEdit)
        data_module.usersListHome.updateOne(paramEdit).then(function() {
            var paramEditJD = [
                {
                    name: "id",
                    value: param.id
                },
                {
                    name: "privilege",
                    value: host.AdminTrans.childNodes[1].value + host.AdminAccount.childNodes[1]
                        .value
                },
                {
                    name: "language",
                    value: host.language.childNodes[1].value
                },
                {
                    name: "available",
                    value: host.available.childNodes[1].value
                },
                {
                    name: "comment",
                    value: host.comment.childNodes[1].value
                },
                {
                    name: "theme",
                    value: host.theme.childNodes[1].value
                },
            ];
            data_module.usersList.updateOne(paramEditJD).then(function() {
                if(formTest.reporter_users_information.hosts!==undefined)
                {
                    formTest.reporter_users_information.redrawTable(host);
                }
            });
        });
    } else {
        if (host.idAccountHome === -1) {
            var dt = new Date();
            var paramEdit = [
                {
                    name: "username",
                    value: host.check.childNodes[1].value
                },
                {
                    name: "fullname",
                    value: host.fullname.childNodes[1].value
                },
                {
                    name: "email",
                    value: host.email.childNodes[1].value
                },
                {
                    name: "privilege",
                    value: 0
                },
                {
                    name: "language",
                    value: "VN"
                },
                {
                    name: "available",
                    value: 1
                },
                {
                    name: "comment",
                    value: ""
                },
                {
                    name: "theme",
                    value: 1
                },
                {
                    name: "t_year",
                    value: dt.getYear(),
                }
            ];
            if (host.Password.childNodes[1].style.display !== "none" && host.Password.childNodes[1].value === host
                .checkPassword.childNodes[1].value){
                    paramEdit.push({
                        name: "password",
                        value: host.Password.childNodes[1].value
                    });
                }
                data_module.usersListHome.addOne(paramEdit).then(function() {
                    var paramEditJD = [{
                            name: "privilege",
                            value: host.AdminTrans.childNodes[1].value + host.AdminAccount.childNodes[1]
                                .value
                        },
                        {
                            name: "language",
                            value: host.language.childNodes[1].value
                        },
                        {
                            name: "available",
                            value: host.available.childNodes[1].value
                        },
                        {
                            name: "comment",
                            value: host.comment.childNodes[1].value
                        },
                        {
                            name: "homeid",
                            value: host.idAccountHome
                        },
                        {
                            name: "id",
                            value: host.idAccountHome
                        },
                        {
                            name: "theme",
                            value: host.theme.childNodes[1].value
                        },
                    ];
                data_module.usersList.addOne(paramEditJD).then(function() {
                    formTest.reporter_users_information.redrawTable(host);
                });
            });
        } else {
            var paramEdit = [{
                    name: "id",
                    value: host.idAccountHome
                },
                {
                    name: "fullname",
                    value: host.fullname.childNodes[1].value
                },
                {
                    name: "email",
                    value: host.email.childNodes[1].value
                },
            ];
            if (host.Password.childNodes[1].style.display !== "none" && host.Password.childNodes[1].value === host.checkPassword.childNodes[1].value && host.Password.childNodes[1].value!=="")
                paramEdit.push({
                    name: "password",
                    value: host.Password.childNodes[1].value
                });
            data_module.usersListHome.updateOne(paramEdit).then(function() {
                console.log(host.language.childNodes[1].value)
                var paramEditJD = [{
                        name: "privilege",
                        value: host.AdminTrans.childNodes[1].value + host.AdminAccount.childNodes[1]
                            .value
                    },
                    {
                        name: "language",
                        value: host.language.childNodes[1].value
                    },
                    {
                        name: "available",
                        value: host.available.childNodes[1].value
                    },
                    {
                        name: "comment",
                        value: host.comment.childNodes[1].value
                    },
                    {
                        name: "homeid",
                        value: host.idAccountHome
                    },
                    {
                        name: "id",
                        value: host.idAccountHome
                    },
                    {
                        name: "theme",
                        value: host.theme.childNodes[1].value
                    },
                ]
                data_module.usersList.addOne(paramEditJD).then(function() {
                    formTest.reporter_users_information.redrawTable(host);
                })
            });
        }

    }
}
blackTheme.reporter_users.removeUser = function(host, id) {
    ModalElement.question({
        title: LanguageModule.text("title_delete_user"),
        message: LanguageModule.text("title_confirm_delete") + "" + data_module.usersListHome.getID(data_module.usersList.getID(id).homeid).username,
        onclick: function(id) {
            return function(selectedindex) {
                switch (selectedindex) {
                    case 0:
                        data_module.usersList.removeOne(id).then(function() {
                            formTest.reporter_users_information.redrawTable(host);
                        })
                        break;
                    case 1:
                        // do nothing
                        break;
                }
            }
        }(id)
    });
};
</script>
<?php
    }
?>