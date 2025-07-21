/*
async(비동기 함수 정의 키워드)
await(비동기 함수 동기 호출 키워드)
await는 async 함수 내부에서만 사용 가능
await는 promise가 resolve될때까지 기다렸다가 그 결과를 변수에 할당
*/

// const promise = new Promise((resolve) => resolve("개발자"));

// // 비동기 함수 정의됨
// async function getDate() {
//   // async키워드가 함수 자체를 비동기 함수로 만듦(함수 자체가 promise)
//   return promise;
//   // 이렇게 한다고 해서 프로미스에 프로미스가 감싸진 형태는 아니다.
//   // async는 상관없게됨 => 바꿔치기...? 덮어씌워짐...?
// }

// const user = getDate();
// // console.log(user)
// // 결과 꺼내기 가능
// user.then((name) => console.log(name));

// function getUserReq() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("사용자 데이터를 받아옴");
//       return resolve("서버1");
//     }, 2000);
//   });
// }

// async function getData() {
//   //   getUserReq();
//   // 비동기 함수가 끝날때까지 다음 작업이 기다려주지 않음(비동기)
//   const result = await getUserReq();
//   const result2 = await getUserReq(); //여러번 호출 가능 - 순서대로 함
//   // 해당 비도기 작업이 완료될 때까지(resolve될때까지) 기다림
//   // - await는 async 안에서만 사용 가능
//   return result; // resolve값
//   return result2; // resolve값
// }

// 위와 같이 동작
// function getDataPromise() {
//   return getUserReq()
//     .then(() => {
//       return getUserReq();
//     })
//     .then(() => {
//       return getUserReq();
//     });
// }

// const user = getData();
// user.then((name) => console.log(name));

function getUserReq() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("사용자 데이터를 받아옴");
      return resolve("서버1");
    }, 2000);
  });
}

async function getUser() {
  await getUserReq();
  return "이슬기";
}

async function getTodo() {
  await getUserReq();
  return ["밥먹기", "잠자기"];
}

// async function getData() {
//   const user = getUser()
//   const todo = getTodo()
//   console.log(`${user}님 ${todo}를 해야합니다.`)  
// }
// //[object Promise]님 [object Promise]를 해야합니다.
// getData()

async function getData() {
  const user = await getUser() // 동기 처리를 해줘야함
  const todo = await getTodo()
  console.log(`${user}님 ${todo}를 해야합니다.`)  
}
//[object Promise]님 [object Promise]를 해야합니다.
getData()