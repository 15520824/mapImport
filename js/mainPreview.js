
function main(document){
    var interval = setInterval(function(){
        var timeout = setTimeout(() => {
            clearInterval(interval);
            alert("Data bị lỗi xin vui lòng thử lại");
        }, 3000);
        if(window.xmlData!==undefined)
        {
            clearInterval(interval);
            xmlRequest.pageView(window.xmlData,document.body);
            clearTimeout(timeout);
        }
    }, 200);
    
}