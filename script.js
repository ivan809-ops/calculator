const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const toggle = document.getElementById("themeToggle");

let current = "";
let previous = "";
let operator = "";
let finished = false;

/* THEME TOGGLE */
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
};

/* CALCULATOR */
function updateScreen() {
  expressionEl.textContent =
    previous && operator ? previous + displayOperator(operator) : "";
  resultEl.textContent = current || "0";
}

function displayOperator(op) {
  return op === "*" ? "×" : op === "/" ? "÷" : op;
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.onclick = () => {

    if (btn.dataset.num !== undefined) {
      if (finished) {
        current = "";
        finished = false;
      }
      if (btn.dataset.num === "." && current.includes(".")) return;
      current += btn.dataset.num;
      updateScreen();
    }

    if (btn.dataset.op) {
      if (!current) return;
      if (previous) calculate();
      operator = btn.dataset.op;
      previous = current;
      current = "";
      updateScreen();
    }

    if (btn.dataset.action) handleAction(btn.dataset.action);
  };
});

function handleAction(action) {
  switch (action) {
    case "clear":
      current = previous = operator = "";
      finished = false;
      updateScreen();
      break;

    case "delete":
      current = current.slice(0, -1);
      updateScreen();
      break;

    case "percent":
      if (!current) return;
      current = (parseFloat(current) / 100).toString();
      updateScreen();
      break;

    case "equals":
      if (!current || !previous) return;
      calculate();
      finished = true;
      break;
  }
}

function calculate() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let res = 0;

  switch (operator) {
    case "+": res = a + b; break;
    case "-": res = a - b; break;
    case "*": res = a * b; break;
    case "/": res = b === 0 ? "Error" : a / b; break;
  }

  expressionEl.textContent =
    previous + displayOperator(operator) + current;

  current = res.toString();
  previous = "";
  operator = "";
  resultEl.textContent = current;
}
