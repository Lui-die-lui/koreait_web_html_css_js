// const todoInput = document.querySelector("#todoInput");
// const addTodoBtn = document.querySelector("#addTodoBtn");
// const todoList = document.querySelector("#todoList");

// // 담아야해서 빈 배열
// let todos = [];
// let nextTodoId = 1;

// // li로 집어넣기
// function renderTodo() {
//   // 배열 비우기
//   todoList.innerHTML = "";

//   // 순회해서 만든다음 한번에 집어넣기
//   // todos 안의 todo 가져오기
//   todos.forEach((todo) => {
//     // 없는 태그를 만들어서 가져옴
//     const listItem = document.createElement("li");
//     listItem.dataset.id = todo.id;
//     // dataset
//     // 요소에 추가적인 사용자 정의 데이터 저장
//     // 개발자가 특정 HTML요소에 추가적인 데이터를 저장할 목적으로 사용
//     // 브라우저는 이 속성들을 특별히 해석하지 않는다.

//     // 수정 중일때
//     if (todo.isEditing) {
//       // 클래스명 추가(html)
//       listItem.classList.add("editing");
//       // 수정 중이 아닐때
//       // li 하나에 하나가 들어가야하니까 =
//       todoList.innerHTML = `
//           <span class="edit-input">${todo.text}</span>
//           <div class="todo-actions">
//             <button class="save-btn">저장</button>
//             <button class="cancel-btn">취소</button>
//           </div>
//       `;
//     } else {
//       todoList.innerHTML = `

//           <span class="todo-text">${todo.text}</span>
//           <div class="todo-actions">
//             <button class="edit-btn">수정</button>
//             <button class="delete-btn">삭제</button>
//           </div>

//       `;
//     }
//     // ul 자식으로 들어감
//     todoList.appendChild(listItem);
//   });
// }

// function addTodo() {
//   //   console.log("추가 버튼 클릭됨");
//   const todoText = todoInput.value.trim(); // 입력된 텍스트 양쪽 공백 제거

//   if (todoText === "") {
//     alert("할 일을 입력해주세요!");
//     return;
//   }

//   // todo의 형태
//   const newTodo = {
//     id: nextTodoId++,
//     text: todoText,
//     isEditing: false, // 수정 중인지 여부를 나타내는 플러그
//   };

//   todos.push(newTodo);
//   console.log(todos);
//   todoInput.value = "";
//   todoInput.focus();

//   renderTodo();
// }

// function deleteTodo(id) {
//   if (!confirm("정말 삭제하시겠습니까?")) {
//     return;
//   } else {
//     todos = todos.filter((todo) => todo.id !== id);
//     // 지워놓고 다시 render
//     renderTodo();
//   }
// }

// // 이벤트의 종류 기입 함수(괄호가 있으면) = 바로 호출
// addTodoBtn.addEventListener("click", addTodo);
// // 클릭하면 addTodo

// // 엔터
// todoInput.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     addTodoBtn.click();
//   }
// });

// todoList.addEventListener("click", (event) => {
//   // 해당 이벤트가 일어난 요소를 가져옴(클릭된 요소)
//   const target = event.target;
//   const listItem = target.closest("li[data-id]");
//   // 클릭된 요소의 가장 가까운 부모 li근데 이제 data에 id 속성을 가진

//   if (!listItem) return; // li요소를 찾지 못했다면 함수 종료

//   const todoId = parseInt(listItem.dataset.id);

//   if (target.classList.contains("delete-btn")) {
//     deleteTodo(todoId);
//   }
// });

// ====================================

const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

let todos = [];
let nextTodoId = 1;

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
  console.log(todos);
  todoInput.value = "";
  todoInput.focus();

  renderTodo();
}

function deleteTodo(id) {
  if (!confirm("정말 삭제하시겠습니까?")) {
    return;
  } else {
    todos = todos.filter((todo) => todo.id !== id);
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
