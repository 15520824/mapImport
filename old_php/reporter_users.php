<?php
    function write_reporter_users_script(){
?>
<script type="text/javascript">
"use strict";

formTest.reporter_users.generateData = function(host) {
    var data, header;
    DOMElement.removeAllChildren(host.category_container);
};

formTest.reporter_users.init = function(host, mode) {
    host.database = {};
    host.root_category = 0;
    host.frameList = absol.buildDom({
        tag: 'frameview',
        style: {
            width: '100%',
            height: '100%'
        }
    });
    var promiseAll = [];
    promiseAll.push(data_module.usersList.load());
    promiseAll.push(data_module.usersListHome.load());
    promiseAll.push(data_module.countriesList.load());
    Promise.all(promiseAll).then(function() {
        var mainFrame = absol.buildDom({
            tag: 'singlepage',
            child: [{
                    class: 'absol-single-page-header',
                    child: [{
                            tag: "iconbutton",
                            on: {
                                click: function(host) {
                                    return function() {
                                        formTest.menu.tabPanel.removeTab(host.holder
                                            .id);
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
                                '<span>' + LanguageModule.text(
                                    "ctrl_close") + '</span>'
                            ]
                        },
                        {
                            tag: "iconbutton",
                            class: "info",
                            on: {
                                click: function(host) {
                                    return function() {
                                        var temp1 = formTestComponent.formAddUser(host);
                                        host.frameList.addChild(temp1);
                                        host.frameList.activeFrame(temp1);
                                    }
                                }(host)
                            },
                            child: [{
                                    tag: 'i',
                                    class: 'material-icons',
                                    props: {
                                        innerHTML: 'add'
                                    }
                                },
                                '<span>' + LanguageModule.text(
                                    "ctrl_add") + '</span>'
                            ]
                        }
                    ]
                },
                {
                    class: 'absol-single-page-footer'
                }
            ]
        });

        formTest.menu.footer(absol.$('.absol-single-page-footer', mainFrame));
        host.frameList.addChild(mainFrame);
        host.frameList.activeFrame(mainFrame);
        switch (mode) {
            case 1:
                formTest.reporter_users_information.init(mainFrame.$viewport, host)
                break;
            case 2:
                // formTest.responsibility.init(container)
                break;
            case 3:
                //  formTest.category.init(container)
                break;
        }

        host.holder.addChild(host.frameList);

        host.contextCaptor = absol._('contextcaptor').addTo(mainFrame);

        host.contextCaptor.attachTo(mainFrame);
    })
}
</script>

<?php } ?>