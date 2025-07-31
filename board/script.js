const API_BASE_URL = "http://localhost:8080";
// 메뉴
const navSignin = document.querySelector("#nav-signin");
const navSignup = document.querySelector("#nav-signup");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");

// 요소 자체를 넘겨줌(페이지들) - 클릭감지
//  - 페이지 자체가 바껴야하기때문에
const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pageBoard = document.querySelector("#page-board");
const pageWrite = document.querySelector("#page-write");
const pageDetail = document.querySelector("#page-detail");

// 회원가입/로그인
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");

// boardList 요소 가져오기(게시판 목록)
const boardList = document.querySelector("#board-list");
let boards = [];

// 게시물 추가
const writeForm = document.querySelector("#write-form");

// 게시물 상세
const detailTitle = document.querySelector("#detail-title");
const detailUserId = document.querySelector("#detail-userid");
const detailContent = document.querySelector("#detail-content");
const backBtn = document.querySelector("#back-btn");

// AccessToken 디코딩
function getPayload() {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    changePages(pageSignin);
    return null;
  }
  try {
    // 토큰을 . 기준으로 payload를 가져온다(2번째꺼)
    const payloadBase64 = token.split(".")[1];
    // 디코딩
    const decodePayload = atob(payloadBase64);
    // 디코딩된 JSON 문자열을 자바스크립트 객체로 변환
    const payload = JSON.parse(decodePayload);

    return payload;
  } catch (error) {
    console.log(error);
    alert("토큰 오류 발생");
  }
}

// 페이지 전환 함수
function changePages(pageElement) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });
  pageElement.classList.add("active");
}

