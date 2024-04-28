// 모달창 + 버튼 색상변화, 댓글 수정, 댓글 삭제, 게시글 삭제 구현 필요
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

// 이벤트 필요
window.addEventListener("load", (event) => {
    getPost();
});

async function getPost(){
    const postId = 1;
    const postList = await loadFile(`./posts/post.json`);
    const post = postList.find(elem=>elem.id===postId);
    const commentList = await loadFile(`./comments/comment.json`);
    const comment = commentList.filter(elem=>elem.postId===postId);
    const userList = await loadFile(`./users/user.json`);
    const postArticle = document.getElementsByClassName("content")[0];
    const commentArticle = docuemnt.getElementsByClassName("comment_list")[0];
    // 글 본문 부분
    {
        let head, like, comment, view, writer, path;
        if(post.title.length>26){
            head = post.title.substr(0, 26);
        } else head = post.title;
        // 1000 이상일때 1k, 1만 이상시 10k, 10만 이상시 100k로 표기
        if(post.likes>1000){
            like = parseInt(post.likes/1000);
            like = like.toString()+'k';
        } else like=post.likes;
        if(post.views>1000){
            view = parseInt(post.views/1000);
            view = view.toString()+'k';
        } else view = post.views;
        if(post.comments>1000){
            comment = parseInt(post.comments/1000);
            comment = comment.toString()+'k';
        } else comment = post.comments;
        writer = userList.find((user)=>user.userId === post.writer)
        writer = writer.nickname;
        path = `http://localhost:3000/views/post/${post.id}`;
        // 이 아래부분을 어떻게 해야할까? 링크부터 return이후 받아와서 화면에 표시하기까지
        // 해결
        let postContainer = Object.assign(
            document.createElement(''), {href:`${path}`}
        );
        postContainer.innerHTML = `
                <div class="content_header">
                    <h2><strong>
                        ${head}
                    </strong></h2>
                    <div class="content_info">
                        <div class="content_writer">
                            <img src="http://localhost:3000/static/profile.svg" alt="">
                            <h6>${writer}</h6>
                            <h5>
                                ${post.time}
                            </h5>
                        </div>
                        <div class="content_edit">
                            <button class="edit" id="edit">
                                <a href="">수정</a>
                            </button>
                            <button class="edit" id="delete">
                                <a href="">삭제</a>
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content_body">
                    <img class="content_image"
                    src="http://localhost:3000/static/pexels-photo-255379.jpeg"
                    >
                    <p>
                        ${post.content}   
                    </p>
                </div>

                <div class="content_footer">
                    <button class="info" id="view">
                        <strong>${view}</strong>
                        <br>
                        <strong class="small">조회수</strong>
                    </button>
                    <button class="info" id="comment_number">
                        <strong>${comment}</strong>
                        <br>
                        <strong class="small">댓글</strong>
                    </button>
                </div>
                <hr>
        `
        postArticle.appendChild(postContainer);
    }
    // 글 댓글 부분
    {
        comment.map((com)=>{
            const commenter = userList.find(elem=>elem.userId===com.userId);
            
            let commentContainer = Object.assign(
                document.createElement(''), {href:`${path}`}
            );
            commentContainer.innerHTML = `
                <div class="comment">
                    <div class="content_info">
                        <div class="content_writer">
                            <img src="http://localhost:3000/static/profile.svg" alt="">
                            <h6>${commenter.nickname}</h6>
                            <h5>
                                ${com.time}
                            </h5>
                        </div>
                        <div class="content_edit">
                            <button class="edit" id="edit">
                                <a href="">수정</a>
                            </button>
                            <button class="edit" id="delete">
                                <a href="">삭제</a>
                            </button>
                        </div>
                    </div>
                    <p>
                        ${com.text}
                    </p>
                </div>
            `

            commentArticle.appendChild(commentContainer);
        });
    }
}

// 댓글 작성부분
async function postComment(){
    const postId = 1;
    const commentList = loadFile("./comments/comment.json");
    let commentId = commentList.findLastIndex(elem=>elem.commentId>1);
    // post submit
    const date = new Date();
    const time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    // 현재 로그인중인 user, 조회중인 post 받아와야함 (지금은 이걸로 일단 대체)
    const user = {
        "userId": 1,
        "email": "test@startupcode.kr",
        "password": "Test1234!",
        "nickname": "startup",
        "profile_image": "https://image.kr/img.jpg"
    }
    const text = getElementById("comment_textarea");
    const newComment = {
        "postId" : postId,
        "commentId": commentId+2,
        "writer" : user.userId,
        "time" : time,
        "text" : text.value
    }
}