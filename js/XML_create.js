; (function (root, UMDC) {
    if (typeof define === 'function' && define.amd) define([], UMDC)
    else if (typeof module === 'object' && module.exports) module.exports = UMDC()
    else root.xmlRequestCreate = UMDC()
})(this, function UMDC() {
    function XML() {
        var xmlRequestCreate = {
            /////////////////////////////////Usage///////////////////////////////////////
                    // var containerList=absol.buildDom( {
                    //                 tag:"div",
                    //                 class:"containerPageView",
                    //                 child:[{
                    //             tag: "div",
                    //             class: ["labelTitleClose","quantumWizButtonEl", "quantumWizButtonPapericonbuttonLight"],
                    //             child: [
                    //                 {
                    //                     tag: 'i',
                    //                     class: ['material-icons', 'icon-ceneter'],
                    //                     props: {
                    //                         innerHTML: "close"
                    //                     },
                    //                 }
                    //             ],
                    //             on: {
                    //                 click: function () {
                    //                     document.body.removeChild(temp);
                    //                 },
                    //             }
                    //         }]
                    //     })

                    //     var temp=absol.buildDom({
                    //         tag:"modal",
                    //         child:[
                    //             containerList
                    //         ]
                    //     })
                    //     document.body.appendChild(temp);
                    //     xmlRequestCreate.readXMLFromDB(tempabc.id,containerList).then(function(e){
                    //     })
                    //     temp.show=true;
            /////////////////////////////////Usage///////////////////////////////////////


            // goAsyn: function (file, DOMElement) {
            //     var self = this;
            //     return new Promise(function (resolve, reject) {
            //         self.arrPage = [];
            //         self.arrPage.length = 0;
            //         if (file.length !== undefined) {
            //             self.readMultiFile(file, DOMElement)
            //         }
            //     })

            // },
            // readMultiFile: function (file, DOMElement) {
            //     var self = this;
            //     window.locacate = self;
            //     return new Promise(function (resolve, reject) {
            //         self.arrPage = [];
            //         self.arrPage.length = file.length;
            //         DOMElement = self.page(DOMElement);
            //         self.arrPage.tempUpdteSTT = function () {
            //             for (var i = 0; i < self.arrPage.length; i++) {
            //                 if (self.arrPage[i].pageBreak !== undefined)
            //                     self.arrPage[i].pageBreak.innerHTML = "Phần " + (i + 1) + " / " + self.arrPage.length;
            //                 if (self.arrPage[i].pageBreakSTT !== undefined)
            //                     self.arrPage[i].pageBreakSTT.childNodes[0].childNodes[0].innerHTML = "Sau phần " + i;
            //             }
            //         }
            //         self.readMultiFileSequentially(file, DOMElement, 0).then(function () {
            //             resolve()
            //         })
            //     })
            // },
            // readMultiFileSequentially: function (file, DOMElement, i) {
            //     var self = this;
            //     if (i >= file.length)
            //         return Promise.resolve();
            //     xmlComponent.readSingleFile(file[i]).then(function (result) {
            //         var object = absol.XML.parse(result);
            //         self.extract(object, DOMElement, i);
            //         self.readMultiFileSequentially(file, DOMElement, ++i);
            //     })
            // },
            readXMLFromDB : function(id,DOMElement){
                var self=this;
                return xmlDbLoad.loadSurvey(id).then(function(result){
                    self.page(result,DOMElement);
                })
            },
            extract: function (object, DOMElement, i) {
                var self = this;
                if (DOMElement === undefined)
                    return;
                var temp;
                if (object.tagName === "document") {
                    temp = self.document(object, i);
                    if (i < self.arrPage.length && i > 0) {
                        temp.pageBreakSTT = absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewPagePageBreakGap",
                            child: [
                                {
                                    tag: "div",
                                    class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                    child: [
                                        {
                                            tag: "span",
                                            class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                            props: {
                                                innerHTML: "Sau phần " + i
                                            }
                                        }
                                    ]
                                }

                            ]
                        });
                        DOMElement.appendChild(temp.pageBreakSTT)
                    }
                }
                if (object.tagName === "title") {
                    temp = self.title(object, i);
                }
                if (object.tagName === "body") {
                    temp = self.body(object, i);
                }

                if (temp !== undefined)
                    DOMElement.appendChild(temp);

                if (object.tagName === "document")
                    return temp;
            },
            document: function (object, index, element = []) {
                var self = this;
                var svg = vchart._(
                    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 10 10" class="freebirdMaterialHeaderbannerSectionTriangle"><polygon class="freebirdSolidFill" points="0,0 10,0 0,10"></polygon></svg>'
                )
                var body = absol.buildDom({
                    tag: "div",
                    class: ["freebirdFormeditorViewPageDocument"]
                })

                var pageBreak = absol.buildDom({
                    tag: "div",
                    class: "freebirdMaterialHeaderbannerSectionText",
                    props: {
                        innerHTML: "Phần " + (index + 1) + " / " + this.arrPage.length
                    }
                })

                var menuProps = {
                    items: [
                        { text: 'Sao chép phần', cmd: 'duplicate' },
                        { text: 'Di chuyển phần', cmd: 'move' },
                        { text: 'Xóa phần', cmd: 'delete' },
                    ]
                };
                var temp;

                var buttonPage = absol.buildDom({
                    tag: "div",
                    class: ["quantumWizMenuPapermenuiconbuttonEl", "quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonLight"],
                    child: [
                        {
                            tag: "i",
                            class: ['material-icons', 'icon-ceneter'],
                            props: {
                                innerHTML: "more_vert"
                            },
                        }
                    ],
                    on:{
                        click:function(){
                            if(temp!==temp.parentNode.childNodes[0]&&menuProps.items.length===3)
                            menuProps.items.push({ text: 'Hợp nhất với phần trên', cmd: 'merge' });
                            else
                            if(temp===temp.parentNode.childNodes[0]&&menuProps.items.length===4)
                            menuProps.items.pop();
                        }
                    }
                })

                

                absol.QuickMenu.showWhenClick(buttonPage, menuProps, [2], function (menuItem) {
                    if (menuItem.cmd === "duplicate") {
                        self.functionDuplicatePage(buttonPage, self);
                    }
                    else
                        if (menuItem.cmd === "move") {
                            self.functionMovePage(buttonPage, self);
                        }
                        else
                            if (menuItem.cmd === "delete") {
                                self.functionDeletePage(buttonPage, self);
                            }
                            else 
                            if (menuItem.cmd === "merge")
                            {
                                self.functionMergePage(buttonPage, self);
                            }
                })
                var active;
                var reverse = absol.buildDom({
                                    tag: "div",
                                    class: ["quantumWizMenuPapermenuiconbuttonEl", "quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonLight","displayNone"],
                                    child: [
                                        {
                                            tag: "i",
                                            class: ['material-icons', 'icon-ceneter'],
                                            props: {
                                                innerHTML: "unfold_more"
                                            },
                                        }
                                    ],
                                    on:{
                                        click:function(){
                                            for(var i=0;i<body.childNodes.length;i++)
                                            {
                                                if(body.childNodes[i].unfold_more!==undefined)
                                                body.childNodes[i].unfold_more();
                                            }
                                            this.classList.add("displayNone");
                                            if(original!==undefined)
                                            original.classList.remove("displayNone");
                                            active=original;
                                        }
                                    }
                                });

                var original = absol.buildDom({
                                    tag: "div",
                                    class: ["quantumWizMenuPapermenuiconbuttonEl", "quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonLight"],
                                    child: [
                                        {
                                            tag: "i",
                                            class: ['material-icons', 'icon-ceneter'],
                                            props: {
                                                innerHTML: "unfold_less"
                                            },
                                        }
                                    ],
                                    on:{
                                        click:function(){
                                            for(var i=0;i<body.childNodes.length;i++)
                                            {
                                                if(body.childNodes[i].unfold_less!==undefined)
                                                body.childNodes[i].unfold_less();
                                            }
                                            this.classList.add("displayNone");
                                            if(reverse!==undefined)
                                            reverse.classList.remove("displayNone");
                                            active=reverse;
                                        }
                                    }
                                });

                temp = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewPagePageCard",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewPagePageHeader",
                            child: [{
                                tag: "div",
                                class: "freebirdMaterialHeaderbannerLabelContainer",
                                child: [
                                    {
                                        tag: "div",
                                        class: ["freebirdMaterialHeaderbannerLabelTextContainer", "freebirdSolidBackground"],
                                        child: [
                                            pageBreak,
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        class: "freebirdMaterialHeaderbannerSectionTriangleContainer",
                                        child: [
                                            svg
                                        ]
                                    },

                                ]
                            },
                                original,
                                reverse,
                                buttonPage,
                            ]
                        },
                        body
                    ]
                })
                temp.pageBreak = pageBreak;
                window.arrPage = self.arrPage;




                if (self.arrPage[index] === undefined) {
                    self.arrPage[index] = temp;
                    for (var i = 0; i < object.childNodes.length; i++) {
                        this.extract(object.childNodes[i], body, index);
                    }
                } else {
                    index++;
                    if (index === self.arrPage.length)
                        self.arrPage.push(temp)
                    else
                        self.arrPage.splice(index, 0, temp);

                    for (var i = 0; i < object.childNodes.length; i++)
                        this.extract(object.childNodes[i], body, index);
                    for (var i = 0; i < element.length; i++)
                        temp._body.appendChild(element[i]);

                    self.arrPage.tempUpdteSTT();

                }

                temp.getValue = function () {
                    return "<document>" + temp._title.getValue() + temp._body.getValue() + "</document>";
                }
                temp.reverse = function(){
                    if(active!==undefined)
                    {
                        active.click();
                    }
                }
                return temp;
            },
            page: function (XML,DOMElement) {
                var self=this;
                self.defineHeightHeader=140;
                var object=absol.XML.parse(XML);
                if(object.tagName!=="survey")
                    return;
                var content = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewEditingsurfaceEl",
                })
                var statictabParams = {
                    tag: 'statictabbar',
                    attr: {
                        'data-group': 'group1'
                    },
                    props: {
                        items: [
                            {
                                text: 'Câu hỏi',
                                value: 'question'
                            },
                        ],
                        value: 'question'
                    },
                    on: {
                        change: function () {
                            var self = this;
                            absol.$('statictabbar[data-group="group1"]', false, function (e) {
                                if (e != self) {
                                    e.value = self.value;
                                }
                                return false;
                            })
                        }
                    }
                };
                var sumPoint = absol.buildDom({
                    tag: "div",
                    class: ["freebirdFormeditorViewTabPointValue", "freebirdThemedText"],
                    child: [
                        {
                            tag: "div",
                            props: {
                                innerHTML: 0
                            }
                        },
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewTabMobilePointLabel",
                            props: {
                                innerHTML: "Tổng điểm:"
                            }
                        }
                    ]
                })
                var surveyTitle=xmlComponent.input_autoresize({ value: xmlComponent.getDataformObject(object,"value"), placeholder: "Mẫu không có tiêu đề" });
                self.processBar= absol.buildDom({
                                                tag:"div",
                                                class:["freebirdFormeditorViewHeaderSaveIndicator", "freebirdMutedText"],
                                                props:{
                                                    innerHTML:"Đã hoàn tất lưu lại"
                                                }
                                            });
                var type;
                var checkType=data_module.survey.getByID(xmlComponent.getDataformObject(object,"id"))
                if(checkType!==undefined)
                type=checkType.type;
                var surveyType=absol.buildDom( {
                                                    tag:"selectmenu",
                                                    props:{
                                                        value:type,
                                                        items:data_module.type.items.map(
                                                        function(u, i) {
                                                            return {
                                                                text: u.value,
                                                                value: u.id
                                                            }
                                                        }),
                                                    }
                                                });
                var temp = absol.buildDom({
                    tag: "div",
                    class:"PageView",
                    style:{
                        paddingTop: self.defineHeightHeader+"px"
                    },
                    child: [{
                        tag: "div",
                        class: ["freebirdFormeditorViewHeaderHeaderMast", "freebirdHeaderMastWithOverlay"],
                        style:{
                            height:self.defineHeightHeader+"px"
                        },
                        child: [
                            {
                                tag: "div",
                                class: "freebirdFormeditorViewHeaderTopRow",
                                child: [
                                    {
                                        tag: "div",
                                        class: "freebirdFormeditorViewHeaderLeft",
                                        child: [
                                            surveyTitle,
                                            self.processBar
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        class: "freebirdFormeditorViewHeaderRight",
                                        child: [{
                                            tag: "div",
                                            class: ["freebirdFormeditorViewHeaderHeaderActions"],
                                            child: [
                                               surveyType,
                                                {
                                                    tag: "div",
                                                    class: ["quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonDark", "freebirdFormeditorViewHeaderCustomThemeButton"],
                                                    child: [{
                                                        tag: 'i',
                                                        class: ['material-icons', 'icon-ceneter'],
                                                        props: {
                                                            innerHTML: "color_lens"
                                                        },
                                                    }]
                                                },
                                                {
                                                    tag: "div",
                                                    class: ["quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonDark", "freebirdFormeditorViewHeaderCustomThemeButton"],
                                                    child: [{
                                                        tag: 'i',
                                                        class: ['material-icons', 'icon-ceneter'],
                                                        props: {
                                                            innerHTML: "visibility"
                                                        },
                                                    }],
                                                    on:{
                                                        click:function()
                                                        {
                                                            var popUp = window.open("http://lab.daithangminh.vn/home_co/Form/listForm/XMLparseFormPreview.php",'');
                                                            popUp.xmlData=temp.getValue();
                                                        }
                                                    }
                                                },
                                                {
                                                    tag: "div",
                                                    class: ["quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonDark", "freebirdFormeditorViewHeaderCustomThemeButton"],
                                                    child: [{
                                                        tag: 'i',
                                                        class: ['material-icons', 'icon-ceneter'],
                                                        props: {
                                                            innerHTML: "settings"
                                                        },
                                                    }]
                                                },
                                                {
                                                    tag: "div",
                                                    class: ["quantumWizButtonEl", "quantumWizButtonPaperbuttonEl", "quantumWizButtonPaperbuttonRaised", "quantumWizButtonPaperbutton2El2", "freebirdFormeditorViewHeaderHeaderMenu", "freebirdFormeditorViewHeaderSendButton", "freebirdThemedText"],
                                                    child: [
                                                        {
                                                            tag: "div",
                                                            class: "quantumWizButtonPaperbuttonFocusOverlay",
                                                        },
                                                        {
                                                            tag: "div",
                                                            class: "quantumWizButtonPaperbuttonContent",
                                                            child: [
                                                                {
                                                                    tag: "div",
                                                                    class: "quantumWizButtonPaperbuttonLabel",
                                                                    props: {
                                                                        innerHTML: "Lưu toàn bộ"
                                                                    }
                                                                }
                                                            ],
                                                            on: {
                                                                click:function(){
                                                                    return function(){
                                                                        ModalElement.show_loading();
                                                                        xmlDbCreate.saveAll(temp.getValue()).then(function(){
                                                                            ModalElement.close(-1);
                                                                            var arrSrc = self.modal.getElementsByTagName("img");
                                                                            for(var i=0;i<arrSrc.length;i++)
                                                                            {
                                                                                if(arrSrc[i].getAttribute("src")!==null)
                                                                                if(arrSrc[i].getAttribute("src").indexOf("./img/delete/img")!==-1)
                                                                                arrSrc[i].src=arrSrc[i].getAttribute("src").replace("./img/delete/img", "./img/upload/img");
                                                                            }
                                                                            xmlModalDragImage.deleteAllTrash();
                                                                        })
                                                                        
                                                                    }()
                                                                }
                                                            }
                                                           
                                                        }
                                                    ]
                                                },
                                                {
                                                    tag: "div",
                                                    class: ["quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonDark", "freebirdFormeditorViewHeaderCustomThemeButton"],
                                                    child: [{
                                                        tag: 'i',
                                                        class: ['material-icons', 'icon-ceneter'],
                                                        props: {
                                                            innerHTML: "more_vert"
                                                        },
                                                    }]
                                                },
                                            ]

                                        }]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                class: "freebirdFormeditorViewTabTabWrapper",
                                child: [
                                    {
                                        tag: "div",
                                        class: "freebirdFormeditorViewTabTabContainer",
                                        child: [
                                            {
                                                tag: "div",
                                                class: ["freebirdFormeditorViewTabTabs", "freebirdThemedTab"],
                                                child: [
                                                    {
                                                        tag: "div",
                                                        class: ["quantumWizTabsPapertabsTabList", "freebirdFormeditorViewTabTabList", "freebirdFormeditorViewTabLightTabList"],
                                                        child: [
                                                            statictabParams
                                                        ]
                                                    },
                                                ]
                                            },
                                            ,
                                            {
                                                tag: "div",
                                                class: "freebirdFormeditorViewTabInlineTabContent",
                                                child: [
                                                    {
                                                        tag: "div",
                                                        class: "freebirdFormeditorViewTabPointsBadge",
                                                        child: [
                                                            {
                                                                tag: "div",
                                                                class: "freebirdFormeditorViewTabPointLabel",
                                                                props: {
                                                                    innerHTML: "Tổng điểm:"
                                                                }
                                                            },
                                                            sumPoint
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    },
                        content
                    ]
                })
                var id=xmlComponent.getDataformObject(object,"id");
                if(id!==undefined){
                    temp.id=id;
                }
                temp.getValue = function() {
                    var result="<survey>";
                    if(temp.id!==undefined&&temp.id!=="")
                    result+="<id>"+temp.id+"</id>"
                    else{
                        temp.id=("text_" + Math.random() + Math.random()).replace(/\./g, '')
                        result+="<id>"+temp.id+"</id>";
                    }
                    result+="<type>"+surveyType.value+"</type>"
                    result+="<value>"+surveyTitle.getValue()+"</value>"
                    for(var i=0;i<self.arrPage.length;i++)
                    {
                        result+= self.arrPage[i].getValue();
                    }
                    result+="</survey>";
                    return result;
                }
                window.theFuck = temp;
                var body = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewPageRoot"
                });
                var listButton = absol.buildDom({
                    tag: "div",
                    class: ["freebirdFormeditorViewFatPositioner"],
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewFatCard",
                            child: [
                                xmlComponent.button("add_circle", "Thêm câu hỏi", ["freebirdFormeditorViewFatMenuItem"], self.functionAdd, self),
                                xmlComponent.button("input", "Nhập câu hỏi", ["freebirdFormeditorViewFatMenuItem"],self.functionAddQuestion,self),
                                xmlComponent.button("text_fields", "Thêm tiêu đề và mô tả", ["freebirdFormeditorViewFatMenuItem"], self.functionAddDocument, self),
                                xmlComponent.button("photo", "Thêm hình ảnh", ["freebirdFormeditorViewFatMenuItem"], self.functionAddPhoto, self),
                                // xmlComponent.button("movie", "Thêm video", ["freebirdFormeditorViewFatMenuItem"]),
                                xmlComponent.button("view_stream", "Thêm phần", ["freebirdFormeditorViewFatMenuItem"], self.functionBreakPage, self),
                            ]
                        }
                    ]
                });
                var form = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewEditingsurfaceCentered",
                    child: [
                        {
                            tag: "div",
                            class: ["freebirdFormeditorViewEditingsurfacePanel", "freebirdFormeditorViewEditingsurfaceisSelected"],
                            child: [
                                {
                                    tag: "div",
                                    class: ["freebirdFormeditorViewFatRoot", "freebirdFormeditorViewFatDesktop"],
                                    child: [
                                        listButton
                                    ]
                                },
                                body
                            ]
                        }
                    ]
                })
                var el=DOMElement;
                while(!el.classList.contains("absol-modal")&&el!==document.body)
                {
                    el=el.parentNode;
                }
                self.modal=el;
                self.functionScroller(listButton);
                el.addEventListener('scroll', function (e) {
                    self.functionScroller();
                })
                content.appendChild(form);
                DOMElement.appendChild(temp);
                DOMElement.style.padding = "0px";
                DOMElement.appendChild(temp);
                if (DOMElement !== document.body) DOMElement.style.width = "80vw";
                self.sumPoint = sumPoint;

                self.arrPage = [];
                self.arrPage.length=0;
                for(var i=0;i<object.childNodes.length;i++)
                    if(object.childNodes[i].tagName==="document")
                        self.arrPage.length++;
                    self.arrPage.tempUpdteSTT = function () {
                        for (var i = 0; i < self.arrPage.length; i++) {
                            if (self.arrPage[i].pageBreak !== undefined)
                                self.arrPage[i].pageBreak.innerHTML = "Phần " + (i + 1) + " / " + self.arrPage.length;
                            if (self.arrPage[i].pageBreakSTT !== undefined)
                                self.arrPage[i].pageBreakSTT.childNodes[0].childNodes[0].innerHTML = "Sau phần " + i;
                        }
                    }
                var k=0;
                for(var i=0;i<object.childNodes.length;i++){
                    if(object.childNodes[i].tagName==="document")
                        self.extract(object.childNodes[i],body,k++);
                }
                return body;
            },
            title: function (object, index) {
                var self = this;
                var header, description;
                for (var i = 0; i < object.childNodes.length; i++) {
                    if (object.childNodes[i].tagName === "value") {
                        header = absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewPageSectionTitleRow",
                            child: [

                            ]
                        })
                        object.childNodes.push(absol.XML.parse("<placeholder>Tiêu đề biểu mẫu</placeholder>"))
                        header.appendChild(xmlComponent.structComponentEdit(object, ["freebirdFormeditorViewPageTitleInput"], 1))
                    }
                    if (object.childNodes[i].tagName === "description") {
                        description = absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewPageSectionDescriptionRow",
                            child: [

                            ],
                            on:{
                                click:function()
                                {
                                    var query=document.getElementsByClassName('insert-picture-focus');
                                    if(query.length==1)
                                        query[0].classList.remove("insert-picture-focus");
                                    this.classList.add("insert-picture-focus");
                                },
                            }
                        })

                        for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
                            if (object.childNodes[i].childNodes[j].tagName === "content") {
                                if(xmlComponent.getDataformObject(object.childNodes[i].childNodes[j],"type")==="text"){
                                    object.childNodes[i].childNodes[j].childNodes.push(absol.XML.parse("<placeholder>Mô tả biểu mẫu</placeholder>"))
                                    var input=xmlComponent.structComponentEdit(object.childNodes[i].childNodes[j], ["freebirdFormeditorViewPageDescriptionInput"], 1);
                                    var functionGet = input.getValue;
                                    input.getValue = function()
                                    {
                                        return "<content>"+functionGet()+"</content>"
                                    }
                                    description.appendChild(input)
                                }else if(xmlComponent.getDataformObject(object.childNodes[i].childNodes[j],"type")==="image"){
                                    xmlModalDragImage.elementCreateByObject(description,object.childNodes[i].childNodes[j]);
                                }
                               
                            }

                        }
                    }
                }
                if (document.getElementsByClassName("freebirdFormeditorViewItemInactive").length > 0)
                    arrClass = ["freebirdFormeditorViewPagePageFields", "firstPage", "hasSectionTab"];
                else
                    arrClass = ["freebirdFormeditorViewPagePageFields", "firstPage", "hasSectionTab", "freebirdFormeditorViewItemInactive"];
                var temp = absol.buildDom({
                    tag: "div",
                    class: arrClass,
                    on: {
                        click: function () {
                            return function () {
                                var temxp = document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0];
                                if (temxp !== undefined)
                                    temxp.classList.remove("freebirdFormeditorViewItemInactive");
                                this.classList.add("freebirdFormeditorViewItemInactive");
                                self.functionScroller();
                            }
                        }()
                    },
                    child: [
                        this.cusorroot(),
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewPageTitleAndDescription",
                            child: [
                                header,
                                description,
                            ]
                        }]
                })
                var id=xmlComponent.getDataformObject(object,"id");
                if(id!==undefined){
                    temp.id=id;
                }
                temp.header = header;
                temp.description = description;
                self.arrPage[index]._title = temp;
                temp.getValue = function () {
                    var result = "<title>";
                    if(temp.id!==""){
                        result+="<id>"+temp.id+"</id>";
                    }else{
                        temp.id=("text_" + Math.random() + Math.random()).replace(/\./g, '')
                        result+="<id>"+temp.id+"</id>";
                    }
                    if (header !== undefined) {
                        for (var i = 0; i < header.childNodes.length; i++) {
                            result += header.childNodes[i].getValue();
                        }
                    }
                    if (description !== undefined) {
                        result += "<description>"
                        for (var i = 0; i < description.childNodes.length; i++) {
                            result += description.childNodes[i].getValue();
                        }
                        result += "</description>"
                    }
                    result += "</title>";
                    return result;
                }
                temp.unfold_less = function()
                {
                    temp.click();
                }
                temp.unfold_more = function()
                {

                }
                return temp;
            },
            body: function (object, index) {
                var self = this;
                var temp = absol.buildDom({
                    tag: "draggablevstack",
                    class: ["freebirdFormviewerViewItemList"],
                    props: {
                        role: "list"
                    }
                })
                if (object.childNodes !== undefined)
                    for (var i = 0; i < object.childNodes.length; i++) {
                        temp.appendChild(this.element(object.childNodes[i], index));
                    }
                this.arrPage[index]._body = temp;
                temp.getValue = function () {
                    var result = "<body>";
                    if (temp !== undefined) {
                        for (var i = 0; i < temp.childNodes.length; i++) {
                            result += temp.childNodes[i].getValue();
                        }
                    }
                    result += "</body>";
                    return result;
                }
                temp.unfold_less  = function(){
                    for(var i=0;i<temp.childNodes.length;i++)
                    {
                        if(temp.childNodes[i].unfold_less!==undefined)
                        {
                            temp.childNodes[i].unfold_less();
                        }
                    }
                }
                temp.unfold_more  = function(){
                    for(var i=0;i<temp.childNodes.length;i++)
                    {
                        if(temp.childNodes[i].unfold_more!==undefined)
                        {
                            temp.childNodes[i].unfold_more();
                        }
                    }
                }
                self.arrPage[index].arrElement = temp;
                return temp;
            },
            element: function (object) {
                var self = this;
                var question,answer,questionPoint,answerPoint;
                if (object.childNodes === undefined)
                    return undefined;
                var scrollerTab = xmlComponent.holdmoveVer();
                var childContainer = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewItemContent",
                    child: [
                        scrollerTab
                    ],
                })
                var temp = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewItemcardRoot",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewItemRoot",
                            child: [{
                                tag: "div",
                                class: "freebirdFormeditorViewItemContentWrapper",
                                child: [
                                    this.cusorroot(),
                                    childContainer
                                ]
                            }]
                        }
                    ],
                    on: {
                        click: function () {
                            return function () {
                                var temxp = document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0];
                                if (temxp !== undefined) {
                                    temxp.classList.remove("freebirdFormeditorViewItemInactive");
                                    if (temxp.question !== undefined)
                                        temxp.question.requestUpdateSize();
                                    if (temxp.answer !== undefined)
                                        temxp.answer.requestUpdateSize();
                                }
                                this.classList.add("freebirdFormeditorViewItemInactive");
                                self.functionScroller();
                                question.requestUpdateSize();
                                answer.requestUpdateSize();
                            }
                        }()
                    },
                })
                var importantType = false;
                var type;
                var point;
                for (var i = 0; i < object.childNodes.length; i++) {
                    if (object.childNodes[i].tagName === "answer")
                        type = xmlComponent.getDataformObject(object.childNodes[i], "type");
                }
                for (var i = 0; i < object.childNodes.length; i++) {
                    if (object.childNodes[i].tagName === "question") {
                        question = this.question(object.childNodes[i], temp, type);
                        point = xmlComponent.getDataformObject(object.childNodes[i], "sum");
                        importantType = (xmlComponent.getDataformObject(object.childNodes[i], "important") === "1");
                        questionPoint = this.questionPoint(object.childNodes[i], childContainer, temp, point);
                        childContainer.appendChild(question);
                        
                        if (point !== undefined)
                            self.sumPoint.childNodes[0].innerHTML = Number(self.sumPoint.childNodes[0].innerHTML) + Number(point);
                    }
                    if (object.childNodes[i].tagName === "answer") {
                        answer = this.answer(object.childNodes[i], childContainer, type, importantType,point);
                        answerPoint = this.answerPoint(object.childNodes[i], childContainer, temp);
                    }
                }
                temp.object = object;
                temp.scrollerTab = scrollerTab;
                temp.question = question;
                temp.questionPoint = questionPoint;
                temp.answer = answer;
                temp.answerPoint = answerPoint;
                temp.childContainer = childContainer;
                temp.getValue = function () {
                    var result;
                    if (temp.mode === 0) {
                        result = "<" + object.tagName + ">" + temp.question.getValue() + temp.answer.getValue() + "</" + object.tagName + ">";
                    } else if (temp.mode === 1) {
                        result = "<" + object.tagName + ">" + temp.questionPoint.getValue() + temp.answerPoint.getValue() + "</" + object.tagName + ">";
                    }
                    temp.object = absol.XML.parse(result)
                    return result;
                }
                temp.setObject = function (object) {
                    temp.object = object;
                    for (var i = 0; i < object.childNodes.length; i++) {
                        if (object.childNodes[i].tagName === "question")
                            temp.question.setObject(object.childNodes[i]);
                    }
                    temp.answer.setObject(object);
                }
                temp.unfold_less = function(){
                    temp.childContainer.classList.add("displayNone");
                    temp.cloneSortQuestion=self.cloneSortQuestion(absol.XML.parse(temp.question.getValue()),temp);
                }
                temp.unfold_more = function(){
                    if(temp.cloneSortQuestion!==undefined){
                        temp.childContainer.classList.remove("displayNone");
                        temp.removeChild(temp.cloneSortQuestion);
                        temp.cloneSortQuestion=undefined;
                    }
                }
                temp.mode = 0;
                return temp;
            },
            cusorroot: function () {
                return absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewCursorRoot",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewCursorColorContainer",
                            child: [
                                {
                                    tag: "div",
                                    class: "freebirdFormeditorViewCursorColor"
                                }
                            ]
                        }
                    ]
                });
            },
            cloneSortQuestion: function(object,childContainer){
                var x;
                var self = this;
                for (var i = 0; i < object.childNodes.length; i++) {
                    if (object.childNodes[i].tagName === "value") {
                        if (object.childNodes[i].childNodes[0] !== undefined) {
                            value = object.childNodes[i].childNodes[0].data;
                        }
                    }
                    if (object.childNodes[i].tagName === "style") {
                    }
                }
                var scrollerTab = xmlComponent.holdmoveVer();
              
                var textValue=absol.buildDom({
                        tag: "div",
                        class: ["freebirdFormeditorViewItemMinimized"],
                        props: {
                            dir: "auto",
                            innerHTML: value
                        }
                    });
                if (xmlComponent.getDataformObject(object,"important")==="1") {
                    textValue.appendChild(
                        absol.buildDom({
                            tag: "span",
                            class: "freebirdFormviewerViewItemsItemRequiredAsterisk",
                            props: {
                                ariaLabel: "Câu hỏi bắt buộc",
                                innerHTML: "*",
                            }
                        })
                    )
                }
                  var temp = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewItemContent",
                    child: [
                        scrollerTab,
                        textValue
                    ],
                    on:{
                        click:function()
                            {
                                var el=this;
                                while(!el.classList.contains("freebirdFormeditorViewPagePageCard"))
                                {
                                    el=el.parentNode;
                                    if(el.classList.contains("freebirdFormeditorViewItemcardRoot")){
                                        var EX=el;
                                        setTimeout(function(){
                                            var elementPosition = EX.getBoundingClientRect().top;
                                            var offsetPosition = elementPosition - self.defineHeightHeader;
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth"
                                            });
                                        }, 100);
                                    }
                                }
                                el.reverse();
                            }
                    }
                })
                temp.addEventListener("mouseover", function( event ) { 
                    scrollerTab.style.visibility="visible";
                })
                temp.addEventListener("mouseout", function( event ) { 
                    scrollerTab.style.visibility="hidden";
                })
                childContainer.appendChild(temp);
                return temp;
            },
            question: function (object, tempObject, type) {
                var self = this;
                var value = "";

                object.childNodes.push(absol.XML.parse("<placeholder>Câu hỏi</placeholder>"))

                var x = xmlComponent.structComponentEdit(object, undefined, 1);
                x.sum = xmlComponent.getDataformObject(object, "sum");
                var id= xmlComponent.getDataformObject(object,"id");
                if(id!==undefined)
                x.id = id;
                
                switch (type) {
                    case "multichoice":
                        type = 3;
                        break;
                    case "checkbox":
                        type = 4;
                        break;
                    case "shortanswer":
                        type = 0;
                        break;
                    case "longanswer":
                        type = 1;
                        break;
                    case "linearscale":
                        type = 7;
                        break;
                    case "multiweighted":
                        type = 6;
                        break;

                }
                var docTypeMemuProps = {
                    items: [
                        {
                            text: 'Trả lời ngắn',
                            icon: 'span.mdi.mdi-text-short',
                            value: 0
                        },
                        {
                            text: 'Đoạn',
                            icon: 'span.mdi.mdi-text',
                            value: 1
                        },
                        "=================================",
                        {
                            text: 'Trắc nghiệm',
                            icon: 'span.mdi.mdi-radiobox-marked',
                            value: 3
                        },
                        {
                            text: 'Menu thả xuống',
                            icon: 'span.mdi.mdi-checkbox-marked',
                            value: 4
                        },
                        // {
                        //     text: 'Hộp kiểm',
                        //     icon: 'span.mdi.mdi-arrow-down-drop-circle'
                        // },
                        // "=================================",
                        // {
                        //     text: 'Tải tệp lên',
                        //     icon: 'span.mdi.mdi-cloud-upload'
                        // },

                        "=================================",
                        {
                            text: 'Trắc nghiệm trọng số',
                            icon: 'span.mdi.mdi-radiobox-marked',
                            value: 6
                        },
                        {
                            text: 'Phạm vi tuyến tính',
                            icon: 'span.mdi.mdi-ray-start-end',
                            value: 7
                        }

                    ]
                };

                var docTypeBtn = absol._({
                    tag: 'menubutton',
                    class: 'standard-alone',
                    props: docTypeMemuProps.items[type]
                });
                docTypeBtn.$arrow.addClass('mdi').addClass('mdi-menu-down');
                absol.QuickMenu.showWhenClick(docTypeBtn, docTypeMemuProps, [1], function (menuItem) {
                    docTypeBtn.text = menuItem.text;
                    docTypeBtn.icon = menuItem.icon;
                    switch (menuItem.value) {
                        case 3:
                            type = "multichoice";
                            break;
                        case 4:
                            type = "checkbox";
                            break;
                        case 0:
                            type = "shortanswer";
                            break;
                        case 1:
                            type = "longanswer";
                            break;
                        case 7:
                            type = "linearscale";
                            break;
                        case 6:
                            type = "multiweighted";
                            break;

                    }
                    tempObject.getValue();
                    xmlComponent.changeTypeObject(tempObject.object, type);
                    var result = self.element(tempObject.object);
                    tempObject.parentNode.replaceChild(result, tempObject);
                });
                var temp = absol.buildDom(
                    {
                        tag: "div",
                        class: "freebirdFormeditorViewItemTitleRow",
                        child: [
                            {
                                tag:"div",
                                class:"freebirdFormeditorViewItemTitleRowContain",
                                child:[
                                    {
                                        tag: "div",
                                        class: "freebirdFormeditorViewItemTitleInput",
                                        child: [
                                            {
                                                tag: "div",
                                                class: "freebirdFormeditorViewItemTitleInputWrapper",
                                                child: [x]
                                            },
        
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        class: "freebirdFormeditorViewItemTypechooserTypeChooser",
                                        child: [
                                            docTypeBtn
                                        ]
                                    }
                                ]
                            }
                        ],
                        on:{
                            click:function()
                            {
                                var query=document.getElementsByClassName('insert-picture-focus');
                                if(query.length==1)
                                    query[0].classList.remove("insert-picture-focus");
                                this.classList.add("insert-picture-focus");
                            },
                        }
                    });
                for(var i = 0;i<object.childNodes.length;i++)
                {
                    if(object.childNodes[i].tagName==="content")
                    {
                        if(xmlComponent.getDataformObject(object.childNodes[i],"type")==="image")
                        xmlModalDragImage.elementCreateByObject(temp,object.childNodes[i],1);
                    }
                }
                temp.header = x;
                temp.requestUpdateSize = function () {
                    temp.header.requestUpdateSize();
                }
                temp.getValue = function () {
                    var result = "<question>"
                    if (temp.header.id != "")
                        result += "<id>" + temp.header.id + "</id>";
                        else{
                            temp.header.id=("text_" + Math.random() + Math.random()).replace(/\./g, '')
                            result+="<id>"+temp.header.id+"</id>";
                        }
                    result += temp.header.getValue();
                    result += tempObject.answer.footerElement.getValue();
                    if (temp.header.sum != ""&&temp.header.sum!=="undefined"&&temp.header.sum!==undefined)
                        result += "<sum>" + temp.header.sum + "</sum>";
                    for(var j=1;j<temp.childNodes.length;j++)
                    {
                        if(temp.childNodes[j].getValue!==undefined)
                        {
                            result+=temp.childNodes[j].getValue();
                        }
                    }
                    result += "</question>"
                    return result;
                }
                temp.setObject = function (object) {
                    var sum=xmlComponent.getDataformObject(object, "sum");
                    if(sum!=undefined&&sum!="undefined")
                    temp.header.sum = xmlComponent.getDataformObject(object, "sum");
                    else
                    temp.header.sum = 0;
                }
                return temp;
            },
            questionPoint: function (object, childContainer, tempParent , point=0) {
                var x;
                var self = this;
                x = xmlComponent.textEdit(object,undefined,undefined,point);
                x.onchange = function () {
                    self.updateSumPoint();
                }
                x.classList.add("displayNone")

                var temp = absol.buildDom({
                    tag: "div",
                    class: ["freebirdFormeditorViewAssessmentHeaderWrapper", "displayNone"],
                    child: [
                        {
                            tag: "div",
                            class: ["freebirdFormeditorViewAssessmentHeader", "freebirdSolidBackground"],
                            child: [
                                {
                                    tag: "iconbutton",
                                    class: ["quantumWizButtonEl", "quantumWizButtonPaperbuttonEl", "quantumWizButtonPaperbuttonFlat", "quantumWizButtonPaperbuttonFlatColored", "quantumWizButtonPaperbutton2El2", "freebirdFormeditorViewQuestionFooterFlipButton", "whiteBackground"],
                                    child: [
                                        {
                                            tag: 'i',
                                            class: 'material-icons',
                                            props: {
                                                innerHTML: 'assignment_turned_in'
                                            },
                                            style: {
                                                fontSize: "30px"
                                            }
                                        },
                                        '<span>' + "Chọn câu trả lời chính xác:" + '</span>'
                                    ],
                                    style: {
                                        pointerEvents: "none"
                                    }
                                }
                            ]
                        }
                    ]
                })
                for(var i = 0;i<object.childNodes.length;i++)
                    {
                        if(object.childNodes[i].tagName==="content"&&xmlComponent.getDataformObject(object.childNodes[i],"type")==="image")
                        xmlModalDragImage.elementPreviewByObject(x,object.childNodes[i],1);
                    }

                var questionPoint = {};
                if (tempParent.questionPoint !== undefined) {
                    childContainer.replaceChild(temp, tempParent.questionPoint.header);
                    childContainer.replaceChild(x, tempParent.questionPoint.question);
                }
                else {
                    childContainer.appendChild(temp)
                    childContainer.appendChild(x);
                }
                
                questionPoint.header = temp;
                questionPoint.question = x;

                tempParent.questionPoint = questionPoint;

                questionPoint.getValue = function () {
                    return questionPoint.question.getValue(absol.XML.stringify(object));
                }
                return questionPoint;
            },
            answer: function (object, childContainer, type, importantType = false, point) {
                var result = {}
                var temp;
                object.type = type;
                temp = xmlComponent.structComponentEdit(object, childContainer, importantType);
                result.temp = temp;
                result.footerElement = this.footerElement(object, importantType,point)
                childContainer.appendChild(result.footerElement);
                if (importantType) {
                    // childContainer.appendChild(absol.buildDom({
                    //     tag:"div",
                    //     class:"freebirdFormviewerViewItemsItemErrorMessage",
                    //     props:{
                    //         innerHTML:"Đây là một câu hỏi bắt buộc",
                    //         role:"alert",
                    //     }
                    // }))
                }
                result.getValue = function () {
                    return temp.getValue();
                }
                result.setObject = function (object) {
                    for (var i = 0; i < object.childNodes.length; i++) {
                        if (object.childNodes[i].tagName === "question")
                            result.footerElement.setObject(object.childNodes[i])
                        if (object.childNodes[i].tagName === "answer")
                            temp.setObject(object.childNodes[i])
                    }
                    return true;
                }
                result.requestUpdateSize = function(){
                    if(temp.requestUpdateSize!==undefined)
                        temp.requestUpdateSize();
                }
                return result;
            },
            answerPoint: function (object, childContainer, tempParent) {

                var result = absol.buildDom({
                    tag: "div"
                })
                var temp = xmlComponent.structComponentPoint(object, result);
                temp.classList.add("displayNone");

                result.temp = temp;
                result.footerElement = this.footerElementPoint();

                result.footerElement.classList.add("displayNone");

                result.appendChild(result.footerElement);

                result.getValue = function () {
                    return temp.getValue();
                }
                if (tempParent.answerPoint !== undefined) {
                    childContainer.replaceChild(result, tempParent.answerPoint)
                } else
                    childContainer.appendChild(result);
                tempParent.answerPoint = result;
                return result;
            },
            footerElement: function (object, importantType = false , point = 0) {
                var self = this;
                var propsSwitch;
                if (importantType)
                    propsSwitch = {
                        checked: true
                    }
                var switchBar = absol.buildDom({
                    tag: "switch",
                    class: ["quantumWizTogglePapertoggleEl"],
                    props: propsSwitch
                });

                var hovertext = {};
                hovertext.text = "Đáp án và điểm";
                hovertext.align = 'bottom';
                if(point==undefined||point=="undefined")
                point=0;
                var notePoint = absol.buildDom({
                    tag: "div",
                    class: ["freebirdFormeditorViewQuestionFooterPointsText", "freebirdFormeditorViewQuestionFooterMedium"],
                    props: {
                        innerHTML: "(" + point + " điểm)"
                    },
                    style: {
                        margin: "auto"
                    }
                })
                var temp = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewQuestionFooterFooterRow",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewQuestionFooterFooterLeft",
                            child: [
                                {
                                    tag: "div",
                                    class: "freebirdFormeditorViewQuestionFooterAssessmentIcons",
                                    child: [
                                        {
                                            tag: "iconbutton",
                                            class: ["quantumWizButtonEl", "quantumWizButtonPaperbuttonEl", "quantumWizButtonPaperbuttonFlat", "quantumWizButtonPaperbuttonFlatColored", "quantumWizButtonPaperbutton2El2", "freebirdFormeditorViewQuestionFooterFlipButton", "blueBackground"],
                                            child: [
                                                {
                                                    tag: 'i',
                                                    class: 'material-icons',
                                                    props: {
                                                        innerHTML: 'assignment_turned_in'
                                                    },
                                                    style: {
                                                        fontSize: "30px"
                                                    }
                                                },
                                                '<span>' + "Đáp án" + '</span>'
                                            ],
                                            on: {
                                                click: function () {
                                                    self.onchangeTabPoint(temp);
                                                    absol.Tooltip.closeTooltip(this.session);
                                                },
                                                mouseover: function () {
                                                    this.session = absol.Tooltip.show(this, hovertext.text, hovertext.align)
                                                },
                                                mouseout: function () {
                                                    absol.Tooltip.closeTooltip(this.session);
                                                }
                                            }
                                        }
                                    ],
                                    style: {
                                        margin: "auto"
                                    }
                                },
                                notePoint
                            ]
                        },
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewQuestionFooterFooterRight",
                            child: [
                                xmlComponent.button("file_copy", { text: "sao chép", align: "bottom" }, ["freebirdFormeditorViewItemDuplicateButton"], self.functionDuplicate, self),
                                xmlComponent.button("delete", { text: "Xóa", align: "bottom" }, ["freebirdFormeditorViewItemDuplicateButton"], self.functionDelete, self),
                                {
                                    tag: "div",
                                    class: ["freebirdFormeditorViewQuestionFooterFooterSeparator", "freebirdFormeditorViewQuestionFooterMedium"]
                                },
                                {
                                    tag: "div",
                                    class: "freebirdFormeditorViewQuestionFooterRequiredToggleContainer",
                                    child: [
                                        {
                                            tag: "span",
                                            class: "freebirdFormeditorViewQuestionFooterToggleLabel",
                                            props: {
                                                innerHTML: "Bắt buộc"
                                            }
                                        },
                                        switchBar
                                    ]
                                },

                            ]
                        }
                    ]
                })
                temp.getValue = function () {
                    return "<important>" + Number(switchBar.checked) + "</important>";
                }
                temp.setObject = function (object) {
                    var sum=xmlComponent.getDataformObject(object, "sum")
                    if(sum!=undefined&&sum!="undefined")
                    notePoint.innerHTML = "(" + sum + " điểm)";
                    else
                    notePoint.innerHTML = "(" + 0 + " điểm)";
                }
                return temp;
            },
            footerElementPoint: function () {
                var self = this;

                var hovertext = {};
                hovertext.text = "Chỉnh sửa câu hỏi";
                hovertext.align = 'bottom';

                var temp = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewAssessmentFooterFooterRow",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewAssessmentFooterFooterLeft",
                            child: [
                                {
                                    tag: "div",
                                    class: "freebirdFormeditorViewQuestionFooterAssessmentIcons",
                                    child: [
                                        {
                                            tag: "iconbutton",
                                            class: ["quantumWizButtonEl", "quantumWizButtonPaperbuttonEl", "quantumWizButtonPaperbuttonFlat", "quantumWizButtonPaperbuttonFlatColored", "quantumWizButtonPaperbutton2El2", "freebirdFormeditorViewQuestionFooterFlipButton", "blueBackground"],
                                            child: [
                                                {
                                                    tag: 'i',
                                                    class: 'material-icons',
                                                    props: {
                                                        innerHTML: 'edit'
                                                    },
                                                    style: {
                                                        fontSize: "30px"
                                                    }
                                                },
                                                '<span>' + "Chỉnh sửa câu hỏi" + '</span>'
                                            ],
                                            on: {
                                                click: function () {
                                                    self.onchangeTabPointBack(temp);
                                                    absol.Tooltip.closeTooltip(this.session);
                                                },
                                                mouseover: function () {
                                                    this.session = absol.Tooltip.show(this, hovertext.text, hovertext.align)
                                                },
                                                mouseout: function () {
                                                    absol.Tooltip.closeTooltip(this.session);
                                                }
                                            }
                                        }
                                    ],
                                    style: {
                                        margin: "auto"
                                    }
                                },
                            ]
                        }
                    ]
                })
                return temp;
            },
            onchangeTabPoint: function (el) {
                while (!el.classList.contains("freebirdFormeditorViewItemcardRoot"))
                    el = el.parentNode;
                el.getValue();
                for (var i = 0; i < el.object.childNodes.length; i++) {
                    if (el.object.childNodes[i].tagName === "question") {
                        this.questionPoint(el.object.childNodes[i], el.childContainer, el,el.question.header.sum);
                    }
                    if (el.object.childNodes[i].tagName === "answer") {
                        this.answerPoint(el.object.childNodes[i], el.childContainer, el);
                    }
                }
                el.question.classList.add("displayNone");
                el.questionPoint.header.classList.remove("displayNone");
                el.questionPoint.question.classList.remove("displayNone");

                el.answer.temp.classList.add("displayNone");
                el.answer.footerElement.classList.add("displayNone");
                el.answerPoint.temp.classList.remove("displayNone");
                el.answerPoint.footerElement.classList.remove("displayNone");

                el.scrollerTab.style.backgroundColor = "rgb(103, 58, 183)";
                el.mode = 1;
            },
            onchangeTabPointBack: function (el) {
                while (!el.classList.contains("freebirdFormeditorViewItemcardRoot"))
                    el = el.parentNode;
                el.setObject(absol.XML.parse("<test>" + el.questionPoint.getValue() + el.answerPoint.getValue() + "</test>"));
                el.question.classList.remove("displayNone");
                el.questionPoint.header.classList.add("displayNone");
                el.questionPoint.question.classList.add("displayNone");

                el.answer.temp.classList.remove("displayNone");
                el.answer.footerElement.classList.remove("displayNone");
                el.answerPoint.temp.classList.add("displayNone");
                el.answerPoint.footerElement.classList.add("displayNone");

                el.scrollerTab.style.backgroundColor = "unset";
                el.mode = 0;
            },
            elementTabSortElement: function (object) {
                var x;
                var temp = absol.buildDom({
                    tag: "draggablevstack",
                    class: ["docssharedWizOmnilistItemRoot"],
                    style: {
                        maxHeight: window.innerHeight * 0.5 + "px"
                    },
                    on: {
                        change: function (evt) {
                            temp.updateSTT();
                        }
                    }
                });
                var self = this;
                for (var i = 0; i < this.arrPage.length; i++) {
                    var STT = absol.buildDom({
                        tag: "div",
                        class: "freebirdFormeditorDialogReorderPosition",
                        props: {
                            innerHTML: "Phần " + (i + 1) + " / " + self.arrPage.length
                        }
                    })
                    x = absol.buildDom({
                        tag: "div",
                        class: ["docssharedWizOmnilistItemRoot", "omnilist-dragtarget", "freebirdFormeditorDialogReorderSection"],
                        child: [
                            {
                                tag: "div",
                                class: "docssharedWizOmnilistItemPrimaryContent",
                                child: [
                                    xmlComponent.holdmoveHo(),
                                    {
                                        tag: "div",
                                        class: ["docssharedWizOmnilistMorselRoot", "freebirdFormeditorDialogReorderSectionBody"],
                                        child: [
                                            {
                                                tag: "div",
                                                class: "freebirdFormeditorDialogReorderText",
                                                child: [
                                                    {
                                                        tag: "div",
                                                        class: "freebirdFormeditorDialogReorderTitle",
                                                        props: {
                                                            innerHTML: self.arrPage[i]._title.header.childNodes[0].getPureValue()
                                                        }
                                                    },
                                                    STT
                                                ]
                                            },
                                            {
                                                tag: "div",
                                                class: "freebirdFormeditorDialogReorderMoveButtons",
                                                child: [
                                                    xmlComponent.button("keyboard_arrow_up", { text: "Chuyển lên trên", align: "bottom" }, ["leftControl"], self.functionMoveUpPage, self),
                                                    xmlComponent.button("keyboard_arrow_down", { text: "Chuyển xuống dưới", align: "bottom" }, ["rightControl"], self.functionMoveDownPage, self),
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        on: {
                            click: function () {
                                if (temp.me !== undefined && temp.me.classList.contains("isFocused")) {
                                    temp.me.classList.remove("isFocused");
                                }
                                temp.me = this;
                                this.classList.add("isFocused");
                            }
                        }
                    })
                    x.STT = STT;
                    x.id = i;
                    temp.addChild(x);
                }
                temp.updateSTT = function () {
                    for (var i = 0; i < temp.children.length; i++) {
                        temp.children[i].STT.innerHTML = "Phần " + (i + 1) + " / " + self.arrPage.length
                    }
                }
                return temp;
            },
            tabSortDocument: function () {
                var self = this;
                var listResult=self.elementTabSortElement();
                var temp = absol.buildDom({
                    tag: "div",
                    class: ["quantumWizDialogPaperdialogEl", "freebirdFormeditorDialogReorderDialog", "freebirdThemedMobileDialog", "quantumWizDialogPaperdialogTransitionZoom", "quantumWizDialogEl"],
                    child: [
                        {
                            tag: "div",
                            class: ["quantumWizDialogPaperdialogTitle", "quantumWizDialogPaperdialogTitleBar"],
                            child: [{
                                tag: "div",
                                class: ["quantumWizDialogPaperdialogTitleText"],
                                props: {
                                    innerHTML: "Sắp xếp lại các phần"
                                }
                            }]
                        },
                        {
                            tag: "div",
                            class: ["quantumWizDialogPaperdialogContent", "quantumWizCommonPositioningScrollableHost", "freebirdFormeditorDialogReorderDialogContent"],
                            child: [
                                listResult
                            ]
                        },
                        {
                            tag: "div",
                            class: "quantumWizDialogPaperdialogBottomButtons",
                            child: [
                                {
                                    tag: "div",
                                    class:  ["quantumWizButtonEl", "quantumWizButtonPaperbuttonEl", "quantumWizButtonPaperbuttonFlat", "quantumWizButtonPaperbuttonFlatColored", "quantumWizButtonPaperbutton2El2", "quantumWizDialogPaperdialogDialogButton"],
                                    child: [{
                                        tag: "span",
                                        class:"quantumWizButtonPaperbuttonContent",
                                        child:[
                                            {
                                                tag:"span",
                                                class:"quantumWizButtonPaperbuttonLabel",
                                                props: {
                                                    innerHTML: "Huỷ"
                                                }
                                            }
                                        ]
                                        
                                    }],
                                    on:{
                                        click:function()
                                        {
                                            var el=temp;
                                            while(!el.classList.contains("absol-modal"))
                                                el=el.parentNode;
                                                el.parentNode.removeChild(el)
                                        }
                                    }   
                                },
                                {
                                    tag: "div",
                                    class:  ["quantumWizButtonEl", "quantumWizButtonPaperbuttonEl", "quantumWizButtonPaperbuttonFlat", "quantumWizButtonPaperbuttonFlatColored", "quantumWizButtonPaperbutton2El2", "quantumWizDialogPaperdialogDialogButton","blueBackground"],
                                    child: [{
                                        tag: "span",
                                        class:"quantumWizButtonPaperbuttonContent",
                                        child:[
                                            {
                                                tag:"span",
                                                class:"quantumWizButtonPaperbuttonLabel",
                                                props: {
                                                    innerHTML: "Lưu"
                                                }
                                            }
                                        ]
                                        
                                    }],
                                    on:{
                                        click:function()
                                        {
                                            var parent=self.arrPage[0].parentNode;
                                            var result=[];
                                            var pageBreakSTT;
                                            for(var i=0;i<listResult.childNodes.length;i++)
                                            {
                                                result[i] = self.arrPage[listResult.childNodes[i].id];  
                                                parent.removeChild(self.arrPage[i]);
                                                if(self.arrPage[i].pageBreakSTT!==undefined)
                                                {
                                                    if(self.arrPage[i].pageBreakSTT.parentNode==parent)
                                                    parent.removeChild(self.arrPage[i].pageBreakSTT);
                                                }
                                            }

                                            for(var i=0;i<result.length;i++)
                                            {
                                                if(pageBreakSTT!==undefined)
                                                {
                                                    result[i].pageBreakSTT=pageBreakSTT;
                                                    parent.appendChild(pageBreakSTT);
                                                }
                                                parent.appendChild(result[i]);
                                                pageBreakSTT = absol.buildDom({
                                                    tag: "div",
                                                    class: "freebirdFormeditorViewPagePageBreakGap",
                                                    child: [
                                                        {
                                                            tag: "div",
                                                            class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                                            child: [
                                                                {
                                                                    tag: "span",
                                                                    class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                                                    props: {
                                                                        innerHTML: "Sau phần " + (i+1)
                                                                    }
                                                                }
                                                            ]
                                                        }
                                
                                                    ]
                                                })
                                            }
                                            Object.assign(self.arrPage,result);
                                            self.arrPage.tempUpdteSTT();
                                            var el=temp;
                                            window.el=el;
                                            while(!el.classList.contains("absol-modal"))
                                                el=el.parentNode;
                                                el.parentNode.removeChild(el)
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                })
                return temp;
            },
            updateSumPoint: function () {
                var self = this;
                self.sumPoint.childNodes[0].innerHTML = 0;
                for (var index = 0; index < self.arrPage.length; index++)
                    for (var i = 0; i < self.arrPage[index].arrElement.childNodes.length; i++) {
                        if (self.arrPage[index].arrElement.childNodes[i].questionPoint.question.input !== undefined) {
                            point = self.arrPage[index].arrElement.childNodes[i].questionPoint.question.input.getValue();
                            if (point !== undefined)
                                self.sumPoint.childNodes[0].innerHTML = Number(self.sumPoint.childNodes[0].innerHTML) + Number(point);
                        }
                    }
            },
            functionScroller: function (listButton) {
                var self=this;
                if (listButton !== undefined) {
                    this.listButton = listButton;
                }
                if (document.getElementsByClassName("freebirdFormeditorViewItemInactive").length !== 0 && elementInViewport(document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0])) {
                    this.listButton.style.top = document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0].getBoundingClientRect().y + self.modal.scrollTop - self.defineHeightHeader + "px";
                }
                else
                    if (this.listButton.getBoundingClientRect().y < self.defineHeightHeader+40)
                        this.listButton.style.top = (self.modal.scrollTop - 0) + "px";
                    else
                        if (this.listButton.getBoundingClientRect().y > self.modal.clientHeight - this.listButton.clientHeight)
                            this.listButton.style.top = self.modal.scrollTop + self.modal.clientHeight - this.listButton.clientHeight - (self.defineHeightHeader+10) + "px";
            },
            functionDelete: function (el, self) {
                while (!el.classList.contains("freebirdFormeditorViewItemcardRoot"))
                    el = el.parentNode;
                var index = el;
                while (!index.classList.contains("freebirdFormeditorViewPagePageCard"))
                    index = index.parentNode;
                for (var i = 0; i < self.arrPage.length; i++) {
                    if (index === self.arrPage[i]) {
                        index = i;
                        break;
                    }
                }
                el.parentNode.removeChild(el);
                self.functionScroller();
                self.updateSumPoint();
            },
            functionAdd: function (el, self, object) {
                if (document.getElementsByClassName("freebirdFormeditorViewItemInactive").length !== 0)
                    el = document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0];
                else
                    return;
                var clone;
                    if(object!==undefined)
                    clone = self.element(object);
                    else
                    clone = self.element(absol.XML.parse("<test><question><type>text</type><style></style><value></value><important>0</important></question> <answer><type>shortanswer</type><selection><type>input</type><style></style><placeholder>Câu trả lời của bạn</placeholder><value></value></selection></answer></test>"));
                if(!el.classList.contains("freebirdFormeditorViewPagePageFields")){
                    var index = el;
                    while (!index.classList.contains("freebirdFormeditorViewPagePageCard"))
                        index = index.parentNode;
                    for (var i = 0; i < self.arrPage.length; i++) {
                        if (index === self.arrPage[i]) {
                            index = i;
                            break;
                        }
                    }
                    
                    if (document.getElementsByClassName("freebirdFormeditorViewItemInactive").length !== 0)
                        el.parentNode.insertBefore(clone, el.nextSibling);
                }else
                {
                    el=el.parentNode;
                    for(var i=0;i<el.childNodes.length;i++)
                    {
                        if(el.childNodes[i].classList.contains("freebirdFormviewerViewItemList"))
                        el=el.childNodes[i];
                    }
                    el.insertBefore(clone, el.firstChild);
                }
                
            },
            functionDuplicate: function (el, self) {
                while (!el.classList.contains("freebirdFormeditorViewItemcardRoot"))
                    el = el.parentNode;
                var index = el;
                while (!index.classList.contains("freebirdFormeditorViewPagePageCard"))
                    index = index.parentNode;
                for (var i = 0; i < self.arrPage.length; i++) {
                    if (index === self.arrPage[i]) {
                        index = i;
                        break;
                    }
                }
                var clone;
                el.getValue();
                clone = self.element(el.object)
                el.parentNode.insertBefore(clone, el.nextSibling);
                self.updateSumPoint();
            },
            functionAddPhoto: function (el, self) {
                
                var modal=xmlModalDragImage.createModal(document.body);
                modal.show=true;
                // insert-picture-focus
            },
            functionAddQuestion: function (el, self) {
                var functionActive = function(xmlData)
                {
                    var object=absol.XML.parse(xmlData);
                    var test=[];
                    var arrDocument=[]
                    if(object.tagName==="check"){
                        for(var i=0;i<object.childNodes.length;i++){
                            if(object.childNodes[i].tagName==="document")
                            {
                                // self.functionAddDocument(el,self,object.childNodes[i]);
                                arrDocument.push(object.childNodes[i])
                            }else if(object.childNodes[i].tagName==="test")
                            {
                                // self.functionAdd(el,self,object.childNodes[i]);
                                test.push(object.childNodes[i]);
                            }
                        }
                        for(var i=test.length-1;i>=0;i--)
                        {
                            self.functionAdd(el,self,test[i]);
                        }
                         for(var i=arrDocument.length-1;i>=0;i--)
                        {
                            self.functionAddDocument(el,self,arrDocument[i]);
                        }
                    }
                }
                var modal=xmlModalDragQuestion.createModal(document.body,functionActive);
                modal.show=true;
                // insert-picture-focus
            },
            functionBreakPage: function (el, self) {
                if (document.getElementsByClassName("freebirdFormeditorViewItemInactive").length !== 0)
                    el = document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0];
                else
                    return;
                var index;

                var resultEl = el;
                while (!resultEl.classList.contains("freebirdFormeditorViewPagePageCard"))
                    resultEl = resultEl.parentNode;

                for (var i = 0; i < self.arrPage.length; i++) {
                    if (resultEl === self.arrPage[i]) {
                        index = i;
                        break;
                    }
                }
                var when = false;
                var element = [];
                if(el.classList.contains("freebirdFormeditorViewPagePageFields"))
                {
                    for(var i=0;i<self.arrPage[index].arrElement.childNodes.length;i++)
                    {
                        element.push(self.arrPage[index].arrElement.children[i]);
                        self.arrPage[index].arrElement.removeChild(self.arrPage[index].arrElement.children[i]);
                        i--;
                    }                 
                }
                else
                for (var i = 0; i < el.parentNode.children.length; i++) {
                    if (!when) {
                        if (el.parentNode.children[i] === el)
                            when = true;
                    } else {
                        element.push(el.parentNode.children[i]);
                        el.parentNode.removeChild(el.parentNode.children[i]);
                        i--;
                    }

                }
                var clone;
                clone = self.document(absol.XML.parse("<document><title><type>text</type><style></style><value>Mục không có tiêu đề</value><description><content><type>text</type><style></style><value></value></content></description></title><body></body></document>"), index, element);
                var nextSibling = resultEl.nextSibling;
                clone.pageBreakSTT = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewPagePageBreakGap",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                            child: [
                                {
                                    tag: "span",
                                    class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                    props: {
                                        innerHTML: "Sau phần " + (index + 1)
                                    }
                                }
                            ]
                        }

                    ]
                })
                resultEl.parentNode.insertBefore(clone.pageBreakSTT, nextSibling);
                resultEl.parentNode.insertBefore(clone, nextSibling);
            },
            functionAddDocument:function(el,self,object){
                
                if (document.getElementsByClassName("freebirdFormeditorViewItemInactive").length !== 0)
                {
                    el = document.getElementsByClassName("freebirdFormeditorViewItemInactive")[0];
                    var index;

                    var resultEl = el;
                    while (!resultEl.classList.contains("freebirdFormeditorViewPagePageCard"))
                        resultEl = resultEl.parentNode;

                    for (var i = 0; i < self.arrPage.length; i++) {
                        if (resultEl === self.arrPage[i]) {
                            index = i;
                            break;
                        }
                    }
                    var clone;
                    if(object!==undefined)
                    clone = self.document(object, index);
                    else
                    clone = self.document(absol.XML.parse("<document><title><type>text</type><style></style><value>Mục không có tiêu đề</value><description><content><type>text</type><style></style><value></value></content></description></title><body></body></document>"), index);
                    var nextSibling = resultEl.nextSibling;
                    clone.pageBreakSTT = absol.buildDom({
                        tag: "div",
                        class: "freebirdFormeditorViewPagePageBreakGap",
                        child: [
                            {
                                tag: "div",
                                class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                child: [
                                    {
                                        tag: "span",
                                        class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                        props: {
                                            innerHTML: "Sau phần " + (index + 1)
                                        }
                                    }
                                ]
                            }

                        ]
                    })
                    resultEl.parentNode.insertBefore(clone.pageBreakSTT, nextSibling);
                    resultEl.parentNode.insertBefore(clone, nextSibling);
                }else if(self.arrPage.length===0){
                    el = document.getElementsByClassName("freebirdFormeditorViewPageRoot")[0];
                    if(object!==undefined)
                    clone = self.document(object, self.arrPage.length);
                    else
                    clone = self.document(absol.XML.parse("<document><title><type>text</type><style></style><value>Mục không có tiêu đề</value><description><content><type>text</type><style></style><value></value></content></description></title><body></body></document>"), self.arrPage.length);
                    el.appendChild(clone);
                }
                
            },
            functionDeletePage: function (el, self, index) {
                if(index===undefined){
                    var resultEl = el;
                    while (!resultEl.classList.contains("freebirdFormeditorViewPagePageCard"))
                        resultEl = resultEl.parentNode;
    
                    for (var i = 0; i < self.arrPage.length; i++) {
                        if (resultEl === self.arrPage[i]) {
                            index = i;
                            break;
                        }
                    }
                }
               
                if (self.arrPage[index].pageBreakSTT !== undefined)
                    self.arrPage[index].parentNode.removeChild(self.arrPage[index].pageBreakSTT);
                else if(index===0)
                {
                    if(self.arrPage[index+1]!==undefined){
                        self.arrPage[index+1].parentNode.removeChild(self.arrPage[index+1].pageBreakSTT);
                        self.arrPage[index+1].pageBreakSTT=undefined;
                    }
                }
                self.arrPage[index].parentNode.removeChild(self.arrPage[index]);
                self.arrPage.splice(index, 1);
                self.arrPage.tempUpdteSTT();
            },
            functionDuplicatePage: function (el, self) {
                var index;
                var resultEl = el;
                while (!resultEl.classList.contains("freebirdFormeditorViewPagePageCard"))
                    resultEl = resultEl.parentNode;

                for (var i = 0; i < self.arrPage.length; i++) {
                    if (resultEl === self.arrPage[i]) {
                        index = i;
                        break;
                    }
                }
                var clone = self.document(absol.XML.parse(self.arrPage[index].getValue()), index);
                clone.pageBreakSTT = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewPagePageBreakGap",
                    child: [
                        {
                            tag: "div",
                            class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                            child: [
                                {
                                    tag: "span",
                                    class: "freebirdFormeditorViewPageGoToPageSelectLabel",
                                    props: {
                                        innerHTML: "Sau phần " + (index + 1)
                                    }
                                }
                            ]
                        }

                    ]
                })
                var nextSibling = self.arrPage[index].nextSibling;
                self.arrPage[index].parentNode.insertBefore(clone.pageBreakSTT, nextSibling);
                self.arrPage[index].parentNode.insertBefore(clone, nextSibling);

                self.arrPage.splice(index + 1, 0, clone);
                self.arrPage.tempUpdteSTT();

            },
            functionMovePage: function (el, self) {
                var x = absol.buildDom({
                    tag: "modal",
                    child: [
                        self.tabSortDocument()
                    ]
                })
                document.body.appendChild(x);
                x.show = true;
            },
            functionMoveDownPage: function (el, self) {
                while (!el.classList.contains("freebirdFormeditorDialogReorderSection"))
                    el = el.parentNode;
                swapElements(el, el.nextElementSibling);
                el.parentNode.updateSTT();
            },
            functionMoveUpPage: function (el, self) {
                while (!el.classList.contains("freebirdFormeditorDialogReorderSection"))
                    el = el.parentNode;
                swapElements(el, el.previousElementSibling);
                el.parentNode.updateSTT();
            },
            functionMergePage: function(el,self){
                var index;
                var resultEl = el;
                while (!resultEl.classList.contains("freebirdFormeditorViewPagePageCard"))
                    resultEl = resultEl.parentNode;

                for (var i = 0; i < self.arrPage.length; i++) {
                    if (resultEl === self.arrPage[i]) {
                        index = i;
                        break;
                    }
                }
                var clone;

                for (var i = 0; i < self.arrPage[index].arrElement.childNodes.length; i++) {
                        clone = self.arrPage[index].arrElement.childNodes[i];
                        self.arrPage[index].arrElement.removeChild(clone);
                        self.arrPage[index-1].arrElement.appendChild(clone);
                        i--;
                }
                self.functionDeletePage(el,self,index);
            }
        }
        return xmlRequestCreate;
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect(),
            vWidth = window.innerWidth || doc.documentElement.clientWidth,
            vHeight = window.innerHeight || doc.documentElement.clientHeight,
            efp = function (x, y) { return document.elementFromPoint(x, y) };

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0
            || rect.left > vWidth || rect.top > vHeight)
            return false;
        // Return true if any of its four corners are visible
        return (
            el.contains(efp(rect.left, rect.top))
            || el.contains(efp(rect.right, rect.top))
            || el.contains(efp(rect.right, rect.bottom))
            || el.contains(efp(rect.left, rect.bottom))
        );
    };

    function swapElements(obj1, obj2) {
        // save the location of obj2
        var parent2 = obj2.parentNode;
        var next2 = obj2.nextSibling;
        // special case for obj1 is the next sibling of obj2
        if (next2 === obj1) {
            // just put obj1 before obj2
            parent2.insertBefore(obj1, obj2);
        } else {
            // insert obj2 right before obj1
            obj1.parentNode.insertBefore(obj2, obj1);

            // now insert obj1 where obj2 was
            if (next2) {
                // if there was an element after obj2, then insert obj1 right before that
                parent2.insertBefore(obj1, next2);
            } else {
                // otherwise, just append as last child
                parent2.appendChild(obj1);
            }
        }
    }
    return XML()
})
