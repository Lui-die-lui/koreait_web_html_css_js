// 단축 평가 논리 연산
// && ||
const name = "이슬기";

console.log(!!name && !!"lsg");
// && (AND)연산
// 앖의 값이 true일때 뒤의 값을 리턴, false일 때 false(문자열은 안됨)
console.log(false && 10); // false
console.log(true && 10); // 10
console.log(!!name && 0); // 0

// || (OR) 연산
// 앖의 값이 false일때 뒤의 값을 리턴, true일 때 true 리턴
console.log(false || 10); // 10
console.log(true || 10); // true면 true 리턴

// nullish 병합 연산자 => ??
// 앞의 값이 null 또는 undefined가 아니면 앞의 값, 그 외에는 뒤의 값
console.log(null ?? 100); // 100
console.log(undefined ?? 100); // 100
console.log(20 ?? 100); // 20
console.log(0 ?? 100); // 0
console.log("" ?? 100) // ""(빈 문자열)

