(function(root, UCD) {
  if (typeof define === "function" && define.amd) define([], UCD);
  else if (typeof module === "object" && module.exports) module.exports = UCD();
  else root.xmlComponent = UCD();
})(this, function UCD() {
  function XMLC() {
    var xmlComponent = {
      readSingleFile: function(file) {
        return new Promise(function(resolve, reject) {
          var rawFile = new XMLHttpRequest();
          rawFile.open("GET", file, false);
          rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
              if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                resolve(allText);
              }
            }
          };
          rawFile.send(null);
        });
      },
      text: function(object, arr = ["freebirdFormviewerViewText"], props = {}) {
        var value = "";
        var style = "";
        value = xmlComponent.getDataformObject(object, "value");
        var textValue = absol.buildDom({
          tag: "div",
          class: arr,
          props: Object.assign(
            {
              dir: "auto",
              innerHTML: value
            },
            props
          )
        });
        if (xmlComponent.getDataformObject(object, "important") === "1") {
          textValue.appendChild(
            absol.buildDom({
              tag: "span",
              class: "freebirdFormviewerViewItemsItemRequiredAsterisk",
              props: {
                ariaLabel: "Câu hỏi bắt buộc",
                innerHTML: "*"
              }
            })
          );
        }
        textValueContain = absol.buildDom({
          tag: "div",
          class: "freebirdFormeditorViewItemTitleRowContainText",
          child: [
            textValue
            ]
        });

        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormeditorViewItemTitleRowContain",
          child: [textValueContain]
        });
        if (
          xmlComponent.getDataformObject(object, "sum") !== "0" &&
          xmlComponent.getDataformObject(object, "sum") !== undefined
        ) {
          textValueContain.appendChild(
            absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormviewerViewItemsItemScore",
                "freebirdFormviewerViewItemsItemHint"
              ],
              props: {
                innerHTML:
                  xmlComponent.getDataformObject(object, "sum") + " điểm"
              }
            })
          );
        }
        var id = xmlComponent.getDataformObject(object, "id");
        if (id !== undefined) temp.id = id;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "style") {
          } else if (object.childNodes[i].tagName === "content") {
            if (
              xmlComponent.getDataformObject(object.childNodes[i], "type") ===
              "image"
            ) {
              var divine = xmlModalDragImage.elementPreviewByObject(
                temp,
                object.childNodes[i],
                1
              );
              divine.style.width = "100%";
            }
          }
        }
        temp.getValue = function() {
          return temp.id;
        };
        temp.getPureValue = function(){
          return value;
        }
        return temp;
      },
      textEdit: function(
        object,
        arr = [
          "freebirdFormeditorViewAssessmentTitleInput",
          "freebirdCustomFont"
        ],
        props = {},
        point = 0,
        childContainer
      ) {
        var self = this;
        var value = "";
        var style = "";
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "value") {
            if (object.childNodes[i].childNodes[0] !== undefined) {
              value = object.childNodes[i].childNodes[0].data;
            }
          }
          if (object.childNodes[i].tagName === "style") {
          }
        }
        
        var textResult = absol.buildDom({
          tag: "div",
          class: arr,
          props: Object.assign(
            {
              dir: "auto",
              innerHTML: value
            },
            props
          )
        });
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormeditorViewItemTitleRow",
          child: [
            {
              tag: "div",
              class: "freebirdFormeditorViewItemTitleRowContain",
              child: [
                textResult,
               
              ]
            }
          ]
        });
        temp.getValue = function(string) {
          if (string.indexOf("<sum>") === -1)
            string =
              string.replace(
                "</question>",
                "<sum>" + childContainer.getfooterElement().getValue() + "</sum>"
              );
          else{
            string = string.replace(
              "<sum>" + point + "</sum>",
              "<sum>" + childContainer.getfooterElement().getValue() + "</sum>"
            );
            string = string.replace(
              "</question>",
              ""
            );
          }
          return string;
        };
        return temp;
      },
      shortanswer: function(object, childContainer) {
        var x = absol.buildDom({
          tag: "div",
          class:"align-textAnswer"
        });
        childContainer.appendChild(x);
        for (var i = 0; i < object.childNodes.length; i++)
          if (object.childNodes[i].tagName == "selection") {
            var input = this.input(object.childNodes[i]);
            x.appendChild(input);
            var id = xmlComponent.getDataformObject(object.childNodes[i], "id");
            if (id !== undefined) {
              input.id = id;
            }
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    x,
                    object.childNodes[i].childNodes[j],
                    1
                  );
                }
              }
            }
          }
        x.disable = function() {
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].disable !== undefined)
              x.childNodes[i].disable();
          }
        };
        x.getValue = function() {
          var result = [];
          for (var i = 0; i < x.childNodes.length; i++) {
            if (
              x.childNodes[i].value() !== "" &&
              x.childNodes[i].value() !== "undefined" &&
              x.childNodes[i].value() !== undefined
            )
              result[x.childNodes[i].id] = x.childNodes[i].getValue();
          }
          if (result.length === 0) return undefined;
          return result;
        };
        return x;
      },
      shortanswerPoint: function(object, childContainer) {
        var x = absol.buildDom({
          tag: "div"
        });
        childContainer.appendChild(x);
        for (var i = 0; i < object.childNodes.length; i++)
          if (object.childNodes[i].tagName == "selection") {
            var input = this.input(object.childNodes[i]);
            input.xmlValue = object.childNodes[i];
            x.appendChild(input);
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    x,
                    object.childNodes[i].childNodes[j],
                    1
                  );
                }
              }
            }
          }
        x.disable = function() {
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].disable !== undefined)
              x.childNodes[i].disable();
          }
        };
        x.getValue = function() {
          var result = "<answer>";
          result += "<type>shortanswer</type>";
          for (var i = 0; i < x.childNodes.length; i++) {
            var textResult = absol.XML.stringify(x.childNodes[i].xmlValue);
            if (textResult.indexOf("<point>1</point>") === -1) {
              result +=
                textResult.replace("</selection>", "<point>1</point>") +
                "</selection>";
            } else result += textResult;
          }
          result += "</answer>";
          return result;
        };
        return x;
      },
      shortanswerEdit: function(object, childContainer) {
        var isHas = false;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "selection") {
            var x = this.inputEdit(object.childNodes[i]);
            var temp = absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormeditorViewQuestionBodyQuestionBody",
                "freebirdFormeditorViewQuestionBodyShortTextBody"
              ],
              child: [
                {
                  tag: "div",
                  class:
                    "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList",
                  child: [x]
                }
              ]
            });
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementCreateByObject(
                    temp,
                    object.childNodes[i].childNodes[j],
                    1
                  );
                }
              }
            }
            isHas = true;
          }
        }
        if (!isHas) {
          var x = this.inputEdit({ value: "Câu trả lời của bạn" });
          var temp = absol.buildDom({
            tag: "div",
            class: [
              "freebirdFormeditorViewQuestionBodyQuestionBody",
              "freebirdFormeditorViewQuestionBodyShortTextBody"
            ],
            child: [
              {
                tag: "div",
                class: "freebirdFormeditorViewQuestionBodyShorttextbodyRoot",
                child: [x]
              }
            ]
          });
        }
        if (childContainer !== undefined) childContainer.appendChild(temp);
        var id = xmlComponent.getDataformObject(object, "id");
        if (id !== undefined) temp.id = id;

        // temp.addEventListener("click", function() {
        //   var query = document.getElementsByClassName("insert-picture-focus");
        //   if (query.length == 1)
        //     query[0].classList.remove("insert-picture-focus");
        //   this.classList.add("insert-picture-focus");
        // });
        temp.getValue = function() {
          var textResult = "<answer>";
          textResult += "<type>shortanswer</type>";
          textResult += "<selection>";
          if (temp.id !== "") textResult += "<id>" + temp.id + "</id>";
          else {
            temp.id = ("text_" + Math.random() + Math.random()).replace(
              /\./g,
              ""
            );
            textResult += "<id>" + temp.id + "</id>";
          }
          textResult += x.getValue();
          for (var i = 1; i < temp.childNodes.length; i++) {
            if (temp.childNodes[i].getValue !== undefined)
              textResult += temp.childNodes[i].getValue();
          }
          textResult += "</selection>";
          textResult += "</answer>";
          return textResult;
        };
        temp.setObject = function() {};
        return temp;
      },
      longanswer: function(object, childContainer) {
        var x = absol.buildDom({
          tag: "div",
          class:"align-textAnswer"
        });
        childContainer.appendChild(x);
        for (var i = 0; i < object.childNodes.length; i++)
          if (object.childNodes[i].tagName == "selection") {
            var input = this.textarea(object.childNodes[i]);
            var id = xmlComponent.getDataformObject(object.childNodes[i], "id");
            if (id !== undefined) {
              input.id = id;
            }
            x.appendChild(input);
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    x,
                    object.childNodes[i].childNodes[j],
                    1
                  );
                }
              }
            }
          }
        x.disable = function() {
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].disable !== undefined)
              x.childNodes[i].disable();
          }
        };
        x.getValue = function() {
          var result = [];
          for (var i = 0; i < x.childNodes.length; i++) {
            if (
              x.childNodes[i].value() !== "" &&
              x.childNodes[i].value() !== "undefined" &&
              x.childNodes[i].value() !== undefined
            )
              result[x.childNodes[i].id] = x.childNodes[i].getValue();
          }
          if (result.length === 0) return undefined;
          return result;
        };
        window.x = x;
        return x;
      },
      longanswerPoint: function(object, childContainer) {
        var x = absol.buildDom({
          tag: "div"
        });
        childContainer.appendChild(x);
        for (var i = 0; i < object.childNodes.length; i++)
          if (object.childNodes[i].tagName == "selection") {
            var input = this.textarea(object.childNodes[i]);
            input.xmlValue = object.childNodes[i];
            x.appendChild(input);
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    x,
                    object.childNodes[i].childNodes[j],
                    1
                  );
                }
              }
            }
          }
        x.disable = function() {
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].disable !== undefined)
              x.childNodes[i].disable();
          }
        };
        x.getValue = function() {
          var result = "<answer>";
          result += "<type>longanswer</type>";
          for (var i = 0; i < x.childNodes.length; i++) {
            var textResult = absol.XML.stringify(x.childNodes[i].xmlValue);
            if (textResult.indexOf("<point>1</point>") === -1) {
              result +=
                textResult.replace("</selection>", "<point>1</point>") +
                "</selection>";
            } else result += textResult;
          }
          result += "</answer>";
          return result;
        };
        return x;
      },
      longanswerEdit: function(object, childContainer) {
        var isHas = false;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "selection") {
            var x = this.textareaEdit(object.childNodes[i], undefined, 0);
            var temp = absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormeditorViewQuestionBodyQuestionBody",
                "freebirdFormeditorViewQuestionBodyLongTextBody"
              ],
              child: [
                {
                  tag: "div",
                  class:
                    "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList",
                  child: [x]
                }
              ]
            });
            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementCreateByObject(
                    temp,
                    object.childNodes[i].childNodes[j],
                    1
                  );
                }
              }
            }
            isHas = true;
          }
        }
        if (isHas === false) {
          var x = this.textareaEdit({ value: "Câu trả lời của bạn" });
          var temp = absol.buildDom({
            tag: "div",
            class: [
              "freebirdFormeditorViewQuestionBodyQuestionBody",
              "freebirdFormeditorViewQuestionBodyLongTextBody"
            ],
            child: [
              {
                tag: "div",
                class: "freebirdFormeditorViewQuestionBodyLongtextbodyRoot",
                child: [x]
              }
            ]
          });
        }
        if (childContainer !== undefined) childContainer.appendChild(temp);
        var id = xmlComponent.getDataformObject(object, "id");
        if (id !== undefined) temp.id = id;
        // temp.addEventListener("click", function() {
        //   var query = document.getElementsByClassName("insert-picture-focus");
        //   if (query.length == 1)
        //     query[0].classList.remove("insert-picture-focus");
        //   this.classList.add("insert-picture-focus");
        // });
        temp.getValue = function() {
          var textResult = "<answer>";
          textResult += "<type>longanswer</type>";
          textResult += "<selection>";
          if (temp.id !== "") textResult += "<id>" + temp.id + "</id>";
          else {
            temp.id = ("text_" + Math.random() + Math.random()).replace(
              /\./g,
              ""
            );
            textResult += "<id>" + temp.id + "</id>";
          }
          textResult += x.getValue();
          for (var i = 1; i < temp.childNodes.length; i++) {
            if (temp.childNodes[i].getValue !== undefined)
              textResult += temp.childNodes[i].getValue();
          }
          textResult += "</selection>";
          textResult += "</answer>";
          return textResult;
        };
        temp.setObject = function() {};
        return temp;
      },
      multichoice: function(object, childContainer) {
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewItemsItemAnswer"
        });
        childContainer.appendChild(temp);
        var arrValue = [];
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var y = absol.buildDom({
              tag: "div",
              class: "docssharedWizToggleLabeledLabelWrapper"
            });
            arrValue.push(y);
            var z = absol.buildDom({
              tag: "div",
              class: "freebirdFormviewerViewItemsRadioOptionContainer",
              child: [
                {
                  tag: "label",
                  class: [
                    "docssharedWizToggleLabeledContainer",
                    "freebirdFormviewerViewItemsRadioChoice"
                  ],
                  child: [y,
                   {
                    tag: "div",
                    class: [
                      "freebirdFormeditorViewItemTrueButton",
                      "quantumWizButtonEl",
                      "quantumWizButtonPapericonbuttonEl",
                      "quantumWizButtonPapericonbuttonLight"
                    ],
                    child: [
                      {
                        tag: "i",
                        class: ["material-icons", "icon-ceneter"],
                        props: {
                          innerHTML: "check"
                        }
                      }
                    ]
            },
            {
                    tag: "div",
                    class: [
                      "freebirdFormeditorViewItemFalseButton",
                      "quantumWizButtonEl",
                      "quantumWizButtonPapericonbuttonEl",
                      "quantumWizButtonPapericonbuttonLight"
                    ],
                    child: [
                      {
                        tag: "i",
                        class: ["material-icons", "icon-ceneter"],
                        props: {
                          innerHTML: "close"
                        }
                      }
                    ]
            }]
                }
              ]
            });
            var id = xmlComponent.getDataformObject(object.childNodes[j], "id");
            if (id !== undefined) {
              y.id = id;
            }
            for (var k = 0; k < object.childNodes[j].childNodes.length; k++) {
              if (object.childNodes[j].childNodes[k].tagName === "value") {
                var value = "";
                if (
                  object.childNodes[j].childNodes[k].childNodes[0] !== undefined
                ) {
                  value = object.childNodes[j].childNodes[
                    k
                  ].childNodes[0].data.replace(/\n/g, "<br />");
                }
                y.select = absol.buildDom({
                  tag: "radiobutton",
                  class: [
                    "quantumWizTogglePaperradioEl",
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedRadio",
                    "freebirdThemedRadioDarkerDisabled",
                    "freebirdFormviewerViewItemsRadioControl"
                  ],
                  on: {
                    click: (function(y) {
                      return function() {
                        if (temp.me !== undefined) {
                          temp.me.checked = false;
                        }
                        temp.me = this;
                        temp.me.checked = true;
                        for (var m = 0; m < y.childNodes.length; m++) {
                          if (
                            y.childNodes[m].classList.contains("singleInput")
                          ) {
                            y.childNodes[m]
                              .getElementsByClassName(
                                "quantumWizTextinputPaperinputInput"
                              )[0]
                              .focus();
                          }
                        }
                      };
                    })(y)
                  }
                });
                y.appendChild(y.select);
                y.appendChild(this.primarytext(value));
              }
              if (object.childNodes[j].childNodes[k].tagName === "style") {
              }
              if (object.childNodes[j].childNodes[k].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "input"
                ) {
                  y.input = this.structComponent(
                    object.childNodes[j].childNodes[k]
                  );
                  y.appendChild(y.input);
                  y.style.width = "100%";
                } else if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    z,
                    object.childNodes[j].childNodes[k],
                    3
                  );
                }
              }
            }
            temp.appendChild(z);
          }
        }
        temp.getValue = function() {
          for (var m = 0; m < arrValue.length; m++) {
            if (arrValue[m].select.checked === true) {
              var result = [];
              result[arrValue[m].id] = "";
              if (arrValue[m].input !== undefined)
                result[arrValue[m].id] = arrValue[m].input.getValue();
              return result;
            }
          }
          return undefined;
        };
        return temp;
      },
      multichoiceEdit: function(object, childContainer) {
        var self = this;
        var x = absol.buildDom({
          tag: "draggablevstack",
          class: "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList",
          on:{
            change:function()
            {
              var el=x;
              while (!el.classList.contains("true-dame"))
              el = el.parentNode;
              el.click();
            }
          }
        });
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewQuestionBodyQuestionBody",
            "freebirdFormeditorViewQuestionBodySelectBody"
          ],
          child: [x]
        });
        childContainer.appendChild(temp);
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var z = this.elMenuComponent("radiobutton", object.childNodes[j]);
            x.appendChild(z);
          }
        }
        temp.appendChild(this.addOptionAndOrtherMultichoice());
        temp.getValue = function() {
          var result = "<answer>";
          result += "<type>multichoice</type>";
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].getValue !== undefined)
              result += x.childNodes[i].getValue();
          }
          result += "</answer>";
          return result;
        };
        temp.setObject = function(objectX) {
          var i = 0;
          for (var k = 0; k < objectX.childNodes.length; k++) {
            if (objectX.childNodes[k].tagName === "selection") {
              if (
                self.getDataformObject(objectX.childNodes[k], "point") == "1"
              ) {
                if (x.childNodes[i].point === undefined) {
                  x.childNodes[i].point = absol.buildDom({
                    tag: "div",
                    class: [
                      "freebirdFormeditorViewItemCheckButton",
                      "quantumWizButtonEl",
                      "quantumWizButtonPapericonbuttonEl",
                      "quantumWizButtonPapericonbuttonLight"
                    ],
                    child: [
                      {
                        tag: "i",
                        class: ["material-icons", "icon-ceneter"],
                        props: {
                          innerHTML: "check"
                        },
                        style: {
                          color: "green"
                        }
                      }
                    ]
                  });
                  if (x.childNodes[i].input === undefined)
                    x.childNodes[i].text.parentNode.insertBefore(
                      x.childNodes[i].point,
                      x.childNodes[i].text.nextSibling
                    );
                  else
                    x.childNodes[i].input.parentNode.insertBefore(
                      x.childNodes[i].point,
                      x.childNodes[i].input.nextSibling
                    );
                }
              } else {
                if (x.childNodes[i].point != undefined) {
                  x.childNodes[i].point.parentNode.removeChild(
                    x.childNodes[i].point
                  );
                  x.childNodes[i].point = undefined;
                }
              }
              i++;
            }
          }
        };
        temp.requestUpdateSize = function() {
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].requestUpdateSize !== undefined)
              x.childNodes[i].requestUpdateSize();
          }
        };
        return temp;
      },
      multichoicePoint: function(object, childContainer) {
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewAssessmentBodyQuestionBody",
            "freebirdFormeditorViewAssessmentBodyRadioBody"
          ],
          child: []
        });
        childContainer.appendChild(temp);
        var arrValue = [];
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var y = absol.buildDom({
              tag: "div",
              class: "freebirdFormeditorViewAssessmentAnswersListItemContent"
            });
            arrValue.push(y);
            y.xmlValue = object.childNodes[j];

            var z = absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormeditorViewAssessmentAnswersListItem",
                "freebirdFormeditorViewAssessmentAnswersListIsCorrect"
              ],
              child: [
                {
                  tag: "div",
                  class: [
                    "freebirdFormeditorViewAssessmentAnswersListCorrectToggle"
                  ],
                  child: [y]
                }
              ],
              on: {
                click: (function(y) {
                  return function() {
                    if (this.classList.contains("isChecked")) {
                      this.classList.remove("isChecked");
                      y.select.checked = false;
                    } else {
                      this.classList.add("isChecked");
                      y.select.checked = true;
                    }

                    for (var m = 0; m < y.childNodes.length; m++) {
                      if (y.childNodes[m].classList.contains("singleInput")) {
                        y.childNodes[m]
                          .getElementsByClassName(
                            "quantumWizTextinputPaperinputInput"
                          )[0]
                          .focus();
                      }
                    }
                  };
                })(y)
              }
            });

            for (var k = 0; k < object.childNodes[j].childNodes.length; k++) {
              if (object.childNodes[j].childNodes[k].tagName === "value") {
                var value = "";
                if (
                  object.childNodes[j].childNodes[k].childNodes[0] !== undefined
                ) {
                  value = object.childNodes[j].childNodes[
                    k
                  ].childNodes[0].data.replace(/\n/g, "<br />");
                }
                y.select = absol.buildDom({
                  tag: "radiobutton",
                  class: [
                    "quantumWizTogglePaperradioEl",
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedRadio",
                    "freebirdThemedRadioDarkerDisabled",
                    "freebirdFormviewerViewItemsRadioControl"
                  ]
                });
                y.appendChild(y.select);
                y.appendChild(this.primarytext(value));
              }
              if (object.childNodes[j].childNodes[k].tagName === "style") {
              }
              if (object.childNodes[j].childNodes[k].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "input"
                ) {
                  y.input = this.structComponent(
                    object.childNodes[j].childNodes[k]
                  );
                  y.input.disable();
                  y.appendChild(y.input);
                } else if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    z,
                    object.childNodes[j].childNodes[k],
                    3
                  );
                }
              }
            }
            y.appendChild(
              absol.buildDom({
                tag: "div",
                class: [
                  "freebirdFormeditorViewItemCheckButton",
                  "quantumWizButtonEl",
                  "quantumWizButtonPapericonbuttonEl",
                  "quantumWizButtonPapericonbuttonLight"
                ],
                child: [
                  {
                    tag: "i",
                    class: ["material-icons", "icon-ceneter"],
                    props: {
                      innerHTML: "check"
                    },
                    style: {
                      color: "green"
                    }
                  }
                ]
              })
            );
            temp.appendChild(z);

            if (this.getDataformObject(object.childNodes[j], "point") == "1") {
              y.select.checked = true;
              z.classList.add("isChecked");
            }
          }
        }
        temp.getValue = function() {
          var result = "<answer>";
          result += "<type>multichoice</type>";
          for (var i = 0; i < arrValue.length; i++) {
            if (arrValue[i].select.checked === true) {
              var textResult = absol.XML.stringify(arrValue[i].xmlValue);
              if (textResult.indexOf("<point>1</point>") === -1) {
                result +=
                  textResult.replace("</selection>", "<point>1</point>") +
                  "</selection>";
              } else result += textResult;
            } else
              result += absol.XML.stringify(arrValue[i].xmlValue).replace(
                "<point>1</point>",
                ""
              );
          }
          result += "</answer>";
          return result;
        };
        return temp;
      },
      multiweightedEdit: function(object, childContainer) {
        var self = this;
        var x = absol.buildDom({
          tag: "draggablevstack",
          class: "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList",
          on:{
            change:function()
            {
              var el=x;
              while (!el.classList.contains("true-dame"))
              el = el.parentNode;
              el.click();
            }
          }
        });
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewQuestionBodyQuestionBody",
            "freebirdFormeditorViewQuestionBodySelectBody"
          ],
          child: [x]
        });
        childContainer.appendChild(temp);
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var z = this.elMenuComponentMultiWeight(
              "radiobutton",
              object.childNodes[j]
            );
            x.appendChild(z);
          }
        }
        temp.appendChild(this.addOptionAndOrtherMultiWeight());
        temp.getValue = function() {
          var result = "<answer>";
          result += "<type>multiweighted</type>";
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].getValue !== undefined)
              result += x.childNodes[i].getValue();
          }
          result += "</answer>";
          return result;
        };
        temp.setObject = function(objectX) {
          var i = 0;
          for (var k = 0; k < objectX.childNodes.length; k++) {
            if (objectX.childNodes[k].tagName === "selection") {
                x.childNodes[i].point.value=xmlComponent.getDataformObject(objectX.childNodes[k],"point");
                x.childNodes[i].point.childNodes[0].innerText=xmlComponent.getDataformObject(objectX.childNodes[k],"point");
                i++;
            }
          }
        };
        temp.requestUpdateSize = function() {
          for (var i = 0; i < x.childNodes.length; i++) {
            if (x.childNodes[i].requestUpdateSize !== undefined)
              x.childNodes[i].requestUpdateSize();
          }
        };
        return temp;
      },
      multiweightedPoint: function(object, childContainer) {
        var self = this;
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewAssessmentBodyQuestionBody",
            "freebirdFormeditorViewAssessmentBodyRadioBody"
          ],
          child: []
        });
        childContainer.appendChild(temp);
        var arrValue = [];
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var y = absol.buildDom({
              tag: "div",
              class: "freebirdFormeditorViewAssessmentAnswersListItemContent"
            });
            arrValue.push(y);
            y.xmlValue = object.childNodes[j];

            var z = absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormeditorViewAssessmentAnswersListItem",
                "freebirdFormeditorViewAssessmentAnswersListIsCorrect"
              ],
              child: [
                {
                  tag: "div",
                  class: [
                    "freebirdFormeditorViewAssessmentAnswersListCorrectToggle"
                  ],
                  child: [y]
                }
              ]
            });

            for (var k = 0; k < object.childNodes[j].childNodes.length; k++) {
              if (object.childNodes[j].childNodes[k].tagName === "value") {
                var value = "";
                if (
                  object.childNodes[j].childNodes[k].childNodes[0] !== undefined
                ) {
                  value = object.childNodes[j].childNodes[
                    k
                  ].childNodes[0].data.replace(/\n/g, "<br />");
                }
                y.select = absol.buildDom({
                  tag: "radiobutton",
                  class: [
                    "quantumWizTogglePaperradioEl",
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedRadio",
                    "freebirdThemedRadioDarkerDisabled",
                    "freebirdFormviewerViewItemsRadioControl"
                  ],
                  style: {
                    pointerEvents: "none"
                  }
                });
                y.appendChild(y.select);
                y.appendChild(this.primarytext(value));
              }
              if (object.childNodes[j].childNodes[k].tagName === "style") {
              }
              if (object.childNodes[j].childNodes[k].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "input"
                ) {
                  y.input = this.structComponent(
                    object.childNodes[j].childNodes[k]
                  );
                  y.input.disable();
                  y.appendChild(y.input);
                } else if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    z,
                    object.childNodes[j].childNodes[k],
                    3
                  );
                }
              }
            }

            var changeChecked = (function(selected,zed) {
                return function(number) {
                  if (number == 0) {
                    zed.classList.remove("isChecked");
                    selected.checked = false;
                  } else {
                    zed.classList.add("isChecked");
                    selected.checked = true;
                  }
                };
              })(y.select,z);

            
            var number = 0;
            if (
              this.getDataformObject(object.childNodes[j], "point") !==
              undefined
            )
              number = this.getDataformObject(object.childNodes[j], "point");
            y.pointInput = self.input_choicenumber(number,changeChecked);
            y.appendChild(y.pointInput);
            temp.appendChild(z);

            if (
              this.getDataformObject(object.childNodes[j], "point") !== "0" &&
              this.getDataformObject(object.childNodes[j], "point") !==
                undefined
            ) {
              y.select.checked = true;
              z.classList.add("isChecked");
            }
          }
        }
        temp.getValue = function() {
          var result = "<answer>";
          result += "<type>multiweighted</type>";
          for (var i = 0; i < arrValue.length; i++) {
            var textValue = absol.XML.stringify(arrValue[i].xmlValue);
            if (textValue.indexOf("<point>") !== -1) {
              var textRepplace = textValue.slice(
                textValue.indexOf("<point>"),
                textValue.indexOf("</point>") + 8
              );
              result += textValue.replace(
                textRepplace,
                "<point>" + arrValue[i].pointInput.getValue() + "</point>"
              );
            } else
              result +=
                textValue.replace(
                  "</selection>",
                  "<point>" + arrValue[i].pointInput.getValue() + "</point>"
                ) + "</selection>";
          }
          result += "</answer>";
          return result;
        };
        return temp;
      },
      addOptionAndOrtherMultichoice: function() {
        var self = this;
        var addOption = this.singleinput({
          value: "",
          placeholder: "Thêm tùy chọn"
        });
        addOption.style.width = "unset";
        addOption.style.minWidth = "unset";
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "docssharedWizOmnilistGhostitemRoot",
            "freebirdFormeditorViewOmnilistGhostitemRoot"
          ],
          child: [
            {
              tag: "radiobutton",
              class: [
                "quantumWizTogglePaperradioEl",
                "docssharedWizToggleLabeledControl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            },
            addOption,
            {
              tag: "div",
              class: ["freebirdFormeditorViewOmnilistGhostitemAddOtherSection"],
              child: [
                {
                  tag: "span",
                  class: "freebirdFormeditorViewOmnilistGhostitemOtherDivider",
                  props: {
                    innerHTML: "hoặc"
                  }
                },
                {
                  tag: "div",
                  class: [
                    "quantumWizButtonEl",
                    "quantumWizButtonPaperbuttonEl",
                    "quantumWizButtonPaperbuttonFlat",
                    "quantumWizButtonPaperbutton2El2",
                    "freebirdFormeditorViewOmnilistGhostitemAddOther"
                  ],
                  child: [
                    {
                      tag: "span",
                      class: "quantumWizButtonPaperbuttonLabel",
                      props: {
                        innerHTML: 'THÊM "KHÁC"'
                      }
                    }
                  ],
                  on: {
                    click: function() {
                      self.functionAddElementOther(temp, self, "radiobutton");
                    }
                  }
                }
              ]
            }
          ]
        });
        addOption.addEventListener("click", function() {
          self.functionAddElement(temp, self, "radiobutton");
        });
        addOption.getInput().addEventListener("focus", function() {
          self.functionAddElement(temp, self, "radiobutton");
        });
        return temp;
      },
      addOptionAndOrtherMultiWeight: function() {
        var self = this;
        var addOption = this.singleinput({
          value: "",
          placeholder: "Thêm tùy chọn"
        });
        addOption.style.width = "unset";
        addOption.style.minWidth = "unset";
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "docssharedWizOmnilistGhostitemRoot",
            "freebirdFormeditorViewOmnilistGhostitemRoot"
          ],
          child: [
            {
              tag: "radiobutton",
              class: [
                "quantumWizTogglePaperradioEl",
                "docssharedWizToggleLabeledControl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            },
            addOption,
            {
              tag: "div",
              class: ["freebirdFormeditorViewOmnilistGhostitemAddOtherSection"],
              child: [
                {
                  tag: "span",
                  class: "freebirdFormeditorViewOmnilistGhostitemOtherDivider",
                  props: {
                    innerHTML: "hoặc"
                  }
                },
                {
                  tag: "div",
                  class: [
                    "quantumWizButtonEl",
                    "quantumWizButtonPaperbuttonEl",
                    "quantumWizButtonPaperbuttonFlat",
                    "quantumWizButtonPaperbutton2El2",
                    "freebirdFormeditorViewOmnilistGhostitemAddOther"
                  ],
                  child: [
                    {
                      tag: "span",
                      class: "quantumWizButtonPaperbuttonLabel",
                      props: {
                        innerHTML: 'THÊM "KHÁC"'
                      }
                    }
                  ],
                  on: {
                    click: function() {
                      self.functionAddElementOther(temp, self, "multiweight");
                    }
                  }
                }
              ]
            }
          ]
        });
        addOption.addEventListener("click", function() {
          self.functionAddElement(temp, self, "multiweight");
        });
        addOption.getInput().addEventListener("focus", function() {
          self.functionAddElement(temp, self, "multiweight");
        });
        return temp;
      },
      checkbox: function(object, childContainer) {
        var x = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewItemsItemAnswer"
        });
        childContainer.appendChild(x);
        var arrValue = [];
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var y = absol.buildDom({
              tag: "div",
              class: "docssharedWizToggleLabeledLabelWrapper"
            });
            arrValue.push(y);
            var z = absol.buildDom({
              tag: "div",
              class: "freebirdFormviewerViewItemsCheckboxOptionContainer",
              child: [
                {
                  tag: "div",
                  class: "freebirdFormviewerViewItemsCheckboxChoice",
                  child: [
                    {
                      tag: "label",
                      class: [
                        "docssharedWizToggleLabeledContainer",
                        "freebirdFormviewerViewItemsCheckboxContainer"
                      ],
                      child: [y,
                      {
                    tag: "div",
                    class: [
                      "freebirdFormeditorViewItemTrueButton",
                      "quantumWizButtonEl",
                      "quantumWizButtonPapericonbuttonEl",
                      "quantumWizButtonPapericonbuttonLight"
                    ],
                    child: [
                      {
                        tag: "i",
                        class: ["material-icons", "icon-ceneter"],
                        props: {
                          innerHTML: "check"
                        }
                      }
                    ]
            },
            {
                    tag: "div",
                    class: [
                      "freebirdFormeditorViewItemFalseButton",
                      "quantumWizButtonEl",
                      "quantumWizButtonPapericonbuttonEl",
                      "quantumWizButtonPapericonbuttonLight"
                    ],
                    child: [
                      {
                        tag: "i",
                        class: ["material-icons", "icon-ceneter"],
                        props: {
                          innerHTML: "close"
                        }
                      }
                    ]
            }
                      ]
                    }
                  ]
                },
                
              ]
            });
            var id = xmlComponent.getDataformObject(object.childNodes[j], "id");
            if (id !== undefined) {
              y.id = id;
            }
            for (var k = 0; k < object.childNodes[j].childNodes.length; k++) {
              if (object.childNodes[j].childNodes[k].tagName === "value") {
                var value = "";
                if (
                  object.childNodes[j].childNodes[k].childNodes[0] !== undefined
                ) {
                  value = object.childNodes[j].childNodes[
                    k
                  ].childNodes[0].data.replace(/\n/g, "<br />");
                }
                y.select = absol.buildDom({
                  tag: "checkboxbutton",
                  class: [
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedCheckbox",
                    "freebirdThemedCheckboxDarkerDisabled",
                    "freebirdFormviewerViewItemsCheckboxControl"
                  ],
                  on: {
                    click: (function(y) {
                        return function() {
                          if (this.checked === true)
                            for (var m = 0; m < y.childNodes.length; m++) {
                              if (
                                y.childNodes[m].classList.contains("singleInput")
                              ) {
                                y.childNodes[m]
                                  .getElementsByClassName(
                                    "quantumWizTextinputPaperinputInput"
                                  )[0]
                                  .focus();
                              }
                            }
                        };
                    })(y)
                  }
                });
                y.appendChild(y.select);
                var tempText = this.primarytext(value);
                y.appendChild(tempText);
                tempText.addEventListener("click",function(select,event){
                  select.click();
                }.bind(null,y.select))
              }
              if (object.childNodes[j].childNodes[k].tagName === "style") {
              }
              if (object.childNodes[j].childNodes[k].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "input"
                ) {
                  y.input = this.structComponent(
                    object.childNodes[j].childNodes[k]
                  );
                  y.appendChild(y.input);
                  y.style.width = "100%";
                } else if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    z,
                    object.childNodes[j].childNodes[k],
                    3
                  );
                }
              }
            }
            x.appendChild(z);
          }
        }
        x.getValue = function() {
          var result = [];
          for (var m = 0; m < arrValue.length; m++) {
            if (arrValue[m].select.checked === true) {
              result[arrValue[m].id] = "";
              if (arrValue[m].input !== undefined)
                result[arrValue[m].id] = arrValue[m].input.getValue();
            }
          }
          if (result.length === 0) return undefined;
          return result;
        };
        return x;
      },
      checkboxEdit: function(object, childContainer) {
        var self = this;
        var x = absol.buildDom({
          tag: "draggablevstack",
          class: "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList",
          on:{
            change:function()
            {
              var el=x;
              while (!el.classList.contains("true-dame"))
              el = el.parentNode;
              el.click();
            }
          }
        });

        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewQuestionBodyQuestionBody",
            "freebirdFormeditorViewQuestionBodySelectBody"
          ],
          child: [x]
        });

        childContainer.appendChild(temp);
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var z = this.elMenuComponent(
              "checkboxbutton",
              object.childNodes[j]
            );
            x.appendChild(z);
          }
        }
        temp.appendChild(this.addOptionAndOrtherCheckbox());
        temp.getValue = function() {
          var result = "<answer>";
          result += "<type>checkbox</type>";
          for (var i = 0; i < x.childNodes.length; i++) {
            for (var i = 0; i < x.childNodes.length; i++) {
              if (x.childNodes[i].getValue !== undefined)
                result += x.childNodes[i].getValue();
            }
          }
          result += "</answer>";
          return result;
        };
        temp.setObject = function(objectX) {
          var i = 0;
          for (var k = 0; k < objectX.childNodes.length; k++) {
            if (objectX.childNodes[k].tagName === "selection") {
              if (
                self.getDataformObject(objectX.childNodes[k], "point") == "1"
              ) {
                if (x.childNodes[i].point === undefined) {
                  x.childNodes[i].point = absol.buildDom({
                    tag: "div",
                    class: [
                      "freebirdFormeditorViewItemCheckButton",
                      "quantumWizButtonEl",
                      "quantumWizButtonPapericonbuttonEl",
                      "quantumWizButtonPapericonbuttonLight"
                    ],
                    child: [
                      {
                        tag: "i",
                        class: ["material-icons", "icon-ceneter"],
                        props: {
                          innerHTML: "check"
                        },
                        style: {
                          color: "green"
                        }
                      }
                    ]
                  });
                  if (x.childNodes[i].input === undefined)
                    x.childNodes[i].text.parentNode.insertBefore(
                      x.childNodes[i].point,
                      x.childNodes[i].text.nextSibling
                    );
                  else
                    x.childNodes[i].input.parentNode.insertBefore(
                      x.childNodes[i].point,
                      x.childNodes[i].input.nextSibling
                    );
                }
              } else {
                if (x.childNodes[i].point != undefined) {
                  x.childNodes[i].point.parentNode.removeChild(
                    x.childNodes[i].point
                  );
                  x.childNodes[i].point = undefined;
                }
              }
              i++;
            }
          }
        };
        temp.requestUpdateSize = function() {
          if (z.requestUpdateSize !== undefined) z.requestUpdateSize();
        };
        return temp;
      },
      checkboxPoint: function(object, childContainer) {
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewAssessmentBodyQuestionBody",
            "freebirdFormeditorViewAssessmentBodyRadioBody"
          ],
          child: []
        });
        childContainer.appendChild(temp);
        var arrValue = [];
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            var y = absol.buildDom({
              tag: "div",
              class: "freebirdFormeditorViewAssessmentAnswersListItemContent"
            });
            arrValue.push(y);
            y.xmlValue = object.childNodes[j];
            var z = absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormeditorViewAssessmentAnswersListItem",
                "freebirdFormeditorViewAssessmentAnswersListIsCorrect"
              ],
              child: [
                {
                  tag: "div",
                  class: [
                    "freebirdFormeditorViewAssessmentAnswersListCorrectToggle"
                  ],
                  child: [y]
                }
              ],
              on: {
                click: (function(y) {
                  return function() {
                    if (this.classList.contains("isChecked")) {
                      this.classList.remove("isChecked");
                      y.select.checked = false;
                    } else {
                      this.classList.add("isChecked");
                      y.select.checked = true;
                    }

                    for (var m = 0; m < y.childNodes.length; m++) {
                      if (y.childNodes[m].classList.contains("singleInput")) {
                        y.childNodes[m]
                          .getElementsByClassName(
                            "quantumWizTextinputPaperinputInput"
                          )[0]
                          .focus();
                      }
                    }
                  };
                })(y)
              }
            });
            for (var k = 0; k < object.childNodes[j].childNodes.length; k++) {
              if (object.childNodes[j].childNodes[k].tagName === "value") {
                var value = "";
                if (
                  object.childNodes[j].childNodes[k].childNodes[0] !== undefined
                ) {
                  value = object.childNodes[j].childNodes[
                    k
                  ].childNodes[0].data.replace(/\n/g, "<br />");
                }
                y.select = absol.buildDom({
                  tag: "checkboxbutton",
                  class: [
                    "quantumWizTogglePaperradioEl",
                    "docssharedWizToggleLabeledControl",
                    "freebirdThemedRadio",
                    "freebirdThemedRadioDarkerDisabled",
                    "freebirdFormviewerViewItemsRadioControl"
                  ]
                });
                y.appendChild(y.select);
                y.appendChild(this.primarytext(value));
              }
              if (object.childNodes[j].childNodes[k].tagName === "style") {
              }
              if (object.childNodes[j].childNodes[k].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "input"
                ) {
                  y.input = this.structComponent(
                    object.childNodes[j].childNodes[k]
                  );
                  y.input.disable();
                  y.appendChild(y.input);
                } else if (
                  xmlComponent.getDataformObject(
                    object.childNodes[j].childNodes[k],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    z,
                    object.childNodes[j].childNodes[k],
                    3
                  );
                }
              }
            }
            y.appendChild(
              absol.buildDom({
                tag: "div",
                class: [
                  "freebirdFormeditorViewItemCheckButton",
                  "quantumWizButtonEl",
                  "quantumWizButtonPapericonbuttonEl",
                  "quantumWizButtonPapericonbuttonLight"
                ],
                child: [
                  {
                    tag: "i",
                    class: ["material-icons", "icon-ceneter"],
                    props: {
                      innerHTML: "check"
                    },
                    style: {
                      color: "green"
                    }
                  }
                ]
              })
            );
            if (this.getDataformObject(object.childNodes[j], "point") == "1") {
              y.select.checked = true;
              z.classList.add("isChecked");
            }
            temp.appendChild(z);
          }
        }
        temp.getValue = function() {
          var result = "<answer>";
          result += "<type>checkbox</type>";
          for (var i = 0; i < arrValue.length; i++) {
            if (arrValue[i].select.checked === true) {
              var textResult = absol.XML.stringify(arrValue[i].xmlValue);
              if (textResult.indexOf("<point>1</point>") === -1) {
                result +=
                  textResult.replace("</selection>", "<point>1</point>") +
                  "</selection>";
              } else result += textResult;
            } else
              result += absol.XML.stringify(arrValue[i].xmlValue).replace(
                "<point>1</point>",
                ""
              );
          }
          result += "</answer>";
          return result;
        };
        return temp;
      },
      linearscale: function(object, childContainer) {
        var x = absol.buildDom({
          tag: "div",
          class: "freebirdMaterialScalecontentContainer"
        });
        childContainer.appendChild(x);
        var start, end, content;
        var arrValue = [];
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            content = undefined;
            if (
              xmlComponent.getDataformObject(object.childNodes[j], "value") !==
              undefined
            ) {
              var z = absol.buildDom({
                tag: "div",
                class: "freebirdMaterialScalecontentContainerSelection",
                props: {
                  id: xmlComponent.getDataformObject(object.childNodes[j], "id")
                }
              });
              for (var i = 0; i < object.childNodes[j].childNodes.length; i++) {
                if (object.childNodes[j].childNodes[i].tagName === "content") {
                  if (i === 0) {
                    if (
                      xmlComponent.getDataformObject(
                        object.childNodes[j].childNodes[i],
                        "type"
                      ) === "text"
                    ) {
                      z.appendChild(
                        absol.buildDom({
                          tag: "div",
                          class: "freebirdMaterialScalecontentRangeLabelColumn",
                          child: [
                            {
                              tag: "div",
                              class:
                                "freebirdMaterialScalecontentRangeLabelContainer",
                              child: [
                                {
                                  tag: "div",
                                  class:
                                    "freebirdMaterialScalecontentRangeLabel",
                                  props: {
                                    innerHTML: xmlComponent.getDataformObject(
                                      object.childNodes[j].childNodes[i],
                                      "value"
                                    )
                                  }
                                }
                              ]
                            }
                          ]
                        })
                      );
                    }
                  } else if (i >= 1) {
                    content = absol.buildDom({
                      tag: "div",
                      class: "freebirdMaterialScalecontentRangeLabelColumn",
                      child: [
                        {
                          tag: "div",
                          class:
                            "freebirdMaterialScalecontentRangeLabelContainer",
                          child: [
                            {
                              tag: "div",
                              class: "freebirdMaterialScalecontentRangeLabel",
                              props: {
                                innerHTML: xmlComponent.getDataformObject(
                                  object.childNodes[j].childNodes[i],
                                  "value"
                                )
                              }
                            }
                          ]
                        }
                      ]
                    });
                  }
                }
              }
            }
            var select = absol.buildDom({
              tag: "radiobutton",
              class: [
                "quantumWizTogglePaperradioEl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ]
            });
            var temp = absol.buildDom({
              tag: "label",
              class: "freebirdMaterialScalecontentColumn",
              child: [
                {
                  tag: "div",
                  class: "freebirdMaterialScalecontentLabel",
                  props: {
                    innerHTML: xmlComponent.getDataformObject(
                      object.childNodes[j],
                      "point"
                    )
                  }
                },
                {
                  tag: "div",
                  class: "freebirdMaterialScalecontentInput",
                  child: [select]
                }
              ]
            });
            temp.select = select;
            arrValue.push(z);
            z.appendChild(temp);
            if (content !== undefined) z.appendChild(content);
          }
        }

        x.getValue = function() {
          var result = [];
          for (var m = 0; m < arrValue.length; m++) {
            if (arrValue[m].select.checked === true) {
              result[arrValue[m].id] = "";
            }
          }
          if (result.length === 0) return undefined;
          return result;
        };
        return x;
      },
      linearscaleEdit: function(object, childContainer) {
        var self = this;
        var y = absol.buildDom({
          tag: "draggablehstack",
          class: "freebirdMaterialScalecontentContainerMain"
        });
        var x = absol.buildDom({
          tag: "div",
          class: "freebirdMaterialScalecontentContainer",
          child: [y]
        });
        childContainer.appendChild(x);
        var start, end, content;
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            end = undefined;
            if (
              xmlComponent.getDataformObject(object.childNodes[j], "value") !==
              undefined
            ) {
              var z = absol.buildDom({
                tag: "div",
                class: "freebirdMaterialScalecontentContainerSelection",
                props: {
                  id: xmlComponent.getDataformObject(object.childNodes[j], "id")
                },
                child: [self.holdmoveVer(), self.closeOptionLinear()]
              });
              for (var i = 0; i < object.childNodes[j].childNodes.length; i++) {
                if (object.childNodes[j].childNodes[i].tagName === "content") {
                  if (i === 0) {
                    if (
                      xmlComponent.getDataformObject(
                        object.childNodes[j].childNodes[i],
                        "type"
                      ) === "text"
                    ) {
                      start = self.labelOptionLinenear(
                        xmlComponent.getDataformObject(
                          object.childNodes[j].childNodes[i],
                          "value"
                        )
                      );
                      x.insertBefore(start, x.firstChild);
                    }
                  } else if (i >= 1) {
                    end = self.labelOptionLinenear(
                      xmlComponent.getDataformObject(
                        object.childNodes[j].childNodes[i],
                        "value"
                      )
                    );
                  }
                }
              }
            }
            var select = absol.buildDom({
              tag: "radiobutton",
              class: [
                "quantumWizTogglePaperradioEl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            });
            var input = self.textareaEdit(
              {
                value: xmlComponent.getDataformObject(
                  object.childNodes[j],
                  "value"
                )
              },
              ["freebirdMaterialScalecontentLabel"],
              2
            );
            var temp = absol.buildDom({
              tag: "label",
              class: "freebirdMaterialScalecontentColumn",
              child: [
                input,
                {
                  tag: "div",
                  class: "freebirdMaterialScalecontentInput",
                  child: [select]
                }
              ]
            });
            z.select = select;
            z.input = input;
            z.appendChild(temp);
            y.appendChild(z);
            if (end !== undefined) x.appendChild(end);
          }
        }
        if (start === undefined) {
          start = self.labelOptionLinenear("");
          x.insertBefore(start, x.firstChild);
        }
        if (end === undefined) {
          end = self.labelOptionLinenear("");
          x.appendChild(end);
        }

        x.getValue = function() {
          var result = "<answer>";
          result += "<type>linearscale</type>";
          for (var i = 0; i < y.childNodes.length; i++) {
            result += "<selection>";
            if (i === 0) {
              if (start.getValue() !== "")
                result +=
                  "<content><type>text</type><style></style><value>" +
                  start.getValue() +
                  "</value></content>";
            }
            if (y.childNodes[i].id !== "")
              result += "<id>" + y.childNodes[i].id + "</id>";
            result +=
              "<style></style><value>" +
              y.childNodes[i].input.getPureValue() +
              "</value>";
            if (i === y.childNodes.length - 1) {
              if (end.getValue() !== "")
                result +=
                  "<content><type>text</type><style></style><value>" +
                  end.getValue() +
                  "</value></content>";
            }
            result += "</selection>";
          }
          result += "</answer>";
          return result;
        };
        x.setObject = function(objectX) {};
        x.requestUpdateSize = function() {};
        return x;
      },
      linearscalePoint: function(object, childContainer) {
        var self = this;
        var y = absol.buildDom({
          tag: "div",
          class: "freebirdMaterialScalecontentContainerMain"
        });
        var x = absol.buildDom({
          tag: "div",
          class: "freebirdMaterialScalecontentContainer",
          child: [y]
        });

        childContainer.appendChild(x);
        var start, end, content;
        var arrValue = [];
        var k = 0;
        for (var j = 0; j < object.childNodes.length; j++) {
          if (object.childNodes[j].tagName === "selection") {
            k++;
            content = undefined;
            if (
              xmlComponent.getDataformObject(object.childNodes[j], "value") !==
              undefined
            ) {
              var select = absol.buildDom({
                tag: "radiobutton",
                class: [
                  "quantumWizTogglePaperradioEl",
                  "freebirdThemedRadio",
                  "freebirdThemedRadioDarkerDisabled",
                  "freebirdFormviewerViewItemsRadioControl"
                ],
                style: {
                  pointerEvents: "none"
                }
              });
              var changeChecked = (function(selected) {
                return function(number) {
                  if (number == 0) {
                    selected.checked = false;
                  } else {
                    selected.checked = true;
                  }
                };
              })(select);
              if (
                xmlComponent.getDataformObject(
                  object.childNodes[j],
                  "point"
                ) !== undefined
              )
                var pointInput = self.input_choicenumbe_notResize(
                  xmlComponent.getDataformObject(object.childNodes[j], "point"),
                  changeChecked
                );
              else
                var pointInput = self.input_choicenumbe_notResize(
                  k,
                  changeChecked
                );
              pointInput.style.marginLeft = "auto";
              pointInput.style.marginRight = "auto";
              pointInput.style.width = "80%";
              var z = absol.buildDom({
                tag: "div",
                class: "freebirdMaterialScalecontentContainerSelection",
                props: {
                  id: xmlComponent.getDataformObject(
                    object.childNodes[j],
                    "id"
                  ),
                  xmlValue: object.childNodes[j]
                },
                child: [pointInput]
              });
              z.pointInput = pointInput;
              for (var i = 0; i < object.childNodes[j].childNodes.length; i++) {
                if (object.childNodes[j].childNodes[i].tagName === "content") {
                  if (i === 0) {
                    if (
                      xmlComponent.getDataformObject(
                        object.childNodes[j].childNodes[i],
                        "type"
                      ) === "text"
                    ) {
                      start = absol.buildDom({
                        tag: "div",
                        class: "freebirdMaterialScalecontentRangeLabelColumn",
                        child: [
                          {
                            tag: "div",
                            class:
                              "freebirdMaterialScalecontentRangeLabelContainer",
                            child: [
                              {
                                tag: "div",
                                class: "freebirdMaterialScalecontentRangeLabel",
                                props: {
                                  innerHTML: xmlComponent.getDataformObject(
                                    object.childNodes[j].childNodes[i],
                                    "value"
                                  )
                                }
                              }
                            ]
                          }
                        ]
                      });
                      x.insertBefore(start, x.firstChild);
                    }
                  } else if (i >= 1) {
                    content = absol.buildDom({
                      tag: "div",
                      class: "freebirdMaterialScalecontentRangeLabelColumn",
                      child: [
                        {
                          tag: "div",
                          class:
                            "freebirdMaterialScalecontentRangeLabelContainer",
                          child: [
                            {
                              tag: "div",
                              class: "freebirdMaterialScalecontentRangeLabel",
                              props: {
                                innerHTML: xmlComponent.getDataformObject(
                                  object.childNodes[j].childNodes[i],
                                  "value"
                                )
                              }
                            }
                          ]
                        }
                      ]
                    });
                  }
                }
              }
            }

            var temp = absol.buildDom({
              tag: "label",
              class: "freebirdMaterialScalecontentColumn",
              child: [
                {
                  tag: "div",
                  class: "freebirdMaterialScalecontentLabel",
                  props: {
                    innerHTML: xmlComponent.getDataformObject(
                      object.childNodes[j],
                      "value"
                    )
                  }
                },
                {
                  tag: "div",
                  class: "freebirdMaterialScalecontentInput",
                  child: [select]
                }
              ]
            });
            temp.select = select;
            arrValue.push(z);
            z.appendChild(temp);
            y.appendChild(z);
            if (content !== undefined) x.appendChild(content);
          }
        }

        x.getValue = function() {
          var result = "<answer>";
          result += "<type>linearscale</type>";
          for (var i = 0; i < arrValue.length; i++) {
            var textValue = absol.XML.stringify(arrValue[i].xmlValue);
            if (textValue.indexOf("<point>") !== -1) {
              var textRepplace = textValue.slice(
                textValue.indexOf("<point>"),
                textValue.indexOf("</point>") + 7
              );
              result +=
                textValue.replace(
                  textRepplace,
                  "<point>" + arrValue[i].pointInput.getValue() + "</point>"
                ) + "</selection>";
            } else
              result +=
                textValue.replace(
                  "</selection>",
                  "<point>" + arrValue[i].pointInput.getValue() + "</point>"
                ) + "</selection>";
          }
          result += "</answer>";
          return result;
        };
        return x;
      },
      labelOptionLinenear: function(text) {
        var self = this;
        var valueText = self.textareaEdit(
          { value: text, placeholder: "Nhãn (tùy chọn)" },
          ["freebirdMaterialScalecontentRangeLabel"],
          2
        );
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdMaterialScalecontentRangeLabelColumn",
          child: [
            {
              tag: "div",
              class: "freebirdMaterialScalecontentRangeLabelContainer",
              child: [valueText]
            }
          ]
        });
        temp.valueText = valueText;
        temp.getValue = function() {
          return valueText.getPureValue();
        };
        return temp;
      },
      closeOptionLinear: function() {
        var self = this;
        var menuProps = {
          items: [
            {
              text: "Thêm",
              icon: "span.mdi.mdi-folder-plus",
              cmd: "add"
            },
            {
              text: "Xóa",
              icon: "span.mdi.mdi-delete",
              cmd: "delete"
            }
          ]
        };
        var button = absol.buildDom({
          tag: "div",
          class: ["freebirdFormeditorViewMediaEditMenuButtonClose"],
          child: [
            {
              tag: "i",
              class: [
                "freebirdFormeditorViewMediaEditMenuButtonCloseContent",
                "material-icons",
                "icon-ceneter"
              ],
              props: {
                innerHTML: "more_vert"
              }
            }
          ]
        });
        absol.QuickMenu.showWhenClick(button, menuProps, [2], function(
          menuItem
        ) {
          if (menuItem.cmd === "add") {
            var z = absol.buildDom({
              tag: "div",
              class: "freebirdMaterialScalecontentContainerSelection",
              child: [self.holdmoveVer(), self.closeOptionLinear()]
            });
            var select = absol.buildDom({
              tag: "radiobutton",
              class: [
                "quantumWizTogglePaperradioEl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            });
            var input = self.textareaEdit(
              {
                value: ""
              },
              ["freebirdMaterialScalecontentLabel"],
              2
            );
            var temp = absol.buildDom({
              tag: "label",
              class: "freebirdMaterialScalecontentColumn",
              child: [
                input,
                {
                  tag: "div",
                  class: "freebirdMaterialScalecontentInput",
                  child: [select]
                }
              ]
            });
            z.select = select;
            z.input = input;
            z.appendChild(temp);
            if (button.parentNode !== undefined)
              if (button.parentNode.parentNode !== undefined)
                button.parentNode.parentNode.insertBefore(
                  z,
                  button.parentNode.nextSibling
                );
          } else if (menuItem.cmd === "delete") {
            if (button.parentNode !== undefined) {
              if (button.parentNode.parentNode !== undefined)
                button.parentNode.parentNode.removeChild(button.parentNode);
            }
          }
        });
        return button;
      },
      addOptionAndOrtherCheckbox: function() {
        var self = this;
        var addOption = this.singleinput({
          value: "",
          placeholder: "Thêm tùy chọn"
        });
        addOption.style.width = "unset";
        addOption.style.minWidth = "unset";
        var temp = absol.buildDom({
          tag: "div",
          class: [
            "docssharedWizOmnilistGhostitemRoot",
            "freebirdFormeditorViewOmnilistGhostitemRoot"
          ],
          child: [
            {
              tag: "checkboxbutton",
              class: [
                "quantumWizTogglePaperradioEl",
                "docssharedWizToggleLabeledControl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            },
            addOption,
            {
              tag: "div",
              class: ["freebirdFormeditorViewOmnilistGhostitemAddOtherSection"],
              child: [
                {
                  tag: "span",
                  class: "freebirdFormeditorViewOmnilistGhostitemOtherDivider",
                  props: {
                    innerHTML: "hoặc"
                  }
                },
                {
                  tag: "div",
                  class: [
                    "quantumWizButtonEl",
                    "quantumWizButtonPaperbuttonEl",
                    "quantumWizButtonPaperbuttonFlat",
                    "quantumWizButtonPaperbutton2El2",
                    "freebirdFormeditorViewOmnilistGhostitemAddOther"
                  ],
                  child: [
                    {
                      tag: "span",
                      class: "quantumWizButtonPaperbuttonLabel",
                      props: {
                        innerHTML: 'THÊM "KHÁC"'
                      }
                    }
                  ],
                  on: {
                    click: function() {
                      self.functionAddElementOther(
                        temp,
                        self,
                        "checkboxbutton"
                      );
                    }
                  }
                }
              ]
            }
          ]
        });
        addOption.addEventListener("click", function() {
          self.functionAddElement(temp, self, "checkboxbutton");
        });
        addOption.getInput().addEventListener("focus", function() {
          self.functionAddElement(temp, self, "checkboxbutton");
        });
        return temp;
      },
      primarytext: function(value) {
        return absol.buildDom({
          tag: "div",
          class: "docssharedWizToggleLabeledContent",
          child: [
            {
              tag: "div",
              class: "docssharedWizToggleLabeledPrimaryText",
              child: [
                {
                  tag: "span",
                  class: [
                    "docssharedWizToggleLabeledLabelText",
                    "freebirdFormviewerViewItemsRadioLabel"
                  ],
                  props: {
                    dir: "auto",
                    innerHTML: value
                  }
                }
              ]
            }
          ]
        });
      },
      input: function(object) {
        var value = "";
        var style = "";
        var placeholder = "";
        var input;
        if (object.tagName !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            if (object.childNodes[i].tagName === "value") {
              if (object.childNodes[i].childNodes[0] !== undefined)
                value = object.childNodes[i].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
            }
            if (object.childNodes[i].tagName === "placeholder") {
              if (object.childNodes[i].childNodes[0] !== undefined)
                placeholder = object.childNodes[i].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
            }
            if (object.childNodes[i].tagName === "style") {
            }
          }
        else {
          if (object.value !== undefined) value = object.value;
          if (object.placeholder !== undefined)
            placeholder = object.placeholder;
        }
        var temp;
        var input = absol.buildDom({
          tag: "input",
          class: "quantumWizTextinputPaperinputInput",
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp, input) {
                if (temp) {
                  if (input.value) {
                    temp.classList.add("hasValue");
                  } else {
                    temp.classList.remove("hasValue");
                  }
                  input.style.height = "";
                  input.style.height = input.scrollHeight + "px";
                }
              })(temp, this);
            }
          },
          props: {
            value: value
          }
        });
        temp = absol.buildDom({
          tag: "div",
          class: "quantumWizTextinputPaperinputEl",
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputMainContent",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputContentArea",
                  child: [
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputInputArea",
                      child: [input]
                    },
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputPlaceholder",
                      props: {
                        innerHTML: placeholder
                      }
                    }
                  ]
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputUnderline"
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputFocusUnderline"
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaHint"
                }
              ]
            }
          ]
        });
        if (temp) {
          if (input.value) {
            temp.classList.add("hasValue");
          } else {
            temp.classList.remove("hasValue");
          }
        }
        temp.disable = function() {
          input.setAttribute("disabled", "");
        };
        temp.getValue = function() {
          return (
            "<type>input</type><style></style><placeholder>" +
            placeholder +
            "</placeholder><value>" +
            input.value +
            "</value>"
          );
        };
        temp.value = function() {
          return input.value;
        };
        return temp;
      },
      inputEdit: function(object, mode = 0) {
        var value = "";
        var style = "";
        var placeholder = "";
        var input;
        if (object.tagName !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            if (!mode) {
              if (object.childNodes[i].tagName === "placeholder") {
                if (object.childNodes[i].childNodes[0] !== undefined) {
                  value = object.childNodes[i].childNodes[0].data;
                }
              }
              if (object.childNodes[i].tagName === "style") {
              }
            } else if (mode) {
              if (object.childNodes[i].tagName === "value") {
                if (object.childNodes[i].childNodes[0] !== undefined) {
                  value = object.childNodes[i].childNodes[0].data;
                }
              }
              if (object.childNodes[i].tagName === "style") {
              }
            }
          }
        else {
          if (mode) {
            if (object.value !== undefined) value = object.value;

            if (object.placeholder !== undefined)
              placeholder = object.placeholder;
          } else if (!mode) {
            if (object.value !== undefined) value = object.value;

            if (object.placeholder !== undefined)
              placeholder = object.placeholder;
          }
        }
        if (placeholder === "") {
          if (mode) placeholder = "Mời bạn nhập câu trả lời";
          else placeholder = "Mời bạn nhập placeholder";
        }
        var temp;
        var input = absol.buildDom({
          tag: "input",
          class: "quantumWizTextinputPaperinputInput",
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp, input) {
                if (temp) {
                  if (input.value) {
                    temp.classList.add("hasValue");
                  } else {
                    temp.classList.remove("hasValue");
                  }
                  input.style.height = "";
                  input.style.height = input.scrollHeight + "px";
                }
              })(temp, this);
            }
          },
          props: {
            value: value
          }
        });
        temp = absol.buildDom({
          tag: "div",
          class: [
            "quantumWizTextinputPaperinputEl",
            "freebirdFormeditorViewQuestionBodyShorttextbodyShortTextInput"
          ],
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputMainContent",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputContentArea",
                  child: [
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputInputArea",
                      child: [input]
                    },
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputPlaceholder",
                      props: {
                        innerHTML: placeholder
                      }
                    }
                  ]
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputUnderline",
                  style: {}
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputFocusUnderline"
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaHint"
                }
              ]
            }
          ]
        });
        if (temp) {
          if (input.value) {
            temp.classList.add("hasValue");
          } else {
            temp.classList.remove("hasValue");
          }
        }
        temp.getValue = function() {
          temp.value = input.value;
          if (!mode)
            return (
              "<type>input</type><style></style><placeholder>" +
              input.value +
              "</placeholder><value></value>"
            );
          else if (mode)
            return (
              "<type>text</type><style></style><value>" +
              input.value +
              "</value>"
            );
        };
        return temp;
      },
      input_choicenumber: function(point,functionTrigger) {
        var self = this;
        var temp;
        var input = absol.buildDom({
          tag: "input",
          class: "quantumWizTextinputPaperinputInput",
          props: {
            type: "number",
            autocomplete: "off",
            min: 0,
            max: 999999,
            step: 1,
            dir: "auto",
            badinput: false,
            value: point
          },
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function() {
                input.requestUpdateSize();
                if (
                  this.parentNode !== undefined &&
                  this.parentNode.onchange !== undefined
                ) {
                  this.parentNode.onchange();
                }
                if(functionTrigger!==undefined)
                functionTrigger(input.value);
              })();
            }
          }
        });
        temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewAssessmentWidgetsPointsInput",
            "freebirdThemedInput",
            "freebirdThemedTextfreebirdThemedText",
            "modeLight"
          ],
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputMainContent",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputContentArea",
                  child: [
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputInputArea",
                      child: [input]
                    },
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputUnderline"
                    },
                    {
                      tag: "div",
                      class: [
                        "quantumWizTextinputPaperinputFocusUnderline",
                        "animationInitialized"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputHint"
                }
              ]
            }
          ]
        });

        temp.getValue = function() {
          return input.value;
        };
        input.requestUpdateSize = function() {
          temp.style.width = self.fakeInput(input.value, 14) + 20 + "px";
        };
        input.requestUpdateSize();
        return temp;
      },
      input_choicenumbe_notResize: function(point, functionTrigger) {
        var self = this;
        var temp;
        var input = absol.buildDom({
          tag: "input",
          class: "quantumWizTextinputPaperinputInput",
          props: {
            type: "number",
            autocomplete: "off",
            min: 0,
            max: 999999,
            step: 1,
            dir: "auto",
            badinput: false,
            value: point
          },
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function() {
                if (
                  this.parentNode !== undefined &&
                  this.parentNode.onchange !== undefined
                ) {
                  this.parentNode.onchange();
                }
                functionTrigger(input.value);
              })();
            }
          }
        });
        temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewAssessmentWidgetsPointsInput",
            "freebirdThemedInput",
            "freebirdThemedTextfreebirdThemedText",
            "modeLight"
          ],
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputMainContent",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputContentArea",
                  style: {
                    top: "6px"
                  },
                  child: [
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputInputArea",
                      child: [input]
                    },
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputUnderline"
                    },
                    {
                      tag: "div",
                      class: [
                        "quantumWizTextinputPaperinputFocusUnderline",
                        "animationInitialized"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputHint"
                }
              ]
            }
          ]
        });

        temp.getValue = function() {
          return input.value;
        };
        return temp;
      },
      input_autoresize: function(object) {
        var value = "";
        var style = "";
        var placeholder = "";
        var input;
        var self = this;
        if (object.tagName !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            if (object.childNodes[i].tagName === "value") {
              if (object.childNodes[i].childNodes[0] !== undefined)
                value = object.childNodes[i].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
            }
            if (object.childNodes[i].tagName === "placeholder") {
              if (object.childNodes[i].childNodes[0] !== undefined)
                placeholder = object.childNodes[i].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
            }
            if (object.childNodes[i].tagName === "style") {
            }
          }
        else {
          if (object.value !== undefined) value = object.value;
          if (object.placeholder !== undefined)
            placeholder = object.placeholder;
        }
        var temp;
        var input = absol.buildDom({
          tag: "input",
          class: "quantumWizTextinputPaperinputInputTitle",
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp, input, self) {
                if (temp) {
                  temp.requestUpdateSize();
                }
              })(temp, this, self);
            }
          },
          props: {
            value: value,
            spellcheck: false,
            placeholder:placeholder
          }
        });
        temp = absol.buildDom({
          tag: "div",
          class: [
            "freebirdFormeditorViewHeaderDocTitle",
            "freebirdFormeditorViewHeaderInlineDocTitle",
            "freebirdFormTitleInput"
          ],
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPaperinputEl",
              child: [
                input
          ]
        }]});
        temp.requestUpdateSize = function() {
        };
        setTimeout(function(){
          temp.requestUpdateSize();
        },100);
        temp.getValue = function() {
          return input.value;
        };
        return temp;
      },
      fakeInput: function(text, size) {
        var temp = document.getElementsByClassName("fake-text");
        if (temp.length === 0)
          document.body.appendChild(
            absol.buildDom({
              tag: "span",
              class: "fake-text",
              props: {
                innerHTML: text
              }
            })
          );
        else temp[0].innerHTML = text + "-";
        if (size !== undefined) {
          temp[0].style.fontSize = size + "px";
        } else temp[0].style.fontSize = "25px";
        return temp[0].clientWidth;
      },
      singleinput: function(object, listsClass = []) {
        var value = "";
        var style = "";
        var placeholder = "";
        var input;
        if (object.tagName !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            if (object.childNodes[i].tagName === "value") {
              if (object.childNodes[i].childNodes[0] !== undefined)
                value = object.childNodes[i].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
            }
            if (object.childNodes[i].tagName === "placeholder") {
              if (object.childNodes[i].childNodes[0] !== undefined)
                placeholder = object.childNodes[i].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
            }
            if (object.childNodes[i].tagName === "style") {
            }
          }
        else {
          if (object.value !== undefined) value = object.value;
          if (object.placeholder !== undefined)
            placeholder = object.placeholder;
        }
        var temp;
        listsClass.push("quantumWizTextinputPaperinputInput");
        var input = absol.buildDom({
          tag: "input",
          class: listsClass,
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp, input) {
                if (temp) {
                  if (input.value) {
                    temp.classList.add("hasValue");
                  } else {
                    temp.classList.remove("hasValue");
                  }
                }
              })(temp, this);
            }
          },
          props: {
            value: value
          }
        });

        temp = absol.buildDom({
          tag: "div",
          class: ["quantumWizTextinputPaperinputEl", "singleInput"],
          child: [
            {
              tag: "div",
              class: [
                "quantumWizTextinputPaperinputMainContent",
                "singleInputMainContent"
              ],
              child: [
                {
                  tag: "div",
                  class: [
                    "quantumWizTextinputPaperinputContentArea",
                    "singleContentArea"
                  ],
                  child: [
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputInputArea",
                      child: [input]
                    },
                    {
                      tag: "div",
                      class: "quantumWizTextinputPaperinputPlaceholder",
                      props: {
                        innerHTML: placeholder
                      }
                    }
                  ]
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputUnderline"
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPaperinputFocusUnderline"
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaHint"
                }
              ]
            }
          ]
        });
        if (temp) {
          if (input.value) {
            temp.classList.add("hasValue");
          } else {
            temp.classList.remove("hasValue");
          }
        }
        temp.value = function() {
          return input.value;
        };
        temp.getValue = function() {
          return (
            "<type>input</type><style></style><placeholder>" +
            placeholder +
            "</placeholder><value>" +
            input.value +
            "</value>"
          );
        };
        temp.disable = function() {
          input.setAttribute("disabled", "");
        };
        temp.getInput = function(){
          return input;
        }
        temp.setValueFormObject = function(object)
        {
          if (object.tagName !== undefined)
            for (var i = 0; i < object.childNodes.length; i++) {
              if (object.childNodes[i].tagName === "value") {
                if (object.childNodes[i].childNodes[0] !== undefined)
                  value = object.childNodes[i].childNodes[0].data.replace(
                    /\n/g,
                    "<br />"
                  );
              }
              if (object.childNodes[i].tagName === "placeholder") {
                if (object.childNodes[i].childNodes[0] !== undefined)
                  placeholder = object.childNodes[i].childNodes[0].data.replace(
                    /\n/g,
                    "<br />"
                  );
              }
              if (object.childNodes[i].tagName === "style") {
              }
            }
          else {
            if (object.value !== undefined) value = object.value;
            if (object.placeholder !== undefined)
              placeholder = object.placeholder;
          }
          input.value = value;
          temp.classList.add("hasValue");
        }
        return temp;
      },
      textarea: function(object) {
        var value = "";
        var style = "";
        var placeholder = "";
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "value") {
            if (object.childNodes[i].childNodes[0] !== undefined)
              value = object.childNodes[i].childNodes[0].data;
          }
          if (object.childNodes[i].tagName === "placeholder") {
            if (object.childNodes[i].childNodes[0] !== undefined)
              placeholder = object.childNodes[i].childNodes[0].data;
          }
          if (object.childNodes[i].tagName === "style") {
          }
        }
        var temp;
        var input;
        input = absol.buildDom({
          tag: "textarea",
          class: "quantumWizTextinputPapertextareaInput",
          on: {
            focus: function() {
              return (function(temp) {
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp) {
                if (temp) {
                  if (input.value) {
                    temp.classList.add("hasValue");
                  } else {
                    temp.classList.remove("hasValue");
                  }
                  input.style.height = "";
                  input.style.height = input.scrollHeight + "px";
                }
              })(temp);
            }
          },
          props: {
            value: value
          }
        });
        temp = absol.buildDom({
          tag: "div",
          class: "quantumWizTextinputPapertextareaEl",
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaMainContent",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaPlaceholder",
                  props: {
                    innerHTML: placeholder
                  }
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaContentArea",
                  child: [input]
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaUnderline"
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaFocusUnderline"
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaHint"
                }
              ]
            }
          ]
        });
        setTimeout(function() {
          if (temp) {
            if (input.value) {
              temp.classList.add("hasValue");
            } else {
              temp.classList.remove("hasValue");
            }
            input.style.height = "";
            input.style.height = input.scrollHeight + "px";
          }
        }, 100);
        temp.disable = function() {
          input.setAttribute("disabled", "");
        };
        temp.getValue = function() {
          return (
            "<type>input</type><placeholder>" +
            placeholder +
            "</placeholder><value>" +
            input.value +
            "</value>"
          );
        };
        temp.value = function() {
          return input.value;
        };
        return temp;
      },
      textareaEdit: function(
        object,
        arrClass = ["quantumWizTextinputPapertextareaEl"],
        mode = 0
      ) {
        var value = "";
        var style = "";
        var placeholder = "";
        if (object.tagName !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            if (!mode) {
              if (object.childNodes[i].tagName === "placeholder") {
                if (object.childNodes[i].childNodes[0] !== undefined) {
                  value = object.childNodes[i].childNodes[0].data;
                }
              }
              if (object.childNodes[i].tagName === "style") {
              }
            } else if (mode) {
              if (object.childNodes[i].tagName === "value") {
                if (object.childNodes[i].childNodes[0] !== undefined) {
                  value = object.childNodes[i].childNodes[0].data;
                }
              }
              if (object.childNodes[i].tagName === "style") {
              }
              if (object.childNodes[i].tagName === "placeholder") {
                placeholder = object.childNodes[i].childNodes[0].data;
              }
            }
          }
        else {
          if (object.value !== undefined) value = object.value;

          if (object.placeholder !== undefined)
              placeholder = object.placeholder;
        }
        if (placeholder === "") {
          if (mode) placeholder = "Mời bạn nhập câu trả lời";
          else placeholder = "Mời bạn nhập placeholder";
        }
        var temp;
        var input;
        input = absol.buildDom({
          tag: "textarea",
          class: ["quantumWizTextinputPapertextareaInput"],
          on: {
            focus: function() {
              return (function(temp) {
                temp.requestUpdateSize();
                if(temp.parentNode!==undefined){
                  temp.parentNode.classList.add("selected");
                }
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.requestUpdateSize();
                 if(temp.parentNode!==undefined){
                   if(temp.parentNode.classList.contains("selected"))
                   temp.parentNode.classList.remove("selected");
                 }
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp) {
                if (temp) {
                  temp.requestUpdateSize();
                }
              })(temp);
            },
            keydown: function(event){
              if(temp.mode===1){
                if(event.key==="Enter")
                {
                  if(event.altKey===true||event.ctrlKey===true||event.shiftKey===true)
                  {         
                  }else
                  {
                    event.preventDefault();
                    if(temp.requestParent===undefined)
                    return;
                    var arr = temp.requestParent.getElementsByClassName("quantumWizTextinputPapertextareaInput");
                    for(var i=0;i<arr.length;i++)
                    {
                      
                      if(input===arr[i])
                      {
                        var temp1;
                        if(arr[i+1]!==undefined){
                          if(arr[i+1].disabled===true)
                          {
                            temp1=arr[i+2];    
                          }else
                          {
                            temp1=arr[i+1];
                          }
                        }
                        if(temp1!==undefined)
                        {
                          temp1.focus();
                        }else
                        {
                          arr = temp.requestParent.getElementsByClassName("quantumWizTextinputPaperinputInput");
                          if(arr.length===1)
                          arr[0].focus();
                        }
                        break;
                      }
                    }
                  }
                }
                if(event.key==="Tab")
                { 
                  if(event.altKey===true||event.ctrlKey===true||event.shiftKey===true)
                  {
                    event.preventDefault();
                    if(temp.requestParent===undefined)
                    return;
                    var arr = temp.requestParent.getElementsByClassName("quantumWizTextinputPapertextareaInput");
                    for(var i=0;i<arr.length;i++)
                    {
                      
                      if(input===arr[i])
                      {
                         var temp1;
                        if(arr[i-1]!==undefined){
                          if(arr[i-1].disabled===true)
                          {
                            temp1=arr[i-2];    
                          }else
                          {
                            temp1=arr[i-1];
                          }
                        }
                        if(temp1!==undefined)
                        {
                          temp1.focus();
                        }
                        break;
                      }
                    }
                  }
                }
              }
            }
          },
          props: {
            value: value
          }
        });
        var styleUnderline = {};
        if (mode) {
          arrClass.push(
            "freebirdFormeditorViewQuestionBodyLongtextbodyLongTextInput"
          );
          styleUnderline = {};
        }
        temp = absol.buildDom({
          tag: "div",
          class: arrClass,
          child: [
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaMainContent",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaPlaceholder",
                  props: {
                    innerHTML: placeholder
                  }
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaContentArea",
                  child: [input]
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaUnderline",
                  style: styleUnderline
                },
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaFocusUnderline"
                }
              ]
            },
            {
              tag: "div",
              class: "quantumWizTextinputPapertextareaCounterErrorHolder",
              child: [
                {
                  tag: "div",
                  class: "quantumWizTextinputPapertextareaHint"
                }
              ]
            }
          ]
        });

        temp.getValue = function() {
          if (input.value == undefined || input.value == "undefined")
            input.value = "";
          temp.value = input.value;
          if (!mode)
            return (
              "<type>input</type><style></style><placeholder>" +
              input.value +
              "</placeholder><value></value>"
            );
          else if (mode)
            return (
              "<type>text</type><style></style><value>" +
              input.value +
              "</value>"
            );
        };
        temp.getPureValue = function() {
          return input.value;
        };
        temp.requestUpdateSize = function() {
          if (temp) {
            if (input.value) {
              temp.classList.add("hasValue");
            } else {
              temp.classList.remove("hasValue");
            }
            input.style.height = "0";
            input.style.height = input.scrollHeight + "px";
          }
          if(temp.functionChangeSize!==undefined)
          {
            temp.functionChangeSize();
          }
        };
        temp.focus = function(){
          input.click();
          input.focus();
        }
        setTimeout(function() {
          temp.requestUpdateSize();
          if(temp.parentNode!==undefined)
          {
            if(temp.parentNode.classList.contains("docssharedWizOmnilistItemPrimaryContent"))
            {
              temp.mode=1;
              var el=temp;
              while(!el.classList.contains("freebirdFormeditorViewQuestionBodyQuestionBody")&&el!==document.body)
                el=el.parentNode;
              temp.requestParent=el;
            }else
            {
              temp.mode=0;
            }
          }
        }, 100);
        temp.focusEl = function() {
          input.focus();
        };
        temp.disable = function(){
          input.disabled = true;
        }
        return temp;
      },
      newTextAreaEdit: function(object,
        arrClass = ["quantumWizTextinputPapertextareaEl"],
        mode = 0
      )
      {

        var value = "";
        var style = "";
        var placeholder = "";
        if (object.tagName !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            if (!mode) {
              if (object.childNodes[i].tagName === "placeholder") {
                if (object.childNodes[i].childNodes[0] !== undefined) {
                  value = object.childNodes[i].childNodes[0].data;
                }
              }
              if (object.childNodes[i].tagName === "style") {
              }
            } else if (mode) {
              if (object.childNodes[i].tagName === "value") {
                if (object.childNodes[i].childNodes[0] !== undefined) {
                  value = object.childNodes[i].childNodes[0].data;
                }
              }
              if (object.childNodes[i].tagName === "style") {
              }
              if (object.childNodes[i].tagName === "placeholder") {
                placeholder = object.childNodes[i].childNodes[0].data;
              }
            }
          }
        else {
          if (object.value !== undefined) value = object.value;

          if (object.placeholder !== undefined)
              placeholder = object.placeholder;
        }
        if (placeholder === "") {
          if (mode) placeholder = "Mời bạn nhập câu trả lời";
          else placeholder = "Mời bạn nhập placeholder";
        }
        
        var input = absol.buildDom({
          tag:"textarea",
          class:"appsMaterialWizTextinputTextareaInput",
          on: {
            focus: function() {
              return (function(temp) {
                temp.requestUpdateSize();
                temp.classList.add("isFocused");
              })(temp);
            },
            blur: function() {
              return (function(temp) {
                temp.requestUpdateSize();
                temp.classList.remove("isFocused");
              })(temp);
            },
            input: function() {
              return (function(temp) {
                if (temp) {
                  temp.requestUpdateSize();
                }
              })(temp);
            },
          },
          props:{
            value:value
          }
        })
        var temp = absol.buildDom({
          tag:"div",
          class:["appsMaterialWizTextinputTextareaEl", "appsMaterialWizTextinputTextareaFilled", "freebirdThemedInput", "freebirdFormeditorDialogFeedbackFeedbackText", "noLabel", "hasPlaceholder", "appsMaterialWizTextinputTextareaAlwaysFloatLabel"],
          child:[
            {
              tag:"div",
              class:"appsMaterialWizTextinputTextareaMainContent",
              child:[
                {
                  tag:"div",
                  class:"appsMaterialWizTextinputTextareaPlaceholder",
                  props:{
                    innerHTML:placeholder
                  }
                },
                {
                  tag:"div",
                  class:"appsMaterialWizTextinputTextareaContentArea",
                  child:[
                    input
                  ]
                },
                {
                  tag:"div",
                  class:"appsMaterialWizTextinputTextareaUnderline"
                },
                {
                  tag:"div",
                  class:"quantumWizTextinputPaperinputFocusUnderline"
                }
              ]
            },
            {
              tag:"div",
              class:"appsMaterialWizTextinputTextareaHintErrorHolder",
              child:[
                {
                  tag:"div",
                  class:"appsMaterialWizTextinputTextareaHint"
                }
              ]
            }
          ]
        })
        temp.getValue = function() {
          if (input.value == undefined || input.value == "undefined")
            input.value = "";
          temp.value = input.value;
          if (!mode)
            return (
              "<type>input</type><style></style><placeholder>" +
              input.value +
              "</placeholder><value></value>"
            );
          else if (mode)
            return (
              "<type>text</type><style></style><value>" +
              input.value +
              "</value>"
            );
        };
        temp.getPureValue = function() {
          return input.value;
        };
        temp.requestUpdateSize = function() {
          if (temp) {
            if (input.value) {
              temp.classList.add("hasValue");
            } else {
              temp.classList.remove("hasValue");
            }
            input.style.height = "0";
            input.style.height = input.scrollHeight + "px";
          }
          if(temp.functionChangeSize!==undefined)
          {
            temp.functionChangeSize();
          }
        };
        temp.focus = function(){
          input.click();
          input.focus();
        }
        setTimeout(function() {
          temp.requestUpdateSize();
        }, 100);
        temp.focusEl = function() {
          input.focus();
        };
        temp.disable = function(){
          input.disabled = true;
        }
        return temp;
      },
      button: function(text, hovertext, classList = [], functionclick, self) {
        if (hovertext !== undefined)
          if (hovertext.text == undefined) {
            var temp = hovertext;
            hovertext = {};
            hovertext.text = temp;
            hovertext.align = "right";
          }
        var temp = absol.buildDom({
          tag: "div",
          class: classList.concat([
            "quantumWizButtonEl",
            "quantumWizButtonPapericonbuttonEl",
            "quantumWizButtonPapericonbuttonLight"
          ]),
          child: [
            {
              tag: "i",
              class: ["material-icons", "icon-ceneter"],
              props: {
                innerHTML: text
              }
            }
          ],
          on: {
            click: function() {
              functionclick(temp, self);
              if (hovertext !== undefined)
                absol.Tooltip.closeTooltip(temp.session);
            },
            mouseover: function() {
              if (hovertext !== undefined)
                temp.session = absol.Tooltip.show(
                  temp,
                  hovertext.text,
                  hovertext.align
                );
            },
            mouseout: function() {
              if (hovertext !== undefined)
                absol.Tooltip.closeTooltip(temp.session);
            },
            blur: function() {
            }
          }
        });
        return temp;
      },
      functionDeleteElement: function(el, self) {
        while (!el.classList.contains("freebirdFormeditorViewOmnilistItemRoot"))
          el = el.parentNode;
        el.parentNode.removeChild(el);
      },
      functionAddElement: function(el, self, type) {
        while (
          !el.classList.contains(
            "freebirdFormeditorViewQuestionBodyQuestionBody"
          )
        )
          el = el.parentNode;
        for (var i = 0; i < el.childNodes.length; i++) {
          if (
            el.childNodes[i].classList.contains(
              "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList"
            )
          ) {
            el = el.childNodes[i];
            break;
          }
        }
        if(type==="multiweight"){
          var clone = self.elMenuComponentMultiWeight("radiobutton", {
          value: "Lựa chọn " + (el.children.length + 1)
          });
        }else{
          var clone = self.elMenuComponent(type, {
          value: "Lựa chọn " + (el.children.length + 1)
          });
        }
        el.appendChild(clone);
        clone.click();
        clone.focusEl();
      },
      functionAddElementOther: function(el, self, type) {
        var temp = el;
        while (
          !el.classList.contains(
            "freebirdFormeditorViewQuestionBodyQuestionBody"
          )
        )
          el = el.parentNode;
        for (var i = 0; i < el.childNodes.length; i++) {
          if (
            el.childNodes[i].classList.contains(
              "freebirdFormeditorViewQuestionBodyChoicelistbodyOmniList"
            )
          ) {
            el = el.childNodes[i];
            break;
          }
        }
        if(type==="multiweight"){
          var clone = self.elMenuComponentMultiWeight("radiobutton", {
          value: "Lựa chọn " + (el.children.length + 1),
          input: { value: "Khác", placeholder:" " }
          });
        }else{
          var clone = self.elMenuComponent(type, {
          value: "Lựa chọn " + (el.children.length + 1),
          input: { value: "Khác", placeholder:" " }
          });
        }
        
        el.appendChild(clone);
        clone.focusEl();
      },
      elMenuComponent: function(type, object) {
        var self = this;
        var y = absol.buildDom({
          tag: "div",
          class: ["docssharedWizOmnilistItemPrimaryContent"],
          child: [this.holdmoveHo()]
        });

        var z = absol.buildDom({
          tag: "div",
          class: [
            "docssharedWizOmnilistItemRoot",
            "freebirdFormeditorViewOmnilistItemRoot"
          ],
          child: [y],
          on: {
            click: function() {
              // var query = document.getElementsByClassName(
              //   "insert-picture-focus"
              // );
              // if (query.length == 1)
              //   query[0].classList.remove("insert-picture-focus");
              // this.classList.add("insert-picture-focus");
            }
          }
        });
        if (object.childNodes !== undefined) {
          for (var k = 0; k < object.childNodes.length; k++) {
            if (object.childNodes[k].tagName === "id") {
              z.id = xmlComponent.getDataformObject(object, "id");
            }
            if (object.childNodes[k].tagName === "value") {
              var value = "";
              if (object.childNodes[k].childNodes[0] !== undefined) {
                value = object.childNodes[k].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
              }
              z.select = absol.buildDom({
                tag: type,
                class: [
                  "quantumWizTogglePaperradioEl",
                  "docssharedWizToggleLabeledControl",
                  "freebirdThemedRadio",
                  "freebirdThemedRadioDarkerDisabled",
                  "freebirdFormviewerViewItemsRadioControl"
                ],
                style: {
                  pointerEvents: "none"
                }
              });
              y.appendChild(z.select);
              z.text = this.textareaEdit({ value: value }, undefined, 2);
              y.appendChild(z.text);
            }
            if (object.childNodes[k].tagName === "style") {
            }
            if (object.childNodes[k].tagName === "content") {
              if (
                xmlComponent.getDataformObject(object.childNodes[k], "type") ===
                "input"
              ) {
                z.input = this.textareaEdit(object.childNodes[k]);
                z.input.classList.add("OrtherInput");
                z.input.disable();
                y.appendChild(z.input);
              } else if (
                xmlComponent.getDataformObject(object.childNodes[k], "type") ===
                "image"
              ) {
                xmlModalDragImage.elementCreateByObject(
                  z,
                  object.childNodes[k],
                  4
                );
              }
            }
          }
          if (self.getDataformObject(object, "point") == "1") {
            z.point = absol.buildDom({
              tag: "div",
              class: [
                "freebirdFormeditorViewItemCheckButton",
                "quantumWizButtonEl",
                "quantumWizButtonPapericonbuttonEl",
                "quantumWizButtonPapericonbuttonLight"
              ],
              child: [
                {
                  tag: "i",
                  class: ["material-icons", "icon-ceneter"],
                  props: {
                    innerHTML: "check"
                  },
                  style: {
                    color: "green"
                  }
                }
              ]
            });
            y.appendChild(z.point);
          }
        } else {
          if (object.value !== undefined) {
            z.select = absol.buildDom({
              tag: type,
              class: [
                "quantumWizTogglePaperradioEl",
                "docssharedWizToggleLabeledControl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            });
            y.appendChild(z.select);
            z.text = this.textareaEdit({ value: object.value , placeholder: object.placeholder}, undefined, 1);
            y.appendChild(z.text);
          }
          if (object.input !== undefined) {
            z.input = this.textareaEdit({ value: object.input.value,placeholder: object.input.placeholder});
            z.input.disable();
            z.input.classList.add("OrtherInput");
            y.appendChild(z.input);
          }
        }
        y.appendChild(
          xmlComponent.button(
            "photo",
            { text: "Thêm hình ảnh", align: "bottom" },
            ["freebirdFormeditorViewItemPictureButton"],
            self.addPictureInParent.bind(z)
          )
        );
        y.appendChild(
          xmlComponent.button(
            "close",
            { text: "Xoá bỏ", align: "bottom" },
            ["freebirdFormeditorViewItemDuplicateButton"],
            this.functionDeleteElement
          )
        );
        z.focusEl = function() {
          z.text.focusEl();
        };
        z.getValue = function() {
          var result = "";
          if (z !== undefined) {
            result += "<selection>";
            if (z.id !== "") {
              result += "<id>" + z.id + "</id>";
            } else {
              z.id = ("text_" + Math.random() + Math.random()).replace(
                /\./g,
                ""
              );
              result += "<id>" + z.id + "</id>";
            }
            if (z.text !== undefined) {
              z.text.getValue();
              result += "<style></style><value>" + z.text.value + "</value>";
            }
            if (z.input !== undefined) {
              result += "<content>";
              result += z.input.getValue();
              result += "</content>";
            }
            if (z.point !== undefined) {
              result += "<point>1</point>";
            }
          }
          for (var j = 1; j < z.childNodes.length; j++) {
            if (z.childNodes[j].getValue !== undefined) {
              result += z.childNodes[j].getValue();
            }
          }
          result += "</selection>";
          return result;
        };
        z.requestUpdateSize = function() {
          if (z.text !== undefined)
            if (z.text.requestUpdateSize !== undefined)
              z.text.requestUpdateSize();
        };
        return z;
      },
      addPictureInParent: function(){
        var query = document.getElementsByClassName(
          "insert-picture-focus"
        );

        var valid;
        if (query.length == 1)
          query[0].classList.remove("insert-picture-focus");
        
        if(!(this!==undefined&&this.classList!==undefined&&this.classList.contains("docssharedWizOmnilistItemRoot"))) 
          return;
          valid=this;
        valid.classList.add("insert-picture-focus");
        var modal = xmlModalDragImage.createModal(document.body);
        modal.show = true;
      },
      elMenuComponentMultiWeight: function(type, object) {
        var self = this;
        var y = absol.buildDom({
          tag: "div",
          class: ["docssharedWizOmnilistItemPrimaryContent"],
          child: [this.holdmoveHo()]
        });

        var z = absol.buildDom({
          tag: "div",
          class: [
            "docssharedWizOmnilistItemRoot",
            "freebirdFormeditorViewOmnilistItemRoot"
          ],
          child: [y],
          on: {
            click: function() {
              var query = document.getElementsByClassName(
                "insert-picture-focus"
              );
              if (query.length == 1)
                query[0].classList.remove("insert-picture-focus");
              this.classList.add("insert-picture-focus");
            }
          }
        });
        if (object.childNodes !== undefined) {
          for (var k = 0; k < object.childNodes.length; k++) {
            if (object.childNodes[k].tagName === "id") {
              z.id = xmlComponent.getDataformObject(object, "id");
            }
            if (object.childNodes[k].tagName === "value") {
              var value = "";
              if (object.childNodes[k].childNodes[0] !== undefined) {
                value = object.childNodes[k].childNodes[0].data.replace(
                  /\n/g,
                  "<br />"
                );
              }
              z.select = absol.buildDom({
                tag: type,
                class: [
                  "quantumWizTogglePaperradioEl",
                  "docssharedWizToggleLabeledControl",
                  "freebirdThemedRadio",
                  "freebirdThemedRadioDarkerDisabled",
                  "freebirdFormviewerViewItemsRadioControl"
                ],
                style: {
                  pointerEvents: "none"
                }
              });
              y.appendChild(z.select);
              z.text = this.textareaEdit({ value: value }, undefined, 2);
              y.appendChild(z.text);
            }
            if (object.childNodes[k].tagName === "style") {
            }
            if (object.childNodes[k].tagName === "content") {
              if (
                xmlComponent.getDataformObject(object.childNodes[k], "type") ===
                "input"
              ) {
                z.input = this.textareaEdit(object.childNodes[k]);
                z.input.classList.add("OrtherInput");
                z.input.disable();
                y.appendChild(z.input);
              } else if (
                xmlComponent.getDataformObject(object.childNodes[k], "type") ===
                "image"
              ) {
                xmlModalDragImage.elementCreateByObject(
                  z,
                  object.childNodes[k],
                  4
                );
              }
            }
            if (object.childNodes[k].tagName === "point") {
              z.point = absol.buildDom({
                tag: "div",
                class: [
                  "freebirdFormeditorViewItemCheckButton",
                  "quantumWizButtonEl",
                  "quantumWizButtonPapericonbuttonEl",
                  "quantumWizButtonPapericonbuttonLight"
                ],
                child: [
                  {
                    tag: "div",
                    class: ["freebirdFormeditorViewTabPointLabel","icon-ceneter"],
                    props: {
                      innerHTML: xmlComponent.getDataformObject(object, "point")
                    },
                    style: {
                      color: "green"
                    }
                  }
                ],
                props: {
                  value: xmlComponent.getDataformObject(object, "point")
                }
              });
              y.appendChild(z.point);
            }
          }
        } else {
          if (object.value !== undefined) {
            z.select = absol.buildDom({
              tag: type,
              class: [
                "quantumWizTogglePaperradioEl",
                "docssharedWizToggleLabeledControl",
                "freebirdThemedRadio",
                "freebirdThemedRadioDarkerDisabled",
                "freebirdFormviewerViewItemsRadioControl"
              ],
              style: {
                pointerEvents: "none"
              }
            });
            y.appendChild(z.select);
            z.text = this.textareaEdit({ value: object.value }, undefined, 1);
            y.appendChild(z.text);
          }
          if (object.input !== undefined) {
            z.input = this.textareaEdit({ value: object.input.value });
            z.input.disable();
            z.input.classList.add("OrtherInput");
            y.appendChild(z.input);
          }
        }
        if(z.point===undefined)
        {
          z.point = absol.buildDom({
            tag: "div",
            class: [
              "freebirdFormeditorViewItemCheckButton",
              "quantumWizButtonEl",
              "quantumWizButtonPapericonbuttonEl",
              "quantumWizButtonPapericonbuttonLight"
            ],
            child: [
              {
                tag: "div",
                class: ["freebirdFormeditorViewTabPointLabel","icon-ceneter"],
                props: {
                  innerHTML: 0
                },
                style: {
                  color: "green"
                }
              }
            ],
            props: {
              value: 0
            }
          });
          y.appendChild(z.point);
        }

        y.appendChild(
          xmlComponent.button(
            "photo",
            { text: "Thêm hình ảnh", align: "bottom" },
            ["freebirdFormeditorViewItemPictureButton"],
            self.addPictureInParent.bind(z)
          )
        );

        y.appendChild(
          xmlComponent.button(
            "close",
            { text: "Xoá bỏ", align: "bottom" },
            ["freebirdFormeditorViewItemDuplicateButton"],
            this.functionDeleteElement
          )
        );
        z.focusEl = function() {
          z.text.focusEl();
        };
        z.getValue = function() {
          var result = "";
          if (z !== undefined) {
            result += "<selection>";
            if (z.id !== "") {
              result += "<id>" + z.id + "</id>";
            } else {
              z.id = ("text_" + Math.random() + Math.random()).replace(
                /\./g,
                ""
              );
              result += "<id>" + z.id + "</id>";
            }
            if (z.text !== undefined) {
              z.text.getValue();
              result += "<style></style><value>" + z.text.value + "</value>";
            }
            if (z.input !== undefined) {
              result += "<content>";
              result += z.input.getValue();
              result += "</content>";
            }
            if (z.point !== undefined) {
              result += "<point>" + z.point.value + "</point>";
            }
          }
          for (var j = 1; j < z.childNodes.length; j++) {
            if (z.childNodes[j].getValue !== undefined) {
              result += z.childNodes[j].getValue();
            }
          }
          result += "</selection>";
          return result;
        };
        z.requestUpdateSize = function() {
          if (z.text !== undefined)
            if (z.text.requestUpdateSize !== undefined)
              z.text.requestUpdateSize();
        };
        return z;
      },
      holdmoveVer: function() {
        var svg = vchart._(
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cy="9.5" cx="6.5" r="1.5"></circle><circle cy="9.5" cx="12.5" r="1.5"></circle><circle cy="9.5" cx="18.5" r="1.5"></circle><circle cy="15.5" cx="6.5" r="1.5"></circle><circle cy="15.5" cx="12.5" r="1.5"></circle><circle cy="15.5" cx="18.5" r="1.5"></circle></svg>'
        );
        return absol.buildDom({
          tag: "div",
          class: ["item-dlg-dragHandle", "freebirdMaterialIcon"],
          child: [
            {
              tag: "div",
              class: ["freebirdMaterialIconIconEl", "drag-zone"],
              child: [
                {
                  tag: "div",
                  class: [
                    "freebirdMaterialIconIconImage",
                    "freebirdMaterialIconIconDarkIcon",
                    "freebird-qp-icon-drag-handle-horz-b"
                  ],
                  child: [svg]
                }
              ]
            }
          ]
        });
      },
      holdmoveVerClone: function() {
        var svg1 = vchart._(
          '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="24px" height="24px" viewBox="0 0 24 24" preserveAspectRatio="none"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" fill="#5F6368"/></g></svg>'
        );
        return absol.buildDom({
          tag: "div",
          class: ["item-dlg-dragHandle", "freebirdMaterialIcon"],
          child: [
            {
              tag: "div",
              class: ["freebirdMaterialIconIconEl", "more-zone"],
              child: [
                {
                  tag: "div",
                  class: [
                    "freebirdMaterialIconIconImage",
                    "freebirdMaterialIconIconDarkIcon",
                    "freebird-qp-icon-drag-handle-horz-b"
                  ],
                  child: [svg1]
                }
              ]
            }
          ]
        });
      },
      holdmoveHo: function() {
        var svg = vchart._(
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cy="5" cx="9.5" r="1.5"></circle><circle cy="5" cx="14.5" r="1.5"></circle><circle cy="11" cx="9.5" r="1.5"></circle><circle cy="11" cx="14.5" r="1.5"></circle><circle cy="17" cx="9.5" r="1.5"></circle><circle cy="17" cx="14.5" r="1.5"></circle></svg>'
        );
        return absol.buildDom({
          tag: "div",
          class: ["omnilist-draghandle-container", "drag-zone"],
          child: [
            {
              tag: "div",
              class: [
                "docssharedWizOmnilistItemDragHandle",
                "omnilist-draghandle"
              ],
              child: [svg]
            }
          ]
        });
      },
      Image: function(srcImg) {
        if (window.mViewer === undefined)
          window.mViewer = PhotoSwipeViewer.newInstance();
        var temp = absol.buildDom({
          tag: "img",
          class: "full-size",
          props: {
            src: srcImg
          },
          on: {
            click: function() {
              var el = this;
              while (
                !el.classList.contains("image-autoresize-create") &&
                !el !== document.body
              )
                el = el.parentNode;

              if (
                el.classList.contains("hasFocus") ||
                el.classList.contains("image-autoresize-preview")
              )
                mViewer.pickImageElement(this, this.src);
              else if (el !== document.body) el.classList.add("hasFocus");
            }
          }
        });
        temp.onload = function(){
          console.log(srcImg + "loaded");
        }
        window.addEventListener("click", function(event) {
          if (
            event.target !== temp &&
            temp !== undefined &&
            temp.parentNode !== undefined
          ) {
            var el = temp;
            while (
              el.parentNode != undefined &&
              !el.classList.contains("image-autoresize-create")
            )
              el = el.parentNode;
            if (el !== document)
              if (el.classList.contains("hasFocus"))
                el.classList.remove("hasFocus");
          }
        });
        return temp;
      },
      getDataformObject: function(object, type) {
        var result;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === type) {
            if (result === undefined) {
              if (
                object.childNodes[i].childNodes[0] !== undefined &&
                object.childNodes[i].childNodes[0].data !== undefined
              ) {
                return object.childNodes[i].childNodes[0].data;
              }
              if (
                object.childNodes[i].childNodes.length === 0
              ) {
                return "";
              }
              result = absol.XML.stringify(object.childNodes[i]);
            } else {
              if (!Array.isArray(result)) {
                var temp = [];
                temp.push(result);
                result = temp;
              }
              temp.push(absol.XML.stringify(object.childNodes[i]));
            }
          }
        }
        if (result === "undefined") result = undefined;
        return result;
      },
      setDataformObject: function(object, type, value) {
        var k = 0;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === type) {
            if (
              object.childNodes[i].childNodes[0] !== undefined &&
              object.childNodes[i].childNodes[0].data !== undefined
            ) {
              if (Array.isArray(value)) {
                object.childNodes[i].childNodes[0].data = value[k++];
                if (k == value.length) return true;
              } else {
                object.childNodes[i].childNodes[0].data = value;
                return true;
              }
            }
          }
        }
        return false;
      },
      changeTypeObject: function(object, type) {
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "answer") {
            return this.setDataformObject(object.childNodes[i], "type", type);
          }
        }
        return false;
      },
      structComponent: function() {
        var type;
        var result;
        type = this.getDataformObject(arguments[0], "type");
        if (type === undefined) type = arguments[0].type;
        if (type == "text") result = this.text.apply(this, arguments);
        if (type == "multichoice")
          result = this.multichoice.apply(this, arguments);
        if (type == "checkbox") result = this.checkbox.apply(this, arguments);
        if (type == "shortanswer")
          result = this.shortanswer.apply(this, arguments);
        if (type == "longanswer")
          result = this.longanswer.apply(this, arguments);
        if (type == "input") result = this.singleinput.apply(this, arguments);
        if (type == "linearscale")
          result = this.linearscale.apply(this, arguments);
        else if (type == "multiweighted"){
          result = this.multichoice.apply(this, arguments);
        }
          
        return result;
      },
      structComponentEdit: function() {
        var type;
        type = this.getDataformObject(arguments[0], "type");
        if (type === undefined) type = arguments[0].type;
        if (type == "text") return this.textareaEdit.apply(this, arguments);
        if (type == "multichoice")
          return this.multichoiceEdit.apply(this, arguments);
        if (type == "checkbox") return this.checkboxEdit.apply(this, arguments);
        if (type == "shortanswer")
          return this.shortanswerEdit.apply(this, arguments);
        if (type == "longanswer")
          return this.longanswerEdit.apply(this, arguments);
        if (type == "linearscale")
          return this.linearscaleEdit.apply(this, arguments);
        if (type == "multiweighted")
          return this.multiweightedEdit.apply(this, arguments);
        return undefined;
      },
      structComponentPoint: function() {
        var type;
        type = this.getDataformObject(arguments[0], "type");
        if (type === undefined) type = arguments[0].type;

        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormeditorViewAssessmentAssessmentBodyContent"
        });
        if (arguments[1] !== undefined) {
          arguments[1].appendChild(temp);
          arguments[1] = temp;
        }
        var result;
        if (type == "text") temp.appendChild(this.text.apply(this, arguments));
        else if (type == "multichoice")
          result = this.multichoicePoint.apply(this, arguments);
        else if (type == "checkbox")
          result = this.checkboxPoint.apply(this, arguments);
        else if (type == "shortanswer") {
          result = this.shortanswerPoint.apply(this, arguments);
          if (result.disable !== undefined) result.disable();
        } else if (type == "longanswer") {
          result = this.longanswerPoint.apply(this, arguments);
          if (result.disable !== undefined) result.disable();
        } else if (type == "linearscale")
          result = this.linearscalePoint.apply(this, arguments);
        else if (type == "multiweighted")
          result = this.multiweightedPoint.apply(this, arguments);
        else if (type == "singleinput")
          result = this.singleinput.apply(this, arguments);
        temp.appendChild(result);
        temp.getValue = function() {
          return result.getValue();
        };
        temp.disable = function() {
          result.disable();
        };
        return temp;
      }
    };
    return xmlComponent;
  }
  return XMLC();
});
