<?php
    function write_reporter_feedback_script(){
?>
<script type="text/javascript">
"use strict";

formTest.reporter_feedback.generateData = function(host) {
    var data, header;
    DOMElement.removeAllChildren(host.type_survey_container_container);
};

formTest.reporter_feedback.init = function(host, mode) {
    host.database = {};
    host.root_type_survey = 0;
    host.frameList = absol.buildDom({
        tag: 'frameview',
        style: {
            width: '100%',
            height: '100%'
        }
    });
    var promiseAll = [];
    promiseAll.push(data_module.type.load());
    promiseAll.push(data_module.survey.load());
    Promise.all(promiseAll).then(function() {
        var prevButton,nextButton;
        prevButton = absol.buildDom({
                                tag: "iconbutton",
                                on: {
                                    click: function() {
                                        host.page.prevPage();
                                        this.updateVisiable();
                                    }
                                },
                                child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'arrow_back'
                                        }
                                    },
                                    '<span>' + 'Trang trước' + '</span>'
                                ]
                        })
        nextButton = absol.buildDom({
                                tag: "iconbutton",
                                on: {
                                    click: function() {
                                        host.page.nextPage();
                                        this.updateVisiable();
                                    }
                                },
                                child: [{
                                        tag: 'i',
                                        class: 'material-icons',
                                        props: {
                                            innerHTML: 'arrow_forward'
                                        }
                                    },
                                    '<span>' + 'Trang sau' + '</span>'
                                ]
                        })

        prevButton.updateVisiable = function()
        {
            if(host.page.indexPage===0)
            this.style.display = "none";
            if(host.page.indexPage<host.page.arrPage.length-1)
            nextButton.style.display = "inline-block";
        }
        nextButton.updateVisiable = function()
        {
            if(host.page.indexPage===host.page.arrPage.length-1)
            this.style.display = "none";
            if(host.page.indexPage>0)
            prevButton.style.display = "inline-block";
        }
        host.prevButton = prevButton;
        host.nextButton = nextButton;
        var mainFrame = absol.buildDom({
            tag: 'singlepage',
            child: [{
                    class: 'absol-single-page-header',
                    child: [
                        {
                                tag: "iconbutton",
                                on: {
                                    click: function(host) {
                                        return function() {
                                            formTest.menu.tabPanel.removeTab(host.holder.id);
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
                                    '<span>' + 'Đóng' + '</span>'
                                ]
                        },
                        prevButton,
                        nextButton
                        
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
        host.holder.addChild(host.frameList);
        switch (mode) {
            case 1:
                formTest.reporter_feedback_information.init(mainFrame.$viewport, host)
                break;
            case 2:
                break;
            case 3:
                break;
        }

        host.holder.addChild(host.frameList);

        host.contextCaptor = absol._('contextcaptor').addTo(mainFrame);

        host.contextCaptor.attachTo(mainFrame);
    })
}
</script>

<?php } ?>