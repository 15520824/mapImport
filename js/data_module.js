var data_module = {
  debugMode: true,
  survey: {},
  form: {},
  question: {},
  answer: {},
  link_form_question: {},
  link_survey_form: {},
  record: {},
  record_test: {},
  record_test: {},
  img: {},
  type: {},
  usersList:{},
  usersListHome:{},
  countriesList:{},
  register:{},
  company:{},
  services:{}
};

////////////////////survey//////////////////////
data_module.survey.load = function(isLoadAgain = false) {
  if (data_module.survey.items !== undefined && isLoadAgain == false) return;
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/load/load_survey_all.php",
      params: [],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.survey.items = st;
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.survey.getListDataFormType = async function(type) {
  var promise = new Promise(function(resolve, reject) {
    if (data_module.survey.items !== undefined) resolve();
    else
      data_module.survey.load().then(function(result) {
        resolve(result);
      });
  });
  var result = await promise;
  var valid = [];
  for (var i = 0; i < data_module.survey.items.length; i++) {
    if (data_module.survey.items[i].type === type)
      valid.push(data_module.survey.items[i]);
  }
  return valid;
};

data_module.survey.loadByType = function(type) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(type))
      type = [
        {
          name: "id",
          value: type
        }
      ];
    
    FormClass.api_call({
      url: "./php/load/load_survey_by_type.php",
      params: type,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.survey.loadById = function(id) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(id))
      id = [
        {
          name: "id",
          value: id
        }
      ];
    
    FormClass.api_call({
      url: "./php/load/load_survey.php",
      params: id,
      func: (success, message) => {
        
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.survey.getTypeFromItems = function(arr){
  var valid = [];
  var checkUser = [];
  var user;
  var type;
  var survey;
  for(var i=0;i<arr.length;i++){
    survey = data_module.survey.getByID(arr[i].surveyid);
    type = survey.type;
    user = arr[i].userid;
    if(checkUser[user]===undefined)
    {
      valid[user] = { ...data_module.usersList.getID(user) };
      valid[user].surveyType = [];
      checkUser[user] = 1;
    }
    if(valid[user].surveyType[type]===undefined)
    {
      valid[user].surveyType[type] =  { ...data_module.type.getById(type) };
    }

    if(valid[user].surveyType[type].survey === undefined)
    valid[user].surveyType[type].survey = [];
    valid[user].surveyType[type].survey[survey.id] = survey;

    if(valid[user].surveyType[type].survey[survey.id].times === undefined)
    valid[user].surveyType[type].survey[survey.id].times = [];
    valid[user].surveyType[type].survey[survey.id].times[arr[i].times] = arr[i].id

  }
  return valid;
}

data_module.survey.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_suvey.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.survey.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.survey.updateAdd = function(object) {
  data_module.survey.items.push(object);
  formTest.reporter_surveys_information.redrawTable();
};

data_module.survey.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    FormClass.api_call({
      url: "./php/remove/delete_survey.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.survey.updateRemove(id);
            resolve();
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.survey.updateRemove = function(id) {
  for (var i = 0; i < data_module.survey.items.length; i++) {
    if (id == data_module.survey.items[i].id) {
      data_module.survey.items.splice(i, 1);
      formTest.reporter_surveys_information.redrawTable();
    }
  }
};

data_module.survey.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_suvey.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            var st = EncodingClass.string.toVariable(message);
            data_module.survey.updateEdit(st);
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.survey.updateEdit = function(data) {
  for (var i = 0; i < data_module.survey.items.length; i++) {
    if (data.id == data_module.survey.items[i].id) {
      data_module.survey.items[i] = data;
      formTest.reporter_surveys_information.redrawTable();
    }
  }
};

data_module.survey.getByID = function(id) {
  for (var i = 0; i < data_module.survey.items.length; i++) {
    if (id == data_module.survey.items[i].id)
      return data_module.survey.items[i];
  }
  return;
};

////////////////////form//////////////////////

data_module.form.load = function(id, loadAgain = false) {
  if (data_module.form.items && !loadAgain) return Promise.resolve();
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "../php/insert/load_survey.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.form.items = st;
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.form.loadById = function(id) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(id))
    id = [
      {
        name: "id",
        value: id
      }
    ];
    FormClass.api_call({
      url: "./php/load/load_form.php",
      params: id,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            if (xmlDbLoad.overwriteData) {
              if (data_module.form.items == undefined)
                data_module.form.items = [];
              if (st != undefined) data_module.form.items.push(st[0]);
            }
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.form.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_form.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.form.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.form.updateAdd = function(object) {
  if (object["changeImg"] !== undefined && Array.isArray(object["changeImg"])) {
    var arrSrc = document.getElementsByTagName("img");
    for (var i = 0; i < object["changeImg"].length; i++) {
      for (var j = 0; j < arrSrc.length; j++) {
        console.log(arrSrc[j].getAttribute("src"));
        if (arrSrc[j].getAttribute("src") !== null)
          if (
            arrSrc[j].getAttribute("src").indexOf(object["changeImg"][i][0]) !==
            -1
          )
            arrSrc[j].src = object["changeImg"][i][1];
      }
    }
  }
};

data_module.form.removeOne = function(id, surveyid) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_form.php",
      params: [
        {
          name: "id",
          value: id
        },
        {
          name: "surveyid",
          value: surveyid
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.form.updateRemove(id);
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.form.updateOne = function(data) {
  console.log(data);
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_form.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            var st = EncodingClass.string.toVariable(message);
            data_module.form.updateEdit(st);
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.form.updateEdit = function(object) {};
data_module.form.updateRemove = function(id) {};
////////////////////question//////////////////////

data_module.question.load = function(id, formid) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(id))
    id = [
      {
        name: "id",
        value: id
      }
    ];
    FormClass.api_call({
      url: "./php/load/load_question.php",
      params: id,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            if (xmlDbLoad.overwriteData) {
              if (data_module.question.items == undefined)
                data_module.question.items = [];
              st[0].formid = formid;
              data_module.question.items = data_module.question.items.concat(
                st
              );
            }
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.question.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_question.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.question.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          console.log(message);
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.question.updateAdd = function(object) {
  if (object["changeImg"] !== undefined && Array.isArray(object["changeImg"])) {
    var arrSrc = document.getElementsByTagName("img");
    for (var i = 0; i < object["changeImg"].length; i++) {
      for (var j = 0; j < arrSrc.length; j++) {
        console.log(arrSrc[j].getAttribute("src"));
        if (arrSrc[j].getAttribute("src") !== null)
          if (
            arrSrc[j].getAttribute("src").indexOf(object["changeImg"][i][0]) !==
            -1
          )
            arrSrc[j].src = object["changeImg"][i][1];
      }
    }
  }
};

data_module.question.removeOne = function(id, formid) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_question.php",
      params: [
        {
          name: "id",
          value: id
        },
        {
          name: "formid",
          value: formid
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.question.updateRemove(id);
            resolve();
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.question.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_question.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            var st = EncodingClass.string.toVariable(message);
            data_module.question.updateEdit(st);
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.question.updateEdit = function(object) {};
data_module.question.updateRemove = function(id) {};
////////////////////answer//////////////////////

data_module.answer.load = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/load_survey.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.answer.items.concat(st);
            console.log(st, "douma");
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.answer.loadByQuestion = function(id) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(id))
    id = [
      {
        name: "id",
        value: id
      }
    ];
    FormClass.api_call({
      url: "./php/load/load_answer_by_question.php",
      params: id,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            console.log(st)
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.answer.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_answer.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.answer.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.answer.updateAdd = function(object) {
  if (object["changeImg"] !== undefined && Array.isArray(object["changeImg"])) {
    var arrSrc = document.getElementsByTagName("img");
    for (var i = 0; i < object["changeImg"].length; i++) {
      for (var j = 0; j < arrSrc.length; j++) {
        console.log(arrSrc[j].getAttribute("src"));
        if (arrSrc[j].getAttribute("src") !== null)
          if (
            arrSrc[j].getAttribute("src").indexOf(object["changeImg"][i][0]) !==
            -1
          )
            arrSrc[j].src = object["changeImg"][i][1];
      }
    }
  }
};

data_module.answer.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_answer.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.answer.updateRemove(id);
            resolve();
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.answer.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_answer.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            var st = EncodingClass.string.toVariable(message);
            data_module.answer.updateEdit(st);
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.answer.updateEdit = function(object) {};

data_module.answer.updateRemove = function(id) {};

////////////////////link_form_question//////////////////////

data_module.link_form_question.load = function(id, loadAgain = false) {
  if (data_module.link_form_question.items && !loadAgain)
    return Promise.resolve();
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "../php/insert/load_survey.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.link_form_question.items = st;
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_form_question.loadByForm = function(id) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(id))
    id = [
      {
        name: "id",
        value: id
      }
    ];
    FormClass.api_call({
      url: "./php/load/load_link_form_question_by_form.php",
      params: id,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_form_question.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_link_form_question.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.link_form_question.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_form_question.updateAdd = function(object) {};

data_module.link_form_question.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "delete_user.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.link_form_question.updateRemove(id);
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_form_question.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_link_form_question.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            var st = EncodingClass.string.toVariable(message);
            data_module.link_survey_form.updateEdit(st);
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

////////////////////link_survey_form//////////////////////

data_module.link_survey_form.load = function(id, loadAgain = false) {
  if (data_module.link_survey_form.items && !loadAgain)
    return Promise.resolve();
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "../php/insert/load_survey.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.link_survey_form.items = st;
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_survey_form.loadBySurvey = function(id) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(id))
      id = [
        {
          name: "id",
          value: id
        }
      ];
    FormClass.api_call({
      url: "./php/load/load_link_survey_form_by_survey.php",
      params: id,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_survey_form.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_link_survey_form.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.link_survey_form.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_survey_form.updateAdd = function(object) {};

data_module.link_survey_form.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "delete_user.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.link_survey_form.updateRemove(id);
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.link_survey_form.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_link_form_question.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            var st = EncodingClass.string.toVariable(message);
            data_module.link_survey_form.updateEdit(st);
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

////////////////////record//////////////////////

data_module.record.load = function(id, loadAgain = false) {
  if (data_module.record.items && !loadAgain) return Promise.resolve();
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "../php/load/load_record.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.record.items = st;
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.loadByQuestionId = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/load/load_record_by_questionid.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.loadByRecordTest = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/load/load_record_by_record_testid.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.addOne = function(data) {
  console.log(data);
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_record.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.record.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            console.error(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.updateAdd = function() {};

data_module.record.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_record_test.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.record.updateRemove(id);
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.removeList = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_record_test_all.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.record.updateRemove(
              EncodingClass.string.toVariable(message)
            );
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.updateRemove = function(st) {};

data_module.record.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_record.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            var st = EncodingClass.string.toVariable(message);
            data_module.record.updateEdit(st);
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record.updateEdit = function(object) {};

//////////////////////////record_test////////////////////////////

data_module.record_test.load = function(loadAgain = false) {
  if (data_module.record_test.items && !loadAgain) return Promise.resolve();
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/load/load_recordtest.php",
      params: [],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.record_test.items = st;
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record_test.loadByUserId = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/load/load_recordtest_by_userid.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record_test.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_record_test.php",
      params: data,
      func: (success, message) => {
      
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.record_test.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            console.error(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record_test.updateAdd = function() {};

data_module.record_test.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_record_test.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.record_test.updateRemove(id);
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record_test.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_record_test.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            var st = EncodingClass.string.toVariable(message);
            data_module.record_test.updateEdit(st);
            resolve(st);
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.record_test.updateEdit = function(object) {};

//////////////////////////////image/////////////////////////

data_module.img.delete = function(name) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_img.php",
      params: [
        {
          name: "name",
          value: name
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            data_module.img.updateRemove(
              EncodingClass.string.toVariable(message)
            );
            resolve();
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.img.updateRemove = function(id) {};

data_module.img.deleteAllTrash = function() {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_img_all_trash.php",
      params: [
        {
          name: "name",
          value: name
        }
      ],
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            resolve();
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.img.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/upload/handle_file_upload_final_base64.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            console.log(EncodingClass.string.toVariable(message));
            resolve();
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

////////////////////type//////////////////////
data_module.type.load = function(data=[]) {
  return new Promise(function(resolve, reject) {
    FormClass.api_call({
      url: "./php/load/load_type_all.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            data_module.type.items = st;
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.type.loadLibary = function(data=[]) {
  return new Promise(function(resolve, reject) {
    FormClass.api_call({
      url: "./php/load/load_type_all_libary.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            var st = EncodingClass.string.toVariable(message.substr(2));
            resolve(st);
          } else {
            console.log(message);
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.type.getById = function(id) {
  for (var i = 0; i < data_module.type.items.length; i++) {
    if (id == data_module.type.items[i].id) return data_module.type.items[i];
  }
  return;
};
data_module.type.updateOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/update/update_type.php",
      params: data,
      func: (success, message) => {
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.type.updateEdit(
              EncodingClass.string.toVariable(message)
            );
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};
data_module.type.updateEdit = function(object) {
  for (var i = 0; i < data_module.type.items.length; i++) {
    if (object.id == data_module.type.items[i].id) {
      data_module.type.items[i] = object;
      formTest.reporter_type_surveys_information.redrawTable();
      formTest.reporter_surveys_information.redrawTable();
      return;
    }
  }
};

data_module.type.removeOne = function(id) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/remove/delete_type.php",
      params: [
        {
          name: "id",
          value: id
        }
      ],
      func: (success, message) => {
        
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.survey.load().then(function() {
              data_module.type.updateRemove(id);
            });
            resolve();
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.type.updateRemove = function(id) {
  for (var i = 0; i < data_module.survey.items.length; i++) {
    if (data_module.survey.items[i].type === id) {
      data_module.survey.removeOne(data_module.survey.items[i].id);
      data_module.survey.items.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < data_module.type.items.length; i++) {
    if (data_module.type.items[i].id === id) {
      data_module.type.items.splice(i, 1);
      formTest.reporter_type_surveys_information.redrawTable();
      formTest.reporter_surveys_information.redrawTable();
      return;
    }
  }
};

data_module.type.addOne = function(data) {
  return new Promise(function(resolve, reject) {
    
    FormClass.api_call({
      url: "./php/insert/insert_new_type.php",
      params: data,
      func: (success, message) => {
        
        if (success) {
          if (message.substr(0, 2) == "ok") {
            message = message.substr(2);
            data_module.type.updateAdd(
              EncodingClass.string.toVariable(message)
            );
            resolve(EncodingClass.string.toVariable(message));
          } else {
            ModalElement.alert({
              message: message
            });
            reject();
            return;
          }
        } else {
          ModalElement.alert({
            message: message
          });
          reject();
          return;
        }
      }
    });
  });
};

data_module.type.updateAdd = function(object) {
  data_module.type.items.push(object);
  formTest.reporter_type_surveys_information.redrawTable();
};


////////////////user List//////////////////
data_module.usersList.load = function(loadAgain = false) {
    if (data_module.usersList.items && !loadAgain)
        return Promise.resolve();
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/load_users.php",
            params: [],
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        console.log(EncodingClass.string.toVariable(message));
                        data_module.usersList.items = EncodingClass.string.toVariable(
                            message);
                        resolve(data_module.usersList.items);
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })

}

data_module.usersList.getID = function(id,checkAgain=false)
{
    if ((data_module.usersList.checkID === undefined&&!checkAgain)||(data_module.usersList.checkID !== undefined&&checkAgain)) {
        data_module.usersList.checkID = [];
        for (var i = 0; i < data_module.usersList.items.length; i++) {
            data_module.usersList.checkID[data_module.usersList.items[i].id]=i
        }
    }
    return data_module.usersList.items[data_module.usersList.checkID[id]];
}

data_module.usersList.addOne = function(data) {
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/insert_new_user.php",
            params: data,
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        data_module.usersList.updateAdd(EncodingClass.string.toVariable(
                            message));
                        resolve(EncodingClass.string.toVariable(message));
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })
}

data_module.usersList.updateAdd =function(data){
    data_module.usersList.items.push(data);
    data_module.usersListHome.checkID[data.id]=data_module.usersList.items.length-1;
    //data_module.usersList.getDataID(-1,true)
}

data_module.usersList.removeOne = function(id) {
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/delete_user.php",
            params: [{
                name: "id",
                value: id
            }, ],
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        console.log(EncodingClass.string.toVariable(message));
                        data_module.usersList.updateRemove(id);
                        resolve();
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })

    })
}

data_module.usersList.updateRemove = function(id){
    data_module.usersList.getID(id);
    data_module.usersList.items.splice(data_module.usersList.checkID[id], 1);
    data_module.usersList.getID(-1,true);
}

data_module.usersList.updateOne = function(data) {
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/update_user.php",
            params: data,
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        console.log(EncodingClass.string.toVariable(message));
                        data_module.usersList.updateEdit(EncodingClass.string.toVariable(
                            message));
                        resolve();
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })
}

data_module.usersList.updateEdit = function(data)
{
    var temp=Object.assign(data_module.usersList.getID(data.id),data);
    data_module.usersList.items[data_module.usersList.checkID[data.id]]=temp;
}

data_module.usersListHome.load = function(loadAgain = false) {
    if (data_module.usersListHome.items && !loadAgain)
        return Promise.resolve();
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/load_users_home.php",
            params: [],
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        console.log(EncodingClass.string.toVariable(message));
                        data_module.usersListHome.items = EncodingClass.string.toVariable(message);
                        resolve();
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })

}

data_module.usersListHome.getID = function(id,checkAgain=false)
{
    if ((data_module.usersListHome.checkID === undefined&&!checkAgain)||(data_module.usersListHome.checkID !== undefined&&checkAgain)) {
        data_module.usersListHome.checkID = [];
        for (var i = 0; i < data_module.usersListHome.items.length; i++) {
            data_module.usersListHome.checkID[data_module.usersListHome.items[i].id]=i
        }
    }
    return data_module.usersListHome.items[data_module.usersListHome.checkID[id]];
}

data_module.usersListHome.getName = function(name,checkAgain=false)
{
    if ((data_module.usersListHome.checkName === undefined&&!checkAgain)||(data_module.usersListHome.checkName !== undefined&&checkAgain)) {
        data_module.usersListHome.checkName = [];
        for (var i = 0; i < data_module.usersListHome.items.length; i++) {
            data_module.usersListHome.checkName[data_module.usersListHome.items[i].username]=i
        }
    }
    return data_module.usersListHome.items[data_module.usersListHome.checkName[name]];
}


data_module.usersListHome.addOne = function(data) {
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/insert_new_userHome.php",
            params: data,
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        data_module.usersList.updateAdd(EncodingClass.string.toVariable(
                            message));
                        resolve(EncodingClass.string.toVariable(message));
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })
}

data_module.usersListHome.updateOne = function(data) {
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/update_user_home.php",
            params: data,
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        data_module.usersListHome.updateEdit(EncodingClass.string.toVariable(
                            message));
                        resolve(EncodingClass.string.toVariable(message));
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })
}

data_module.usersListHome.updateEdit = function(data)
{
    var temp=Object.assign(data_module.usersListHome.getID(data.id),data);
    data_module.usersListHome.items[data_module.usersListHome.checkID[data.id]]=temp;
}
data_module.usersListHome.getID = function(id,checkAgain=false)
{
    if ((checkAgain===false&&data_module.usersListHome.checkID === undefined)||(checkAgain===true&&data_module.usersListHome.checkID!==undefined)) {
        data_module.usersListHome.checkID = [];
        for (var i = 0; i < data_module.usersListHome.items.length; i++) {
            data_module.usersListHome.checkID[data_module.usersListHome.items[i].id] = i
        }
    }
    if(id===-1)
    return undefined;
    return data_module.usersListHome.items[data_module.usersListHome.checkID[id]];
}

data_module.countriesList.load = function(loadAgain = false) {
    if (data_module.countriesList.items && !loadAgain)
        return Promise.resolve();
    return new Promise(function(resolve, reject) {
        FormClass.api_call({
            url: "./old_php/load_countries.php",
            params: [],
            func: (success, message) => {
                if (success) {
                    if (message.substr(0, 2) == "ok") {
                        message = message.substr(2);
                        data_module.countriesList.items = EncodingClass.string.toVariable(
                            message);
                        resolve();
                    } else {
                        ModalElement.alert({
                            message: message
                        });
                        reject();
                        return;
                    }
                } else {
                    ModalElement.alert({
                        message: message
                    });
                    reject();
                    return;
                }
            }
        })
    })

}

data_module.countriesList.getID = function(id,checkAgain=false) {
    if ((data_module.countriesList.checkID === undefined&&checkAgain===false)||(data_module.countriesList.checkID !== undefined&&checkAgain===true)) {
        data_module.countriesList.checkID = [];
        for (var i = 0; i < data_module.countriesList.items.length; i++) {
            data_module.countriesList.checkID[data_module.countriesList.items[i].id] = i;
        }
    }
    if(id!==-1)
    return data_module.countriesList.items[data_module.countriesList.checkID[id]];
    else
    return undefined;
}

data_module.company.load = function(loadAgain = false) {
  if (data_module.company.item && !loadAgain)
      return Promise.resolve();
  return new Promise(function(resolve, reject) {
      ModalElement.show_loading();
      FormClass.api_call({
          url: "./old_php/load_company.php",
          params: [],
          func: (success, message) => {
              if (success) {
                  if (message.substr(0, 2) == "ok") {
                      ModalElement.close(-1);
                      message = message.substr(2);
                      var temp = EncodingClass.string
                          .toVariable(message);
                      console.log(temp)
                      temp = temp[0];
                      data_module.company.item = temp;
                      data_module.company.item.nameCompany = temp.name;
                      temp = EncodingClass.string.toVariable(temp.config);
                      data_module.company.item.address = temp.address;
                      data_module.company.item.email = temp.email;
                      data_module.company.item.logo = temp.logo;
                      data_module.company.item.webSite = temp.website;
                      data_module.company.item.ver = temp.ver;
                      resolve();
                  } else {
                      ModalElement.alert({
                          message: message
                      });
                      reject();
                      return;
                  }
              } else {
                  ModalElement.alert({
                      message: message
                  });
                  reject();
                  return;
              }
          }
      })
  })
}

data_module.services.load = function(loadAgain = false) {
  if (data_module.services.items && !loadAgain)
      return Promise.resolve();
  return new Promise(function(resolve, reject) {
      ModalElement.show_loading();
      FormClass.api_call({
          url: "./old_php/load_service.php",
          params: [],
          func: (success, message) => {
              if (success) {
                  if (message.substr(0, 2) == "ok") {
                      ModalElement.close(-1);
                      message = message.substr(2);
                      var temp = EncodingClass.string
                          .toVariable(message);
                      data_module.services.items = temp;
                      for (var i = 0; i < data_module.services.items.length; i++){
                          switch (data_module.services.items[i].name) {
                              case "tit_home_bsc":
                                  data_module.services.items[i].subDNS = "bsc";
                                  data_module.services.items[i].srcimg = "../logo-bsc-1511.png";
                                  data_module.services.items[i].srclink = "http://www.bsc2kpi.com";
                                  break;
                              case "tit_home_card":
                                  data_module.services.items[i].subDNS = "carddone";
                                  data_module.services.items[i].srcimg = "../logo-card-15-11.png";
                                  data_module.services.items[i].srclink = "http://www.bsc2kpi.com";
                                  break;
                              case "tit_home_salary":
                                  data_module.services.items[i].subDNS = "salary";
                                  data_module.services.items[i].srcimg = "../logo-salarytek-1511.png";
                                  data_module.services.items[i].srclink = "http://www.salarytek.com";
                                  break;
                              case "tit_home_quickjd":
                                  data_module.services.items[i].subDNS = "jd";
                                  data_module.services.items[i].srcimg = "../Logo-QuickJD.png";
                                  data_module.services.items[i].srclink = "http://www.quickjd.com";
                                  break;
                              case "HR":
                                  data_module.services.items[i].subDNS = "HR";
                                  data_module.services.items[i].srcimg = "";
                                  data_module.services.items[i].srclink = "";
                                  break;
                              case "Accounting":
                                  data_module.services.items[i].subDNS = "accounting";
                                  data_module.services.items[i].srcimg = "";
                                  data_module.services.items[i].srclink = "";
                                  break;
                              default:

                          }
                      }
                      resolve();
                  } else {
                      ModalElement.alert({
                          message: message
                      });
                      reject();
                      return;
                  }
              } else {
                  ModalElement.alert({
                      message: message
                  });
                  reject();
                  return;
              }
          }
      })
  })
}

data_module.register.load = function(loadAgain = false) {
  if (data_module.register.items && !loadAgain)
      return Promise.resolve();
  return new Promise(function(resolve, reject) {
      ModalElement.show_loading();
      FormClass.api_call({
          url: "./old_php/load_register.php",
          params: [
              {name:"companyid",value:data_module.company.item.id}
          ],
          func: (success, message) => {
              if (success) {
                  if (message.substr(0, 2) == "ok") {
                      ModalElement.close(-1);
                      message = message.substr(2);
                      data_module.register.items = EncodingClass.string.toVariable(message);
                      resolve();
                  } else {
                      ModalElement.alert({
                          message: message
                      });
                      reject();
                      return;
                  }
              } else {
                  ModalElement.alert({
                      message: message
                  });
                  reject();
                  return;
              }
          }
      })
  })
}