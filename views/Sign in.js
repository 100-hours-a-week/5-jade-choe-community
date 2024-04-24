
// user 파일 받아오는부분
async function loadFile(filename){
    const path = `http://localhost:3000/${filename}`;
    try{
        const response = await fetch(path);
        const json = await response.json();
        return json;
    } catch(error){
        console.error('error: ', error);
        return null;
    }
}
// 전역변수 데이터, this로 받아와서 활용가능한가?
const dataArr = await loadFile("users/user.json");

function findNickname(nickname, userData){
    const user = userData.find((elem)=>elem.nickname===nickname)
    if(!user){
        return true;
     } else{
        return false;
    }
}
function findEmail(email, userData){
    const user = userData.find((elem)=>{elem.email===email});
    if(!user){
        return true;
    } else{
        return false;
    }
}
async function saveFile(filename, data){
    const fs = require('fs');
    try{
        await fs.writeFileSync(filename, JSON.stringify(data));
        console.log(`signin complete, ${filename}`);
    }catch(err){
        console.error(`${err}`);
    }
}
// 닉네임 검사
function validateNickname(nickname, userData){
    const helper = document.getElementById("nickname");
    const blank_pattern = /[\s]/g;
    if(nickname===''){
        helper.value = `* 닉네임을 입력해주세요`;
        return false;
    }
    // 닉네임에 공백 포함시
    else if(blank_pattern.test(nickname)){
        helper.value = `* 띄어쓰기를 없애주세요`;
        return false;
    }
    // 닉네임 중복 시
    else if(findNickname(nickname, userData)){
        helper.value = `* 중복된 닉네임 입니다.`;
        return false;
    }
    // 닉네임 11자 이상 작성 시
    else if(nickname.length> 10){
        helper.value = `* 닉네임은 최대 10자 까지 작성 가능합니다.`;
        return false;
    }
    else{
        helper.value = ``;
        return true;
    }
}
// 비밀번호 검사
function validatePassword(password, password2){
    const validate = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/
    const helper = document.getElementById("password_helper");
    const helper2 = document.getElementById("password_check_helper");
    if(password===``){
        helper.value = `* 비밀번호를 입력해주세요.`;
        return false;
    }
    // 비밀번호 양식이 다를 시
    else if (!password.match(validate)){
        helper.value = `* 비밀번호 양식을 맞춰주세요.`;
        return false;
    }
    else if(password2===``){
        helper2.value = `* 비밀번호를 한번더 입력해주세요`;
        return false;
    }
    // 비밀번호 확인이 다를 시
    else if(!password===password2){
        helper.value = `* 비밀번호가 다릅니다.`;
        helper2.value = `* 비밀번호가 다릅니다.`;
        return false;
    }
    else{
        helper.value = ``;
        helper2.value = ``;
        return true;
    }
}
// 이메일 검사
function validateEmail(email, userData){
    const validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const helper = document.getElementById("email_helper");
    if(email===``){
        helper.value = `* 이메일을 입력해주세요.`;
        return false;
    }
    // 이메일 주소 형식이 다를 시
    else if(email.match(validate)){
        helper.value = `* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)`;
        return false;
    }
    // 이메일 중복 시
    else if(findEmail(email, userData)){
        helper.value = `* 중복된 이메일 입니다.`;
        return false;
    }
    else{
        helper.value = ``;
        return true;
    }
}
function validateForm(){
    const userData = this.dataArr;
    const email=document.getElementsByClassName("email")[0];
    const password=document.getElementsByClassName("password")[0];
    const passwordCheck=document.getElementsByClassName("password_check")[0];
    const nickname=document.getElementsByClassName("nickname")[0];
    if(validateEmail(email, userData) 
    && validateNickname(nickname, userData) 
    && validatePassword(password, passwordCheck)){
        const button=document.getElementsByClassName("signin_button")[0];
        button.style.backgroundColor="#7F6AEE";
        button.style.cursor="grab";
    }
}
async function Signin(){
    const dataArr = await loadFile("users/user.json");
    const image="http://image.com/test";
    const email=document.getElementsByClassName("email")[0];
    const password=document.getElementsByClassName("password")[0];
    const passwordCheck=document.getElementsByClassName("password_check")[0];
    const nickname=document.getElementsByClassName("nickname")[0];
    // 새로 등록할 userId 구하기(마지막 userId+1)
    let signinId = dataArr.findLastIndex((elem)=>{
        elem.userId>1;
    }).userId;
    // json형식 만들고 array에 추가
    const userData = {
        "userId": signinId+1, 
        "email": email, 
        "password": password, 
        "nickname": nickname,
        "profile_image": image // image upload는 보류
    }
    dataArr.push(userData);
    // user.js에 저장
    await saveFile("../users/user.json", dataArr);
}