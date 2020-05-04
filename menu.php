<?php
    function write_menu_script() {
        global $prefix, $prefix;
?>
<script type="text/javascript">
formTest.menu.index = 0;
formTest.menu.heightFooter = 30;
formTest.menu.hostPage = {};

formTest.menu.tabPanel = absol.buildDom({
    tag: "tabview",
    style: {
        width: "100%",
        height: "calc(100vh - 65px)"
    },
    on: {
        activetab: function (event) {
            // formTest.menu.onChange(index);
        },
        exit: function (event) { }
    }
})

formTest.menu.loadPage = function (taskid) {
    var holder, host;
    holder = absol.buildDom({
        tag: "tabframe",
        style: {
            backgroundColor: "white"
        }
    })
    host = {
        holder: holder
    };
    switch (taskid) {
        case 1:
            holder.name = "Quản lý bài kiểm tra";
            formTest.menu.tabPanel.addChild(holder);
            formTest.reporter_surveys.init(host, 1);
            break;
        case 4:
            holder.name = "Quản lý loại câu hỏi";
            formTest.menu.tabPanel.addChild(holder);
            formTest.reporter_type_surveys.init(host, 1);
            break;
        // case 5:
        //     holder.name="Thực hiện khảo sát";
        //     formTest.menu.tabPanel.addChild(holder);
        //     formTest.reporter_record.init(host,1);
        //     break;
        case 2:
            holder.name = "Hồ sơ cá nhân";
            formTest.menu.tabPanel.addChild(holder);
            var promiseAll = [];
            promiseAll.push(data_module.usersListHome.load());
            promiseAll.push(data_module.usersList.load());
            promiseAll.push(data_module.countriesList.load());
            Promise.all(promiseAll).then(function () {
                formTest.menu.showProfile(host);
            })
            break;
        case 3:
            holder.name = "Người dùng";
            formTest.menu.tabPanel.addChild(holder);
            formTest.menu.showListUser(host);
            break;
        case 6:
            var promiseAll = [];
            promiseAll.push(data_module.usersListHome.load());
            Promise.all(promiseAll).then(function () {
                holder.name = "Xem kết quả bài khảo sát";
                formTest.menu.tabPanel.addChild(holder);
                formTest.reporter_feedback.init(host, 1);
            });
            break;
        default:
            holder.innerHTML = "under construction (" + taskid + ")";
            break;
    }
};

formTest.menu.showMenuTab = function () {
    var box = document.getElementById("box_menutab");
    if (box.style.visibility == "hidden") {
        box.style.visibility = "visible";
        setTimeout(function () {
            absol.$('body').once('click', function () {
                box.style.visibility = "hidden";
            }, false);
        }, 100);
    } else {
        box.style.visibility = "hidden";
    }
}

formTest.menu.logout = function () {
    ModalElement.show_loading();
    FormClass.api_call({
        url: "logout.php",
        params: [],
        func: function (success, message) {
            ModalElement.close(-1);
            if (success) {
                if (message.substr(0, 2) == "ok") {
                    window.location.href = window.location.href;
                } else {
                    ModalElement.alert({
                        message: message,
                        class: "button-black-gray"
                    });
                }
            } else {
                ModalElement.alert({
                    message: message,
                    class: "button-black-gray"
                });
            }
        }
    });
}

formTest.menu.init = function (holder) {
    var h, h1, list1;
    var username;
    var promiseAll = [];
    var dataMenuTab1 = [];
    var dataMenuTab2 = [];
    ModalElement.show_loading();
    data_module.company.load().then(function (resolve) {
        promiseAll.push(data_module.register.load());
        promiseAll.push(data_module.services.load());
        Promise.all(promiseAll).then(function () {
            FormClass.api_call({
                url: "database_load.php",
                params: [{
                    name: "task",
                    value: "menu_user"
                }],
                func: function (success, message) {
                    ModalElement.close(-1);
                    if (success) {
                        if (message.substr(0, 2) == "ok") {
                            content = EncodingClass.string.toVariable(message.substr(2));
                            if (content == 'notlogin') {
                                setTimeout("formTest.menu.logout();", 100);
                                return;
                            }
                            formTest.menu.userContent = content;
                            var menuItems = [{
                                text: "Quản lý bài kiểm tra",
                                pageIndex: 1
                            },
                            {
                                text: "Quản lý loại bài kiểm tra",
                                pageIndex: 4
                            },
                            {
                                text: "Xem kết quả bài khảo sát",
                                pageIndex: 6
                            },
                            {
                                text: "Người dùng",
                                pageIndex: 3
                            }
                            ];
                            var hmenuElement = absol.buildDom({
                                tag: 'hmenu',
                                style: {
                                    paddingLeft: "10px"
                                },
                                props: {
                                    items: menuItems
                                },
                                on: {
                                    press: function (event) {
                                        this.activeTab = -1;
                                        var item = event.menuItem;
                                        if (typeof item.pageIndex == 'number') {
                                            formTest.menu.loadPage(item.pageIndex);
                                        }
                                    }
                                }
                            });
                            list1 = [{
                                symbol: DOMElement.i({
                                    attrs: {
                                        className: "material-icons",
                                        style: {
                                            fontSize: "20px",
                                        },
                                    },
                                    text: "person"
                                }),
                                content: "Hồ sơ cá nhân",
                                onclick: function (index) {
                                    formTest.menu.loadPage(2);
                                }
                            },
                            {
                                symbol: DOMElement.i({
                                    attrs: {
                                        className: "material-icons",
                                        style: {
                                            fontSize: "20px",
                                        },
                                    },
                                    text: "arrow_forward"
                                }),
                                content: "Đăng xuất",
                                onclick: function (index) {
                                    formTest.menu.logout();
                                }
                            }
                            ];
                            h1 = DOMElement.choicelist({
                                align: "right",
                                color2: "#d6d6d6",
                                textcolor: "#7a7a7a",
                                textcolor2: "black",
                                attrs: {},
                                list: list1
                            });
                            h1.style.marginTop = "-50px";
                            h1.style.marginLeft = "-10px";
                            DOMElement.removeAllChildren(holder);
                            var temText = DOMElement.div({
                                attrs: {
                                    className: DOMElement
                                        .dropdownclass
                                        .button,
                                    style: {
                                        marginLeft: "10px",
                                        cursor: "pointer"
                                    },
                                    onclick: function (
                                        host
                                    ) {
                                        return function (
                                            event,
                                            me
                                        ) {
                                            host
                                                .toggle();
                                            DOMElement
                                                .cancelEvent(
                                                    event
                                                );
                                            return false;
                                        }
                                    }
                                        (
                                            h1)
                                }
                            })
                            data_module.usersListHome.load().then(function (result) {
                                temText.innerText = data_module.usersListHome.getID(formTest.menu.userContent.homeid).username;
                            })
                            var serviceId, serviceIndex;
                            var isLibrary = false;
                            var homehref;
                            homehref = window.location.origin + "/";
                            var homepath = window.location.pathname.substr(1);
                            var x0 = homepath.indexOf("/");
                            homehref += homepath.substr(0, x0 + 1);
                            for (i = 0; i < data_module.register.items.length; i++) {
                                serviceId = data_module.register.items[i].serviceid;
                                serviceIndex = formTest.getIndexByID(serviceId, data_module.services.items);
                                if ((data_module.services.items[serviceIndex].name == "salary_library") && (data_module.services.items[serviceIndex].prefix == "")) {
                                    isLibrary = true;
                                    continue;
                                }
                                if ((data_module.services.items[i].target == "") && (data_module.services.items[i].prefix == "")) continue;
                                data_module.services.items[serviceIndex].avai = 1;
                                dataMenuTab1.push({
                                    attrs: {
                                        style: {
                                            width: "100%",
                                            textAlign: "center",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            paddingRight: "10px",
                                            paddingLeft: (i == 0) ? "10px" : ""
                                        }
                                    },
                                    children: [DOMElement.div({
                                        attrs: {
                                            style: {
                                                display: "inline-block"
                                            }
                                        },
                                        children: [DOMElement.a({
                                            attrs: {
                                                target: "_blank",
                                                href: homehref + data_module.services.items[serviceIndex].subDNS,
                                                onclick: function () {
                                                    var box = document.getElementById("box_menutab");
                                                    box.style.visibility = "hidden";
                                                }
                                            },
                                            children: [DOMElement.div({
                                                attrs: {
                                                    align: "center",
                                                    style: {
                                                        height: "80px",
                                                        backgroundColor: "#ffffff",
                                                        width: "80px",
                                                        border: "1px solid #c0c0c0",
                                                        display: "table-cell",
                                                        verticalAlign: "middle"
                                                    }
                                                },
                                                children: [DOMElement.img({
                                                    attrs: {
                                                        style: {
                                                            maxHeight: "60px",
                                                            maxWidth: "60px",
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            cursor: "pointer",
                                                        },
                                                        src: data_module.services.items[serviceIndex].srcimg,
                                                        alt: LanguageModule.text(data_module.services.items[serviceIndex].name)
                                                    }
                                                })]
                                            })]
                                        })]
                                    })]
                                });
                                dataMenuTab2.push({
                                    attrs: {
                                        style: {
                                            textAlign: "center",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            whiteSpace: "nowrap",
                                            paddingBottom: "20px"
                                        },
                                        align: "center"
                                    },
                                    children: [DOMElement.a({
                                        attrs: {
                                            style: { color: "black" },
                                            target: "_blank",
                                            href: homehref + data_module.services.items[serviceIndex].subDNS,
                                            onclick: function () {
                                                var box = document.getElementById("box_menutab");
                                                box.style.visibility = "hidden";
                                            }
                                        },
                                        text: LanguageModule.text(data_module.services.items[serviceIndex].name)
                                    })]
                                });
                            }
                            for (i = 0; i < data_module.services.items.length; i++) {
                                if ((data_module.services.items[i].name == "salary_library") && (data_module.services.items[i].prefix == "")) continue;
                                if ((data_module.services.items[i].target == "") && (data_module.services.items[i].prefix == "")) continue;
                                if (data_module.services.items[i].avai != 1) {
                                    dataMenuTab1.push({
                                        attrs: {
                                            style: {
                                                width: "100%",
                                                textAlign: "center",
                                                paddingTop: "10px",
                                                paddingBottom: "10px",
                                                paddingRight: "10px"
                                            }
                                        },
                                        children: [DOMElement.div({
                                            attrs: {
                                                style: {
                                                    display: "inline-block"
                                                }
                                            },
                                            children: [DOMElement.a({
                                                attrs: {
                                                    href: homehref + data_module.services.items[i].subDNS,
                                                    onclick: function () {
                                                        var box = document.getElementById("box_menutab");
                                                        box.style.visibility = "hidden";
                                                    }
                                                },
                                                children: [DOMElement.div({
                                                    attrs: {
                                                        align: "center",
                                                        style: {
                                                            verticalAlign: "middle",
                                                            height: "80px",
                                                            width: "80px",
                                                            border: "1px solid #c0c0c0",
                                                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                                                            display: "table-cell"
                                                        }
                                                    },
                                                    children: [DOMElement.img({
                                                        attrs: {
                                                            style: {
                                                                maxHeight: "60px",
                                                                maxWidth: "60px",
                                                                marginLeft: "10px",
                                                                marginRight: "10px",
                                                                cursor: "pointer",
                                                            },
                                                            src: data_module.services.items[i].srcimg,
                                                            alt: LanguageModule.text(data_module.services.items[i].name)
                                                        }
                                                    })]
                                                })]
                                            })]
                                        })]
                                    });
                                    dataMenuTab2.push({
                                        attrs: {
                                            style: {
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                                color: "#7a7a7a",
                                                whiteSpace: "nowrap",
                                                paddingBottom: "20px",
                                                textAlign: "center"
                                            },
                                            onclick: function () {
                                                var box = document.getElementById("box_menutab");
                                                box.style.visibility = "hidden";
                                            }
                                        },
                                        children: [DOMElement.span({
                                            text: LanguageModule.text(data_module.services.items[i].name)
                                        })]
                                    });
                                }
                            }
                            holder.appendChild(
                                DOMElement.div({
                                    attrs: {
                                        style: {
                                            width: "100%",
                                            borderBottom: "1px solid rgb(221, 221, 221)",
                                        }
                                    },
                                    children: [
                                        DOMElement.table({
                                            attrs: {
                                                width: "100%"
                                            },
                                            data: [
                                                [
                                                    {
                                                        attrs: {
                                                            style: {
                                                                width: "50px",
                                                                textAlign: "center",
                                                                height: "10px"
                                                            }
                                                        },
                                                        children: [
                                                            DOMElement.i({
                                                                attrs: {
                                                                    className: "material-icons",
                                                                    style: {
                                                                        height: "30px",
                                                                        cursor: "pointer",
                                                                        paddingRight: "5px",
                                                                        color: "black"
                                                                    },
                                                                    onclick: function (event, me) {
                                                                        formTest.menu
                                                                            .showMenuTab(
                                                                                holder);
                                                                    }
                                                                },
                                                                text: "reorder"
                                                            })
                                                        ]
                                                    },
                                                    DOMElement.div({
                                                        attrs: {
                                                            style: {
                                                                position: "relative",
                                                                maxHeight: "200px"
                                                            }
                                                        },
                                                        children: [DOMElement.div({
                                                            attrs: {
                                                                id: "box_menutab",
                                                                style: {
                                                                    position: "absolute",
                                                                    zIndex: 1001,
                                                                    left: "0px",
                                                                    top: "25px",
                                                                    backgroundColor: "#ffffff",
                                                                    border: "1px solid #d6d6d6",
                                                                    zIndex: "1001",
                                                                    borderRadius: "3px",
                                                                    boxShadow: "2.8px 2.8px 12px 0 rgba(7, 7, 7, 1)",
                                                                    visibility: "hidden"
                                                                }
                                                            },
                                                            children: DOMElement.table({
                                                                attrs: {
                                                                    style: {
                                                                        width: "100%",
                                                                        cursor: "pointer"
                                                                    }
                                                                },
                                                                data: [
                                                                    dataMenuTab1,
                                                                    dataMenuTab2
                                                                ]
                                                            })
                                                        })]
                                                    }),
                                                    {
                                                        attrs: {
                                                            style: {
                                                                borderLeft: "1px solid #aaaaaa",
                                                                height: "50px",
                                                                width: "20px"
                                                            }
                                                        }
                                                    },
                                                    {
                                                        attrs: {
                                                            style: {
                                                                textAlign: "center",
                                                                paddingTop: "10px",
                                                                paddingBottom: "10px",
                                                                height: "50px",
                                                                width: "30px"
                                                            }
                                                        },
                                                        children: [DOMElement.img({
                                                            attrs: {
                                                                id: "company_logo_img",
                                                                src: "logo-formTesttek-1511.png",
                                                                style: {
                                                                    maxHeight: "30px"
                                                                }
                                                            }
                                                        })]
                                                    },
                                                    {
                                                        attrs: {
                                                            style: {
                                                                borderRight: "1px solid #aaaaaa",
                                                                height: "50px",
                                                                width: "20px"
                                                            }
                                                        }
                                                    },
                                                    {
                                                        attrs: {
                                                            id: "title_page_init",
                                                            style: {
                                                                color: "black",
                                                                font: "16px Helvetica, Arial, sans-serif",
                                                                fontWeight: "bold",
                                                                whiteSpace: "nowrap",
                                                                textAlign: "left",
                                                                height: "40px",
                                                                verticalAlign: "middle",
                                                                paddingLeft: "10px",
                                                                display: 'none'

                                                            }
                                                        },
                                                        children: [DOMElement.textNode()]
                                                    },
                                                    hmenuElement,
                                                    {
                                                        attrs: {
                                                            style: {
                                                                width: "10px"
                                                            }
                                                        }
                                                    },
                                                    {
                                                        attrs: {
                                                            align: "right",
                                                            style: {
                                                                width: "208px",
                                                                //borderLeft: "1px solid #aaaaaa"
                                                            }
                                                        },
                                                        children: [
                                                            DOMElement.table({
                                                                attrs: {
                                                                    align: "left"
                                                                },
                                                                data: [
                                                                    [

                                                                        DOMElement
                                                                            .i({
                                                                                attrs: {
                                                                                    className: "material-icons",
                                                                                    style: {
                                                                                        fontSize: "30px",
                                                                                        color: "#ff3823"
                                                                                    },
                                                                                },

                                                                                text: "comment"
                                                                            }),
                                                                        {
                                                                            attrs: {
                                                                                style: {
                                                                                    width: "10px",
                                                                                    borderRight: "1px solid rgb(170, 170, 170)"
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            attrs: {
                                                                                style: {
                                                                                    width: "10px"
                                                                                }
                                                                            }
                                                                        },
                                                                        DOMElement
                                                                            .i({
                                                                                attrs: {
                                                                                    className: "material-icons",
                                                                                    style: {
                                                                                        fontSize: "30px",
                                                                                        color: "#7a7a7a"
                                                                                    },
                                                                                },

                                                                                text: "help"
                                                                            }),
                                                                        {
                                                                            attrs: {
                                                                                style: {
                                                                                    width: "10px"
                                                                                }
                                                                            }
                                                                        },
                                                                        DOMElement
                                                                            .i({
                                                                                attrs: {
                                                                                    className: "material-icons " +
                                                                                        DOMElement
                                                                                            .dropdownclass
                                                                                            .button,
                                                                                    style: {
                                                                                        fontSize: "40px",
                                                                                        cursor: "pointer"
                                                                                    },
                                                                                    onclick: function (host) {
                                                                                        return function (event, me) {
                                                                                            host.toggle();
                                                                                            DOMElement.cancelEvent(event);
                                                                                            return false;
                                                                                        }
                                                                                    }
                                                                                        (
                                                                                            h1)
                                                                                },
                                                                                text: "account_circle"
                                                                            }),
                                                                        {
                                                                            attrs: {
                                                                                style: {
                                                                                    width: "10px"
                                                                                }
                                                                            }
                                                                        },
                                                                        temText,
                                                                        h1
                                                                    ]
                                                                ]
                                                            })
                                                        ]
                                                    }
                                                ]
                                            ]
                                        })
                                    ]
                                })
                            );
                            holder.appendChild(DOMElement.div({
                                attrs: {
                                    style: {
                                        backgroundColor: "#f7f6f6",
                                        paddingTop: "10px"
                                    }
                                },
                                children: [formTest.menu.tabPanel]
                            }));
                            formTest.menu.loadPage(1);
                        } else {
                            ModalElement.alert({
                                message: message
                            });
                            return;
                        }
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        return;
                    }
                }
            });
        });
    })
}
formTest.menu.dbui = {
    curload: 0,
    firstloaded: 0,
    curlen: 0,
};
formTest.menu.footer = function (holder) {
    var ij, listchildren = [];
    for (ij = 0; ij < holder.childNodes.length; ij++) {
        listchildren.push(holder.childNodes[ij]);
    }
    DOMElement.removeAllChildren(holder);
    holder.appendChild(
        DOMElement.table({
            attrs: {
                style: {
                    width: "100%",
                    height: "30px"
                }
            },
            data: [
                [{
                    children: listchildren
                }],
                [DOMElement.div({
                    attrs: {
                        style: {
                            backgroundColor: "#f7f6f6",
                        }
                    },
                    children: [DOMElement.table({
                        attrs: {
                            style: {
                                height: "30px",
                                width: "100%"
                            }
                        },
                        data: [
                            [{
                                attrs: {
                                    style: {
                                        width: "20px"
                                    }
                                }
                            },
                            {
                                children: [DOMElement.table({
                                    attrs: {
                                        style: {
                                            width: "100%"
                                        }
                                    },
                                    data: [
                                        [{
                                            attrs: {
                                                style: {
                                                    whiteSpace: "nowrap"
                                                }
                                            },
                                            text: "Copyright © 2018, SoftAView Company, All rights reserved"
                                        }]
                                    ]
                                })]
                            },
                            {
                                attrs: {
                                    style: {
                                        width: "10px"
                                    }
                                }
                            },
                            {
                                attrs: {
                                    align: "right",
                                    style: {
                                        width: "150px"
                                    }
                                },
                                children: [DOMElement.table({
                                    data: [
                                        [{
                                            attrs: {
                                                style: {
                                                    whiteSpace: "nowrap"
                                                }
                                            },
                                            children: [
                                                DOMElement
                                                    .a({
                                                        attrs: {
                                                            style: {
                                                                cursor: "pointer"
                                                            }
                                                        },
                                                        text: "Giới thiệu"
                                                    })
                                            ]
                                        },
                                        {
                                            attrs: {
                                                style: {
                                                    whiteSpace: "nowrap",
                                                    paddingLeft: "10px"
                                                }
                                            },
                                            children: [
                                                DOMElement
                                                    .a({
                                                        attrs: {
                                                            style: {
                                                                cursor: "pointer"
                                                            }
                                                        },
                                                        text: "Liên hệ"
                                                    })
                                            ]
                                        },
                                        {
                                            attrs: {
                                                style: {
                                                    whiteSpace: "nowrap",
                                                    paddingLeft: "10px"
                                                }
                                            },
                                            children: [
                                                DOMElement
                                                    .a({
                                                        attrs: {
                                                            style: {
                                                                cursor: "pointer"
                                                            }
                                                        },
                                                        text: "Điều khoản dịch vụ"
                                                    })
                                            ]
                                        }
                                        ]
                                    ]
                                })]
                            },
                            {
                                attrs: {
                                    style: {
                                        width: "20px"
                                    }
                                }
                            }
                            ]
                        ]
                    })]
                })]
            ]
        })
    );
}

formTest.menu.showProfile = function (host) {
    var st, ready = 0,
        i, uid, uindex;
    if (host.direct !== 1) {
        host.password_confirm = DOMElement.input({
            attrs: {
                type: "password",
                className: "KPIsimpleInput",
                style: {
                    width: "200px"
                },
                onkeydown: function (event) {
                    if (event.keyCode == 13) formTest.menu.confirmPassword(host);
                }
            }
        });
        host.notification = DOMElement.td({});
        ModalElement.showWindow({
            index: 1,
            title: "Xác nhận mật khẩu",
            bodycontent: DOMElement.table({
                data: [
                    [{}, {}, host.notification],
                    [{
                        attrs: {
                            style: {
                                whiteSpace: "nowrap"
                            }
                        },
                        text: LanguageModule.text("txt_password")
                    },
                    {
                        attrs: {
                            style: {
                                width: "10px"
                            }
                        }
                    },
                    host.password_confirm
                    ],
                    [{
                        attrs: {
                            style: {
                                height: "20px"
                            }
                        }
                    }],
                    [{
                        attrs: {
                            colSpan: 3,
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
                                absol.buildDom({
                                    tag: "iconbutton",
                                    on: {
                                        click: function (host) {
                                            return function () {
                                                formTest.menu.confirmPassword(host);
                                                DOMElement.cancelEvent(event);
                                                return false;
                                            }
                                        }(host)
                                    },
                                    child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'done'
                                        }
                                    },
                                    '<span>' + LanguageModule.text("ctrl_ok") + '</span>'
                                    ]
                                }),
                                {
                                    attrs: {
                                        style: {
                                            width: "20px"
                                        }
                                    }
                                },
                                absol.buildDom({
                                    tag: "iconbutton",
                                    on: {
                                        click: function (host) {
                                            return function () {
                                                ModalElement.close();
                                                formTest.menu.tabPanel.removeTab(host.holder.id);
                                                DOMElement.cancelEvent(event);
                                                return false;
                                            }
                                        }(host)
                                    },
                                    child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'clear'
                                        }
                                    },
                                    '<span>' + LanguageModule.text("ctrl_cancel") + '</span>'
                                    ]
                                })
                            ]]
                        })]
                    }]
                ]
            })
        });
        host.password_confirm.focus();
        return;
    }

    if (uindex == -1) {
        setTimeout("formTest.menu.logout();", 100);
        return;
    }
    host.frameList = absol.buildDom({
        tag: 'frameview',
        style: {
            width: '100%',
            height: '100%'
        }
    });
    host.holder.addChild(host.frameList);
    var id = parseInt(
        "<?php if (isset($_SESSION[$prefix.'userid'])) echo $_SESSION[$prefix.'userid']; else echo 0; ?>",
        10);
    var mainFrame = formTestComponent.formAddUser(host, data_module.usersList.items[formTest.getIndexByID(id, data_module.usersList.items)]);
    host.frameList.addChild(mainFrame);
    host.frameList.activeFrame(mainFrame);
}

