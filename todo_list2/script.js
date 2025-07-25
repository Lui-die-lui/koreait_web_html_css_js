const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

let todos = [];
let nextTodoId = 1;

// localstorage
// 웹 브라우저가 제공하는 작은 데이터 저장 공간
// 로컬스토리지는 항상 문자열 형태로 저장
// 이름(키)과 내용(값)을 한 쌍 => JSON 문자열 형태
// 과정의 중간 형태 - json

// 현재 투두 데이터를 로컬스토리지에 저장하는 함수
// localStorage.getItem - 가져옴
// localStorage.setItem - 저장함
// localStorage.removeItem - 지워줌
function saveTodoLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  // JSON.stringify() - 자바 스크립트의 객체나 배열을 JSON문자열 형태로 변환
}

// 로컬스토리지에서 투두 데이터를 불러오는 함수
function loadTodoLocalStorage() {
  const localStorageTodo = localStorage.getItem("todos");

  if (localStorageTodo) {
    // stringify반대
    todos = JSON.parse(localStorageTodo);
    // console내에 정보가 상세하게 보임
    console.log(todos);
    // 0보다 크다면 - 1개라도 있다는 말
    if (todos.length > 0) {
      // 들어가는 값들 중 가장 큰 값
      nextTodoId = Math.max(...todos.map((todo) => todo.id)) + 1;
      // 저장되어 있는 투두를 불러와 다음 할 일을 추가할때 사용할 Id를 설정
      // 투두들 중 가장 큰 Id를 가져와서 +1을 해줌
    } else {
      nextTodoId = 1;
    }
  } else {
    // localstoragetodo가 없다면
    todos = [];
    nextTodoId = 1;
  }
}

function renderTodo() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = todo.id;
    //요소에 추가적인 사용자 정의 데이터 저장
    //개발자가 특정 HTML 요소에 추가적인 데이터를 저장할 목적으로 사용
    //브러우저는 이 속성들을 특별히 해석하지 않는다

    if (todo.isEditing) {
      listItem.classList.add("editing");

      listItem.innerHTML = `
				<input type="text" class="edit-input" value="${todo.text}">
				<div class="todo-actions">
					<button class="save-btn">저장</button>
					<button class="cancel-btn">취소</button>
				</div>
			`;
    } else {
      listItem.innerHTML = `
				<span class="todo-text">${todo.text}</span>
				<div class="todo-actions">
					<button class="edit-btn">수정</button>
					<button class="delete-btn">삭제</button>
				</div>
			`;
    }

    todoList.appendChild(listItem);
  });
}

function addTodo() {
  const todoText = todoInput.value.trim(); //입력된 텍스트 가져와서 양쪽 공백제거

  if (todoText === "") {
    alert("할 일을 입력해주세요!");
    return;
  }

  const newTodo = {
    id: nextTodoId++,
    text: todoText,
    isEditing: false, //수정 중인지 여부를 나타내는 플래그
  };

  todos.push(newTodo);
  saveTodoLocalStorage();
  todoInput.value = "";
  todoInput.focus();

  renderTodo();
}

function deleteTodo(id) {
  if (!confirm("정말 삭제하시겠습니까?")) {
    return;
  } else {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodoLocalStorage();
    renderTodo();
  }
}

function editTodo(id) {
  // 맵을 돌리면서 해당 id만 isEditing = true
  todos = todos.map((todo) =>
    // 삼항 연산
    todo.id === id
      ? // 같다면
        { ...todo, isEditing: true }
      : //아니라면
        { ...todo, isEditing: false }
  );
  saveTodoLocalStorage();
  renderTodo();

  // 수정을 활성화 한 input
  const editInput = todoList.querySelector(`li[data-id="${id}"] .edit-input`);
  if (editInput) {
    editInput.focus();
    editInput.select();
  }
}

function saveTodo(id, newText) {
  if (newText.trim() === "") {
    alert("수정할 내용을 입력해주세요");
    return;
  }
  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          text: newText.trim(),
          isEditing: false,
        }
      : todo
  );
  saveTodoLocalStorage();
  renderTodo();
}

function cancelTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isEditing: false } : todo
  );
  renderTodo();
}

addTodoBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoBtn.click();
  }
});

todoList.addEventListener("click", (event) => {
  const target = event.target; //클릭된 요소
  const listItem = target.closest("li[data-id]");
  //클릭된 요소의 가장 가까운 부모 li 근데 이제 data에 id 속성을 가진

  if (!listItem) return; //li 요소를 찾기 못했다면 함수 종료

  const todoId = parseInt(listItem.dataset.id);

  if (target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  } else if (target.classList.contains("edit-btn")) {
    editTodo(todoId);
  } else if (target.classList.contains("save-btn")) {
    const editInput = listItem.querySelector(".edit-input");
    saveTodo(todoId, editInput.value);
  } else if (target.classList.contains("cancel-btn")) {
    cancelTodo(todoId);
  }
});

loadTodoLocalStorage();
renderTodo();
