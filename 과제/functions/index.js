const functions = require("firebase-functions");

let admin = require("firebase-admin");
const cors = require("cors")({origin:true});
let axios = require("axios");
let form-data = require("form-data");


let serviceAccount = require("./ceobootcampfinal-firebase-adminsdk-7p36q-2a3a5b0a05.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ceobootcampfinal-default-rtdb.firebaseio.com"
});

let db = admin.database();


exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{

    db.ref("msgs").on("value",(snapshot)=>{
      response.send(snapshot.val());
    });
  })
});

exports.login = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{

    if(!request.body.id){
      respons.send({"result":"정상적인 접근이 아닙니다."});

    }

    let id = request.body.id;
    let pwd = request.body.pwd;
    db. ref("members/"+id).on("value",(snapshot)=>{
      if(snapshot.val()){
        if(snapshot.val() == pwd){
          response.send({"result_code":1,"result" : "로그인되었습니다."});
        }else{
          response.send({"result_code":2,"result":"비밀번호가 일치하지 않습니다."});
        }
      }else{
        response.send({"result_code":3,"result":"없는 회원입니다."});
      }

    });
  })
});

exports.sendSMS = functions.https.onRequest((request, response) => {
    cors(request, response, ()=>{
      let data = new Formdata();
      data.append("remote_id", "hbyulee");
      data.append("remote_pass", "패스워드");
      data.append("remote_num", "1");
      data.append("remote_phone", "01044484735");
      data.append("remote_callback", "01044484735");
      data.append("remote_msg", "안녕하세요");

      axions({
        method:"post",
        url:"https://www.munja123.com/Remote?reMoteSMS.html",
        headers: {
          ...data.getheaders()
        },
        data: data
      }).then((res)=>{
        response.send(res);
      })
      })

      db. ref("members/"+id).set(pwd);
    });
