//쇼핑몰
//로그인
function login(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username) {
        resolve(username);
      } else {
        reject(new Error("사용자 이름없음"));
      }
    }, 1000);
  });
}
//장바구니 담기
function addToCart(product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product) {
        resolve(product);
      } else {
        reject(new Error("상품이 없음"));
      }
    }, 1000);
  });
}
//결제하기
function checkOut(cardNumber, product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cardNumber && product) {
        resolve(product);
      } else {
        reject(new Error("카드번호 또는 제품 없음"));
      }
    }, 1000);
  });
}

// login("이동윤", (username) => {
//   console.log(`${username}님이 로그인했습니다.`);
//   addToCart("감자", (product) => {
//     console.log(`${product}가 장바구니에 추가되었습니다.`);
//     checkOut("1234-5678-9012-3456", product, (cardNumber, product) => {
//       console.log(
//         `${product}에 대한 결제가 완료되었습니다. 카드번호 : ${cardNumber}`
//       );
//     });
//   });
// });

login("이동윤")
  .then((username) => {
    console.log(`${username}님이 로그인했습니다.`);
    return addToCart("감자");
  })
  .then((product) => {
    console.log(`${product}가 장바구니에 추가되었습니다.`);
    return checkOut("1234-5678-9012-3456", product);
  })
  .then((product) => {
    console.log(`${product}에 대한 결제가 완료되었습니다.`);
  })
  .catch((error) => {
    console.log(error);
  });