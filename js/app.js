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

  var resetBtn = document.getElementById("resetBtn");
  var armed = false;
  var armTimer = null;
  function disarm() {
    armed = false;
    resetBtn.textContent = "0으로";
    if (armTimer) { clearTimeout(armTimer); armTimer = null; }
  }
  // 초기화 확인은 화면 안 2단계 누름으로 처리 (confirm 미사용)
  resetBtn.addEventListener("click", function () {
    if (!armed) {
      armed = true;
      resetBtn.textContent = "정말 0으로? 다시 누르기";
      if (armTimer) { clearTimeout(armTimer); }
      armTimer = setTimeout(disarm, 3000);
      return;
    }
    count = 0;
    render();
    try { localStorage.setItem(KEY, String(count)); } catch (e) { /* 무시 */ }
    disarm();
  });

  render();
})();