formTest.getIndexByID = function (id, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id)
            return i;
    }
    return -1;
}

formTest.menu.showListUser = function (host) {
    var st, ready = 0,
        i, uid, uindex;
    if (host.direct !== 1) {
        host.password_confirm = DOMElement.input({
            attrs: {
                type: "password",
                className: "KPIsimpleInput",
                style: {
                    width: "200px"
                },
                onkeydown: function (event) {
                    if (event.keyCode == 13) formTest.menu.confirmPasswordObject(host);
                }
            }
        });
        host.notification = DOMElement.td({});
        ModalElement.showWindow({
            index: 1,
            title: "Xác nhận mật khẩu",
            bodycontent: DOMElement.table({
                data: [
                    [{}, {}, host.notification],
                    [{
                        attrs: {
                            style: {
                                whiteSpace: "nowrap"
                            }
                        },
                        text: LanguageModule.text("txt_password")
                    },
                    {
                        attrs: {
                            style: {
                                width: "10px"
                            }
                        }
                    },
                    host.password_confirm
                    ],
                    [{
                        attrs: {
                            style: {
                                height: "20px"
                            }
                        }
                    }],
                    [{
                        attrs: {
                            colSpan: 3,
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
                                absol.buildDom({
                                    tag: "iconbutton",
                                    on: {
                                        click: function (host) {
                                            return function () {
                                                formTest.menu.confirmPasswordObject(host);
                                                DOMElement.cancelEvent(event);
                                                return false;
                                            }
                                        }(host)
                                    },
                                    child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'done'
                                        }
                                    },
                                    '<span>' + LanguageModule.text("ctrl_ok") + '</span>'
                                    ]
                                }),
                                {
                                    attrs: {
                                        style: {
                                            width: "20px"
                                        }
                                    }
                                },
                                absol.buildDom({
                                    tag: "iconbutton",
                                    on: {
                                        click: function (host) {
                                            return function () {
                                                ModalElement.close();
                                                formTest.menu.tabPanel.removeTab(host.holder.id);
                                                DOMElement.cancelEvent(event);
                                                return false;
                                            }
                                        }(host)
                                    },
                                    child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'clear'
                                        }
                                    },
                                    '<span>' + LanguageModule.text("ctrl_cancel") + '</span>'
                                    ]
                                })
                            ]]
                        })]
                    }]
                ]
            })
        });
        host.password_confirm.focus();
        return;
    }

    if (uindex == -1) {
        setTimeout("formTest.menu.logout();", 100);
        return;
    }
    formTest.reporter_users.init(host, 1);
}

