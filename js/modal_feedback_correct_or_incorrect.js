(function(root, excuted_modal_feedback_correct_or_incorrect) {
  if (typeof define === "function" && define.amd)
    define([], excuted_modal_feedback_correct_or_incorrect);
  else if (typeof module === "object" && module.exports)
    module.exports = excuted_modal_feedback_correct_or_incorrect();
  else root.xmlModalFeedback = excuted_modal_feedback_correct_or_incorrect();
})(this, function excuted_modal_feedback_correct_or_incorrect() {
  function by_modall_feedback_correct_or_incorrect() {
    var xmlModalFeedback = {
      createModal: function(DOMElement, functionActive, object) {
        var self = this;

        self.functionActive = function() {
          return functionActive.apply(self, arguments);
        };

        var xnen = self.containContent(object);
        var pointControl = absol.buildDom({
          tag: "div",
          class: ["modal-upload-XML-body-navigation-bar", "selected-modal"],
          child: [
            {
              tag: "div",
              class: "modal-upload-XML-body-navigation-bar-button",
              props: {
                innerHTML: "Câu trả lời sai"
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
              class: ["modal-upload-XML","modal-no-size"],
              child: [
                {
                  tag: "div",
                  class: "modal-upload-XML-header",
                  child: [
                    {
                      tag: "div",
                      class: "modal-upload-XML-header-text",
                      props: {
                        innerHTML: "Thêm phản hồi"
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
                                innerHTML: "Câu trả lời đúng"
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
        self.modal.xnen=xnen;
        DOMElement.appendChild(self.modal);
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
      childContainerCorrect: function(object)
      {
        var self=this;
        var input = xmlComponent.newTextAreaEdit(object);
        var temp = absol.buildDom( {
              tag: "div",
              class: [
                "modal-upload-XML-body-db-area-main-form",
                "displayVisiable"
              ],
              props: {},
              child: [
                {
                  tag:"div",
                  class:["quantumWizTabsPapertabsTabPanelContainer", "freebirdThemedDarkTabContent"],
                  child:[
                    {
                      tag:"div",
                      class:"quantumWizTabsPapertabsTabPanel",
                      child:[
                        {
                          tag:"div",
                          class:"freebirdFormeditorDialogFeedbackTabsFeedbackTabContent",
                          child:[
                            {
                              tag:"div",
                              class:"freebirdFormeditorDialogFeedbackFeedbackRoot",
                              child:[
                                input
                              ]
                            }
                          ]
                        }
                      ]

                    }
                  ]
                },
                {
                  tag: "div",
                  class: "modal-upload-XML-body-drop-save",
                  child: [
                    self.choiceButton(self.functionActive),
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
            })
          temp.focus = function()
          {
            input.focus();
          }
          temp.getPureValue = function(){
            return input.getPureValue();
          }
          setTimeout(() => {
              temp.focus();
          }, 100);
          return temp;
      },
      childContainerInCorrect: function(object)
      {
        var self=this;
        var input = xmlComponent.newTextAreaEdit(object);
        var temp = absol.buildDom( {
              tag: "div",
              class: [
                "modal-upload-XML-body-db-area-main-form"
              ],
              props: {},
              child: [
                {
                  tag:"div",
                  class:["quantumWizTabsPapertabsTabPanelContainer", "freebirdThemedDarkTabContent"],
                  child:[
                    {
                      tag:"div",
                      class:"quantumWizTabsPapertabsTabPanel",
                      child:[
                        {
                          tag:"div",
                          class:"freebirdFormeditorDialogFeedbackTabsFeedbackTabContent",
                          child:[
                            {
                              tag:"div",
                              class:"freebirdFormeditorDialogFeedbackFeedbackRoot",
                              child:[
                                input
                              ]
                            }
                          ]
                        }
                      ]

                    }
                  ]
                },
                {
                  tag: "div",
                  class: "modal-upload-XML-body-drop-save",
                  child: [
                    self.choiceButton(self.functionActive),
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
            })
          temp.focus = function()
          {
              input.focus();
          }
          temp.getPureValue = function(){
            return input.getPureValue();
          }
          return temp;
      },
      containContent: function(object) {
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
        var correct =self.childContainerCorrect({value:xmlComponent.getDataformObject(object,"feedback_correct"),placeholder:"Nhập phản hồi"});
        var incorrect =self.childContainerInCorrect({value:xmlComponent.getDataformObject(object,"feedback_incorrect"),placeholder:"Nhập phản hồi"});

        var containerPage = absol.buildDom({
          tag: "div",
          class: "modal-upload-XML-body-drop-area-main",
          child: [
            correct,
            incorrect
          ]
        });
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
        temp.correct=correct;
        temp.incorrect=incorrect;
        temp.setPage = function(index) {
          var check = containerPage.getElementsByClassName("displayVisiable");
          if (check.length !== 0) check = check[0];
          else return false;
          check.classList.remove("displayVisiable");
          if (containerPage.childNodes.length > index) {
            containerPage.childNodes[index].classList.add("displayVisiable");
             containerPage.childNodes[index].focus();
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
      choiceButton: function(functionActive) {
        var self = this;
        var temp = absol.buildDom({
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
                    innerHTML: "Xong"
                  }
                }
              ]
            }
          ],
          on: {
            click: function() {
              functionActive(self.modal.xnen.correct.getPureValue(),self.modal.xnen.incorrect.getPureValue());
              self.modal.parentNode.removeChild(self.modal);
            }
          }
        });
        return temp;
      }
    };
    return xmlModalFeedback;
  }
  return by_modall_feedback_correct_or_incorrect();
});

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};