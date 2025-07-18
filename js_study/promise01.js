// promise는 기본적으로 자바스크립트의 비동기처리에 사용되는 객체

// promise객체는 state와 result라는 속성을 가지고 있다
// state에는 3가지가 있다.

// 대기 (panding) : 초기 상태, 비동기 작업이 아직 완료되지 않은 상태
// --result : undefined

// 이행 (fulfilled) : 비동기 작업이 성공적으로 완료된 상태
// --result : 성공적으로 완료된 결과값

// 거부 (rejected) : 비동기 작업이 실태한 상태
// --result : 실패한 이유(에러)

// promise의 인자로 함수를 전달받는데 이것을 excutor라고 한다
// 객체 생성과 동시에 즉시 실행됨
// excutor의 인자인 resolve는 비동기 작업이 성공했을때 호출하는 함수
// excutor의 인자인 reject는 비동기 작업 실패했을때 호출하는 함수
// 항상 있어서 따로 넣어주지 않아도 됨
function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "이슬기" }; // 서버에서 받아온 데이터
      if (data) {
        //**
        console.log("서버 요청 성공");
        resolve(data); // then은 resolve와 연결 - resolve의 인자로는 비동기작업의 결과물을 이어준다
      } else {
        reject(new Error("네트워크 문제가 발생함"));
        // reject 의 인자로는 에러 객체를 넣어준다
      }
      // console.log("네트워크 요청 성공");
    }, 2000);
  });
  return promise;
}

// 완료되기전에 먼저 출력됨
console.log(promise);

// Promise {<fulfilled>: undefined}
// setTimeout(() => {
//   console.log(promise);
// }, 3000);

const promise = getData();
// then/catch/finally
promise.then((data) => {
  //**
  //결과값을 매개변수로 받아옴
  //then은 promise가 이행(fulfilled)되었을때 호출되는 콜백함수
//   console.log(data);
  const name = data.name
  console.log(`이름은 ${name}입니다.`)
})
.catch((error) => {
    // catch는 promise가 거부(rejected)되었을때 호출되는 콜백함수
    // console.log(error);
    console.log("에러 처리");
})

.finally(() => {
    // 성공/실패 여부와 상관없이 항상 호출되는 콜백함수
    console.log("마무리 작업");
})
