function handleDeleteButtonOnclick(studntId) {
  // 팝업 뜸
  if (!confirm("삭제 하시겠습니까?")) return;

  // 같은거면 걸러짐/ 같은 아이디 제외해서 반환(삭제한것과 같은 로직)
  studentList = studentList.filter((student) => student.id !== studntId);

  loadStudentList();
}

function loadStudentList() {
  const studentLis = studentList
    .map(() => {
      const text = `${studentLis.id}.${studentLis.name}(${studentLis.age}-${studentLis.address})`;

      // 학생 명수만큼 쌓임
      return `
    <li>
        ${text}
        <button onclick="handleDeleteButtonOnclick(${studentLis.id})">삭제</button>
    </li>`;
    })
    .join("");

  const studentListUl = document.querySelector(".student-list");

  studentListUl.innerHTML = studentLis;
}
