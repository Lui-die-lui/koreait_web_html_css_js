const submitButton = document.querySelector(".input-button");

submitButton.onclick = () => {
  const input = document.querySelector(".inputs");
  const dataList = document.querySelector(".data-list");

  // 알림창 띄움
  // 만약 input 값이 빈값이면
  if (input.value === "") {
    alert("빈칸입니다.");
    return;
  }
  // 리스트로 입력됨
  dataList.innerHTML += `<li>${input.value}</li>`;

  // 입력시 빈 창으로 바뀜
  input.value = "";
};