// 게시판 목록 조회 및 표시 함수
async function renderBoard() {
  // 요청을 보내기 전에 AccessToken 빼오기
  // 만약 로컬 스토리지에 AccessToken이 없으면 로그인 페이지로 전환
  const accessToken = localStorage.getItem("AccessToken"); // accesstoken 가져옴
  console.log(accessToken);

  // 로그인 안되어있을시
  if (!accessToken) {
    changePages(pageSignin);
    alert("로그인이 필요합니다.");
    return;
  }
  // 요청 보내기 - body에 따로 보낼건 없음
  try {
    const response = await fetch(`${API_BASE_URL}/board/list`, {
      method: "GET",
      // fetch에서 옵션에 headers안에 Authorization: `Bearer ${AccessToken}`
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
      // 게시물 작성 페이지로 전환
    } else {
      // 요청해서 받아온 게시물들 ul foreach => ul 안에 li 넣기
      // li 제목만 표시
      // 게시물 불러오는중 텍스트 없애줌

      boards = responseData.data;
      boardList.innerHTML = "";
      boards.forEach((board) => {
        // li에 클릭 됐을때
        // boardList.innerHTML += `<li>${board.title}</li>`;

        // 직접 li태그를 새로 만들어 넣어줌
        const listItem = document.createElement("li");
        // 제목 넣어줌
        listItem.innerText = board.title;
        // forEach안에 들어있어서 아래 코드를 하나씩 다 넣어줌
        listItem.addEventListener("click", () => {
          // 클릭 감지할때마다 boardId 넣어줌
          getBoard(board.boardId);
          // li선언만 하고 innerHTML 안함
        });
        // innerHTML 역할을 함 - 자식요소 추가
        boardList.appendChild(listItem);
      });
      // const boardLi = document.querySelector("#board-list > li");

      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 목록 조회 중 오류가 발생했습니다.");
  }
}

// 게시물 추가 요청 함수 - 작성 완료 버튼이 눌러졌을때
async function addBoard(event) {
  event.preventDefault();
  // 콘솔이 먼저 찍히지 않게 처리
  // 요청 보내기전 필요한 데이터 가져옴
  const userInfo = await getPayload();
  console.log(userInfo);

  const titleInput = document.querySelector("#write-title");
  const contentInput = document.querySelector("#write-content");

  const accessToken = localStorage.getItem("AccessToken");

  // 혹시 모를 accessToken이 없는 경우
  // 요청에는 accessToken이 필요하니까
  if (!accessToken) {
    alert("글을 작성하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  // 항목에 빈값을 입력하거나 공백을 입력했을 경우(유효성 검사)
  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  // 요청을 위한 body 데이터 객체 만들기(포장)
  const boardData = {
    title: titleInput.value,
    content: contentInput.value,
    userId: userInfo.jti, //??
  };

  try {
    const response = await fetch(`${API_BASE_URL}/board/add`, {
      method: "POST",
      // CORS떠서 - 요청 도메인 포트가 다르거나 헤더 요청이 다르면 뜸
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(boardData),
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      writeForm.reset();
      // 비동기를 동기로 보이게 해줌
      await renderBoard();
      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 등록 중 오류가 발생했습니다.");
  }
}
// 게시물 단건 조회 요청 함수
async function getBoard(boardId) {
  const accessToken = localStorage.getItem("AccessToken");
  console.log(accessToken);

  if (!accessToken) {
    changePages(pageSignin);
    alert("게시물을 조회하려면 로그인이 필요합니다.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      detailTitle.innerText = responseData.data.title;
      detailUserId.innerText = responseData.data.userId;
      detailContent.innerText = responseData.data.content;
      changePages(pageDetail);
    }
  } catch (error) {
    alert("게시물 상세를 불러오는데 실패했습니다.");
    // changeContainer("postListContainer"); // 실패시 목록으로
    console.log(error);
  }
}

// 로그인 요청 함수
async function signinHandler(event) {
  event.preventDefault(); // 폼의 기본 동작을 막기위해 사용

  const usernameInput = document.querySelector("#signin-id");
  const passwordInput = document.querySelector("#signin-password");

  const signinData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // id, password 둘 다 비어있을때
  if (!signinData.username || !signinData.password) {
    alert("아이디 또는 비밀번호를 모두 입력해 주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    });

    const responseData = await response.json();

    // DB값이랑 다를때
    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      localStorage.setItem("AccessToken", responseData.data);
      signinForm.reset();

      await renderBoard();
      changePages(pageBoard);
    }
    // 게시판 목록으로 전환
  } catch (error) {
    console.log(error);
    alert("서버와 통신 중 오류가 발생했습니다.");
  }
}

// 회원가입 요청 함수
async function signupHandler(event) {
  event.preventDefault(); // 폼의 기본 동작을 막기위해

  const usernameInput = document.querySelector("#signup-id");
  const passwordInput = document.querySelector("#signup-password");
  const emailInput = document.querySelector("#signup-email");

  // 서버로 보낼 회원가입 데이터를 객체로 만듦
  const signupData = {
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  // 값이 하나라도 없으면(입력값이 비어있는지 확인)
  if (!signupData.username || !signupData.password || !signupData.email) {
    alert("모든 항목을 입력해주세요.");
    return;
    // 함수 종료
  }
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST", // 요청방식 POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData), // 자바스크립트 객체를 json 문자열로 변환해서 보냄
    });
    const responseData = await response.json(); // 요청 응답 결과

    if (responseData.status !== "success") {
      // oauth2 메세지 띄워줌
      alert(responseData.message);
    } else {
      alert(responseData.message);
      signupForm.reset(); // 폼의 입력내용 초기화
      changePages(pageSignin); // 회원가입 끝나면 바로 로그인 화면
    }
  } catch (error) {
    // 요청 자체에 실패한 경우(문제가 생겼을 경우)
    console.log("회원가입 요청 오류 발생 : ", error);
    alert("회원가입 요청에 오류가 발생했습니다.");
  }
}

// 클릭 했을때 감지되어야하기때문에 중괄호로 감싸줌
navSignin.addEventListener("click", () => {
  changePages(pageSignin);
});

navSignup.addEventListener("click", () => {
  changePages(pageSignup);
});

navBoard.addEventListener(
  "click",
  renderBoard
  // => { changePages(pageBoard);}
);

navWrite.addEventListener("click", () => {
  changePages(pageWrite);
});

backBtn.addEventListener("click", renderBoard);

signupForm.addEventListener("submit", signupHandler);
signinForm.addEventListener("submit", signinHandler);
writeForm.addEventListener("submit", addBoard);
