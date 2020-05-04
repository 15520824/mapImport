<?php
    function write_reporter_surveys_information_script() {
        global $prefix;
?>
<script type="text/javascript">
// formTest.generalInformation.index = 0;
//
//    state 
//    0:state information 
//    1:state Mission

formTest.reporter_surveys_information.tableCreate = function(host) {
    var x = DOMElement.table({
        attrs: {
            style: {
                width: "100%"
            },
            className:"nth"
        },
        header: [{
                attrs: {
                    style: {
                        width: "80px"
                    }
                },
                text: "STT"
            },
            {
                attrs: {},
                text: 'Tên'
            },
            {
                attrs: {},
                text: 'Loại'
            },
            {
                attrs: {
                    style: {
                        width: "40px"
                    }
                }
            }
        ],
        data: blackTheme.reporter_surveys.generateTableDatasurvey(host),
        searchbox: true
    });
    host.tableCenter = x;
    if(formTest.reporter_surveys_information.hosts===undefined)
    formTest.reporter_surveys_information.hosts=[];
    formTest.reporter_surveys_information.hosts.push(host);
    return DOMElement.div({
        attrs: {
            className: "KPIsimpletableclass row2colors KPItablehover",
            style: {
                width: "100%"
            }
        },
        children: [x]
    })
}
formTest.reporter_surveys_information.redrawTable = function() {
    var x;
    for(var i=0;i<formTest.reporter_surveys_information.hosts.length;i++){
        x = DOMElement.table({
        attrs: {
            style: {
                width: "100%"
            },
            className:"nth"
        },
        header: [{
                attrs: {
                    style: {
                        width: "80px"
                    }
                },
                text: "STT"
            },
            {
                attrs: {},
                text: 'Tên'
            },
            {
                attrs: {},
                text: 'Loại'
            },
            {
                attrs: {
                    style: {
                        width: "40px"
                    }
                }
            }
        ],
        data: blackTheme.reporter_surveys.generateTableDatasurvey(formTest.reporter_surveys_information.hosts[i]),
        searchbox: true
    });
    var parentNode = formTest.reporter_surveys_information.hosts[i].tableCenter.parentNode
    DOMElement.removeAllChildren(parentNode);
    parentNode.appendChild(x)
    formTest.reporter_surveys_information.hosts[i].tableCenter = x;
    //to do update size
    }
}

formTest.reporter_surveys_information.Container = function(host) {
    return DOMElement.div({
        attrs: {
            className: "all-build"
        },
        children: [
            formTest.reporter_surveys_information.tableCreate(host)
        ]
    })
}

formTest.reporter_surveys_information.loadPage = function(container, host) {

    var containerList = formTest.reporter_surveys_information.Container(host);

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

formTest.reporter_surveys_information.init = function(container, host) {
    this.loadPage(container, host)
}
</script>

<?php
}
?>