// const API_BASE_URL = "http://localhost:8080";
// // 메뉴
// const navSignin = document.querySelector("#nav-signin");
// const navSignup = document.querySelector("#nav-signup");
// const navLogout = document.querySelector("#nav-logout");
// const navBoard = document.querySelector("#nav-board");
// const navWrite = document.querySelector("#nav-write");

// const navChangePassword = document.querySelector("#nav-changepassword");
// // console.dir(navBoard) // 콘솔에 모든 속성 다 나옴

// // 요소 자체를 넘겨줌(페이지들) - 클릭감지
// //  - 페이지 자체가 바껴야하기때문에
// const pageSignin = document.querySelector("#page-signin");
// const pageSignup = document.querySelector("#page-signup");
// const pageBoard = document.querySelector("#page-board");
// const pageWrite = document.querySelector("#page-write");
// const pageDetail = document.querySelector("#page-detail");

// const pagePassword = document.querySelector("#page-password");

// // 회원가입/로그인
// const signupForm = document.querySelector("#signup-form");
// const signinForm = document.querySelector("#signin-form");

// // 비밀번호 변경
// const changePasswordForm = document.querySelector("#password-form");

// // boardList 요소 가져오기(게시판 목록)
// const boardList = document.querySelector("#board-list");
// let boards = [];

// // 게시물 추가
// const writeForm = document.querySelector("#write-form");

// // 게시물 상세
// const detailTitle = document.querySelector("#detail-title");
// const detailUserId = document.querySelector("#detail-userid");
// const detailContent = document.querySelector("#detail-content");
// const backBtn = document.querySelector("#back-btn");

// // AccessToken 디코딩
// function getPayload() {
//   const token = localStorage.getItem("AccessToken");
//   if (!token) {
//     alert("로그인이 필요합니다.");
//     changePages(pageSignin);
//     return null;
//   }
//   try {
//     // 토큰을 . 기준으로 payload를 가져온다(2번째꺼)
//     const payloadBase64 = token.split(".")[1];
//     // 디코딩
//     const decodePayload = atob(payloadBase64);
//     // 디코딩된 JSON 문자열을 자바스크립트 객체로 변환
//     const payload = JSON.parse(decodePayload);

//     return payload;
//   } catch (error) {
//     console.log(error);
//     alert("토큰 오류 발생");
//   }
// }

// // 페이지 전환 함수
// function changePages(pageElement) {
//   const pages = document.querySelectorAll(".page");
//   pages.forEach((page) => {
//     page.classList.remove("active");
//   });
//   pageElement.classList.add("active");
// }

// // 게시판 목록 조회 및 표시 함수
// async function renderBoard() {
//   // 요청을 보내기 전에 AccessToken 빼오기
//   // 만약 로컬 스토리지에 AccessToken이 없으면 로그인 페이지로 전환
//   const accessToken = localStorage.getItem("AccessToken"); // accesstoken 가져옴
//   console.log(accessToken);

//   // 로그인 안되어있을시
//   if (!accessToken) {
//     changePages(pageSignin);
//     alert("로그인이 필요합니다.");
//     return;
//   }
//   // 요청 보내기 - body에 따로 보낼건 없음
//   try {
//     const response = await fetch(`${API_BASE_URL}/board/list`, {
//       method: "GET",
//       // fetch에서 옵션에 headers안에 Authorization: `Bearer ${AccessToken}`
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const responseData = await response.json();

//     if (responseData.status !== "success") {
//       alert(responseData.message);
//       // 게시물 작성 페이지로 전환
//     } else {
//       // 요청해서 받아온 게시물들 ul foreach => ul 안에 li 넣기
//       // li 제목만 표시
//       // 게시물 불러오는중 텍스트 없애줌

//       boards = responseData.data;
//       boardList.innerHTML = "";
//       boards.forEach((board) => {
//         // li에 클릭 됐을때
//         // boardList.innerHTML += `<li>${board.title}</li>`;

