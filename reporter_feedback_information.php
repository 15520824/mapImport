<?php
    function write_reporter_feedback_information_script() {
        global $prefix;
?>
<script type="text/javascript">
// formTest.generalInformation.index = 0;
//
//    state 
//    0:state information 
//    1:state Mission

formTest.reporter_feedback_information.Container = function(host) {
    var temp = absol.buildDom({
        tag: "div",
        class: "all-build",
        child: [

        ]
    })
    formTest.reporter_feedback_information.headMask(host, temp);
    return temp;
}

formTest.reporter_feedback_information.headMask = function(host, childContainer) {
    var rowContainer = absol.buildDom({
                    tag: "div",
                    class: "freebirdFormeditorViewHeaderTopRow",
                });
    var temp = absol.buildDom({
                tag: "div",
                class: [
                    "freebirdFormeditorViewHeaderHeaderMast",
                    "freebirdHeaderMastWithOverlay"
                ],
                child: [rowContainer]
            })
    childContainer.appendChild(temp);
    var promiseAll=[];
    promiseAll.push(data_module.record_test.load(true));
    promiseAll.push(data_module.usersList.load());
    promiseAll.push(data_module.usersListHome.load());
    Promise.all(promiseAll).then(function(record_test){
        var survey,userList;
        var result = data_module.survey.getTypeFromItems(data_module.record_test.items);
             var times = absol.buildDom({
                tag: "selectmenu",
                on: {
                    change: function(event, me) {
                        var cloneXmlRequest = {...xmlRequest};
                        host.page = cloneXmlRequest;
                        ModalElement.show_loading();
                        cloneXmlRequest.readXMLFromDB(survey.value, childContainer).then(
                            function(e) {
                                data_module.record.loadByRecordTest([{name:"record_testid",value:me.value}]).then(function(valid){
                                    ModalElement.close(-1);
                                    childContainer.childNodes[1].setAnswer(valid);
                                    childContainer.childNodes[1].classList.add("disabled");
                                    host.prevButton.updateVisiable();
                                    host.nextButton.updateVisiable();
                                })
                            })
                        
                        
                    }
                }
            });

            times.setObject = function(items)
            {
                times.items = items;
                times.value = items[0].value;
                times.updateItem();
                times.emit("change",undefined,times);
            }

            survey = absol.buildDom({
                tag: "selectmenu",
                props: {
                    enableSearch: true
                },
                on: {
                    change: function(event, me) {
                            var finalValueZ=[];
                            if(me.times[me.value].length === 0)
                            finalValueZ = [{text:"Chưa thực hiện lần nào", value: -1}]
                            else
                            {
                                for(var paramid in me.times[me.value])
                                {
                                    finalValueZ.push({
                                        text: paramid,
                                        value: me.times[me.value][paramid],
                                    })
                                }
                            }
                            times.setObject(finalValueZ);
                    }
                }
            });

            survey.setObject = function(items,times)
            {
                survey.items = items;
                survey.value = items[0].value;
                survey.times = times;
                survey.updateItem();
                survey.emit("change",undefined,survey);
            }
            
           
            
            var surveyType = absol.buildDom({
                tag: "selectmenu",
                props: {
                    enableSearch: true,
                    items: data_module.type.items.map(function(u, i) {
                        return {
                            text: u.value,
                            value: u.id
                        };
                    })
                },
                on: {
                    change: function(event, me) {
                            var finalValueY=[];
                            var timesUpdate = [];
                            if(me.objectUpdate[me.value].length === 0)
                            finalValueY = [{text:"Không có mẫu tùy chọn", value: -1}]
                            else
                            {
                                for(var paramid in me.objectUpdate[me.value])
                                {
                                    finalValueY.push({
                                        text: me.objectUpdate[me.value][paramid].value,
                                        value: paramid,
                                    })
                                    timesUpdate[paramid] = me.objectUpdate[me.value][paramid].times;
                                }
                            }   
                            survey.setObject(finalValueY,timesUpdate);
                    }
                }
            });

            surveyType.setObject = function(items,objectUpdate)
            {
                surveyType.items = items;
                surveyType.value = items[0].value;
                surveyType.objectUpdate = objectUpdate;
                surveyType.emit("change",undefined,surveyType);
            }

            
            
            var finalValue=[];
           
            if(result.length === 0)
                finalValue = [{text:"Chưa có người tham gia khảo sát", value: -1}]
                else
                for(var paramid in result)
                {
                    finalValue.push({
                        text: data_module.usersListHome.getID(result[paramid].homeid).fullname,
                        value: paramid
                    })
                }

            userList = absol.buildDom({
                    tag: "selectmenu",
                    props: {
                        enableSearch: true,
                        items: finalValue
                    },
                    on: {
                        change: function(event, me) {
                            var objectUpdate  = [];
                            var finalValueX=[];
                            if(result[me.value].surveyType.length === 0)
                            finalValueX = [{text:"Không có mẫu tùy chọn", value: -1}]
                            else{
                                for(var paramid in result[me.value].surveyType)
                                {
                                    finalValueX.push({
                                        text: result[me.value].surveyType[paramid].value,
                                        value: paramid,
                                    })
                                    objectUpdate[paramid]=result[me.value].surveyType[paramid].survey;
                                }
                            }
                            surveyType.setObject(finalValueX,objectUpdate);
                        }
                    }
            });

            
        
            rowContainer.addChild(absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewTabTitleLabel",
                            props: {
                                innerHTML: "Người tham gia khảo sát "
                            }
                        }));
            rowContainer.addChild(userList);

            rowContainer.addChild(absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewTabTitleLabel",
                            props: {
                                innerHTML: "Loại khảo sát "
                            }
                        }));
            rowContainer.addChild(surveyType);

            rowContainer.addChild(absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewTabTitleLabel",
                            props: {
                                innerHTML: "Tên bài khảo sát "
                            }
                        }));
            rowContainer.addChild(survey);

            rowContainer.addChild(absol.buildDom({
                            tag: "div",
                            class: "freebirdFormeditorViewTabTitleLabel",
                            props: {
                                innerHTML: "Lần khảo sát "
                            }
                        }));
            rowContainer.addChild(times);

            userList.emit("change",undefined,userList);
    })

  
    return temp;
}

formTest.reporter_feedback_information.loadPage = function(container, host) {

    var containerList = formTest.reporter_feedback_information.Container(host);

    host.containerList = containerList;


    var containerRelative = absol.buildDom({
        tag:"div",
        class:"common-container",
        child:[
            containerList
        ]
    });

    container.appendChild(
        DOMElement.div({
            attrs: {
                className: "common",
            },
            children: [
                containerRelative
            ]
        })
    )
}

formTest.reporter_feedback_information.init = function(container, host) {
    this.loadPage(container, host)
}
</script>

<?php
}
?>