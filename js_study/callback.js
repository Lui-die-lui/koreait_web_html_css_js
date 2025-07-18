// 콜백함수
// 다른 함수의 인자로 전달되는 함수

// 비동기 콜백
// 비동기 작업이 완료된 후에 호출되는 콜백함수

// 데이터를 뽑아와서 출력
// function printData(data) {
//   console.log(data);
// }

// function getData(callback) {
//   // 서버 통신을 흉내냄
//   setTimeout(() => {
//     console.log("서버에서 데이터를 받아왔어요");
//     callback({ name: "이슬기" });
//   }, 2000);
// }

// // 익명함수 -> 인자를 받아와서 data(callback) 출력
// getData((data) => {
//   console.log(data);
// });

// getData(printData);

// 쇼핑몰
// 로그인
function login(username, callback) {
  setTimeout(() => {
    callback(username);
  }, 1000);
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
// 위처럼 콜백함수가 계속 중첩되면 콜백지옥이 발생