formTest.menu.confirmPasswordObject = function (host) {
    var pass = host.password_confirm.value.trim();
    if (pass == "") {
        ModalElement.alert({
            message: LanguageModule.text("war_no_password"),
            func: function () {
                host.password_confirm.focus();
            }
        });
        return;
    }
    ModalElement.show_loading();
    FormClass.api_call({
        url: "account_confirm_password.php",
        params: [{
            name: "pass",
            value: pass
        }],
        func: function (success, message) {
            ModalElement.close(-1);
            if (success) {
                if (message == "ok") {
                    ModalElement.close(1);
                    host.direct = 1;
                    formTest.menu.showListUser(host);
                } else if (message.substr(0, 6) == "failed") {
                    DOMElement.removeAllChildren(host.notification);
                    host.notification.appendChild(DOMElement.div({
                        attrs: {
                            style: {
                                color: "red",
                                paddingBottom: "5px"
                            }
                        },
                        text: LanguageModule.text("war_txt_password_incorrect")
                    }));
                    host.password_confirm.focus();
                    return;
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    return;
                }
            } else {
                ModalElement.alert({
                    message: message
                });
                return;
            }
        }
    })
};

formTest.menu.confirmPassword = function (host) {
    var pass = host.password_confirm.value.trim();
    if (pass == "") {
        ModalElement.alert({
            message: LanguageModule.text("war_no_password"),
            func: function () {
                host.password_confirm.focus();
            }
        });
        return;
    }
    ModalElement.show_loading();
    FormClass.api_call({
        url: "account_confirm_password.php",
        params: [{
            name: "pass",
            value: pass
        }],
        func: function (success, message) {
            ModalElement.close(-1);
            if (success) {
                if (message == "ok") {
                    ModalElement.close(1);
                    host.direct = 1;
                    formTest.menu.showProfile(host);
                } else if (message.substr(0, 6) == "failed") {
                    DOMElement.removeAllChildren(host.notification);
                    host.notification.appendChild(DOMElement.div({
                        attrs: {
                            style: {
                                color: "red",
                                paddingBottom: "5px"
                            }
                        },
                        text: LanguageModule.text("war_txt_password_incorrect")
                    }));
                    host.password_confirm.focus();
                    return;
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    return;
                }
            } else {
                ModalElement.alert({
                    message: message
                });
                return;
            }
        }
    })
};

</script>
<?php
}
?>