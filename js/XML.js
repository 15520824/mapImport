(function(root, UMD) {
  if (typeof define === "function" && define.amd) define([], UMD);
  else if (typeof module === "object" && module.exports) module.exports = UMD();
  else root.xmlRequest = UMD();
})(this, function UMD() {
  function XML() {
    var xmlRequest = {
      commit:false,
      // goAsyn: function (file, DOMElement) {
      //     var self = this;
      //     return new Promise(function (resolve, reject) {
      //         console.log(file)
      //         self.arrPage = [];
      //         self.arrPage.length = 0;
      //         if (file.length !== undefined) {
      //             self.readMultiFile(file, DOMElement)
      //         }
      //     })

      // },
      // readMultiFile: function (file, DOMElement) {
      //     var self = this;
      //     return new Promise(function (resolve, reject) {
      //         self.arrPage = [];
      //         self.arrPage.length = file.length;
      //         self.readMultiFileSequentially(file, DOMElement, 0).then(function () {
      //             resolve()
      //         })
      //     })
      // },
      // readMultiFileSequentially: async function (file, DOMElement, i) {
      //     var self = this;
      //     if (i >= file.length)
      //         return Promise.resolve();
      //         xmlComponent.readSingleFile(file[i]).then(function (result) {
      //         var object = absol.XML.parse(result);
      //         var temp = self.extract(object, DOMElement, i);
      //         if (i !== 0)
      //             temp.style.display = "none";
      //         self.arrPage[i] = temp;
      //         self.readMultiFileSequentially(file, DOMElement, ++i);
      //     })
      // },
      readXMLFromDB: function(id, DOMElement) {
        var self = this;
        return new Promise(function(resove,reject){
          self.commit=true;
          xmlDbLoad.loadSurvey(id).then(function(result) {
            self.pageView(result, DOMElement);
            resove();
          });
        })
        
      },
      readXMLFromDBGetImage: function(id, DOMElement) {
        var self = this;
        return xmlDbLoad.loadSurveyGetImage(id,false).then(function(result) {
          self.pageView(result, DOMElement);
        });
      },
      pageView: function(XML, DOMElement) {
        var self = this;
        self.defineHeightHeader = 180;
        var object = absol.XML.parse(XML);
        if (object.tagName !== "survey") return;
        var surveyTitle = absol.buildDom({
          tag: "span",
          class: "labelTitleAll",
          props: {
            innerHTML: xmlComponent.getDataformObject(object, "value")
          }
        });
        // var closeButton=absol.buildDom({
        //     tag: "div",
        //     class: ["labelTitleClose","quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonLight"],
        //     child: [
        //         {
        //             tag: 'i',
        //             class: ['material-icons', 'icon-ceneter'],
        //             props: {
        //                 innerHTML: "close"
        //             },
        //         }
        //     ],
        //     on: {
        //         click: function () {
        //             DOMElement.removeChild(temp);
        //         },
        //     }
        // })
        var surveySum = absol.buildDom({
          tag: "span",
          class: "SumPoint",
          props: {
            innerHTML: ""
          }
        });
        self.surveySum = surveySum;
        var temp = absol.buildDom({
          tag: "div",
          class: "PageView",
          child: [
            surveyTitle,
            surveySum
          ]
        });
        self.page = temp;
        
        self.arrPage = [];
        self.indexPage = 0;
        self.arrPage.length = 0;

        var id = xmlComponent.getDataformObject(object, "id");
        if (id !== undefined) {
          temp.id = id;
          self.arrPage.id=id
        }

        var continued = xmlComponent.getDataformObject(object, "continue");
        if (continued !== undefined) self.arrPage.length = continued;
        else
          for (var i = 0; i < object.childNodes.length; i++)
            if (object.childNodes[i].tagName === "document")
              self.arrPage.length++;
        var k = 0;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "document")
            self.extract(object.childNodes[i], temp, k++);
        }
        // DOMElement.clearChild();
        for (var i = DOMElement.childNodes.length - 1; i > 0; i--) {
          DOMElement.removeChild(DOMElement.childNodes[i]);
        }
        DOMElement.appendChild(temp);
        temp.setAnswer = function(answerList){
          for(var i=0;i<self.arrPage.length;i++)
          {
             self.arrPage[i]._body.setAnswer(answerList);
          }
          var numPoint = 0;
          var sumPoint = 0;
          var tempNumPoint;
          var tempSumPoint;
          for(var i=0;i<self.arrPage.length;i++)
          {
            var tempPoint =self.arrPage[i]._body.getValue();
            tempNumPoint = 0;
            tempSumPoint = 0;
            for(var j=0;j<tempPoint.length;j++)
            {
              tempNumPoint+=tempPoint[j].score;
              tempSumPoint+=tempPoint[j].sum;
            }
            self.arrPage[i]._title.setPointTitle(tempNumPoint,tempSumPoint);
            numPoint+=tempNumPoint;
            sumPoint+=tempSumPoint;
          }
          self.surveySum.innerHTML = "Tổng điểm: "+numPoint+"/"+sumPoint+"";
        };
        return temp;
      },
      extract: function(object, DOMElement, i) {
        var self = this;
        if (DOMElement === undefined) return;
        // var temp;
        // temp = self.element(object);
        if (object.tagName === "document") {
          temp = self.document(object, i);
        }
        if (object.tagName === "title") {
          temp = self.title(object);
          self.arrPage[i]._title = temp;
        }
        if (object.tagName === "body") {
          temp = self.body(object);
          self.arrPage[i]._body = temp;
        }
        if (temp !== undefined) DOMElement.appendChild(temp);
        if (object.tagName === "document") return temp;
        if (object.tagName === "body") {
          DOMElement.appendChild(
            absol.buildDom({
              tag: "div",
              class: "freebirdFormviewerViewNavigationNavControls",
              child: [
                {
                  tag: "div",
                  class: "freebirdFormviewerViewNavigationButtonsAndProgress",
                  child: [
                    {
                      tag: "div",
                      class: "freebirdFormviewerViewNavigationButtons",
                      child: self.navigationButtons(i)
                    },
                    self.navigationProgress(i)
                  ]
                }
              ]
            })
          );
        }
      },
      document: function(object, index) {
        var self = this;
        var content = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewCenteredContent"
        });
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewFormContentWrapper",
          child: [
            {
              tag: "div",
              class: ["freebirdFormviewerViewFormBanner", "freebirdHeaderMast"],
              style: {
                height: self.defineHeightHeader + "px"
              }
            },
            content
          ]
        });
        if (index !== 0) temp.style.display = "none";
        self.arrPage[index] = temp;
        self.arrPage[index].checkMustComplete = function() {
          if(data_module.question.itemsAnswer===undefined)
            return true;
          var isFlag = true;
          var checkArray = self.arrPage[index]._body.getValue();
          for (var i = 0; i < checkArray.length; i++) {
            if (checkArray[i].answer.length === 0 && checkArray[i].important) {
              checkArray[i].element.classList.add("hasErrorElement");
              if (isFlag) {
                checkArray[i].element.scrollIntoView({
                  behavior: "smooth",
                  block: "center"
                });
                isFlag = false;
              }
            }
          }
          return isFlag;
        };
        if (object.childNodes !== undefined) {
          var body = absol.buildDom({
            tag: "div",
            class: "freebirdFormviewerViewFormContent"
          });
          var form = absol.buildDom({
            tag: "div",
            child: [
              {
                tag: "div",
                class: "freebirdFormviewerViewFormCard",
                child: [
                  {
                    tag: "div",
                    class: [
                      "freebirdFormviewerViewAccentBanner",
                      "freebirdAccentBackground"
                    ]
                  },
                  body
                ]
              }
            ]
          });
          content.appendChild(form);
          for (var i = 0; i < object.childNodes.length; i++) {
            self.extract(object.childNodes[i], body, index);
          }
        }
        return temp;
      },
      nextPage: function()
      {
        var self = this;
        self.arrPage[self.indexPage].style.display = "none";
        self.arrPage[self.indexPage + 1].style.display = "";
        self.indexPage = self.indexPage + 1;
      },
      prevPage: function()
      {
        var self = this;
        self.arrPage[self.indexPage].style.display = "none";
        self.arrPage[self.indexPage - 1].style.display = "";
        self.indexPage = self.indexPage - 1;
      },
      navigationButtons: function(i) {
        var self = this;
        var arrButton = [];
        if (i > 0) {
          arrButton.push(
            absol.buildDom({
              tag: "div",
              class: [
                "quantumWizButtonEl",
                "quantumWizButtonPaperbuttonEl",
                "quantumWizButtonPaperbuttonFlat",
                "quantumWizButtonPaperbutton2El2",
                "freebirdFormviewerViewNavigationNoSubmitButton"
              ],
              on: {
                click: (function(self, i) {
                  return function() {
                    self.arrPage[i].style.display = "none";
                    self.arrPage[i - 1].style.display = "";
                    self.indexPage = i - 1;
                  };
                })(self, i)
              },
              child: [
                {
                  tag: "div",
                  class: "quantumWizButtonPaperbuttonRipple"
                },
                {
                  tag: "div",
                  class: "quantumWizButtonPaperbuttonFocusOverlay"
                },
                {
                  tag: "span",
                  class: ["quantumWizButtonPaperbuttonContent"],
                  child: [
                    {
                      tag: "span",
                      class: "quantumWizButtonPaperbuttonLabel",
                      props: {
                        innerHTML: "Quay lại"
                      }
                    }
                  ]
                }
              ]
            })
          );
        }
        if (i < self.arrPage.length - 1) {
          arrButton.push(
            absol.buildDom({
              tag: "div",
              class: [
                "quantumWizButtonEl",
                "quantumWizButtonPaperbuttonEl",
                "quantumWizButtonPaperbuttonFlat",
                "quantumWizButtonPaperbutton2El2",
                "freebirdFormviewerViewNavigationNoSubmitButton"
              ],
              on: {
                click: (function(self, i) {
                  return function() {
                    if (self.arrPage[i].checkMustComplete()) {
                      self.arrPage[i].style.display = "none";
                      self.arrPage[i + 1].style.display = "";
                      self.indexPage = i + 1;
                    }
                  };
                })(self, i)
              },
              child: [
                {
                  tag: "div",
                  class: "quantumWizButtonPaperbuttonRipple"
                },
                {
                  tag: "div",
                  class: "quantumWizButtonPaperbuttonFocusOverlay"
                },
                {
                  tag: "span",
                  class: ["quantumWizButtonPaperbuttonContent"],
                  child: [
                    {
                      tag: "span",
                      class: "quantumWizButtonPaperbuttonLabel",
                      props: {
                        innerHTML: "Tiếp"
                      }
                    }
                  ]
                }
              ]
            })
          );
        }
        if (i === self.arrPage.length - 1) {
          arrButton.push(
            absol.buildDom({
              tag: "div",
              class: [
                "quantumWizButtonEl",
                "quantumWizButtonPaperbuttonEl",
                "quantumWizButtonPaperbuttonFlat",
                "quantumWizButtonPaperbutton2El2",
                "freebirdFormviewerViewNavigationSubmitButton"
              ],
              on: {
                click: (function(self, i) {
                  return function() {
                    if(self.commit===true){
                    if (self.arrPage[i].checkMustComplete()) {
                      self.arrPage[i].style.display = "none";
                      ModalElement.show_loading();
                      xmlDbRecord.saveAll(self.arrPage).then(function(result){
                        ModalElement.close(-1);
                      })
                      var el = self.arrPage[i];
                      while(!el.classList.contains("absol-single-page"))
                      el = el.parentNode;
                      if(el.close!==undefined)
                      el.close();
                    }
                    }else
                    {
                      alert("Đây chỉ là bản xem trước không thể thực hiện khảo sát")
                    }
                  };
                })(self, i)
              },
              child: [
                {
                  tag: "div",
                  class: "quantumWizButtonPaperbuttonRipple"
                },
                {
                  tag: "div",
                  class: "quantumWizButtonPaperbuttonFocusOverlay"
                },
                {
                  tag: "span",
                  class: ["quantumWizButtonPaperbuttonContent"],
                  child: [
                    {
                      tag: "span",
                      class: "quantumWizButtonPaperbuttonLabel",
                      props: {
                        innerHTML: "Gửi"
                      }
                    }
                  ]
                }
              ]
            })
          );
        }
        return arrButton;
      },
      navigationProgress: function(i) {
        var self = this;
        var percent = (i + 1) / self.arrPage.length;
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewNavigationProgress",
          child: [
            {
              tag: "div",
              class: "freebirdFormviewerViewNavigationProgressIndicator",
              child: [
                {
                  tag: "div",
                  class:
                    "freebirdFormviewerViewNavigationProgressIndicatorFill",
                  style: {
                    width: percent * 100 + "%",
                    backgroundColor:
                      "rgba(" +
                      (1 - percent) * 255 +
                      ",0," +
                      (1 - percent) * 255 +
                      ",1)"
                  }
                }
              ]
            },
            {
              tag: "div",
              class: "freebirdFormviewerViewNavigationPercentComplete",
              props: {
                innerHTML:
                  "Trang " + (i + 1) + " trong tổng số " + self.arrPage.length
              }
            }
          ]
        });
        return temp;
      },
      title: function(object) {
        var self = this;
        var header, description;
        header = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewHeaderTitleRow",
          child: []
        });
        var rownContainText = xmlComponent.structComponent(
            object,
            ["freebirdFormviewerViewHeaderTitle", "freebirdCustomFont"],
            {
              dir: "auto",
              role: "heading",
              ariaLevel: "1"
            }
          )
        header.appendChild(
          rownContainText
        );
        var sumPoint = absol.buildDom({
          tag: "span",
          class: "SumPointChild",
          props: {
            innerHTML: ""
          }
        });
        rownContainText.childNodes[0].appendChild(sumPoint)
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "description") {
            description = absol.buildDom({
              tag: "div",
              class: "freebirdFormviewerViewHeaderDescription",
              child: []
            });

            for (var j = 0; j < object.childNodes[i].childNodes.length; j++) {
              if (object.childNodes[i].childNodes[j].tagName === "content") {
                if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "text"
                ) {
                  description.appendChild(
                    xmlComponent.structComponent(
                      object.childNodes[i].childNodes[j],
                      ["freebirdFormviewerViewHeaderDescriptionContent"]
                    )
                  );
                } else if (
                  xmlComponent.getDataformObject(
                    object.childNodes[i].childNodes[j],
                    "type"
                  ) === "image"
                ) {
                  xmlModalDragImage.elementPreviewByObject(
                    description,
                    object.childNodes[i].childNodes[j]
                  );
                }
              }
            }
          }
        }
        self.mustCommend = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewHeaderRequiredLegend",
          props: {
            ariaHidden: "true",
            dir: "auto",
            innerHTML: "*Bắt buộc"
          },
          style: {
            display: "none"
          }
        });

        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewNoPadding",
          child: [
            {
              tag: "div",
              class: "freebirdFormviewerViewHeaderHeader",
              child: [header, description, self.mustCommend]
            }
          ]
        });
        var id = xmlComponent.getDataformObject(object, "id");
        if (id !== undefined) temp.id = id;
        temp.setPointTitle = function(point,sum)
        {
          sumPoint.innerHTML = "Tổng điểm: "+point+"/"+sum+""
        }
        return temp;
      },
      body: function(object) {
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewItemList",
          props: {
            role: "list"
          }
        });
        if (object.childNodes !== undefined)
          for (var i = 0; i < object.childNodes.length; i++) {
            temp.appendChild(this.element(object.childNodes[i]));
          }
        temp.getValue = function() {
          var result = [];
          for (var i = 0; i < temp.childNodes.length; i++) {
            result.push(temp.childNodes[i].getValue());
          }
          return result;
        };
        temp.setAnswer = function(answerList) {
          var checkValid=[]
          for(var  i=0;i<answerList.length;i++)
          {
            if(checkValid[answerList[i].questionid]===undefined)
            {
              checkValid[answerList[i].questionid]=[];
            }
            checkValid[answerList[i].questionid].push([answerList[i].answerid,answerList[i].content]);
          }
          for (var i = 0; i < temp.childNodes.length; i++) {
            temp.childNodes[i].setAnswer(checkValid[parseInt(temp.childNodes[i].question.getQuestion().id)]);
          }
        };
        return temp;
      },
      element: function(object) {
        if (object.childNodes === undefined) return undefined;
        var childContainer = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewItemsItemItem"
        });
        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewNumberedItemContainer",
          child: [childContainer],
          on: {
            click: function() {
              temp.classList.remove("hasErrorElement");
            }
          }
        });
        var important = false;
        var type = xmlComponent.getDataformObject(object, "type");
        var feedBackTrue;
        var feedBackFalse;
        var question, answer;
        for (var i = 0; i < object.childNodes.length; i++) {
          if (object.childNodes[i].tagName === "question") {
            question = this.question(object.childNodes[i]);
            childContainer.appendChild(question);
            important =
              xmlComponent.getDataformObject(
                object.childNodes[i],
                "important"
              ) === "1";
              feedBackTrue = xmlComponent.getDataformObject(object.childNodes[i], "feedback_correct");
              feedBackFalse = xmlComponent.getDataformObject(object.childNodes[i], "feedback_incorrect");
          }
          if (object.childNodes[i].tagName === "answer")
            answer = this.answer(
              object.childNodes[i],
              childContainer,
              type,
              important,
              feedBackTrue,
              feedBackFalse
            );
        }
        temp.question = question;
        temp.answer = answer;
        temp.getValue = function() {
          var questionResult = question.getValue();
          var answerResult = answer.getValue();
          if(answerResult===undefined)
            answerResult = [];
          var score = 1;
          var point;
          var checkArrayQuestion = data_module.question.itemsAnswer[parseInt(questionResult)];
          var hasAnswer = false;
          for(var paramid in answerResult)
          {
            hasAnswer=true;
            point=xmlComponent.getDataformObject(absol.XML.parse(getObjectById(checkArrayQuestion,parseInt(paramid)).content),"point");
            if(point==undefined)
            point=0;
            else
            point=parseInt(point);
            score*=point;
          }
          if(hasAnswer===false)
          score=0;
          var questionContent = getObjectById(data_module.question.items,parseInt(questionResult));
          score*=parseInt(questionContent.sum);
          if(questionContent.type_answer==="checkbox")
          {
            for(var i=0;i<checkArrayQuestion.length;i++)
            {
              if(xmlComponent.getDataformObject(absol.XML.parse(checkArrayQuestion[i].content),"point")==1)
              {
                if(answerResult[parseInt(checkArrayQuestion[i].id)]===undefined){
                  score=0;
                  break;
                }
              }
            }
          }

          var valueFinal= {
            element: temp,
            question: questionResult,
            answer: answerResult,
            important: important,
            score:score,
            sum:(score > parseInt(questionContent.sum)) ? score : parseInt(questionContent.sum)
          };
          return valueFinal;
        };
        temp.setAnswer = function(data=[])
        {
          var selector=answer.getElementsByClassName("docssharedWizToggleLabeledLabelWrapper");
          var input;
          for(var j=0;j<data.length;j++)
          {
            for(var i=0;i<selector.length;i++)
              if(data[j][0]==selector[i].id)
              {
                selector[i].parentNode.parentNode.classList.add("answerChoice");
                absol.$("radiobutton",selector[i],function(e){
                  e.checked=true;
                })
                absol.$("checkboxbutton",selector[i],function(e){
                  e.checked=true;
                })
                input = selector[i].getElementsByClassName("singleInput");
                if(input.length!==0)
                {
                  input[0].setValueFormObject(absol.XML.parse(data[j][1]));
                }
              }
          }
          temp.setCorrect();
        }
        temp.setCorrect = function()
        {
          var extra = temp.getValue();
          console.log(extra.score,temp)
          if(extra.score!=0)
          {
            temp.classList.add("correctTrue");
          }else
          {
            temp.classList.add("correctFalse");
          }
          temp.visiableCorrectAnswer();
        }
        temp.visiableCorrectAnswer = function()
        {
          var checkArrayQuestion = data_module.question.itemsAnswer[parseInt(question.getValue())];
          answer.setAnswerCorrect(checkArrayQuestion);
        }
        return temp;
      },
      question: function(object) {
        var self = this;
        var x = xmlComponent.structComponent(object, [
          "freebirdFormviewerViewItemsItemItemTitle"
        ]);
        if (xmlComponent.getDataformObject(object, "important") === "1") {
          if (self.mustCommend.style.display === "none")
            self.mustCommend.style.display = "";
        }

        var temp = absol.buildDom({
          tag: "div",
          class: "freebirdFormviewerViewItemsItemItemHeader",
          child: [
            {
              tag: "div",
              class: "freebirdFormviewerViewItemsItemItemTitleDescContainer",
              child: x
            }
          ]
        });
        temp.getValue = function() {
          return x.getValue();
        };
        temp.getQuestion = function(){
          return x;
        };
        return temp;
      },
      answer: function(object, childContainer, type, important = false ,feedBackTrue = "", feedBackFalse = "") {
        var temp;
        object.type = type;
        temp = xmlComponent.structComponent(object, childContainer);
        if (important) {
          childContainer.appendChild(
            absol.buildDom({
              tag: "div",
              class: "freebirdFormviewerViewItemsItemErrorMessage",
              props: {
                innerHTML: "Đây là một câu hỏi bắt buộc",
                role: "alert"
              }
            })
          );
        }
        var containerFeedBack = absol.buildDom({
          tag:"div",
          class:["freebirdFormviewerViewItemsItemGradingGradingBox", "freebirdFormviewerViewItemsItemGradingFeedbackBox"],
          child:[
            {
              tag:"div",
              class:"freebirdFormviewerViewItemsItemGradingFeedbackBoxHeading",
              props:{
                innerHTML:"Phản hồi"
              }
            },
            {
              tag:"div",
              class:"freebirdFormviewerViewItemsItemGradingFeedbackBoxContent",
              child:[
                {
                  tag:"div",
                  class:["feedBackTrue","feedBackContainer"],
                  child:[
                    {
                      tag:"div",
                      class:"freebirdFormviewerViewItemsItemGradingFeedbackText",
                      props:{
                        innerHTML:feedBackTrue
                      }
                    },
                    {
                          tag:"div",
                          class:"freebirdFormviewerViewItemsItemGradingFeedbackMaterial"
                    }
                  ]
                },
                {
                  tag:"div",
                  class:["feedBackFalse","feedBackContainer"],
                  child:[
                    {
                      tag:"div",
                      class:"freebirdFormviewerViewItemsItemGradingFeedbackText",
                      props:{
                        innerHTML:feedBackFalse
                      }
                    },
                    {
                          tag:"div",
                          class:"freebirdFormviewerViewItemsItemGradingFeedbackMaterial"
                    }
                  ]
                }
              ]
            }
          ]
        });
        childContainer.appendChild(containerFeedBack);
        if(feedBackTrue==="")
        containerFeedBack.classList.add("noFeedBackTrue");
        if(feedBackFalse==="")
        containerFeedBack.classList.add("noFeedBackFalse");
        temp.setAnswerCorrect = function(data)
        {
          var selector=temp.getElementsByClassName("docssharedWizToggleLabeledLabelWrapper");
          var point;
          for(var j=0;j<data.length;j++)
          {
            point = xmlComponent.getDataformObject(absol.XML.parse(data[j].content),"point");
            if(point!==undefined&&point!=0)
            for(var i=0;i<selector.length;i++)
              if(data[j].id==selector[i].id)
              {
                selector[i].parentNode.parentNode.classList.add("correctChoice");
              }
          }
        }
        return temp;
      }
    };
    function getObjectById(arr,id)
    {
      for(var i=0;i<arr.length;i++)
      {
        if(arr[i].id===id)
        return arr[i];
      }
      return undefined;
    }
    return xmlRequest;
  }
  return XML();
});
