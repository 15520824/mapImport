; (function (root, UDBL) {
    if (typeof define === 'function' && define.amd) define([], UDBL)
    else if (typeof module === 'object' && module.exports) module.exports = UDBL()
    else root.xmlDbLoad = UDBL()
})(this, function UDBL() {
    function XML_DB_LOAD() {
        var xmlDbLoad = {
            goAsynLoad: function (id) {
            },
            resetCached: function () {
                var self = this;
                self.dbname = undefined;
                self.prefix = undefined;
            },
            getPrefix: function (id) {
                var self = this;
                if (Array.isArray(id)) {
                    for (var i = 0; i < id.length; i++) {
                        if (id[i].name == "dbname")
                            self.dbname = id[i].value;
                        if (id[i].name == "prefix")
                            self.prefix = id[i].value;
                    }
                }
            },
            setPrefix: function (id) {
                var self = this;
                var isPush = false;
                var final = [
                    { name: "id", value: id }
                ]
                if (self.dbname !== undefined){
                    final.push({ name: "dbname", value: self.dbname });
                    isPush=true;
                }
                    
                if (self.prefix !== undefined){
                    final.push({ name: "prefix", value: self.prefix });
                    isPush=true;
                }
                if(isPush===false)
                    final = id;
                return final;
            },
            loadSurvey: function (id, overwriteData = true, canGetID = true) {
                var self = this;
                self.overwriteData = overwriteData;
                self.canGetID = canGetID;
                self.getPrefix(id);
                if (id !== undefined) {
                    if (self.overwriteData) {
                        data_module.form.items = [];
                        data_module.question.items = [];
                    }
                    return new Promise(function (resolve, reject) {
                        var promiseAll = [];
                        data_module.link_survey_form.loadBySurvey(id).then(function (result) {
                            promiseAll.push(data_module.survey.loadById(id));
                            for (var i = 0; i < result.length; i++) {
                                promiseAll.push(self.loadForm(result[i].formid));
                            }
                            Promise.all(promiseAll).then(function (resultAll) {
                                var xmlResult = "<survey>";
                                if (self.canGetID)
                                    xmlResult += "<id>" + resultAll[0][0].id + "</id>";
                                xmlResult += "<value>" + resultAll[0][0].value + "</value>";
                                for (var i = 1; i < resultAll.length; i++) {
                                    xmlResult += resultAll[i];
                                }
                                xmlResult += "</survey>";
                                self.resetCached();
                                resolve(xmlResult);
                            }).catch(function (error) {
                                reject(error);
                            })
                        })
                    })
                } else {
                    if (self.overwriteData) {
                        data_module.form.items = [];
                        data_module.question.items = [];
                    }
                    return new Promise(function (resolve, reject) {
                        var xmlResult = "<survey><value>Mẫu chưa có tiêu đề</value><document><title><type>text</type><style></style><value>Mục không có tiêu đề</value><description><content><type>text</type><style></style><value></value></content></description></title><body></body></document></survey>"
                        self.resetCached();
                        resolve(xmlResult);
                    })
                }
            },
            loadSurveyGetImage: function (id) {
                if (id !== undefined) {
                    var self = this;
                    if (self.overwriteData) {
                        data_module.form.items = [];
                        data_module.question.items = [];
                    }
                    id = self.setPrefix(id);
                    return new Promise(function (resolve, reject) {
                        var promiseAll = [];
                        data_module.link_survey_form.loadBySurvey(id).then(function (result) {
                            promiseAll.push(data_module.survey.loadById(id));
                            for (var i = 0; i < 1; i++) {
                                promiseAll.push(self.loadForm(result[i].formid));
                            }
                            Promise.all(promiseAll).then(function (resultAll) {
                                var xmlResult = "<survey>";
                                if (self.canGetID)
                                    xmlResult += "<id>" + resultAll[0][0].id + "</id>";
                                xmlResult += "<value>" + resultAll[0][0].value + "</value>";
                                for (var i = 1; i < resultAll.length; i++) {
                                    xmlResult += resultAll[i];
                                }
                                if (result.length > 1)
                                    xmlResult += "<continue>" + result.length + "</continue>";
                                xmlResult += "</survey>";
                                resolve(xmlResult);
                            }).catch(function (error) {
                                reject(error);
                            })
                        })
                    })
                } else {
                    if (self.overwriteData) {
                        data_module.form.items = [];
                        data_module.question.items = [];
                    }
                    return new Promise(function (resolve, reject) {
                        var xmlResult = "<survey><value>Mẫu chưa có tiêu đề</value><document><title><type>text</type><style></style><value>Mục không có tiêu đề</value><description><content><type>text</type><style></style><value></value></content></description></title><body></body></document></survey>"
                        resolve(xmlResult);
                    })
                }
            },
            loadForm: function (id) {
                var self = this;
                id = self.setPrefix(id);
                return new Promise(function (resolve, reject) {
                    var promiseAll = [];
                    data_module.link_form_question.loadByForm(id).then(function (result) {
                        promiseAll.push(data_module.form.loadById(id));
                        for (var i = 0; i < result.length; i++) {
                            promiseAll.push(self.loadQuestion(result[i].questionid, id));
                        }
                        Promise.all(promiseAll).then(function (resultAll) {
                            var xmlResult = "<document>";
                            xmlResult += "<title>";
                            if (self.canGetID)
                                xmlResult += "<id>" + resultAll[0][0].id + "</id>";
                            xmlResult += "<value>" + resultAll[0][0].value + "</value>";
                            xmlResult += "<style>" + resultAll[0][0].style + "</style>";
                            xmlResult += "<type>" + resultAll[0][0].type + "</type>";
                            xmlResult += resultAll[0][0].description;
                            xmlResult += "</title>";
                            xmlResult += "<body>";
                            for (var i = 1; i < resultAll.length; i++) {
                                xmlResult += resultAll[i];
                            }
                            xmlResult += "</body>";
                            xmlResult += "</document>";
                            resolve(xmlResult);
                        }).catch(function (error) {
                            reject(error);
                        })
                    })
                })
            },
            loadQuestion: function (id, formid) {
                var self = this;
                id = self.setPrefix(id);
                return new Promise(function (resolve, reject) {
                    var promiseAll = [];
                    promiseAll.push(data_module.question.load(id, formid));
                    if (data_module.question.itemsAnswer === undefined)
                        data_module.question.itemsAnswer = [];
                    promiseAll.push(self.loadAnswer(id));
                    Promise.all(promiseAll).then(function (result) {
                        var textResult = "<test>";
                        textResult += "<question>";
                        if (self.canGetID)
                            textResult += "<id>" + result[0][0].id + "</id>";
                        textResult += "<type>" + result[0][0].type + "</type>";
                        textResult += "<style>" + result[0][0].style + "</style>";
                        textResult += "<value>" + result[0][0].value + "</value>";
                        textResult += "<important>" + result[0][0].important + "</important>";
                        textResult += "<sum>" + result[0][0].sum + "</sum>"
                        textResult += result[0][0].content
                        textResult += "<feedback_correct>" + result[0][0].feedback_correct + "</feedback_correct>"
                        textResult += "<feedback_incorrect>" + result[0][0].feedback_incorrect + "</feedback_incorrect>";
                        textResult += "</question>";
                        textResult += "<answer><type>" + result[0][0].type_answer + "</type>" + result[1] + "</answer>";
                        textResult += "</test>";
                        resolve(textResult);
                    }).catch(function (error) {
                        reject(error);
                    })
                })
            },
            loadAnswer: function (id) {
                var self = this;
                // id = self.setPrefix(id);
                return new Promise(function (resolve, reject) {
                    data_module.answer.loadByQuestion(id).then(function (result) {
                        var textResult = "";
                        if (self.overwriteData)
                            data_module.question.itemsAnswer[id] = result;
                        for (var i = 0; i < result.length; i++) {
                            if (self.canGetID)
                                textResult += result[i].content.replace("</selection>", "<id>" + result[i].id + "</id></selection>");
                            else
                                textResult += result[i].content;
                        }
                        resolve(textResult);
                    }).catch(function (error) {
                        reject(error);
                    })
                })
            },
            loadRecord: function (record_testid, questionid) {
                return new Promise(function (resolve, reject) {
                    var data = [
                        { name: "record_testid", value: record_testid },
                        { name: "questionid", value: questionid }
                    ]
                    data_module.record.loadByRecordTestId(data).then(function (result) {
                        resolve(result);
                    }).catch(function (error) {
                        reject(error);
                    })
                })
            },
            loadRecordTest: function (userid, times) {
                return new Promise(function (resolve, reject) {
                    var data = [
                        { name: "userid", value: userid },
                        { name: "times", value: times }
                    ]
                    data_module.record_test.loadByUserId(data).then(function (result) {
                        resolve(result);
                    }).catch(function (error) {
                        reject(error);
                    })
                })
            }
        }
        return xmlDbLoad;
    }
    return XML_DB_LOAD()
})