//         // 직접 li태그를 새로 만들어 넣어줌
//         const listItem = document.createElement("li");
//         // 제목 넣어줌
//         listItem.innerText = board.title;
//         // forEach안에 들어있어서 아래 코드를 하나씩 다 넣어줌
//         listItem.addEventListener("click", () => {
//           // 클릭 감지할때마다 boardId 넣어줌
//           getBoard(board.boardId);
//           // li선언만 하고 innerHTML 안함
//         });
//         // innerHTML 역할을 함 - 자식요소 추가
//         boardList.appendChild(listItem);
//       });
//       // const boardLi = document.querySelector("#board-list > li");

//       changePages(pageBoard);
//     }
//   } catch (error) {
//     console.log(error);
//     alert("게시물 목록 조회 중 오류가 발생했습니다.");
//   }
// }

// // 게시물 추가 요청 함수 - 작성 완료 버튼이 눌러졌을때
// async function addBoard(event) {
//   event.preventDefault();
//   // 콘솔이 먼저 찍히지 않게 처리
//   // 요청 보내기전 필요한 데이터 가져옴
//   const userInfo = await getPayload();
//   console.log(userInfo);

//   const titleInput = document.querySelector("#write-title");
//   const contentInput = document.querySelector("#write-content");

//   const accessToken = localStorage.getItem("AccessToken");

//   // 혹시 모를 accessToken이 없는 경우
//   // 요청에는 accessToken이 필요하니까
//   if (!accessToken) {
//     alert("글을 작성하려면 로그인이 필요합니다.");
//     changePages(pageSignin);
//     return;
//   }

//   // 항목에 빈값을 입력하거나 공백을 입력했을 경우(유효성 검사)
//   if (!titleInput.value.trim() || !contentInput.value.trim()) {
//     alert("모든 항목을 입력해주세요.");
//     return;
//   }

//   // 요청을 위한 body 데이터 객체 만들기(포장)
//   const boardData = {
//     title: titleInput.value,
//     content: contentInput.value,
//     userId: userInfo.jti, //??
//   };

//   try {
//     const response = await fetch(`${API_BASE_URL}/board/add`, {
//       method: "POST",
//       // CORS떠서 - 요청 도메인 포트가 다르거나 헤더 요청이 다르면 뜸
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(boardData),
//     });

//     const responseData = await response.json();

//     if (responseData.status !== "success") {
//       alert(responseData.message);
//     } else {
//       alert(responseData.message);
//       writeForm.reset();
//       // 비동기를 동기로 보이게 해줌
//       await renderBoard();
//       changePages(pageBoard);
//     }
//   } catch (error) {
//     console.log(error);
//     alert("게시물 등록 중 오류가 발생했습니다.");
//   }
// }
// // 게시물 단건 조회 요청 함수
// async function getBoard(boardId) {
//   const accessToken = localStorage.getItem("AccessToken");
//   console.log(accessToken);

//   if (!accessToken) {
//     changePages(pageSignin);
//     alert("게시물을 조회하려면 로그인이 필요합니다.");
//     return;
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const responseData = await response.json();

//     if (responseData.status === "success") {
//       detailTitle.innerText = responseData.data.title;
//       detailUserId.innerText = `유저 ID : ${responseData.data.userId}`;
//       detailContent.innerText = responseData.data.content;
//       changePages(pageDetail);
//     }
//   } catch (error) {
//     alert("게시물 상세를 불러오는데 실패했습니다.");
//     // changeContainer("postListContainer"); // 실패시 목록으로
//     console.log(error);
//   }
// }

// // 로그인 요청 함수
// async function signinHandler(event) {
//   event.preventDefault(); // 폼의 기본 동작을 막기위해 사용

//   const usernameInput = document.querySelector("#signin-id");
//   const passwordInput = document.querySelector("#signin-password");

//   const signinData = {
//     username: usernameInput.value,
//     password: passwordInput.value,
//   };

//   // id, password 둘 다 비어있을때
//   if (!signinData.username || !signinData.password) {
//     alert("아이디 또는 비밀번호를 모두 입력해 주세요.");
//     return;
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(signinData),
//     });

//     const responseData = await response.json();

//     // DB값이랑 다를때
//     if (responseData.status !== "success") {
//       alert(responseData.message);
//     } else {
//       alert(responseData.message);
//       localStorage.setItem("AccessToken", responseData.data);
//       signinForm.reset();

