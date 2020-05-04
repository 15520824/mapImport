; (function (root, UDBC) {
    if (typeof define === 'function' && define.amd) define([], UDBC)
    else if (typeof module === 'object' && module.exports) module.exports = UDBC()
    else root.xmlDbCreate = UDBC()
})(this, function UDBC() {
    function XML_DB_CREATE() {
        var xmlDbCreate = {
            resetCached: function()
            {
                var self=this;
                self.prevDocument=[];
                self.prevQuestion=[];
                self.prevAnswer=[];
                self.tempAnswer=[];
            },
            saveAll: function(XML)
            {
                var self=this;
                self.resetCached();
                return new Promise(function(resolve,reject){
                    // xmlRequestCreate.processBar.innerHTML="Đang lưu";
                    var object = absol.XML.parse(XML);
                    if(object.tagName==="survey")
                    {
                        var promiseAll=[];
                        for(var i=0;i<object.childNodes.length;i++){
                            if(object.childNodes[i].tagName==="document")
                            {
                                promiseAll.push(self.saveDocument(object.childNodes[i]));
                            }
                        }
                        
                        Promise.all(promiseAll).then(function(result) {
                            var id=xmlComponent.getDataformObject(object,"id");
                            var data=[];
                            data.push({name:"value",value:xmlComponent.getDataformObject(object,"value")})
                            data.push({name:"type",value:xmlComponent.getDataformObject(object,"type")})
                            data.push({name:"show_feedback",value:xmlComponent.getDataformObject(object,"show_feedback")});
                            data.push({name:"show_result",value:xmlComponent.getDataformObject(object,"show_result")});
                            var promise;
                            var promiseAllLink=[];
                            promiseAllLink.push(self.deleteOrtherQuestion());
                            if(id!==undefined&&id[0]!=='t')
                            {
                                data.push({name:"id",value:id});
                                promise = data_module.survey.updateOne(data).then(function(resultDocument){
                                    data_module.img.addOne([{name:"id",value:resultDocument.id}]);
                                    promiseAllLink.push(self.deleteOtherForm(resultDocument.id));
                                    for(var i=0;i<result.length;i++){
                                        data=[{name:"surveyid",value:resultDocument.id},{name:"formid",value:result[i].id},{name:"numer_order",value:i}];
                                        promiseAllLink.push(data_module.link_survey_form.addOne(data));
                                    }
                                    Promise.all(promiseAllLink).then(function(resolveLink){
                                        xmlModalDragImage.imgAll=[];
                                        // xmlRequestCreate.processBar.innerHTML="Đã hoàn tất lưu lại";
                                        resolve(resultDocument);     
                                    }).catch(function(error){
                                        reject(error);
                                    })
                                    
                                }).catch(function(error){
                                    reject(error);
                                });
                            }
                            else
                            {
                                promise = data_module.survey.addOne(data).then(function(resultDocument){
                                    data_module.img.addOne([{name:"id",value:resultDocument.id}]);
                                    var data;
                                    document.getElementById(id).id=resultDocument.id;
                                    promiseAllLink.push(self.deleteOtherForm(resultDocument.id));
                                    for(var i=0;i<result.length;i++){
                                        data=[{name:"surveyid",value:resultDocument.id},{name:"formid",value:result[i].id},{name:"numer_order",value:i}];
                                        promiseAllLink.push(data_module.link_survey_form.addOne(data));
                                    }
                                    Promise.all(promiseAllLink).then(function(resolveLink){
                                        xmlModalDragImage.imgAll=[];
                                        // xmlRequestCreate.processBar.innerHTML="Đã hoàn tất lưu lại";
                                        resolve(resultDocument);     
                                    }).catch(function(error){
                                        reject(error);
                                    })
                                }).catch(function(error){
                                    reject(error);
                                })
                            }
                        })
                        .catch(error => { 
                            reject(error);
                        });
                    }else
                    {
                        reject(error);
                    }
                });   
            },
            saveDocument:function(object)
            {
                var self=this;
                return new Promise(function(resolve,reject){
                    var promiseTile;
                    var promiseBody;
                   for(var i=object.childNodes.length-1;i>=0;i--)
                   {
                       if(object.childNodes[i].tagName==="title")
                       {
                            promiseTile=self.saveTitle(object.childNodes[i],promiseBody);
                       }
                       if(object.childNodes[i].tagName==="body")
                       {
                            promiseBody=self.saveBody(object.childNodes[i]);
                       }
                   }
                   promiseTile.then(function(result){
                        promiseBody.then(function(resultQuestion){
                            var data;
                            for(var i=0;i<resultQuestion.length;i++){

                                for(var j=i;j<self.prevQuestion.length;j++){
                                    if(resultQuestion[i].id==self.prevQuestion[j].id){
                                        self.prevQuestion[j].formid=result.id;
                                        break;
                                    }
                                }
                                data=[{name:"questionid", value:resultQuestion[i].id},{name:"formid", value:result.id},{name:"numer_order", value:i}];
                                data_module.link_form_question.addOne(data).then(function(linkResult){
                                    
                                }).catch(function(error){
                                    reject(error);
                                })
                            }
                            resolve(result);
                        })
                   })
                   .catch(function(error)
                   {
                        reject(error);
                   })
                    
                })
            },
            saveTitle:function(object,promiseBody)
            {
                var self=this;
                return new Promise(function(resolve,reject){
                    promiseBody.then(function(resultQuestion){
                        var data=[];
                        var id=xmlComponent.getDataformObject(object,"id");
                        var temp;
                        temp=xmlComponent.getDataformObject(object,"value");
                        if(temp!==undefined)
                        data.push({name:"value",value:temp});
    
                        temp=xmlComponent.getDataformObject(object,"type");
                        if(temp!==undefined)
                        data.push({name:"type",value:temp});
    
                        temp=xmlComponent.getDataformObject(object,"style");
                        if(temp!==undefined)
                        data.push({name:"style",value:temp});
    
                        temp=xmlComponent.getDataformObject(object,"description");
                        if(temp!==undefined)
                        data.push({name:"description",value:temp});
                        if(id!==undefined&&id[0]!=='t')
                        {
                            if(!checkIDinArray(id,self.prevDocument)&&checkIDinArray(id,data_module.form.items)){
                                data.push({name:"id",value:id});
                                var objectSym=propsAsString(data);
                                self.prevDocument.push(objectSym);
                                if(checkEqualValue(objectSym,data_module.form.items))
                                    resolve(objectSym);
                                else
                                data_module.form.updateOne(data).then(function(result){
                                    resolve(result);
                                })
                                .catch(function(error){
                                    reject(error)
                                })
                            }else
                            {
                                data_module.form.addOne(data).then(function(result){  
                                    self.prevDocument.push(result);
                                    document.getElementById(id).id=result.id;
                                    resolve(result);
                                })
                                .catch(function(error){
                                    reject(error)
                                })
                            }
                            
                            
                        }else
                        {
                            data_module.form.addOne(data).then(function(result){  
                                self.prevDocument.push(result);
                                    document.getElementById(id).id=result.id;
                                resolve(result);
                            })
                            .catch(function(error){
                                reject(error)
                            })
                        }
                    }).catch(function(error){
                        reject(error);
                    })
                })

            },
            saveBody:function(object)
            {
                var self=this;
                return new Promise(function(resolve,reject){
                    var promiseAll=[];
                    for(var i=0;i<object.childNodes.length;i++)
                    {
                        if(object.childNodes[i].tagName==="test")
                        {
                            promiseAll.push(self.saveTest(object.childNodes[i]));
                        }
                    }
                    Promise.all(promiseAll).then(function(result){
                        resolve(result)
                    })
                    .catch(function(error){
                        reject(error);
                    })
                })
            },
            saveTest: function(object){
                var self=this;
                return new Promise(function(resolve,reject){
                    var promiseQuestion;
                    var promiseAnswer;
                    var type_answer;
                    var id;
                    var resultQuestion;
                    for(var i=0;i<object.childNodes.length;i++)
                    {
                        if(object.childNodes[i].tagName==="answer"){
                            type_answer = xmlComponent.getDataformObject(object.childNodes[i],"type");
                            break;
                        }
                    }
                    for(var i=0;i<object.childNodes.length;i++)
                    {
                        if(object.childNodes[i].tagName==="question")
                        {
                            promiseQuestion = self.saveQuestion(object.childNodes[i],type_answer);
                            promiseQuestion.then(function(result){
                                resultQuestion=result;
                            });
                        }
                        if(object.childNodes[i].tagName==="answer")
                        {
                            promiseAnswer = self.saveAnswer(object.childNodes[i],promiseQuestion);
                        }
                    }
                    promiseAnswer.then(function(resultAnswer){
                        self.tempAnswer[resultQuestion.id]=resultAnswer;
                        self.deleteOrtherAnswer(resultQuestion.id).then(function(resultDelete){
                            resolve(resultQuestion);
                        })
                    })
                    .catch(function(error){
                        reject(error);
                    })
                })
            },
            saveQuestion:function(object , type_answer)
            {
                var self=this;
                return new Promise(function(resolve,reject){
                    var data=[];
                    var id=xmlComponent.getDataformObject(object,"id");
                    var temp;
                            temp=xmlComponent.getDataformObject(object,"value");
                            if(temp!==undefined)
                            data.push({name:"value",value:temp});

                            temp=xmlComponent.getDataformObject(object,"type");
                            if(temp!==undefined)
                            data.push({name:"type",value:temp});

                            temp=xmlComponent.getDataformObject(object,"style");
                            if(temp!==undefined)
                            data.push({name:"style",value:temp});

                            temp=xmlComponent.getDataformObject(object,"feedback_correct");
                            if(temp!==undefined)
                            data.push({name:"feedback_correct",value:temp});

                            temp=xmlComponent.getDataformObject(object,"feedback_incorrect");
                            if(temp!==undefined)
                            data.push({name:"feedback_incorrect",value:temp});

                            temp=xmlComponent.getDataformObject(object,"sum");
                            if(temp!==undefined&&temp!=="undefined")
                            data.push({name:"sum",value:temp});

                            temp=xmlComponent.getDataformObject(object,"important");
                            if(temp!==undefined)
                            data.push({name:"important",value:temp});
                            
                            temp=xmlComponent.getDataformObject(object,"content");
                            if(temp!==undefined)
                            data.push({name:"content",value:temp});
                    if(type_answer!==undefined)
                    {
                        data.push({name:"type_answer",value:type_answer});
                    }
                
                    if(id!==undefined&&id[0]!=='t')
                    {
                        if(!checkIDinArray(id,self.prevQuestion)&&checkIDinArray(id,data_module.question.items)){
                            data.push({name:"id",value:id});

                            var objectSym=propsAsString(data);
                            self.prevQuestion.push(objectSym);
                            if(checkEqualValue(objectSym,data_module.question.items))
                                resolve(objectSym);
                            else
                            data_module.question.updateOne(data).then(function(result){
                                resolve(result);
                            })
                            .catch(function(){
                                reject()
                            })
                        }else
                        {
                            data_module.question.addOne(data).then(function(result){
                                self.prevQuestion.push(result);
                                    document.getElementById(id).id=result.id;
                                resolve(result);
                            })
                            .catch(function(){
                                reject()
                            })
                        }
                        
                    }else
                    {
                        data_module.question.addOne(data).then(function(result){
                            self.prevQuestion.push(result);
                                document.getElementById(id).id=result.id;
                            resolve(result);
                        })
                        .catch(function(){
                            reject()
                        })
                    }
                    
                })
            },
            saveAnswer: function(object,promiseQuestion)
            {
                var self=this;
                return new Promise(function(resolve,reject){
                    promiseQuestion.then(function(resultQuestion){
                        var valueXML="";
                        var id;
                        var data;
                        var promiseAll=[];
                        var k=0;
                        for(var i=0;i<object.childNodes.length;i++){
                            if(object.childNodes[i].tagName==="selection")
                            {
                                data=[];
                                valueXML = absol.XML.stringify(object.childNodes[i]);
                                data.push({name:"content",value:deleteWord(valueXML)});
                                data.push({name:"questionid",value:resultQuestion.id});
                                data.push({name:"number_order",value:k++});
                                id=xmlComponent.getDataformObject(object.childNodes[i],"id");
                                if(id!==undefined&&id[0]!=='t')
                                {
                                    if(!checkIDinArray(id,self.prevAnswer)&&checkIDinArray(id,data_module.question.itemsAnswer[resultQuestion.id])){
                                        data.push({name:"id",value:id});

                                        var objectSym=propsAsString(data);
                                        self.prevAnswer.push(objectSym);
                                        if(checkEqualValue(objectSym,data_module.question.itemsAnswer[resultQuestion.id]))
                                            promiseAll.push(Promise.resolve(objectSym))
                                        else
                                            promiseAll.push(data_module.answer.updateOne(data).then(function(data){
                                            }));    
                                    }else
                                    {
                                        promiseAll.push(data_module.answer.addOne(data).then(function(elementID,data){
                                            document.getElementById(elementID).id=data.id;
                                            self.prevAnswer.push(data);
                                        }.bind(null,id)))
                                    }
                                   
                                }else
                                {
                                    promiseAll.push(data_module.answer.addOne(data).then(function(elementID , data){
                                        document.getElementById(elementID).id=data.id;
                                        self.prevAnswer.push(data);
                                    }.bind(null, id)))
                                }
                            }
                        }
                        
                        Promise.all(promiseAll).then(function(result){
                            resolve(result);
                        })
                        .catch(function(error){
                            reject(error);
                        })
                    })
                })
            },
            deleteOrtherAnswer:function(id){
                var self=this;
                return new Promise(function(resolve,reject){
                    var promiseAll=[];
                    if(data_module.question.itemsAnswer[id]===undefined)
                        data_module.question.itemsAnswer[id]=[];
                    for(var i=0;i< data_module.question.itemsAnswer[id].length;i++){
                        if(!checkIDinArray(data_module.question.itemsAnswer[id][i].id,self.prevAnswer))
                        {
                            promiseAll.push(data_module.answer.removeOne(data_module.question.itemsAnswer[id][i].id));
                        }
                    }
                    Promise.all(promiseAll).then(function(result){
                        data_module.question.itemsAnswer[id]=self.tempAnswer[id];
                        resolve(result);
                    }).catch(function(error){
                        reject(error);
                    })
                })
            },
            deleteOrtherQuestion:function(){
                var self=this;
                return new Promise(function(resolve,reject){
                    var promiseAll=[];
                    for(var i=0;i<data_module.question.items.length;i++){
                        if(!checkIDinArray(data_module.question.items[i].id,self.prevQuestion))
                        {
                            promiseAll.push(data_module.question.removeOne(data_module.question.items[i].id,data_module.question.items[i].formid));
                        }
                    }
                    Promise.all(promiseAll).then(function(result){
                        data_module.question.items=self.prevQuestion;
                        resolve(result);
                    }).catch(function(error){
                        reject(error);
                    })
                })
            },
            deleteOtherForm:function(surveyid){
                var self=this;
                return new Promise(function(resolve,reject){
                    var promiseAll=[];
                    for(var i=0;i<data_module.form.items.length;i++){
                        if(!checkIDinArray(data_module.form.items[i].id,self.prevDocument))
                        {
                            promiseAll.push(data_module.form.removeOne(data_module.form.items[i].id,surveyid));
                        }
                    }
                    Promise.all(promiseAll).then(function(result){
                        data_module.form.items=self.prevDocument;
                        resolve(result);
                    }).catch(function(error){
                        reject(error);
                    })
                })
            },
            updateProgress:function(){

            },
            createScreenShot: function (id) {
                 var self=this;
                return new Promise(function(resolve,reject){
                    
                    var url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://lab.daithangminh.vn/home_co/Form/XMLparse/XMLparseForm_getByUrl.php?id='+id+'&screenshot=true'

                    var xhr = new XMLHttpRequest();
                    var formData = new FormData();
                    xhr.open('GET', url, true);
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                    // Update progress (can be used to show progress indicator)
                    xhr.upload.addEventListener("progress", function (e) {
                        self.updateProgress((e.loaded * 100.0 / e.total) || 100);
                    })

                    xhr.addEventListener('readystatechange', function (e) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            self.updateProgress(100) // <- Add this
                            var data=[
                                {name:"id",value:id},
                                {name:"base64",value:JSON.parse(e.target.responseText).lighthouseResult.audits["final-screenshot"].details.data}    
                            ]
                            data_module.img.addOne(data).then(function(complete){
                                resolve(complete);
                            }).catch(function(error){
                                reject(error);
                            })
                        }
                        else if (xhr.readyState == 4 && xhr.status != 200) {
                            // Error. Inform the user
                            reject();
                        }
                    })
                    xhr.send(formData);
                })
               
            },
        }
        return xmlDbCreate;
    }
    function checkIDinArray(id,arr){
        for(var i=0;i<arr.length;i++){
            if(id==arr[i].id)
            return true;
        }
        return false;
    }
    function deleteWord(string){
        var s=""
        for(var i=0;i<string.length;i++)
        {
            if(string[i]==="<"
            &&string[i+1]==="i"
            &&string[i+2]==="d"
            &&string[i+3]===">")
            for(var j=i+1;j<string.length;j++){
                if(string[j+5]==="<"
                &&string[j+6]==="/"
                &&string[j+7]==="i"
                &&string[j+8]==="d"
                &&string[j+9]===">")
                {
                    i=j+10;
                    break;
                }
            }
            s+=string[i];
        }
        return s;
    }
    function propsAsString(obj) {
        var result={};
        for(var i=0;i<obj.length;i++)
        {
            result[obj[i].name]=obj[i].value;
        }
        return result;
    }
    function checkEqualValue(object,arr){
        for(var i=0;i<arr.length;i++){
            if(object.id==arr[i].id)
            {
                for (var property in arr[i]) {
                    
                    if (object.hasOwnProperty(property)&&arr[i].hasOwnProperty(property)) {
                        if(!(object[property]==arr[i][property]))
                        {
                             return false;
                        }
                    }
                    if(property!=="formid")
                    if ((object.hasOwnProperty(property)&&object[property]!=="")&&!arr[i].hasOwnProperty(property)
                            ||!object.hasOwnProperty(property)&&(arr[i].hasOwnProperty(property)&&arr[i][property]!==""))
                            {
                                console.log(property,)
                                return false;
                            }
                        
                }
                return true;
            }
        }
        return false;
    }
    return XML_DB_CREATE()
})
