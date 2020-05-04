<?php
    include_once "prefix.php";
    include_once "common.php";
    include_once "jsmodal.php";
    include_once "jsform.php";

    $login_script_written = 0;

    function write_login_header() {
        global $login_script_written, $prefix;
        if ($login_script_written == 1) return;
        $login_script_written = 1;
        write_modal_style();
        write_form_script();

    ?>
    <script type="text/javascript">
        var hint = 0;
        var loginBoxShown = 0;
        var submitLogin = function() {
            var x = document.getElementById("username_input");
            var y = document.getElementById("password_input");
            var rememberme = document.getElementById("rememberme").checked;
            if ((x.value.trim() == "") || (y.value.trim() == "")) {
                ModalElement.alert({
                    message: "Tài khoản và mật khẩu không được để trống!",
                    class: "button-black-gray"
                });
                return;
            }
            ModalElement.show_loading();
            safeLogin("safelogin.php", x.value, y.value, [], function(errorcode, message) {
                var localString;
                ModalElement.close(-1);
                if (errorcode == 0) {
                    if (rememberme) {
                        localString = EncodingClass.md5.encode("NaOH + HCl = NaCL + H2O" + (new Date()).getTime().toString());
                        StorageClass.setLocal("<?php echo $prefix;?>jughgfhjh",localString );
                        FormClass.api_call({
                            url: "newlogin_save.php",
                            params: [{name: "localString", value: localString}],
                            func: function(success, message){
                                if (success){
                                    if (message.substr(0,2) == "ok"){
                                        ModalElement.close(1);
                                        loginBoxShown = 0;
                                        window.location.href = window.location.href;
                                    }
                                    else {
                                        ModalElement.alert({message: message});
                                    }
                                }
                                else {
                                    console.log(123);
                                    ModalElement.alert({message: message});
                                }
                            }
                        });
                    }
                    else {
                        ModalElement.close(1);
                        loginBoxShown = 0;
                        window.location.href = window.location.href;
                    }
                }
                else {
                    document.getElementById("password_input").value = "";
                    hint += 1;
                    ModalElement.alert({
                        message: message.substr(0, 28),
                        class: "btn btn-primary"
                    });
                    if (hint > 3){
                        var hints = document.getElementById("showhint");
                        DOMElement.removeAllChildren(hints);
                        if (message.substr(28) != ""){
                            hints.appendChild(DOMElement.div({
                                attrs: {style: {color: "red", paddingTop: "5px"}},
                                text: "Hint: " + message.substr(28)
                            }));
                        }
                    }
                }
            });
        };

        var changepassword = function( username){
            var oldpass = document.getElementById("oldpassword_input").value.trim();
            var newpass = document.getElementById("newpassword_input").value.trim();
            var renewpass = document.getElementById("renewpassword_input").value.trim();
            if (newpass != renewpass) {
                ModalElement.alert({
                    message: "Xác nhận mật khẩu không khớp",
                    class: "btn btn-primary"
                });
                return;
            }
            // if (newpass == "123456") {
            //     ModalElement.alert({
            //         message: "Không được phép sử dụng mật khẩu ngầm định",
            //         class: "btn btn-primary"
            //     });
            //     return;
            // }
            ModalElement.show_loading();
            FormClass.api_call({
                url: "changepasswordfirstlogin.php",
                params: [
                    {
                        name: "username",
                        value: username
                    },
                    {
                        name: "password",
                        value: oldpass
                    },
                    {
                        name: "newpass",
                        value: newpass
                    }
                ],
                func: function(success, message) {
                    if (success){
                        ModalElement.close(-1);
                        if (message.substr(0,2) == "ok"){
                            safeLogin("safelogin.php", username, newpass, [], function(errorcode, message) {
                                var localString;
                                ModalElement.close(-1);
                                if (errorcode == 0) {
                                    ModalElement.close(1);
                                    window.location.href = window.location.href
                                }
                                else {
                                    ModalElement.alert({
                                        message: message,
                                        class: "btn btn-primary"
                                    });
                                }
                            });
                        }
                        else {
                            ModalElement.alert({
                                message: message,
                                class: "btn btn-primary"
                            });
                            return;
                        }
                    }
                    else {
                        ModalElement.alert({
                            message: message,
                            class: "btn btn-primary"
                        });
                        return;
                    }
                }
            })
        };
        var showfirstlogin = function(username){
            loginBoxShown = 1;
            ModalElement.showWindow({
                index : 1,
                closebutton: false,
                bodycontent: DOMElement.table({
                    data: [
                        [
                            {
                                children: [
                                    DOMElement.table({
                                        attrs: {style: {width: "100%"}},
                                        data: [
                                            [
                                                {
                                                    attrs: {
                                                        colSpan: 3,
                                                        style:{
                                                            textAlign: "center",
                                                        }
                                                    },
                                                    children: [DOMElement.img({
                                                        attrs: {
                                                            src: "SoftA-300px.png",
                                                            style: {
                                                                maxWidth: "90px",
                                                                maxHeight: "60px"
                                                            }
                                                        }
                                                    })]
                                                }
                                            ],
                                            [{attrs: {style: {height: "30px"}}}],
                                            [{
                                                attrs: {
                                                    colSpan: 3
                                                },
                                                text: "Đây là lần đăng nhập đầu tiên, vui lòng đổi mật khẩu của bạn để đảm bảo tính bảo mật!"
                                            }],
                                            [{attrs: {style: {height: "10px"}}}],
                                            [
                                                {
                                                    text: "Mật khẩu cũ"
                                                },{
                                                    attrs: {style: {width: "10px"}}
                                                },{
                                                    children: [
                                                        DOMElement.input({
                                                            attrs: {
                                                                id: "oldpassword_input",
                                                                type: "password",
                                                                style: {
                                                                    width: "300px",
                                                                    height:"30px"
                                                                },
                                                                onkeydown: function(event){
                                                                    if (event.keyCode == 13) changepassword(username);
                                                                }
                                                            }
                                                        })
                                                        ]
                                                    }
                                                    ],
                                                    [{attrs: {style: {height: "10px"}}}],
                                                    [
                                                    {
                                                        text: "Mật khẩu mới"
                                                    },{
                                                        attrs: {style: {width: "10px"}}
                                                    },{
                                                        children: [
                                                        DOMElement.input({
                                                            attrs: {
                                                                id: "newpassword_input",
                                                                type: "password",
                                                                style: {
                                                                    width: "300px",
                                                                    height:"30px"
                                                                },
                                                                onkeydown: function(event){
                                                                    if (event.keyCode == 13) changepassword(username);
                                                                }
                                                            }
                                                        })
                                                        ]
                                                    }
                                                    ],
                                                    [{attrs: {style: {height: "10px"}}}],
                                                    [
                                                    {
                                                        text: "Xác nhận mật khẩu"
                                                    },{
                                                        attrs: {style: {width: "10px"}}
                                                    },{
                                                        children: [
                                                        DOMElement.input({
                                                            attrs: {
                                                                id: "renewpassword_input",
                                                                type: "password",
                                                                style: {
                                                                    width: "300px",
                                                                    height:"30px"
                                                                },
                                                                onkeydown: function(event){
                                                                    if (event.keyCode == 13) changepassword(username);
                                                                }
                                                            }
                                                        })
                                                    ]
                                                }
                                            ]
                                        ]
                                    })
                                ]
                            }
                        ]
                    ]
                }),
                buttonslist: [{
                    type: "class",
                    class: "btn btn-primary",
                    text: "Đổi",
                    onclick: function(event){
                        changepassword(username);
                    }
                }]
            });
        }

        var showLoginBox = function(x) {
            if (!isModalReady()) {
                setTimeout("showLoginBox(x);", 500);
                return;
            }
            loginBoxShown = 1;
            ModalElement.showWindow({
                index : 1,
                closebutton: false,
                bodycontent: DOMElement.table({
                    data: [
                        [
                            {
                                children: [
                                    DOMElement.table({
                                        attrs: {style: {width: "100%"}},
                                        data: [
                                            [
                                                {
                                                    attrs: {
                                                        colSpan: 3,
                                                        style:{
                                                            textAlign: "center",
                                                        }
                                                    },
                                                    children: [DOMElement.img({
                                                        attrs: {
                                                            src: "SoftA-300px.png",
                                                            style: {
                                                                maxWidth: "90px",
                                                                maxHeight: "60px"
                                                            }
                                                        }
                                                    })]
                                                }
                                            ],
                                            [{attrs: {style: {height: "30px"}}}],
                                            [{
                                                attrs: {
                                                    colSpan: 3
                                                },
                                                text: "Đăng nhập vào tài khoản của bạn"
                                            }],
                                            [{attrs: {style: {height: "10px"}}}],
                                            [
                                                {
                                                    text: "Tài khoản"
                                                },{
                                                    attrs: {style: {width: "10px"}}
                                                },{
                                                    children: [
                                                        DOMElement.input({
                                                            attrs: {
                                                                id: "username_input",
                                                                type: "text",
                                                                style: {
                                                                    width: "300px",
                                                                    height: "30px"
                                                                },
                                                                onkeydown: function(event){
                                                                    if (event.keyCode == 13) submitLogin();
                                                                }
                                                            }
                                                        })
                                                    ]
                                                }
                                            ],
                                            [{attrs: {style: {height: "10px"}}}],
                                            [
                                                {
                                                    text: "Mật khẩu"
                                                },{
                                                    attrs: {style: {width: "10px"}}
                                                },{
                                                    children: [
                                                        DOMElement.input({
                                                            attrs: {
                                                                id: "password_input",
                                                                type: "password",
                                                                style: {
                                                                    width: "300px",
                                                                    height:"30px"
                                                                },
                                                                onkeydown: function(event){
                                                                    if (event.keyCode == 13) submitLogin();
                                                                }
                                                            }
                                                        })
                                                    ]
                                                }
                                            ],[
                                                {},{},{
                                                    attrs: {
                                                        id: "showhint"
                                                    }
                                                }
                                            ],
                                            [{attrs: {style: {height: "10px"}}}],
                                            [
                                                {
                                                    attrs: {
                                                        colSpan: 3
                                                    },
                                                    children: [DOMElement.checkbox({
                                                        id: "rememberme",
                                                        checked: true,
                                                        text: "Ghi nhớ cho lần đăng nhập sau"
                                                    })]
                                                }
                                            ]
                                        ]
                                    })
                                ]
                            }
                        ]
                    ]
                }),
                buttonslist: [
                    {
                        type: "class",
                        class: "btn btn-primary",
                        text: "Đăng nhập",
                        onclick: function(event){
                            submitLogin();
                        }
                    }
                ]
            });
            document.getElementById("username_input").focus();
        }

        var checkLogin = function() {
            if (loginBoxShown == 1) {
                setTimeout("checkLogin();", 1000 * 60 * 5);
                return;
            }
            api_call(<?php api_getIndex(1);?>, "checklogin.php", [], function(success, message) {
                if (success) {
                    setTimeout("checkLogin();", 1000 * 60 * 5);
                }
                else {
                    setTimeout("checkLogin();", 1000 * 60);
                }
            });
        }

        setTimeout("checkLogin();", 1000);
    </script>
    <?php
    }
?>
