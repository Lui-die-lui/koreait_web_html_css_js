const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

// 담아야해서 빈 배열
let todos = [];
let nextTodoId = 1;

function addTodo() {
  //   console.log("추가 버튼 클릭됨");
  const todoText = todoInput.value.trim(); // 입력된 텍스트 양쪽 공백 제거

  if (todoText === "") {
    alert("할 일을 입력해주세요!");
    return;
  }

  // todo의 형태
  const newTodo = {
    id: nextTodoId++,
    text: todoText,
    isEditing: false, // 수정 중인지 여부를 나타내는 플러그
  };

  todos.push(newTodo);
  console.log(todos);
  todoInput.value = "";
  todoInput.focus();
}

// 이벤트의 종류 기입 함수(괄호가 있으면) = 바로 호출
addTodoBtn.addEventListener("click", addTodo);
// 클릭하면 addTodo

// 엔터
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoBtn.click();
  }
});