//       // 다시 보여줄 필요 없어서 reload 시키고 로그인 버튼
//       // await renderBoard();
//       // changePages(pageBoard);
//       location.reload();
//     }
//     // 게시판 목록으로 전환
//   } catch (error) {
//     console.log(error);
//     alert("서버와 통신 중 오류가 발생했습니다.");
//   }
// }

// // 회원가입 요청 함수
// async function signupHandler(event) {
//   event.preventDefault(); // 폼의 기본 동작을 막기위해

//   const usernameInput = document.querySelector("#signup-id");
//   const passwordInput = document.querySelector("#signup-password");
//   const emailInput = document.querySelector("#signup-email");

//   // 서버로 보낼 회원가입 데이터를 객체로 만듦
//   const signupData = {
//     username: usernameInput.value,
//     password: passwordInput.value,
//     email: emailInput.value,
//   };

//   // 값이 하나라도 없으면(입력값이 비어있는지 확인)
//   if (!signupData.username || !signupData.password || !signupData.email) {
//     alert("모든 항목을 입력해주세요.");
//     return;
//     // 함수 종료
//   } else if (
//     signupData.username.trim() ||
//     signupData.password.trim() ||
//     signupData.email.trim()
//   ) {
//     alert("공백은 입력 불가능합니다.");
//     return;
//   }
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/signup`, {
//       method: "POST", // 요청방식 POST
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(signupData), // 자바스크립트 객체를 json 문자열로 변환해서 보냄
//     });
//     const responseData = await response.json(); // 요청 응답 결과

//     if (responseData.status !== "success") {
//       // oauth2 메세지 띄워줌
//       alert(responseData.message);
//     } else {
//       alert(responseData.message);
//       signupForm.reset(); // 폼의 입력내용 초기화
//       changePages(pageSignin); // 회원가입 끝나면 바로 로그인 화면
//     }
//   } catch (error) {
//     // 요청 자체에 실패한 경우(문제가 생겼을 경우)
//     console.log("회원가입 요청 오류 발생 : ", error);
//     alert("회원가입 요청에 오류가 발생했습니다.");
//   }
// }

// // 비밀번호 변경
// // async function changePasswordHandler(event) {
// //   event.preventDefault();

// //   // const usernameInput = document.querySelector("#newpassword-id")
// //   const oldPasswordInput = document.querySelector("#old-passowrd");
// //   const newPasswordInput = document.querySelector("#new-password");
// //   const checkPasswordInput = document.querySelector("#check-password");

// //   const changePasswordData = {
// //     oldPassword: oldPasswordInput.value,
// //     newPassword: newPasswordInput.value,
// //     userId: userInfo.jti,
// //   };

// //   try {
// //     const response = await fetch(`${API_BASE_URL}/account/change/password`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${accessToken}`,
// //       },
// //       body: JSON.stringify(changePasswordData),
// //     });

// //     const responseData = await response.json();

// //     if (
// //       // !changePasswordData.username ||
// //       !changePasswordData.oldPassword ||
// //       !changePasswordData.newPassword
// //     ) {
// //       alert("정보를 모두 입력해주세요.");
// //       return;
// //     } else if (newPasswordInput !== checkPasswordInput) {
// //       alert("새 비밀번호가 일치하지 않습니다.");
// //       return;
// //     } else {
// //       alert(responseData.message);
// //       changePages(pageSignin);
// //       localStorage.removeItem("AccessToken");
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     alert("비밀번호 변경 요청에 오류가 발생했습니다.");
// //   }
// // }

// // 클릭 했을때 감지되어야하기때문에 중괄호로 감싸줌
// navSignin.addEventListener("click", () => {
//   changePages(pageSignin);
// });

// navSignup.addEventListener("click", () => {
//   changePages(pageSignup);
// });

// navLogout.addEventListener("click", () => {
//   if (confirm("정말 로그아웃 하시겠습니까?")) {
//     localStorage.removeItem("AccessToken");
//     // 로그아웃 후에
//     // 로그인 페이지로 돌아감
//     location.reload(true);
//   } else {
//     // 아니면 그냥 함수끝냄
//     return;
//   }
// });

// navChangePassword.addEventListener("click", () => {
//   changePages(pageChangePassword);
// });

// navBoard.addEventListener(
//   "click",
//   renderBoard
//   // => { changePages(pageBoard);}
// );

