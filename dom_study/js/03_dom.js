const addButton = document.querySelector(".add-btn");

// 변동 가능한 변수
let indexNum = 1;

addButton.onclick = () => {
  const inputName = document.querySelector("#input-name");
  const nameValue = inputName.value;
  const inputAge = document.querySelector("#input-age");
  const ageValue = inputAge.value;
  const inputAddress = document.querySelector("#input-address");
  const addressValue = inputAddress.value;

  const tableBody = document.querySelector(".table");
  //   tableBody.innerHTML += `<tr>
  //                          <td>${indexNum++}</td>
  //                             <td>${inputName.value}</td>
  //                             <td>${inputAge.value}</td>
  //                             <td>${inputAddress.value}</td>
  //                         </tr>`;

  tableBody.innerHTML += `<tr>
                         <td>${indexNum++}</td>
                            <td>${nameValue}</td>
                            <td>${ageValue}</td>
                            <td>${addressValue}</td>
                        </tr>`;

  // 만약 input 값이 빈값이면
  //   if (inputName.value === "") {
  //     alert("빈칸입니다.");
  //     return;
  //   } else if (inputAge.value === "") {
  //     alert("빈칸입니다.");
  //     return;
  //   } else if (inputAddress.value === "") {
  //     alert("빈칸입니다.");
  //     return;
  //   }

  if (inputName.value === "" || inputAge === "" || inputAddress === "") {
    alert("빈칸입니다.");
    return;
  }

  // 입력시 빈 창으로 바뀜
  inputName.value = "";
  inputAge.value = "";
  inputAddress.value = "";
};
