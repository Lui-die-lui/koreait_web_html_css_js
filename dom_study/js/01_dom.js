const title1 = document.getElementById("title");
// 태그의 id를 통해 선택
console.log(title1);

// 비구조 할당 - 속성들이 풀어서 써짐
console.log({ title1 });

const titles = document.getElementsByClassName("title");
// 태그의 class를 통해서 선택
console.log(titles);

const h3 = document.getElementsByTagName("h3");
// 태그명을 통해서 선택
console.log(h3);

const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
console.log(d1);
console.log(d2);

//  # 으로 아이디 구분(선택)함
const title2 = document.querySelector("#title");
console.log(title2);
console.log(title2.innerHTML);
// 값을 바꿀 수 도 있음
title2.innerHTML = "다른 제목";

// 클래스 명 또는 태그명
const titles2 = document.querySelectorAll(".title");
// class 다중 선택
console.log(titles2);

const h3s = document.querySelectorAll("h3");
console.log(h3s);
// NodeList(2) [h3.title, h3]

const d11 = document.querySelector("#d1");
const d22 = d11.querySelector("#d2");
// d22.innerHTML = "이슬기";

const d222 = document.querySelector("#d1 > #d2");
// HTML로 들어감
d222.innerHTML = "<p>innerHTML</p>";
// 내용으로 들어감
d222.innerText = "<p>innerText</p>";

const students = [
  { name: "이슬기", age: 30, address: "부산광역시" },
  { name: "김주엽", age: 23, address: "런던" },
  { name: "최호진", age: 17, address: "시애틀" },
];

const studentTableTbody = document.querySelector(".student-table > tbody");

// map을 통해 배열을 하나씩 저장
const studentTrs = students.map((s, index) => {
  return `<tr>
    <td>${index + 1}</td>
    <td>${s.name}</td>
    <td>${s.age}</td>
    <td>${s.address}</td>
    </tr>`;
});

studentTableTbody.innerHTML = studentTrs.join("");

const tdList = document.querySelectorAll("td");
//  <td>${index + 1}</td>
//     <td>${s.name}</td>
//     <td>${s.age}</td>
//     <td>${s.address}</td> 선택됨

// css 가능
tdList.forEach((td) => (td.style = "border: 1px solid black"));

// id 부여 or 테이블 추가
const studentTable = document.querySelector(".student-table");
studentTable.id = "table-student";
// 추가 삭제 가능
studentTable.classList.add("student");
studentTable.classList.remove("student-table");
