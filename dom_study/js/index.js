// 결과 넣어줌
// 웹페이지의 리소스가 전부 로드가 다 되었을때
// 브라우저에 웹페이지가 켜질때

window.onload = () => {
  const root = document.querySelector("#root");

  // 여기서 렌더링을 시켜주는 함수를 호출
  // html에 존재<div>
  render(root);
};

function render(targetElement) {
  // app() = app.js에 있음
  targetElement.innerHTML = app();
}
