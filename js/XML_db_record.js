(function(root, UDBR) {
  if (typeof define === "function" && define.amd) define([], UDBR);
  else if (typeof module === "object" && module.exports)
    module.exports = UDBR();
  else root.xmlDbRecord = UDBR();
})(this, function UDBR() {
  function XML_DB_RECORD() {
    var xmlDbRecord = {
      saveAll: function(arrResult) {
        return new Promise(function(resolve, reject) {
          var data;
          var data1;
          var data2;
          var promiseAll = [];
          data2 = [{ name: "surveyid", value: arrResult.id }];
          data_module.record_test.addOne(data2).then(
            function(result1) {
              for (var i = 0; i < arrResult.length; i++) {
                var result = arrResult[i]._body.getValue();

                for (var j = 0; j < result.length; j++) {
                  data = [];
                  data.push({ name: "record_testid", value: result1.id });
                  data.push({ name: "questionid", value: result[j].question });
                  data_module.record.removeList(data).then(function(final,data2,result1) {
                    data1 = data2;
                    if (final.answer === undefined) {
                      data1.push({ name: "answerid", value: "" });
                      promiseAll.push(data_module.record.addOne(data1));
                    } else {
                      for (var paramid in final.answer) {
                        data1.push({ name: "answerid", value: paramid });
                        data1.push({
                          name: "content",
                          value:
                            "<content>" + final.answer[paramid] + "</content>"
                        });
                        promiseAll.push(data_module.record.addOne(data1));
                      }
                    }
                  }.bind(null,result[j],data));
                  Promise.all(promiseAll)
                    .then(function(result2) {
                      resolve(result2);
                    })
                    .catch(function(error) {
                      reject(error);
                    });
                }
              }
            }
          );
        });
      }
    };
    return xmlDbRecord;
  }
  return XML_DB_RECORD();
});
