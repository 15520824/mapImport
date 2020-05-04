(function(root, excuted_modal_drag_question) {
  if (typeof define === "function" && define.amd)
    define([], excuted_modal_drag_question);
  else if (typeof module === "object" && module.exports)
    module.exports = excuted_modal_drag_question();
  else root.xmlModalDragQuestion = excuted_modal_drag_question();
})(this, function excuted_modal_drag_question() {
  function by_modal_drag_question() {
    var xmlModalDragQuestion = {
      createModal: function(DOMElement, functionActive) {
        var self = this;

        self.functionActive = function() {
          return functionActive.apply(self, arguments);
        };

        var xnen = self.containGetXML();
        var pointControl = absol.buildDom({
          tag: "div",
          class: ["modal-upload-XML-body-navigation-bar", "selected-modal"],
          child: [
            {
              tag: "div",
              class: "modal-upload-XML-body-navigation-bar-button",
              props: {
                innerHTML: "Biểu mẫu"
              }
            }
          ],
          on: {
            click: function() {
              if (self.me === this) return;
              if (self.me !== undefined)
                self.me.classList.remove("selected-modal");
              this.classList.add("selected-modal");
              self.me = this;
              xnen.setPage(0);
            }
          }
        });
        self.me = pointControl;
        self.modal = absol.buildDom({
          tag: "modal",
          child: [
            {
              tag: "div",
              class: "modal-upload-XML",
              child: [
                {
                  tag: "div",
                  class: "modal-upload-XML-header",
                  child: [
                    {
                      tag: "div",
                      class: "modal-upload-XML-header-text",
                      props: {
                        innerHTML: "Nhập câu hỏi"
                      }
                    },
                    {
                      tag: "i",
                      class: [
                        "modal-upload-XML-header-icon-close",
                        "material-icons"
                      ],
                      props: {
                        innerHTML: "close"
                      },
                      on: {
                        click: function() {
                          self.modal.parentNode.removeChild(self.modal);
                        }
                      }
                    }
                  ]
                },
                {
                  tag: "div",
                  class: "modal-upload-XML-body",
                  child: [
                    {
                      tag: "div",
                      class: "modal-upload-XML-body-navigation",
                      child: [
                        pointControl,
                        {
                          tag: "div",
                          class: "modal-upload-XML-body-navigation-bar",
                          child: [
                            {
                              tag: "div",
                              class:
                                "modal-upload-XML-body-navigation-bar-button",
                              props: {
                                innerHTML: "Tải lên"
                              }
                            }
                          ],
                          on: {
                            click: function() {
                              if (self.me === this) return;
                              if (self.me !== undefined)
                                self.me.classList.remove("selected-modal");
                              this.classList.add("selected-modal");
                              self.me = this;
                              xnen.setPage(1);
                            }
                          }
                        }
                      ]
                    },
                    xnen
                  ]
                }
              ]
            }
          ]
        });
        DOMElement.appendChild(self.modal);
        self.createEvent();
        self.modal.disable = function(index) {
          xnen.disable(index);
        };
        self.modal.enable = function(index) {
          xnen.enable(index);
        };
        self.modal.setParamPage = function() {
          return xnen.setParamPage.apply(self, arguments);
        };

        self.modal.getParamPage = function() {
          return xnen.getParamPage.apply(self, arguments);
        };
        return self.modal;
      },
      itemInList: function(data) {
        var self = this;
        var temp = absol.buildDom({
          tag: "div",
          class: "modal-upload-XML-body-db-area-main-form-files-list-item",
          on: {
            click: function() {
              if (self.currentItem !== undefined) {
                if (self.currentItem === this) {
                } else {
                  self.currentItem.classList.remove("on-hold");
                }
              }
              if (!self.modal.classList.contains("visiable"))
                self.modal.enable(0);
              this.classList.add("on-hold");
              self.currentItem = this;
            }
          },
          props: {
            id: data.id
          },
          child: [
            {
              tag: "img",
              class: "modal-upload-XML-body-db-area-main-form-files-list-img",
              props: {
                src: data.image
              }
            },
            {
              tag: "div",
              class: "modal-upload-XML-body-db-area-main-form-files-list-label",
              child: [
                {
                  tag: "i",
                  class: [
                    "modal-upload-XML-body-db-area-main-form-files-list-icon",
                    "material-icons"
                  ],
                  props: {
                    innerHTML: "format_list_bulleted"
                  }
                },
                {
                  tag: "div",
                  class:
                    "modal-upload-XML-body-db-area-main-form-files-list-labelText",
                  props: {
                    innerHTML: data.value
                  }
                }
              ]
            }
          ]
        });
        temp.checkVisable = function(text){
          if (data.value.toUpperCase().indexOf(text.toUpperCase()) > -1) {
            temp.style.display="inline-block";
          }else
          {
            temp.style.display="none";
          }
        }
        return temp;
      },
      containGetXML: function() {
        
        var self = this;
        var input = absol.buildDom({
          tag: "input",
          class: "modal-upload-XML-body-drop-area-main-form-input",
          props: {
            type: "file",
            multiple: "",
            accept: "text/xml",
            id: "fileElemXML"
          },
          on: {
            change: function() {
              self.handleFiles(this.files, self);
            }
          }
        });

        var list = absol.buildDom({
          tag: "div",
          class: "modal-upload-XML-body-db-area-main-form-files-list-content",
          child: []
        });
        ModalElement.show_loading();
        data_module.survey.loadByType(0).then(function(result) {
          ModalElement.close(-1);
          for (var i = 0; i < result.length; i++) {
            var tempItems = self.itemInList(result[i]);
            tempItems.typeList = 1;
            list.appendChild(tempItems);
          }
        });
        
        var inputValid = absol.buildDom({
          tag: "input",
          class:
            "modal-upload-XML-body-db-area-main-form-search-input",
          child: [],
          props: {
            type: "text",
            autocomplete: "off"
          },
          on:{
            input:function(event){
              var text= this.value;
              for(var i = 0; i<list.childNodes.length;i++)
              {
                if(list.childNodes[i].checkVisable!==undefined)
                {
                  list.childNodes[i].checkVisable(text);
                }
              }
            }
          }
        });
        
        var containerPage = absol.buildDom({
          tag: "div",
          class: "modal-upload-XML-body-drop-area-main",
          child: [
            {
              tag: "div",
              class: [
                "modal-upload-XML-body-db-area-main-form",
                "displayVisiable"
              ],
              props: {},
              child: [
                {
                  tag: "div",
                  class: "modal-upload-XML-body-db-area-main-form-search",
                  child: [
                    inputValid
                  ]
                },
                {
                  tag: "div",
                  class: "modal-upload-XML-body-db-area-main-form-files",
                  child: [
                    {
                      tag: "div",
                      class:
                        "modal-upload-XML-body-db-area-main-form-files-list",
                      child: [
                        {
                          tag: "div",
                          class:
                            "modal-upload-XML-body-db-area-main-form-files-list-title",
                          props: {
                            innerHTML: "Tệp"
                          }
                        },
                        list
                      ]
                    }
                  ]
                },
                {
                  tag: "div",
                  class: "modal-upload-XML-body-drop-save",
                  child: [
                    self.choiceButton(0, self.getXMLSurvey),
                    {
                      tag: "div",
                      class: [
                        "quantumWizButtonEl",
                        "quantumWizButtonPaperbuttonEl",
                        "quantumWizButtonPaperbuttonFlat",
                        "quantumWizButtonPaperbuttonFlatColored",
                        "quantumWizButtonPaperbutton2El2",
                        "quantumWizDialogPaperdialogDialogButton"
                      ],
                      style: {
                        marginLeft: "10px",
                        border: "1px solid rgb(169, 169, 169)",
                        width: "90px"
                      },
                      child: [
                        {
                          tag: "span",
                          class: "quantumWizButtonPaperbuttonContent",
                          child: [
                            {
                              tag: "span",
                              class: "quantumWizButtonPaperbuttonLabel",
                              props: {
                                innerHTML: "Hủy"
                              }
                            }
                          ]
                        }
                      ],
                      on: {
                        click: function() {
                          self.modal.parentNode.removeChild(self.modal);
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              tag: "div",
              class: "modal-upload-XML-body-drop-area-main-form",
              props: {
                id: "drop-area"
              },
              child: [
                {
                  tag: "div",
                  class: "modal-upload-XML-body-drop-area-main-form-content",
                  child: [
                    input,
                    {
                      tag: "button",
                      class: "modal-upload-XML-body-drop-area-main-form-button",
                      props: {
                        innerHTML: "Chọn một file XML để tải lên",
                        for: "fileElemXML"
                      },
                      on: {
                        click: function() {
                          input.click();
                        }
                      }
                    },
                    {
                      tag: "p",
                      class:
                        "modal-upload-XML-body-drop-area-main-form-tutorial",
                      props: {
                        innerHTML: "Kéo thả file tại đây"
                      }
                    },
                    {
                      tag: "div",
                      class: "modal-upload-XML-body-drop-area-main-gallery",
                      props: {
                        id: "gallery"
                      }
                    },
                    {
                      tag: "progress",
                      class: "modal-upload-XML-body-drop-area-main-process-bar",
                      props: {
                        id: "progress-bar",
                        max: "100",
                        value: "0"
                      }
                    }
                  ]
                },

                {
                  tag: "div",
                  class: "modal-upload-XML-body-drop-save",
                  child: [
                    self.choiceButton(1),
                    {
                      tag: "div",
                      class: [
                        "quantumWizButtonEl",
                        "quantumWizButtonPaperbuttonEl",
                        "quantumWizButtonPaperbuttonFlat",
                        "quantumWizButtonPaperbuttonFlatColored",
                        "quantumWizButtonPaperbutton2El2",
                        "quantumWizDialogPaperdialogDialogButton"
                      ],
                      style: {
                        marginLeft: "10px",
                        border: "1px solid rgb(169, 169, 169)",
                        width: "90px"
                      },
                      child: [
                        {
                          tag: "span",
                          class: "quantumWizButtonPaperbuttonContent",
                          child: [
                            {
                              tag: "span",
                              class: "quantumWizButtonPaperbuttonLabel",
                              props: {
                                innerHTML: "Hủy"
                              }
                            }
                          ]
                        }
                      ],
                      on: {
                        click: function() {
                          self.modal.parentNode.removeChild(self.modal);
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        });
        var typeLibary;
        data_module.type.loadLibary().then(function(result){
          typeLibary = result;
          var choiceList = absol.buildDom({
            tag: "div",
            class:
              "modal-upload-XML-body-db-area-main-form-search-filter",
            child: [
              {
                tag: "selecttreemenu",
                class:
                  "modal-upload-XML-body-db-area-main-form-search-filter-text",
                props: {
                  items: [{text:"Công ty",value:formTest.prefix+formTest.dbname+0,typeList:1,items:data_module.type.items.map(function(u,i){
                    return {text:u.value,value:formTest.prefix+formTest.dbname+u.id,typeList:1}
                  })},
                  {text:"Thư viện",value:formTest.dbnamelibary,typeList:0,items:typeLibary.map(function(u,i){
                    return {text:u.value,value:formTest.dbnamelibary+u.id,typeList:0}
                  })}
                ]
                },
                on:{
                  change: function(event,me)
                  {
                    if(event.itemElt._data.typeList == 1){
                      ModalElement.show_loading();
                      data_module.survey.loadByType(me.value.replace(formTest.prefix+formTest.dbname,"")).then(function(result) {
                        ModalElement.close(-1);
                        list.clearChild();
                        for (var i = 0; i < result.length; i++) {
                          var tempItems = self.itemInList(result[i]);
                          tempItems.typeList = event.itemElt._data.typeList;
                          list.appendChild(tempItems);
                        }
                      });
                    }
                    if(event.itemElt._data.typeList == 0){
                      ModalElement.show_loading();
                      var params =[
                        {name:"prefix",value:""},
                        {name:"dbname",value: formTest.dbnamelibary},
                        {name:"id",value: me.value.replace(formTest.dbnamelibary,"")}
                      ]
                      data_module.survey.loadByType(params).then(function(result) {
                        ModalElement.close(-1);
                        list.clearChild();
                        for (var i = 0; i < result.length; i++) {
                          var tempItems = self.itemInList(result[i]);
                          tempItems.typeList = event.itemElt._data.typeList;
                          list.appendChild(tempItems);
                        }
                      });
                    }
                  }
                }
              }
            ]
          });
          containerPage.childNodes[0].childNodes[0].appendChild(choiceList);
          setTimeout(function(){
            inputValid.style.paddingLeft = choiceList.clientWidth + 10 + "px";
          },100);
        })
        var temp = absol.buildDom({
          tag: "div",
          class: "modal-upload-XML-body-drop",
          child: [
            {
              tag: "div",
              class: "modal-upload-XML-body-drop-area",
              child: [containerPage]
            }
          ]
        });
        temp.setPage = function(index) {
          var check = containerPage.getElementsByClassName("displayVisiable");
          if (check.length !== 0) check = check[0];
          else return false;
          check.classList.remove("displayVisiable");
          if (containerPage.childNodes.length > index) {
            containerPage.childNodes[index].classList.add("displayVisiable");
            return true;
          } else return false;
        };
        temp.disable = function(index) {
          if (containerPage.childNodes[index].classList.contains("visiable"));
          containerPage.childNodes[index].classList.remove("visiable");
        };
        temp.enable = function(index) {
          if (!containerPage.childNodes[index].classList.contains("visiable"));
          containerPage.childNodes[index].classList.add("visiable");
        };
        temp.getParamPage = function(index, props) {
          return containerPage.childNodes[index][props];
        };
        temp.setParamPage = function(index, props, value) {
          containerPage.childNodes[index][props] = value;
        };
        return temp;
      },
      getXMLSurvey: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
          var temp = document.getElementsByClassName("on-hold");
          var id;
          if (temp.length !== 0) {
            temp = temp[0];
            id = temp.id;
          } else reject();
          while (
            !temp.parentNode.classList.contains(
              "modal-upload-XML-body-drop-area-main"
            )
          ) {
            temp = temp.parentNode;
          }
          if(temp.typeList === 0){
            ModalElement.show_loading();
            xmlDbLoad.loadSurvey(id,false,false).then(function(result) {
              ModalElement.close(-1);
              temp.xmlData = result;
              resolve();
            });
          }
          else{
            var params = [
              {name:"prefix",value:""},
              {name:"dbname",value: formTest.dbnamelibary},
              {name:"id",value: id}
            ]
            ModalElement.show_loading();
            xmlDbLoad.loadSurvey(params,false,false).then(function(result) {
              ModalElement.close(-1);
              temp.xmlData = result;
              resolve();
            });
          }
        });
      },
      choiceButton: function(index, functionActive) {
        var self = this;
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "quantumWizButtonEl",
            "quantumWizButtonPaperbuttonEl",
            "quantumWizButtonPaperbuttonFlat",
            "quantumWizButtonPaperbuttonFlatColored",
            "quantumWizButtonPaperbutton2El2",
            "quantumWizDialogPaperdialogDialogButton",
            "disable"
          ],
          style: {
            backgroundColor: "#2196F3",
            border: "1px solid rgb(169, 169, 169)",
            width: "90px"
          },
          child: [
            {
              tag: "span",
              class: "quantumWizButtonPaperbuttonContent",
              child: [
                {
                  tag: "span",
                  class: "quantumWizButtonPaperbuttonLabel",
                  style: {
                    color: "white"
                  },
                  props: {
                    innerHTML: "Chọn"
                  }
                }
              ]
            }
          ],
          on: {
            click: function() {
              if (functionActive !== undefined) {
                functionActive().then(function() {
                  self.modal.style.display = "none";
                  document.body.appendChild(
                    self.functionExplorer(
                      self.modal.getParamPage(index, "xmlData")
                    )
                  );
                });
              } else {
                self.modal.style.display = "none";
                document.body.appendChild(
                  self.functionExplorer(
                    self.modal.getParamPage(index, "xmlData")
                  )
                );
              }
              //functionActive(self.modal.getParamPage(index, "xmlData"));
              //   self.modal.parentNode.removeChild(self.modal);
            }
          }
        });
        return temp;
      },
      createEvent: function() {
        var self = this;
        self.dropArea = document.getElementById("drop-area");
        // Prevent default drag behaviors
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
          self.dropArea.addEventListener(
            eventName,
            self.preventDefaults,
            false
          );
          document.body.addEventListener(
            eventName,
            self.preventDefaults,
            false
          );
        });

        // Highlight drop area when item is dragged over it
        ["dragenter", "dragover"].forEach(eventName => {
          self.dropArea.addEventListener(eventName, self.highlight, false);
        });
        ["dragleave", "drop"].forEach(eventName => {
          self.dropArea.addEventListener(eventName, self.unhighlight, false);
        });
        // Handle dropped files
        self.dropArea.addEventListener(
          "drop",
          function(e) {
            self.handleDrop(e, self);
          },
          false
        );

        self.uploadProgress = [];
        self.progressBar = document.getElementById("progress-bar");
      },
      functionExplorer: function(xmlText) {
        var self = this;
        var title = "Mục không có tiêu đề";
        console.log(xmlText)
        var object = absol.XML.parse(xmlText);
        if (object.tagName == "survey")
          title = xmlComponent.getDataformObject(object, "value");
        var list = absol.buildDom({
          tag: "div",
          class: "freebirdFormeditorQuestionimportImportedQuestions",
          child: []
        });
        var textValue = absol.buildDom({
                          tag: "div",
                          class: "quantumWizButtonPaperbuttonLabel",
                          props: {
                            innerHTML: "Nhập câu hỏi (0)"
                          }
                        });
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdCommonSidebarSidebar",
            "freebirdCommonSidebarIsExpanded",
            "freebirdCommonSidebarIsVisible"
          ],
          child: [
            {
              tag: "div",
              class: ["freebirdCommonSidebarHeader"],
              child: [
                xmlComponent.button(
                  "keyboard_backspace",
                  undefined,
                  undefined,
                  self.functionBack,
                  self
                ),
                {
                  tag: "div",
                  class: ["freebirdCommonSidebarTitle", "freebirdThemedText"],
                  props: {
                    innerHTML: "Nhập câu hỏi"
                  }
                },
                xmlComponent.button(
                  "close",
                  undefined,
                  undefined,
                  self.functionClose,
                  self
                )
              ]
            },
            {
              tag: "div",
              class: "freebirdCommonSidebarContent",
              child: [
                {
                  tag: "div",
                  class: "freebirdFormeditorQuestionimportHeader",
                  child: [
                    {
                      tag: "div",
                      class: "freebirdFormeditorQuestionimportTitle",
                      props: {
                        innerHTML: title
                      }
                    }
                  ]
                },
                list,
                {
                  tag: "div",
                  class: [
                    "freebirdFormeditorSidebarQuestionimportImportButtonWrapper",
                    "quantumWizButtonEl",
                    "quantumWizButtonPaperbuttonEl",
                    "quantumWizButtonPaperbuttonRaised",
                    "quantumWizButtonPaperbutton2El2",
                    "freebirdFormeditorViewHeaderHeaderMenu",
                    "freebirdFormeditorViewHeaderSendButton",
                    "freebirdThemedText"
                  ],
                  child: [
                    {
                      tag: "div",
                      class: "quantumWizButtonPaperbuttonFocusOverlay"
                    },
                    {
                      tag: "div",
                      class: "quantumWizButtonPaperbuttonContent",
                      child: [
                          textValue
                      ]
                    }
                  ],
                on:{
                  click:function(){
                    self.functionActive(temp.getValue());
                    self.modal.parentNode.removeChild(self.modal);
                    temp.parentNode.removeChild(temp);
                  }
                }
                }
              ]
            }
          ]
        });
        var checkButtonValue= absol.buildDom({
                    tag: "checkboxbutton",
                    class: [
                      "docssharedWizToggleLabeledControl",
                      "freebirdThemedCheckbox",
                      "freebirdThemedCheckboxDarkerDisabled",
                      "freebirdFormviewerViewItemsCheckboxControl"
                    ],
                    on: {
                      click: function() {
                        if(this.checked===true){
                        var count=0;
                        absol.$("checkboxbutton",list.childNodes[0],function(e){
                            e.checked=true;
                            if(e.classList.contains("freebirdThemedCheckboxCount"))
                              count++;
                        })
                        textValue.innerText="Nhập câu hỏi ("+count+")"
                        }
                        else{
                          absol.$("checkboxbutton",list.childNodes[0],function(e){
                            e.checked=false;
                        })
                        textValue.innerText="Nhập câu hỏi (0)"
                        }
                      }
                    }
                  })
        list.appendChild(
          absol.buildDom({
            tag: "div",
            class: ["freebirdFormeditorQuestionimportCheckbox"],
            child: [
              {
                tag: "div",
                class: ["docssharedWizToggleLabeledLabelWrapper"],
                child: [
                  checkButtonValue,
                  {
                    tag: "div",
                    class: "docssharedWizToggleLabeledContent",
                    child: [
                      {
                        tag: "div",
                        class: "docssharedWizToggleLabeledPrimaryText",
                        child: [
                          {
                            tag: "div",
                            class: "docssharedWizToggleLabeledLabelText",
                            props: {
                              innerHTML: ""
                            },
                            child: [
                              {
                                tag: "span",
                                class:
                                  "freebirdFormeditorQuestionimportSectionLabel",
                                props: {
                                  innerHTML: "Chọn tất cả"
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          })
        );
        var body=[];
        console.log(object)
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "document")
             body.push(self.elMenuBody(object.childNodes[i], list.childNodes[0]));
        }
        list.checkButton = function(){
          var done=false;
          var count=0;
          absol.$("checkboxbutton",list.childNodes[0],function(e){
            if(e.checked===false&&e!==checkButtonValue)
            {
              done=true;
              checkButtonValue.checked=false;
            }
            if(e.classList.contains("freebirdThemedCheckboxCount")&&e.checked===true)
              count++;
          })
           if(done===false)
          checkButtonValue.checked=true;
          textValue.innerText="Nhập câu hỏi ("+count+")"

        }
        temp.getValue = function(){
          var result="<check>"
          for(var i=0;i<body.length;i++)
          {
            if(body[i].getValue!==undefined)
              result = body[i].getValue(result);
          }
          result+="</check>"
          return result;
        }
        return temp;
      },
      elMenuBody: function(object, list) {
        var self = this;
        var tempList;
        var temp={};
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "title") {
            tempList = self.elMenuCheck(object.childNodes[i], list);
          }
          if (object.childNodes[i].tagName === "body") {
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              tempList.appendChild(
                self.elMenuSectionCheck(object.childNodes[i].childNodes[j])
              );
            }
          }
        }
        tempList.checkButton = function(){
          var checkButtonValue;
          var done=false;
          absol.$("checkboxbutton",tempList,function(e){
            if(e===tempList.childNodes[0].childNodes[0])
                checkButtonValue=e;
            else{
              if(e.checked===false)
              {
                done=true;
                checkButtonValue.checked=false;
              }
            }
          })
          if(done===false)
          checkButtonValue.checked=true;
        }
        temp.getValue = function(result){
          var stringCheck="";
          if(tempList.childNodes[0].childNodes[0].checked===true){
            for(var i=1;i<tempList.childNodes.length;i++){
              if(tempList.childNodes[i].getValue!==undefined)
              stringCheck+=tempList.childNodes[i].getValue();
            }
            result+="<document>";
            result+=tempList.getValue();
            result+="<body>";
            result+=stringCheck
            result+="</body>"
            result+="</document>"
          }else
          {
            var index=result.lastIndexOf("</body></document>")
            if(index!==-1){
              for(var i=1;i<tempList.childNodes.length;i++){
                if(tempList.childNodes[i].getValue!==undefined)
                stringCheck+=tempList.childNodes[i].getValue();
              }
              result=result.slice(0,index)+stringCheck+"</body></document>"
            }
            else{
              for(var i=1;i<tempList.childNodes.length;i++){
                if(tempList.childNodes[i].getValue!==undefined)
                stringCheck+=tempList.childNodes[i].getValue();
              }
              result+=stringCheck;
            }
          }
          return result;
        }
        return temp;
      },
      elMenuCheck: function(object, list) {
        if (object.tagName !== "title") return;
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorQuestionimportCheckbox",
            "freebirdFormeditorQuestionimportSection"
          ],
          child: [
            {
              tag: "div",
              class: ["docssharedWizToggleLabeledLabelWrapper"],
              child: [
                {
                  tag: "checkboxbutton",
                  class: [
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedCheckbox",
                    "freebirdThemedCheckboxDarkerDisabled",
                    "freebirdFormviewerViewItemsCheckboxControl"
                  ],
                  on: {
                    click: function() {
                      // if(this.checked===true)
                        // absol.$("checkboxbutton",temp,function(e){
                        //     e.checked=true;
                        // })
                        // else
                        // absol.$("checkboxbutton",temp,function(e){
                        //     e.checked=false;
                        // })
                        // console.log(temp.parentNode.parentNode.checkButton)
                      if (temp.parentNode.parentNode !== undefined&&temp.parentNode.parentNode.checkButton!==undefined) {
                        temp.parentNode.parentNode.checkButton();
                      }
                    }
                  }
                },
                {
                  tag: "div",
                  class: "docssharedWizToggleLabeledContent",
                  child: [
                    {
                      tag: "div",
                      class: "docssharedWizToggleLabeledPrimaryText",
                      child: [
                        {
                          tag: "div",
                          class: "docssharedWizToggleLabeledLabelText",
                          props: {
                            innerHTML: ""
                          },
                          child: [
                            {
                              tag: "span",
                              class:
                                "freebirdFormeditorQuestionimportSectionLabel",
                              props: {
                                innerHTML: "Phần :"
                              }
                            },
                            {
                              tag: "span",
                              props: {
                                innerHTML: xmlComponent.getDataformObject(
                                  object,
                                  "value"
                                )
                              }
                            }
                          ]
                        }
                      ]
                    }
                    // {
                    //   tag: "div",
                    //   class: "docssharedWizToggleLabeledSecondaryTexts",
                    //   child: [
                    //     {
                    //       tag: "div",
                    //       class: "freebirdFormeditorQuestionimportHelpText",
                    //       props: {
                    //         innerHTML: ""
                    //       }
                    //     }
                    //   ]
                    // }
                  ]
                }
              ]
            }
          ],
        });
        list.appendChild(temp);
        temp.getValue = function(){
          return absol.XML.stringify(object);
        }
        return temp;
      },
      elMenuSectionCheck: function(object) {
        if (object.tagName !== "test") return;
        var type,
          value,
          count = 0;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "question") {
            value = xmlComponent.getDataformObject(
              object.childNodes[i],
              "value"
            );
          }
          if (object.childNodes[i].tagName === "answer") {
            type = xmlComponent.getDataformObject(object.childNodes[i], "type");
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "selection") {
                count++;
              }
            }
          }
        }
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormeditorQuestionimportCheckbox",
          child: [
            {
              tag: "div",
              class: [
                "docssharedWizToggleLabeledLabelWrapper",
                "docssharedWizToggleLabeledHasSecondary"
              ],
              child: [
                {
                  tag: "checkboxbutton",
                  class: [
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedCheckbox",
                    "freebirdThemedCheckboxDarkerDisabled",
                    "freebirdFormviewerViewItemsCheckboxControl",
                    "freebirdThemedCheckboxCount"
                  ],
                  on: {
                    click: function() {
                      // if (temp.parentNode !== undefined&&temp.parentNode.checkButton!==undefined) {
                      //   temp.parentNode.checkButton();
                      // }
                      if (temp.parentNode.parentNode.parentNode !== undefined&&temp.parentNode.parentNode.parentNode.checkButton!==undefined) {
                        temp.parentNode.parentNode.parentNode.checkButton();
                      }
                    }
                  }
                },
                {
                  tag: "div",
                  class: "docssharedWizToggleLabeledContent",
                  child: [
                    {
                      tag: "div",
                      class: "docssharedWizToggleLabeledPrimaryText",
                      child: [
                        {
                          tag: "div",
                          class: "docssharedWizToggleLabeledLabelText",
                          props: {
                            innerHTML: value
                          }
                        }
                      ]
                    },
                    {
                      tag: "div",
                      class: "docssharedWizToggleLabeledSecondaryTexts",
                      child: [
                        {
                          tag: "div",
                          class: "freebirdFormeditorQuestionimportHelpText",
                          props: {
                            innerHTML:
                              jsUcfirst(type) + " :" + count + " lựa chọn"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
        });
        temp.getValue = function(){
          if(temp.childNodes[0].childNodes[0].checked===true)
          return absol.XML.stringify(object);
          else
          return "";
        }
        return temp;
      },
      preventDefaults: function(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      highlight: function(e) {
        this.classList.add("highlight");
      },
      unhighlight: function(e) {
        this.classList.remove("active");
      },
      handleDrop: function(e, self) {
        var dt = e.dataTransfer;
        var files = dt.files;
        self.handleFiles(files, self);
      },
      initializeProgress: function(numFiles) {
        var self = this;
        self.progressBar.value = 0;
        self.uploadProgress = [];

        for (var i = numFiles; i > 0; i--) {
          self.uploadProgress.push(0);
        }
      },
      updateProgress: function(fileNumber, percent, self) {
        self.uploadProgress[fileNumber] = percent;
        var total =
          self.uploadProgress.reduce((tot, curr) => tot + curr, 0) /
          self.uploadProgress.length;
        console.debug("update", fileNumber, percent, total);
        self.progressBar.value = total;
      },
      handleFiles: function(files, self) {
        files = [...files];
        self.initializeProgress(files.length);
        for (var i = 0; i < files.length; i++) {
          self.uploadFile(files[i], i, self);
          self.previewFile(files[i], self);
        }
      },
      previewFile: function(file, self) {
        self.imgUrl = xmlComponent.Image("./img/xml.jpg");
        self.imgUrl.classList.add("fit-content-XML");
        var parent = document.getElementById("gallery");

        parent.appendChild(self.imgUrl);
      },
      uploadFile: function(file, i, self) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onprogress = function(e) {
          self.updateProgress(i, (e.loaded * 100.0) / e.total || 100, self);
        };
        reader.onloadend = function() {
          self.modal.setParamPage(1, "xmlData", reader.result);
          // self.xmlData = reader.result;
          self.updateProgress(i, 100, self); // <- Add this
          self.modal.enable(1);
          document.getElementById("gallery").style.position = "relative";
        };
      },
      functionClose: function(el, self) {
        while (el.parentNode !== document.body) {
          el = el.parentNode;
        }
        el.parentNode.removeChild(el);
        self.modal.parentNode.removeChild(self.modal);
      },
      functionBack: function(el, self) {
        while (el.parentNode !== document.body) {
          el = el.parentNode;
        }
        el.parentNode.removeChild(el);
        self.modal.style.display = "block";
      }
    };
    return xmlModalDragQuestion;
  }
  return by_modal_drag_question();
});

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};