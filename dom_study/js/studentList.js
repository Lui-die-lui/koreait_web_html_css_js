function handleDeleteButtonOnclick(studentId) {
	if (!confirm("삭제하시겠습니까?")) return;

	studentList = studentList.filter((student) => student.id !== studentId);

	loadStudentList();
}

function loadStudentList() {
	const studentLis = studentList
		.map((student) => {
			const text = `${student.id}. ${student.name}(${student.age} - ${student.address})`;

			return `
            <li>
                ${text}
                <button onclick="handleDeleteButtonOnclick(${student.id})">삭제</button>
            </li>
        `;
		})
		.join("");

	const studentListUl = document.querySelector(".student-list");

	studentListUl.innerHTML = studentLis;
}