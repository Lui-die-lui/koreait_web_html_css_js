// promise chaining
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
// promise.then().then().then()....
// promise chaining을 사용하게 되면 여러가지 비동기 작업을
// 연속적으로 수행할 수 있다.
// promise
//   .then((data) => {
//     console.log(data);
//     return getData();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// promise
//   // 각각 다른 호출이 될 수도 있음
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => getData())
//   .then((data) => console.log(data));

promise
  .then(() => {
    console.log(data);
    return "hello";
    // 값을 리턴하게 되면 promise의 resolve에 해당 값이 전달됨
  })
  .then((data) => {
    console.log(data);
  });
