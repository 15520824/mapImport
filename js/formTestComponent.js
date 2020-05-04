var formTestComponent = {};

formTestComponent.formAddUser = function (host, param) {
    if (param == -1)
        param = undefined;
    var list=[];
    var isDone;
    host.idAccountHome=-1;
    console.log(param)
    
    if (param !== undefined){
        host.fullname  = formTestComponent.spanInput(LanguageModule.text("title_full_name"),data_module.usersListHome.getID(param.homeid).fullname);
        host.email = formTestComponent.spanInput(LanguageModule.text("title_email"),data_module.usersListHome.getID(param.homeid).email);
        if(data_module.usersList.getID(param.id).privilege!==0){
            var tempValue=1;
            if(data_module.usersList.getID(param.id).privilege!==1)
            var tempValue2=1;
            else
            var tempValue2=0;
        }else
        {
            var tempValue=0;
            var tempValue2=0;
        }
        host.AdminTrans = formTestComponent.spanSelect(LanguageModule.text("title_system_rights"),[{text:LanguageModule.text("txt_yes"),value:1},{text:LanguageModule.text("txt_no"),value:0}],tempValue);
        host.AdminAccount = formTestComponent.spanSelect(LanguageModule.text("title_decentralization"),[{text:LanguageModule.text("txt_yes"),value:1},{text:LanguageModule.text("txt_no"),value:0}],tempValue2);
        host.available = formTestComponent.spanSelect(LanguageModule.text("title_work"),[{text:LanguageModule.text("txt_yes"),value:1},{text:LanguageModule.text("txt_no"),value:0}],data_module.usersList.getID(param.id).available);
        host.language = formTestComponent.spanInput(LanguageModule.text("title_language"), data_module.usersList.getID(param.id).language);
        host.theme = formTestComponent.spanInput(LanguageModule.text("title_theme"),data_module.usersList.getID(param.id).theme+"");
        host.comment = formTestComponent.spanInput(LanguageModule.text("title_note"),data_module.usersList.getID(param.id).comment,false);
        host.check = formTestComponent.spanAutocompleteBoxInsertDetail(host,LanguageModule.text("title_account"), [], data_module.usersListHome.getID(param.homeid).username);
        host.check.childNodes[1].childNodes[0].setAttribute("disabled","");
        host.check.childNodes[1].style.backgroundColor = "#ebebe4";
        host.Password=formTestComponent.spanInput(LanguageModule.text("title_new_password"));
        host.checkPassword=formTestComponent.spanInput(LanguageModule.text("title_reenter_password"));
        host.Password.style.display="none";
        host.checkPassword.style.display="none";
        host.spanChangePassword= DOMElement.div({
            attrs:{
                className:"container-form",
                style:{
                }
            },
            children:[
                DOMElement.div({
                    attrs:{
                        className:"infotext",
                        style:{
                            height:0
                        }
                    }
                })
            ]
                
        })
        var atemp= DOMElement.a({
            attrs: {
                className: "",
                style:{
                    color: "#23527c",
                    cursor: "pointer",
                    marginLeft: "8px"
                },
                onclick:function(host){
                    return function(event,me){
                    host.spanChangePassword.style.display="none";
                    host.Password.style.display="";
                    host.checkPassword.style.display="";
                    }
                }(host)
            },
            text:LanguageModule.text("title_change_password"),
        })
        host.spanChangePassword.appendChild(atemp);
        
    }
    else{   
        for(var i=0;i<data_module.usersListHome.items.length;i++)
        {
            isDone=false;
            for(var j=0;j<data_module.usersList.items.length;j++)
            if(data_module.usersList.items[j].homeid===data_module.usersListHome.items[i].id)
            {
                isDone=true;
                break;
            }
            if(isDone===false)
            list.push({ name: data_module.usersListHome.items[i].username, id: data_module.usersListHome.items[i].id });
        }
        host.fullname  = formTestComponent.spanInput(LanguageModule.text("title_full_name"));
        host.email = formTestComponent.spanInput(LanguageModule.text("title_email"));
        host.AdminTrans = formTestComponent.spanSelect(LanguageModule.text("title_system_rights"),[{text:LanguageModule.text("txt_yes"),value:1},{text:LanguageModule.text("txt_no"),value:0}]);
        host.AdminAccount = formTestComponent.spanSelect(LanguageModule.text("title_decentralization"),[{text:LanguageModule.text("txt_yes"),value:1},{text:LanguageModule.text("txt_no"),value:0}]);
        host.available = formTestComponent.spanSelect(LanguageModule.text("title_work"),[{text:LanguageModule.text("txt_yes"),value:1},{text:LanguageModule.text("txt_no"),value:0}]);
        host.language = formTestComponent.spanInput(LanguageModule.text("title_language"));
        host.theme = formTestComponent.spanInput(LanguageModule.text("title_theme"));
        host.comment = formTestComponent.spanInput(LanguageModule.text("title_note"),"",false);
        host.check = formTestComponent.spanAutocompleteBoxInsertDetail(host,LanguageModule.text("title_account"), list, "");
        host.Password=formTestComponent.spanInput(LanguageModule.text("title_new_password"));
        host.checkPassword=formTestComponent.spanInput(LanguageModule.text("title_reenter_password"));
        host.spanChangePassword= DOMElement.div({
            attrs:{
                className:"container-form",
                style:{
                    display:"none"
                }
            },
            children:[
                DOMElement.div({
                    attrs:{
                        className:"infotext",
                        style:{
                            height:0
                        }
                    }
                })
            ]
                
        })
        var atemp= DOMElement.a({
            attrs: {
                className: "",
                style:{
                    color: "#23527c",
                    cursor: "pointer",
                    marginLeft: "8px"
                },
                onclick:function(host){
                    return function(event,me){
                    host.spanChangePassword.style.display="none";
                    host.Password.style.display="";
                    host.checkPassword.style.display="";
                    }
                }(host)
            },
            text:LanguageModule.text("title_change_password"),
        })
        host.spanChangePassword.appendChild(atemp);
       
    }
    host.Password.childNodes[1].setAttribute("type","password");
    host.checkPassword.childNodes[1].setAttribute("type","password");
    host.Password.childNodes[1].setAttribute("autocomplete","new-password");
    host.checkPassword.childNodes[1].setAttribute("autocomplete","new-password");
    host.check.childNodes[1].childNodes[0].setAttribute("autocomplete","new-password")

    host.AdminTrans.childNodes[1].defineEvent("change");
    host.AdminTrans.childNodes[1].on('change',function(){
        if(host.AdminTrans.childNodes[1].value===0)
        {
            host.AdminAccount.childNodes[1].value=0;
        }
    })
    host.AdminAccount.childNodes[1].defineEvent("change")
    host.AdminAccount.childNodes[1].on('change',function(){
        if(host.AdminAccount.childNodes[1].value===1)
        {
            host.AdminTrans.childNodes[1].value=1;
        }
    })

    var temp = absol.buildDom({
        tag:'singlepage',
        child:[
            {
                class: 'absol-single-page-header',
                child:[
                    {
                        tag: "iconbutton",
                        style: {
                        },
                        on: {
                            click: function (evt) {
                                if(host.frameList.getAllChild().length===1)
                                    formTest.menu.tabPanel.removeTab(host.holder.id);
                                else
                                {
                                    temp.selfRemove();
                                    var arr=host.frameList.getAllChild();
                                    host.frameList.activeFrame(arr[arr.length-1]);
                                }
                            }
                        },
                        child: [{
                            tag: 'i',
                            class: 'material-icons',
                            props: {
                                innerHTML: 'clear'
                            },
                        },
                        '<span>' + LanguageModule.text("ctrl_close") + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        class:"info",
                        style: {
                            marginLeft: "10px"
                        },
                        on: {
                            click: function (evt) {
                                blackTheme.reporter_users.UpdataFunction(host,param);
                            }
                        },
                        child: [{
                            tag: 'i',
                            class: 'material-icons',
                            props: {
                                innerHTML: 'save'
                            },
                        },
                        '<span>' + LanguageModule.text("ctrl_save") + '</span>'
                        ]
                    },
                    {
                        tag: "iconbutton",
                        style: {
                            marginLeft: "10px"
                        },
                        on: {
                            click: function (evt) {
                                    blackTheme.reporter_users.UpdataFunction(host,param);
                                    if(host.frameList.getAllChild().length===1)
                                    formTest.menu.tabPanel.removeTab(host.holder.id);
                                    else
                                    {
                                        temp.selfRemove();
                                        var arr=host.frameList.getAllChild();
                                        host.frameList.activeFrame(arr[arr.length-1]);
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
                        '<span>' + LanguageModule.text("ctrl_save_close") + '</span>'
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
                    style: {
                        marginLeft:"10px",
                    }
                },
                children:[
                    host.check,
                    host.spanChangePassword,
                    host.Password,
                    host.checkPassword,
                    host.fullname,
                    host.email,
                    host.AdminTrans,
                    host.AdminAccount,
                    host.available,
                    host.language,
                    host.theme,
                    host.comment
                ]
            }))
    formTest.menu.footer(absol.$('.absol-single-page-footer', temp));
    return temp;
}

formTestComponent.spanInput = function (param = "", param1 = "", isInput = true, dom) {
    var selectChoice;
    var style = {},
        style1 = {};

    if (typeof param !== "string") {
        style = param.style;
        param = param.text;
    }

    if (typeof param1 !== "string") {
        style1 = param1.style;
        param1 = param1.text;
    }
    style1.border= "solid 1px #d6d6d6";
    if (isInput) {
        selectChoice =
            DOMElement.input({
                attrs: {
                    className: "properties",
                    value: param1,
                    style: style1,
                }
            })
    } else {
        selectChoice =
            DOMElement.textarea({
                attrs: {
                    className: "properties",
                    value: param1,
                    style: style1,
                }
            })
    }


    if (dom != undefined)
        return DOMElement.div({
            attrs: {
                className: "container-form"
            },
            children: [
                DOMElement.span({
                    attrs: {
                        className: "infotext",
                        innerHTML: param,
                        style: style,
                    }
                }),
                selectChoice,
                dom

            ]
        })
    return DOMElement.div({
        attrs: {
            className: "container-form"
        },
        children: [
            DOMElement.span({
                attrs: {
                    className: "infotext",
                    innerHTML: param,
                    style: style,
                }
            }),
            selectChoice,
        ]
    })

}

formTestComponent.spanAutocompleteBoxInsertDetail = function (host,param = "", list = [], param1 = "") {
    var selectChoice;
    var style = {};
    if (typeof param !== "string") {
        style = param.style;
        param = param.text;
    }

    selectChoice = absol._({
        tag: 'autocompleteinput',
        class: 'auto-properties',
        child: {
            tag: 'attachhook',
            on: {
                error: function () {
                    this.remove();
                    // window.dispatchEvent(new Event('resize'));
                }
            }
        },
        style: {
            backgroundColor: "white",
        },
        on: {
            change: function (event, sender) {
                if (sender._selectedIndex >= 0) {
                    var object = sender.adapter.texts[sender._selectedIndex];
                    host.idAccountHome=data_module.usersListHome.getName(selectChoice.value).id;
                    host.fullname.childNodes[1].value=data_module.usersListHome.getName(selectChoice.value).fullname;
                    host.email.childNodes[1].value=data_module.usersListHome.getName(selectChoice.value).email;
                    host.language.childNodes[1].value="Viet Nam";
                    host.available.childNodes[1].value=data_module.usersListHome.getName(selectChoice.value).available;
                    host.theme.childNodes[1].value=data_module.usersListHome.getName(selectChoice.value).theme;
                    host.AdminTrans.childNodes[1].value=0;
                    host.AdminAccount.childNodes[1].value=0;
                    if(data_module.usersListHome.getName(selectChoice.value).privilege!==0)
                    {
                        host.AdminTrans.childNodes[1].value=1;
                        if(data_module.usersListHome.getName(selectChoice.value).privilege!==1)
                        host.AdminAccount.childNodes[1].value=1;
                    }
                    host.spanChangePassword.style.display="";
                    host.checkPassword.style.display="none";
                    host.Password.style.display="none";
                }
                else {
                    host.idAccountHome=-1;
                    host.fullname.childNodes[1].value="";
                    host.email.childNodes[1].value="";
                    host.language.childNodes[1].value="Viet Nam";
                    host.available.childNodes[1].value=1;
                    host.theme.childNodes[1].value=1;
                    host.AdminTrans.childNodes[1].value=0;
                    host.AdminAccount.childNodes[1].value=0;
                    host.spanChangePassword.style.display="none";
                    host.checkPassword.style.display="";
                    host.Password.style.display="";
                }
            }
        },
        props: {
            onresize: function () {
                var height = this.getBoundingClientRect().height;
                if (height > 0)
                    this.$input.addStyle('height', height + 'px')
            },
            value: param1,
            adapter: {
                texts: list.map(function (u, i) {
                    return { text: u.name, value: u.id }
                }),

                queryItems: function (query, mInput) {
                    var query = query.toLocaleLowerCase();
                    return this.texts.map(function (obj) {
                        var text = obj.text;
                        var start = text.toLocaleLowerCase().indexOf(query);
                        if (start >= 0) {
                            var hightlightedText = text.substr(0, start) + '<strong style="color:red">' + text.substr(start, query.length) + '</strong>' + text.substr(start + query.length);
                            return {
                                text: text,
                                hightlightedText: hightlightedText
                            }
                        }
                        else return null;
                    }).filter(function (it) { return it !== null; })
                },

                getItemText: function (item, mInput) {
                    return item.text;
                },

                getItemView: function (item, index, _, $, query, reuseItem, refParent, mInput) {
                    return _({
                        tag: 'div',
                        style: {
                            height: '30px'
                        },
                        child: {
                            tag: 'span',
                            props: {
                                innerHTML: item.hightlightedText
                            }
                        }
                    })
                }
            }
        }
    })
    return DOMElement.div({
        attrs: {
            className: "autocomplete-div container-form"
        },
        children: [
            DOMElement.span({
                attrs: {
                    className: "span-autocomplete infotext",
                    innerHTML: param,
                    style: style,
                }
            }),
            selectChoice,
        ]
    })

}

formTestComponent.spanSelect = function (param = "", param1 = [], value) {
    return DOMElement.div({
        attrs: {
            className: "container-form"
        },
        children: [
            DOMElement.span({
                attrs: {
                    className: "infotext",
                    innerHTML: param,
                }
            }),
            absol.buildDom({
                tag: "selectmenu",
                class:"auto-properties",
                props: {
                    items: param1,
                    value: value,
                }
            }),

        ]
    })
}

formTestComponent.formatHour = function(date)
{
    var tempString="";
    tempString+=date.getHours()%12+":";
    if((date.getMinutes()-date.getMinutes()%10)/10 == 0)
    tempString+="0"+date.getMinutes();
    else
    tempString+=date.getMinutes();
    if((date.getHours()-date.getHours()%12)/12==1)
    tempString+=" PM";
    else
    tempString+=" AM";
    return tempString;
}

formTestComponent.formatDate = function(date)
{
    var tempString="";
    tempString+=date.getDate()+"/";

    if((date.getMonth()-date.getMonth()%10)/10 == 0)
    tempString+="0"+date.getMonth()+"/";
    else
    tempString+=date.getMonth()+"/";

    tempString+=date.getFullYear();
    return tempString;
}