// navWrite.addEventListener("click", () => {
//   changePages(pageWrite);
// });

// backBtn.addEventListener("click", renderBoard);

// signupForm.addEventListener("submit", signupHandler);
// signinForm.addEventListener("submit", signinHandler);
// writeForm.addEventListener("submit", addBoard);
// changePasswordForm.addEventListener("submit", changePasswordHandler);

// // 문서자체에 addEventListener
// // HTML 문서가 완전히 로드되고 파싱 되었을때
// // document문서 object객체 model모델
// document.addEventListener("DOMContentLoaded", async () => {
//   const accessToken = localStorage.getItem("AccessToken");

//   if (accessToken) {
//     navSignin.style.display = "none";
//     navSignup.style.display = "none";
//     await renderBoard();
//   } else {
//     navLogout.style.display = "none";
//     // 메뉴 버튼 만들고 엑세스 토큰에 따라서 보이고 안보이고 처리
//     navChangePassword.style.display = "none";
//     changePages(pageSignin);
//   }
// });

// // 비밀번호 변경
// // 메뉴 버튼 만들고 엑세스 토큰에 따라서 보이고 안보이고 처리
// // 요청 보낼때 userId, oldPassword, newpassword body로 요청 보내기
// // accesstoken도 같이 헤더에 포함해서
// // 새로운 비밀번호 입력은 두번 받아서 두개의 값이 같은지 확인 후 요청 처리
// // 비밀번호가 변경되면 로그아웃 처리하고 로그인 페이지로 전환

const API_BASE_URL = "http://localhost:8080";

//메뉴
const navSignin = document.querySelector("#nav-signin");
const navSignup = document.querySelector("#nav-signup");
const navPassword = document.querySelector("#nav-password");
const navLogout = document.querySelector("#nav-logout");
const navBoard = document.querySelector("#nav-board");
const navWrite = document.querySelector("#nav-write");
// console.dir(navSignin);

//페이지
const pageSignin = document.querySelector("#page-signin");
const pageSignup = document.querySelector("#page-signup");
const pagePassword = document.querySelector("#page-password");
const pageBoard = document.querySelector("#page-board");
const pageWrite = document.querySelector("#page-write");
const pageDetail = document.querySelector("#page-detail");

const pageEdit = document.querySelector("#page-edit");

//로그인 및 회원가입 폼
const signupForm = document.querySelector("#signup-form");
const signinForm = document.querySelector("#signin-form");
const passwordForm = document.querySelector("#password-form");

// 게시판 수정
const editForm = document.querySelector("#edit-form");

//게시판 목록
const boardList = document.querySelector("#board-list");

//게시물 추가
const writeForm = document.querySelector("#write-form");

//게시물 상세
const detailTitle = document.querySelector("#detail-title");
const detailUserId = document.querySelector("#detail-userid");
const detailContent = document.querySelector("#detail-content");
const backBtn = document.querySelector("#back-btn");
const deleteBtn = document.querySelector("#delete-btn");
const editBtn = document.querySelector("#edit-btn");
const commonBtns = document.querySelector(".commonBtn");

// 게시판 수정 완료 버튼
const editFinBtn = document.querySelector("#editfin-btn"); // 필요없나?
const btnBox = document.querySelector("#btn-box");
const titleInput = document.querySelector("#edit-title");
const contentInput = document.querySelector("#edit-content");

let boards = [];

//AccessToken 디코딩
function getPayload() {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    changePages(pageSignin);
    return null;
  }

  try {
    //토큰을 . 기준으로 분리해서 payload를 가져온다
    const payloadBase64 = token.split(".")[1];
    //디코딩
    const decodedPayload = atob(payloadBase64);
    //디코딩된 JSON 문자열을 자바스크립트 객체로 변환
    const payload = JSON.parse(decodedPayload);

    return payload;
  } catch (error) {
    console.log(error);
    alert("토큰 오류 발생");
  }
}

// 페이지 전환 함수
function changePages(pageElement) {
  signinForm.reset();
  signupForm.reset();
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });
  pageElement.classList.add("active");
}

