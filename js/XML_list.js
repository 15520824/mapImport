; (function (root, UML) {
    if (typeof define === 'function' && define.amd) define([], UML)
    else if (typeof module === 'object' && module.exports) module.exports = UML()
    else root.xmlList = UML()
})(this, function UML() {
    function XMLL() {
        var xmlList = {
            loadSurveyByType:function(type,DOMElement){
                return new Promise(function(resolve,reject){
                    data_module.survey.loadByType(type).then(function(result){
                        var containerList=absol.buildDom({
                            tag:"div",
                            class:"list"
                        })
                        var temp=absol.buildDom({
                            tag:"modal",
                            child:[
                                {
                                    tag:"div",
                                    class:"container",
                                    child:[{
                                tag: "div",
                                class: ["labelTitleClose","quantumWizButtonEl", "quantumWizButtonPapericonbuttonEl", "quantumWizButtonPapericonbuttonLight"],
                                child: [
                                    {
                                        tag: 'i',
                                        class: ['material-icons', 'icon-ceneter'],
                                        props: {
                                            innerHTML: "close"
                                        },
                                    }
                                ],
                                on: {
                                    click: function () {
                                        DOMElement.removeChild(temp);
                                    },
                                }
                            },
                                        {
                                            tag:"div",
                                            class:"nav"
                                        },
                                        containerList
                                    ]
                                }
                            ]
                        })
                        temp.show=true;
                        var element;
                        for(var i=0;i<result.length;i++)
                        {
                            element=absol.buildDom({
                                tag:"div",
                                class:"num",
                                child:[
                                    {
                                        tag:"h3",
                                        props:{
                                            innerHTML:result[i].value,
                                        }
                                    }
                                ],
                                on:{
                                    click:function(temp,id){
                                        return function(){
                                            var parent=containerList.parentNode;
                                            ModalElement.show_loading();
                                            xmlRequest.readXMLFromDB(id,parent).then(function(e){
                                                ModalElement.close(-1);
                                            })
                                        }
                                    }(temp,result[i].id)
                                }
                            })
                            containerList.appendChild(element);
                        }
                        DOMElement.appendChild(temp);
                        
                        resolve(temp);
                    }).catch(function(err){
                        reject(err);
                    })
                })
            }
        }
        return xmlList;
    }
    return XMLL()
})
