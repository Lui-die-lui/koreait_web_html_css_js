// fetch란?
// 자바스크립트에서 네트워크 요청
// 비동기적으로 수행을 할 수 있게 해주는 요청api
// 기반이 promise

// fetch(url, option)
// .then(response => {
//     // 응답 객체를 확인 처리
// })

// 요청 보낼 url
const API_URL = "https://jsonplaceholder.typicode.com/posts/1";

const fetchBtn = document.querySelector("#fetchBtn");
const postContainer = document.querySelector("#postContainer");

// 비동기 처리를 해야하는 동기처럼 하기 위해서 async/await를 사용
async function getData() {
  postContainer.innerHTML =
    '<p class="placeholder-text">게시물 데이터 불러오는 중...</p>';

  try {
    // 요청 갔다오는거 확인
    const response = await fetch(API_URL);
    console.log(response);

    if (!response.ok) {
      throw new Error(
        `예외 발생! 상태 : ${response.status} ${response.statusText}`
      );
    }

    const postData = await response.json(); // 응답한 본문(body) 을 JSON형태로 파싱
    console.log(postData);

    postContainer.innerHTML = `
    <h2>${postData.title}<h2/>
    <p>${postData.body}</p>`;

    postContainer.style.borderColor = "#28a745";
    postContainer.style.boxShadow = "0 0 0 2px rgba(40, 167, 69, 0.2)";
  } catch (error) {
    console.log("게시물 불러오기 실패 : ", error);
    postContainer.innerHTML = `<p class="placeholder-text"style="color:red"> 데이터를 불러오는데 실패했습니다. : ${error}</p>`;

    postContainer.style.borderColor = "#dc3545";
    postContainer.style.boxShadow = "0 0 0 2px rgba(220, 53, 69, 0.2)";
  }
}

fetchBtn.addEventListener("click", getData);