//게시판 목록 조회 및 표시 함수
//게시판 목록 버튼 눌렀을때, 로그인 되었을때
async function renderBoard() {
  //요청을 보내기전에 AccessToken 빼오기
  const accessToken = localStorage.getItem("AccessToken");

  //만약에 로컬 스토리지에 AccessToken이 없으면 로그인 페이지로 전환
  if (!accessToken) {
    changePages(pageSignin);
    alert("로그인이 필요합니다.");
    return;
  }

  //요청 보내기
  try {
    const response = await fetch(`${API_BASE_URL}/board/list`, {
      method: "GET",
      //fetch에서 headers안에 Authorization: `Bearer ${AccessToken}`
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
      //게시물 작성 페이지로 전환
    } else {
      //요청해서 받아온 게시물들 foreach => ul안에 li로 넣기
      boards = responseData.data;
      boardList.innerHTML = "";

      boards.forEach((board) => {
        const listItem = document.createElement("li");
        listItem.innerText = board.title;

        listItem.addEventListener("click", () => {
          getBoard(board.boardId);
        });

        boardList.appendChild(listItem);
      });

      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 목록 조회 중 오류가 발생했습니다.");
  }
}

async function removeBoard() {
  // 어차피 버튼이라 event 필요없음
  const boardId = deleteBtn.dataset.boardId;

  const accessToken = localStorage.getItem("AccessToken");

  if (!accessToken) {
    alert("게시물을 조하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/board/remove/${boardId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }

    await renderBoard();
    changePages(pageBoard);
  } catch (error) {
    console.log(error);
    alert("삭제 요청을 보내는 중에 문제가 발생했습니다.");
  }
}

//게시물 단건 조회 요청 함수
async function getBoard(boardId) {
  const accessToken = localStorage.getItem("AccessToken");

  const userInfo = getPayload(accessToken);
  const userId = parseInt(userInfo.jti);

  if (!accessToken) {
    alert("게시물을 조하려면 로그인이 필요합니다.");
    changePages(pageSignin);
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
      detailUserId.innerText = `유저 ID : ${responseData.data.userId}`;
      detailContent.innerText = responseData.data.content;
      deleteBtn.setAttribute("data-board-id", responseData.data.boardId); // 속성(속성, 값)들을 추가해줄 수 있음
      editBtn.setAttribute("data-board-id", responseData.data.boardId);
      // commonBtns.forEach((btn) => {
      //   btn.classList.add("active");
      // })
      btnBox.classList.remove("active");
      if (responseData.data.userId == userId) {
        btnBox.classList.add("active");
      }

      changePages(pageDetail);
    }
  } catch (error) {}
}

//게시물 추가 요청 함수
async function addBoard(event) {
  event.preventDefault();

  //요청 보내기전 필요한 데이터 가져오기
  const userInfo = await getPayload();

  const titleInput = document.querySelector("#write-title");
  const contentInput = document.querySelector("#write-content");

  const accessToken = localStorage.getItem("AccessToken");

  //혹시 모를 accessToken이 없는 경우 (유효성 검사)
  //요청에는 accessToken이 필요하니까
  if (!accessToken) {
    alert("글을 작성하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  //항목에 빈값을 입력하거나 공백을 입력했을 경우 (유효성 검사)
  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  //요청을 위한 body 데이터 객체 만들기 (포장)
  const boardData = {
    title: titleInput.value,
    content: contentInput.value,
    userId: userInfo.jti,
  };

  try {
    //요청 보내기
    const response = await fetch(`${API_BASE_URL}/board/add`, {
      method: "POST",
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
      await renderBoard();
      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 등록 중 오류가 발생했습니다.");
  }
}

// 게시판 수정 요청
async function editBoard() {
  const accessToken = localStorage.getItem("AccessToken");
  const boardId = editBtn.dataset.boardId;

  if (!accessToken) {
    alert("글을 수정하려면 로그인이 필요합니다.");
    changePages(pageSignin);
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
      titleInput.value = responseData.data.title;
      contentInput.value = responseData.data.content;
      changePages(pageEdit);
    }
  } catch (error) {}
}

async function edit(event) {
  event.preventDefault();

  const accessToken = localStorage.getItem("AccessToken");
  const boardId = editBtn.dataset.boardId;

  if (!accessToken) {
    alert("게시물을 조회하려면 로그인이 필요합니다.");
    changePages(pageSignin);
    return;
  }

  const updateData = {
    boardId: boardId,
    title: titleInput.value,
    content: contentInput.value,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/board/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
      await renderBoard();
      changePages(pageBoard);
    } else {
      alert(responseData.message);
      await renderBoard();
      changePages(pageBoard);
    }
  } catch (error) {
    console.log(error);
    alert("게시물 수정 중 오류가 발생했습니다.");
  }
}

//로그인 요청 함수
async function signinHandler(event) {
  event.preventDefault();

  const usernameInput = document.querySelector("#signin-id");
  const passwordInput = document.querySelector("#signin-password");

  const signinData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

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

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      localStorage.setItem("AccessToken", responseData.data);
      signinForm.reset();

      location.reload();
    }
  } catch (error) {
    console.log(error);
    alert("서버와 통신 중 오류가 발생했습니다.");
  }
}

//회원가입 요청 함수
async function signupHandler(event) {
  event.preventDefault(); //폼의 기본 동작을 막기위해

  const usernameInput = document.querySelector("#signup-id");
  const passwordInput = document.querySelector("#signup-password");
  const emailInput = document.querySelector("#signup-email");

  //서버로 보낼 회원가입 데이터를 객체로 만듦
  const signupData = {
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  //입력값이 비어있는지 확인
  if (!signupData.username || !signupData.password || !signupData.email) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST", //요청 방식 POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData), //자바스크립트 객체를 json 문자열로 변환
    });

    const responseData = await response.json(); //요청 응답 결과

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      signupForm.reset(); //폼의 입력내용 초기화
      changePages(pageSignin);
    }
  } catch (error) {
    //요청 자체에 실패한 경우(문제가 생겼을 경우)
    console.log("회원가입 요청 요류 발생:", error);
    alert("회원가입 요청에 오류가 발생했습니다.");
  }
}

