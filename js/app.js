// QA 한도 시험 - 버튼 클릭 시 숫자 1씩 증가, localStorage에 저장
(function () {
  var KEY = "qa0108-limit-count";
  var numEl = document.getElementById("num");
  var btn = document.getElementById("plusBtn");
  var count = 0;

  // 저장된 값 불러오기 (새로고침해도 유지)
  try {
    var saved = localStorage.getItem(KEY);
    if (saved !== null) {
      var n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 0) count = n;
    }
  } catch (e) { /* 저장소 사용 불가해도 0부터 시작 */ }

  function render() {
    numEl.textContent = String(count);
  }

  // 연타해도 안전: 클릭 한 번당 1씩만 증가
  btn.addEventListener("click", function () {
    count += 1;
    render();
    try { localStorage.setItem(KEY, String(count)); } catch (e) { /* 무시 */ }
  });

  render();
})();
