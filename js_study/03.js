// 객체
// key value 형태
const student = {
  name: "이슬기",
  age: 30,
};

console.log(student);
console.log(student.name);
console.log(student.age);
console.log(student["name"]);
console.log(student["age"]);
const a = "name";
const b = "age";
console.log(student[a]);
console.log(student[b]);

student[a] = "lsg";
console.log(student);
student.name = "LSG";
console.log(student);

// 객체에 함수를 추가하는 방법
student.printName = () => console.log("이름 : ", student.name);
student.printName();

const loginButton = {
  text: "로그인",
  value: "text",
  onclick: () => {
    console.log(loginButton.text);
  },
};

// 텍스트 출력
loginButton.onclick();

loginButton.onclick = () => {
  console.log("로그인 버튼을 클릭하였습니다.");
};

// 재할당된 텍스트 출력
loginButton.onclick();

console.log(typeof loginButton); // object(객체)로 뜸

// Object.keys(), Object.values(), Object.entries()
const loginButtonKeys = Object.keys(loginButton);
console.log(loginButtonKeys);

for (let i = 0; i < loginButtonKeys.length; i++) {
  const keyName = loginButtonKeys[i];
  console.log(loginButton[keyName]);
}

// [Function (anonymous)] - 익명함수라서

const loginButtonValues = Object.values(loginButton);
console.log(loginButtonValues);

for (let i = 0; i < loginButtonValues.length; i++) {
  console.log(loginButtonValues[i]);
}

const loginButtonEntries = Object.entries(loginButton);
console.log(loginButtonEntries);
for (let i = 0; i < loginButtonEntries.length; i++) {
  const entry = loginButtonEntries[i];
  const key = entry[0];
  const value = entry[1];
  console.log(entry, key, value);
}

// 향상된 for문
for (let entry of loginButtonEntries) {
  const key = entry[0];
  const value = entry[1];
  console.log(entry, key, value);
}