async function changePassword(event) {
  event.preventDefault();

  const oldPasswordInput = document.querySelector("#old-password");
  const newPasswordInput = document.querySelector("#new-password");
  const newConfirmPasswordInput = document.querySelector(
    "#new-confirm-password"
  );

  const accessToken = localStorage.getItem("AccessToken");

  const userInfo = getPayload(accessToken);

  if (!accessToken) {
    alert("잘못된 접근입니다.");
    changePages(pageSignin);
    return;
  }

  if (newPasswordInput.value !== newConfirmPasswordInput.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const passwordData = {
    userId: userInfo.jti,
    oldPassword: oldPasswordInput.value,
    newPassword: newPasswordInput.value,
  };

  if (!passwordData.oldPassword || !passwordData.newPassword) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/account/change/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(passwordData),
    });

    const responseData = await response.json();

    if (responseData.status !== "success") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
      localStorage.removeItem("AccessToken");
      location.reload(true);
    }
  } catch (error) {
    console.log(error);
    alert("비밀번호 변경 요청에 오류가 발생했습니다.");
  }
}

navSignin.addEventListener("click", () => {
  changePages(pageSignin);
});
navSignup.addEventListener("click", () => {
  changePages(pageSignup);
});
navLogout.addEventListener("click", () => {
  if (confirm("정말 로그아웃 하시겠습니까?")) {
    localStorage.removeItem("AccessToken");
    location.reload(true);
  } else {
    return;
  }
});
navPassword.addEventListener("click", () => {
  changePages(pagePassword);
});
navBoard.addEventListener("click", renderBoard);
navWrite.addEventListener("click", () => {
  changePages(pageWrite);
});

backBtn.addEventListener("click", renderBoard);
deleteBtn.addEventListener("click", removeBoard);
// editFinBtn.addEventListener("click", () => {
//   edit;
// });

editBtn.addEventListener("click", editBoard);

signupForm.addEventListener("submit", signupHandler);
signinForm.addEventListener("submit", signinHandler);
writeForm.addEventListener("submit", addBoard);
passwordForm.addEventListener("submit", changePassword);
editForm.addEventListener("submit", edit); //

//HTML 문서가 완전히 로드되고 파싱되었을때
document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("AccessToken");

  if (accessToken) {
    navSignin.style.display = "none";
    navSignup.style.display = "none";
    await renderBoard();
  } else {
    navLogout.style.display = "none";
    navPassword.style.display = "none";
    changePages(pageSignin);
  }
});
