// 쇼핑몰

const { reject } = require("async");

// 로그인
function login(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username) {
        resolve(username);
      } else {
        reject(new Error(".사용자 이름 없음"));
      }
    }, 1000);
  });
}

function addToCart(product) {
  return new Promise();
}

// 장바구니
function addToCart(product, callback) {
  setTimeout(() => {
    callback(product);
  }, 1000);
}
// 결제하기
function checkOut(cardNumber, product, callback) {
  setTimeout(() => {
    callback(cardNumber, product); //*
  }, 1000);
}
// 로그인의 username이 넘어옴
login("이슬기", (username) => {
  // 물결표
  console.log(`${username}님이 로그인했습니다.`);
  // 함수 호출
  addToCart("감자", (product) => {
    console.log(`${product}가 장바구니에 추가되었습니다.`);
    // 호출 (*)
    checkOut("1234 5678 9101 1234", product, (cardNumber, product) => {
      console.log(
        `${product}에 대한 결제가 완료되었습니다. 카드번호 : ${cardNumber}`
      );
    });
  });
});

function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "이슬기" }; // 서버에서 받아온 데이터
      if (data) {
        //**
        console.log("서버 요청 성공");
        resolve(data); // then은 resolve와 연결
      } else {
        reject(new Error("네트워크 문제가 발생함"));
      }
      // console.log("네트워크 요청 성공");
    }, 2000);
  });
  return promise;
}

const promise = getData();
