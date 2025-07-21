// REST문법과 Spread 문법
const student = {
  name: "이슬기",
  age: 30,
  address: "부산시",
  phone: "010-0000-0000",
};

const { name, address } = student;
console.log(name, address);

// REST문법
// 나머지 속성들을 새로운 객체 또는 배열로 묶을 때 사용

const { age, phone, ...a } = student;
console.log(age, phone, a);
// 이슬기 부산시
// 30 010-0000-0000 { name: '이슬기', address: '부산시' } => 비구조 할당이 되어있지 않은 새로운 객체 생성

const numbers = [1, 2, 3, 4];
const [n1, n2, ...ns] = numbers;
console.log(n1, n2, ns); //  1 2 [ 3, 4 ] 새로운 배열 생성

// Spread 문법
// 기존 객체의 모든 속성을 새로운 객체에 복사하거나,
// 새로운 속성을 추가할 때 사용
const newStudent = {
  ...student, // student 객체에 있던 모든 속성을 여기에 복사
  gender: "여", // gender 라는 새로운 속성 추가
};
console.log(newStudent);

const newNumbers = [...numbers, 5, 6];
console.log(newNumbers); // [ 1, 2, 3, 4, 5, 6 ] 배열도 동일

let names = [];

function addName(name) {
  names = [...names, name];
}
addName("이슬기");
addName("이슬기01");
console.log(names); // [ '이슬기', '이슬기01' ]

let obj = {
  data1: "data1",
  data2: "data2",
};

function addProps(props) {
  obj = {
    ...obj,
    ...props,
  };
}

// 객체 형태로 전달 -> spread 문법으로 풀어야함
addProps({ data3: "data3", data4: "data4" });
console.log(obj);
// { data1: 'data1', data2: 'data2', data3: 'data3', data4: 'data4' }

// score 변수에 임의의 숫자를 할당
// 조건에 따라스 등급을 부여
// 90점 이상이면 A
// 80점 이상이면 B
// 70점 이상이면 C
// 나머지 F

const score = 90;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}

// for문을 이용해서 1부터 20까지 숫자 중 짝수만 출력
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// title, author, publisherYear 속성을 포함하는 book 객체 생성
// 해리포터, J.K 롤링, 1997
// book 객체의 title과 author 속성 값을 출력 (점 표기법, 대괄호 표기법)
// book 객체에 getAge()라는 메소드 추가
// 현재 연도 (new Date().getFullYear()) 에서 publisherYear를 뺀 값을 리턴
// getAge() 호출해서 출력
// book 객체에 새로운 속성 genre 를 추가하고 값을 할당("판타지")
// book 객체의 publisherYear를 2000 으로 수정

const book = {
  title: "해리포터",
  author: "J.K롤링",
  publisherYear: 1997,
};

console.log(book.title);
//대괄호 표기법 ?
console.log(book["author"]);

book.getage = () => {
  const currentYear = new Date().getFullYear;
  return currentYear - book.publisherYear;
};

console.log(book.getage());

book.genre = "판타지";

book.publisherYear = 2000;

// 필터링: filter() - 주어진 조건 함수를 통과하는 모든 요소로 새로운 배열을 만듭니다.
// 원본 배열은 영향을 주지 않음
// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers.filter((n) => n % 2 === 0)); // 짝수
// const even = numbers.filter((n) => n % 2 === 0);

// 해당 나이만 반환
// console.log(students.filter((students) => students.age === 30));
// students.stream().filter(students -> students.getAge == 30).collect(Collector.toList())

//map() - 배열의 모든 요소에 대해 주어진 함수를 호출(적용)한 결과를 모아 새로운 배열을 반환
// console.log(numbers.map((n) => n * 10));
// console.log(
//   students.map((student) => {
//     // 나이가 30 인 학생은 이름만 있는 새로운 객체를 반환
//     if (student.age === 30) {
//       return {
//         name: student.name,
//       };
//     }
//     return student;
//   })
// );

// // [
// //   { name: '이슬기' },
// //   { name: '이슬기02' },
// //   { name: '이슬기03', age: 32 },
// //   { name: '이슬기04' },
// //   { name: '이슬기05', age: 32 }
// // ]

const products = [
  { id: 1, name: "노트북", price: 1200000, category: "전자제품" },
  { id: 2, name: "티셔츠", price: 25000, category: "의류" },
  { id: 3, name: "모니터", price: 300000, category: "전자제품" },
  { id: 4, name: "청바지", price: 50000, category: "의류" },
  { id: 5, name: "마우스", price: 15000, category: "전자제품" },
];
//1. 50000원 이상인 제품만 필터링해서 expensiveProducts 배열에 넣고 출력
//2. products배열에서 각 제품의 이름과 가격만 포함하는 productNamesAndPrices배열 만들기
// [{name: "노트북", price: 1200000}, {}...]
//3. products배열에서 category가 전자제품인 제품만 선택해서 각 제품의 이름과 가격을
//10%할인한 discountProducts배열을 만드세요

//map() - 배열의 모든 요소에 대해 주어진 함수를 호출(적용)한 결과를 모아 새로운 배열을 반환
console.log(products.filter((products) => products.price >= 50000));

console.log(
  products.map((n) => {
    return {
      name: n.name,
      price: n.price,
    };
  })
);



//=================================================
const baseConfig = {
  theme: "dark",
  fontSize: "16px",
  language: "ko",
};

// newConfig를 만드세요.
// theme는 "light"로 변경하고,
// padding: "20px" 속성을 새로 추가하세요.

// 객체 Spread 문법을 사용하여 newConfig 생성
//==================================================
const arr1 = [1, 2, 3];
const arr2 = [4, 5];

// 배열 Spread 문법을 사용하여 배열 합치기

const newConfig = {
  ...baseConfig,
  theme: "light",
  padding: "20px",
};

console.log(newConfig);

const arr = [...arr1, ...arr2];
console.log(arr);

