// Javascript의 Class

class Student {
  name;
  age;

  // 생성자(constructor): 클래스의 인스턴스를 생성할때 호출되는 메서드
  constructor(name, age) {
    this.name = name; // 현재 객체 => this
    this.age = age;
  }
}

// 클래스 인스턴스 생성: new 키워드로 생성
const newStudent1 = new Student("이슬기", 30);
console.log(newStudent1); // 전체 다
console.log(newStudent1.name); // 이름만
