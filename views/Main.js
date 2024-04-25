// post 파일 받아오는부분
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

async function postGenerator(){
    // 구현할 기능
    // 1.post.json에서 post list 가져와서 화면에 보여주기
    // 1-1. 데이터 가져오기
    const postList = await loadFile("posts/post.json");
    // 1-2. 데이터 split하기
    // 1-2-1. 제목 최대 26자까지, 이후론 다 자름
    // 1-2-2. 날짜 및 시간 split하기
    // 1-2-3. 좋아요 댓글 조회수 split하기
    // 1000 이상일때 1k, 1만 이상시 10k, 10만 이상시 100k로 표기
    // 1-2-4. 작성자 split하기
    // 1-3. split한 데이터 container에 담기
    // 1-4. 화면에 출력하기







}