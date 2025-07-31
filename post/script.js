const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// 게시물 목록 컨테이너
const postListContainer = document.querySelector("#postListContainer");
// 게시물 상세 컨테이너
const postDetailContainer = document.querySelector("#postDetailContainer");
// 게시물 목록 ul
const postList = document.querySelector("#postList");

// 게시물 상세 제목
const detailTitle = document.querySelector("#detailTitle");
// 게시물 상세 ID
const detailId = document.querySelector("#detailId");
// 게시물 상세 유저 ID
const detailUserId = document.querySelector("#detailUserId");
// 게시물 상세 내용
const detailBody = document.querySelector("#detailBody");
// 목록으로 돌아가기 버튼
const backBtn = document.querySelector("#backBtn");

// 게시물 상세
const 

// 목록 - 상세 전환 함수
function changeContainer(containerId) {
  const containers = document.querySelectorAll(".page-container");
  // active를 먼저 다 제거해줌
  containers.forEach((container) => {
    container.classList.remove("active");
  });
  // 보여줄 것만 반환
  document.querySelector(`#${containerId}`).classList.add("active");
}

// 게시물 목록 불러와서 렌더링하는 함수
async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error("문제 발생!");
    }

    const posts = await response.json();
    console.log(posts);

    // 게시물 불러오는중 텍스트 없애줌
    postList.innerHTML = "";
    if (posts) {
      // 각 게시물 순회해서 li안에 제목과 버튼 넣어서 ul안에 넣기
      posts.forEach((post) => {
        postList.innerHTML += `<li><span class="post-title" data-post-id="${post.id}">${post.title}</span>
        <button class="detail-btn" data-post-id="${post.id}">상세보기</button></li>`;
      });
    } else {
      postList.innerHTML =
        '<p class="loading-message" style="color: red;">게시물이 없습니다.</p>';
    }
  } catch (error) {
    postList.innerHTML =
      '<p class="loading-message" style="color: red;">게시물 목록을 불러오는데 실패했습니다.</p>';
  }
}

async function fetchPostDetail(postId) {
  changeContainer("postDetailContainer"); // 상세 컨테이너 나타남
  detailTitle.textContent = "불러오는 중...";
  detailId.textContent = "";
  detailUserId.textContent = "";
  detailBody.textContent = "내용 불러오는중...";

  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`); //??

    if (!response.ok) {
      throw new Error("문제 발생!");
    }

    const post = await response.json();
    detailTitle.textContent = post.title;
    detailId.textContent = post.id;
    detailUserId.textContent = post.userId;
    detailBody.textContent = post.body;
  } catch (error) {
    alert("게시물 상세를 불러오는데 실패했습니다.");
    changeContainer("postListContainer"); // 실패시 목록으로
  
  }
}

// 목록으로 돌아가는 버튼 // click 일때 함수 실행
backBtn.addEventListener("click", () => changeContainer("postListContainer"));
// 클릭 시, id가 postListContainer인 게시물 목록 컨테이너에 active 클래스를 추가해서 목록 화면을 보여줌

postList.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("post-title") ||
    target.classList.contains("detail-btn")
  ) {
    const postId = target.dataset.postId;
    if (postId) {
      // 상세 요청
      fetchPostDetail(postId);
    }
  }
});

fetchPosts();
