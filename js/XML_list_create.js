; (function (root, UMLC) {
    if (typeof define === 'function' && define.amd) define([], UMLC)
    else if (typeof module === 'object' && module.exports) module.exports = UMLC()
    else root.xmlListCreate = UMLC()
})(this, function UMLC() {
    function XMLLC() {
        var xmlListCreate = {
            loadSurveyByType:function(type,DOMElement){
                return new Promise(function(resolve,reject){
                    var promiseAll=[];
                    promiseAll.push(data_module.survey.loadByType(type));
                    promiseAll.push(data_module.type.load());
                    
                    Promise.all(promiseAll).then(function(result){
                        result=result[0];
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
                                    child:[
                                        {
                                            tag:"div",
                                            class:"nav",
                                            child:[{
                                                tag:"a",
                                                child:[
                                                    {
                                                        tag:"i",
                                                        class:["fab", "fa-codepen","material-icons"],
                                                        props:{
                                                            innerHTML:"fiber_new"
                                                        }
                                                    }
                                                ],
                                                on:{
                                                    click:function(){
                                                            temp.parentNode.removeChild(temp);
                                                            ModalElement.show_loading();
                                                            xmlRequestCreate.readXMLFromDB(undefined,DOMElement).then(function(e){
                                                                ModalElement.close(-1);
                                                            })
                                                    }
                                                }
                                            }]
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
                                             var containerList=absol.buildDom( {
                                                        tag:"div",
                                                        class:"containerPageView",
                                                        child:[{
                                                    tag: "div",
                                                    class: ["labelTitleClose","quantumWizButtonEl", "quantumWizButtonPapericonbuttonLight"],
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
                                                            document.body.removeChild(temp);
                                                        },
                                                    }
                                                }]
                                            })

                                            var temp=absol.buildDom({
                                                tag:"modal",
                                                child:[
                                                    containerList
                                                ]
                                            })
                                            document.body.appendChild(temp);
                                            ModalElement.show_loading();
                                            xmlRequestCreate.readXMLFromDB(id,containerList).then(function(e){
                                                 ModalElement.close(-1);
                                            })
                                            temp.show=true;
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
        return xmlListCreate;
    }
    return XMLLC()
})
