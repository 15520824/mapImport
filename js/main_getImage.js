
function main(document){
    // xmlList.loadSurveyByType(0,document.body)
    var url_string = window.location.href;
    var url = new URL(url_string);
    // var c = url.searchParams.get("api_key");
    // if(c!=="auKB8o83G7EONRE8rmqgPGfv_jaG3XitkwiKg-Ihxbi0i9loWMjnbjVFBV_NGFLp95-UPGqan5iTeMmllazVCaIRgdVlSBIS3ruR8W6JAF814JNftAu1IqQYWdK0aZdACVowdKac5iGe7_to3n6pewDkQ4ibZ8xXQv7D-zZblrk")
    //     return;
    var d = url.searchParams.get("id");
    var cloneXmlRequest = {...xmlRequest};
    cloneXmlRequest.readXMLFromDBGetImage(d,document.body).then(function(e){
        console.log(e)
    })
    // xmlRequest.goAsyn(["XMLfile/template.xml","XMLfile/template1.xml","XMLfile/template2.xml"],document.body).then(function(e){
    //     console.log(e)
    // })
}