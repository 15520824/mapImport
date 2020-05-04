<?php
    function write_reporter_record_information_script() {
        global $prefix;
?>
<script type="text/javascript">
// formTest.generalInformation.index = 0;
//
//    state 
//    0:state information 
//    1:state Mission

formTest.reporter_record_information.Container = function(host) {
    var temp = absol.buildDom({
            tag:"div",
            class:"all-build",
            child:[
                
            ]
    })
    formTest.reporter_record_information.headMask(host,temp);
    return temp;
}

formTest.reporter_record_information.headMask = function(host,childContainer){
    data_module.survey.getListDataFormType(data_module.type.items[0].id).then(function(result){
        var survey = absol.buildDom({
            tag: "selectmenu",
            props: {
                enableSearch: true,
                items: result.map(function(u, i) {
                return {
                    text: u.value,
                    value: u.id
                };
                })
            },
            on:{
                change: function(event, me){
                    console.log(me.value)
                    var cloneXmlRequest = {...xmlRequest};
                    ModalElement.show_loading()
                    cloneXmlRequest.readXMLFromDB(me.value,childContainer).then(function(e){
                        ModalElement.close(-1);
                    })
                }
            }
        });
    var cloneXmlRequest = {...xmlRequest};
    ModalElement.show_loading();
    cloneXmlRequest.readXMLFromDB(survey.value,childContainer).then(function(e){
        ModalElement.close(-1);
    })
    
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
          on:{
              change: function(event, me)
              {
                data_module.survey.getListDataFormType(me.value).then(function(result){
                    var temp1  = absol.buildDom({
                        tag: "selectmenu",
                        props: {
                            enableSearch: true,
                            items: result.map(function(u, i) {
                            return {
                                text: u.value,
                                value: u.id
                            };
                            })
                        },
                        on:{
                            change: function(event, me){
                                console.log(me.value)
                                var cloneXmlRequest = {...xmlRequest};
                                ModalElement.show_loading();
                                cloneXmlRequest.readXMLFromDB(me.value,childContainer).then(function(e){
                                    ModalElement.close(-1);
                                })
                            }
                        }
                    });
                    survey.parentNode.replaceChild(temp1,survey);
                    survey = temp1;
                    var cloneXmlRequest = {...xmlRequest};
                    ModalElement.show_loading();
                    cloneXmlRequest.readXMLFromDB(survey.value,childContainer).then(function(e){
                        ModalElement.close(-1);
                    })
                })
              }
          }
    });
    
        var temp = absol.buildDom({
                    tag: "div",
                    class: [
                        "freebirdFormeditorViewHeaderHeaderMast",
                        "freebirdHeaderMastWithOverlay"
                    ],
                    child: [
                        {
                        tag: "div",
                        class: "freebirdFormeditorViewHeaderTopRow",
                        child: [
                            {
                                tag: "div",
                                class: "freebirdFormeditorViewTabTitleLabel",
                                props: {
                                    innerHTML: "Loại khảo sát :"
                                }
                            },
                            surveyType,
                            {
                                tag: "div",
                                class: "freebirdFormeditorViewTabTitleLabel",
                                props: {
                                    innerHTML: "Tên bài khảo sát :"
                                }
                            },
                            survey,
                        ]
                        }
                    ]
        })
        childContainer.appendChild(temp);
    });
}

formTest.reporter_record_information.loadPage = function(container, host) {

    var containerList = formTest.reporter_record_information.Container(host);

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

formTest.reporter_record_information.init = function(container, host) {
    this.loadPage(container, host)
}

</script>

<?php
}
?>