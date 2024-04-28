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

// 기본적으로 user의 data를 유지한다면 이 함수가 필요없을것.
// 이건 생각나서 적어둔것 - 애초에 함수가 필요가 없을듯?
// 일단 필요하다는것만 표시하고, 나중에 만들면 지우자
async function findUser(user){
    const path = `https://localhost:3000/users/user.json`;
    try{
        const response = await fetch(path);
        const json = await response.json();
    } catch(error){
        console.error(`error: ${error}`);
        return null;
    }
    let user = json.find(elem=>elem.userId === userId);
    return userId;
}

async function postGenerator(){
    //const userId = await findUser();
    const postList = await loadFile(`posts/post.json`);
    // 게시글 본문을 LONGTEXT타입으로 저장 어떻게 함
    const title = document.getElementById("title");
    const content = document.getElementById("detail");
    const button = document.getElementById("submit");
    const helper = document.getElementById("submit");
    // 버튼 색상 변경되는 부분 구현
    if(title.value!="" && content.value!=""){
        button.style.backgroundColor = "#7F6AEE";
        helper.innerHTML = "";
    }else{
        button.style.backgroundColor = "#ACA0EB";
        helper.innerHTML = "* 제목, 내용을 모두 작성해주세요";
    }

    // post submit
    let date = new Date();
    let time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    // 새로 등록할 post의 id 구하기(마지막 id+1)
    let postId = postList.findLastIndex(elem=>elem.id>1);
    const newPost = {
        "id": postId, 
        "writer" : userId,
        "title" : title.value,
        "time" : time,
        "image" : "http://image.com/test",
        "content" : content.value,
        "likes": 0,
        "views": 0,
        "comments" : 0
    }
    // submit 함수 추가 필요
}
