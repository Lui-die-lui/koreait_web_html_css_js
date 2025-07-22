let studentInputValue = {
  id: 0,
  name: "",
  age: "",
  address: "",
};

function handleRegisterOnkeyup(e) {
  studentInputValue = {
    ...studentInputValue,
    [e.target.name]: e.target.value,
  };
}

const handleRegisterOnclick = (e) => {
  let newId = 1;
  // app.js에 있음
  if (studentList.length > 0) {
    // 마지막꺼 들고옴
    const lastStudent = studentList[studentList.length - 1];
    newId = lastStudent.id + 1;
  }

  // ㅜㅜ
  const newStudent = {
    ...studentInputValue,
    id: studentList.length + 1,
  };

studentList = [studentList, newStudent]

  console.log(newStudent);
};

function studentRegister() {
  return `
    <div>
    ${studentRegisterInput({
      type: "text",
      name: "name",
      onkeyup: "",
      // handleRegisterOnkeyup 들어감
    })}
    ${studentRegisterInput({
      type: "text",
      name: "age",
      onkeyup: "",
    })}
    ${studentRegisterInput({
      type: "text",
      name: "address",
      onkeyup: "",
    })}
    <div>
    <button onclick="handleRegisterOnclick(event)">등록</button>
    </div>
    </div>`;
}
