let htmlCode;
let cssCode;
let jsCode;
let theme;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  theme = "vs-dark";
} else {
  theme = "vs-light";
}

require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" },
});

require(["vs/editor/editor.main"], function () {
  const htmlEditor = monaco.editor.create(document.getElementById("html"), {
    value: `<!-- Start coding HTML here -->`,
    language: "html",
    theme: theme,
    automaticLayout: true,
  });

  const cssEditor = monaco.editor.create(document.getElementById("css"), {
    value: "/* Start coding CSS here */",
    language: "css",
    theme: theme,
    automaticLayout: true,
  });

  const jsEditor = monaco.editor.create(document.getElementById("js"), {
    value: "// Start coding JS here",
    language: "javascript",
    theme: theme,
    automaticLayout: true,
  });

  const runBtn = document.getElementById("run-btn");
  const iframeContainer = document.getElementById("iframe");
  const newWindowBtn = document.getElementById("win-btn");
  const copyBtn = document.getElementById("copy-btn");

  function getCode() {
    htmlCode = htmlEditor.getValue();
    cssCode = cssEditor.getValue();
    jsCode = jsEditor.getValue();
    return `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Preview</title>
  <style>${cssCode}</style>
</head>
<body>
${htmlCode}
<script>${jsCode}<\/script>
</body>
</html>`;
  }

  function run() {
    iframeContainer.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.srcdoc = getCode();
    iframeContainer.appendChild(iframe);
  }

  function newWindow() {
    const code = getCode();
    const win = window.open(
      "",
      "index.html",
      `width=${window.innerWidth},height=${window.innerHeight},resizable=yes,menubar=no`
    );
    win.document.write(code);
    win.document.close();
  }

  function copyCode() {
    navigator.clipboard.writeText(getCode()).then(function () {
      copyBtn.style.backgroundColor = "#94d778";
      copyBtn.style.color = "#000";
      copyBtn.innerText = "Copied!";
      setTimeout(function () {
        copyBtn.style.backgroundColor = "";
        copyBtn.style.color = "";
        copyBtn.innerText = "Copy";
      }, 1000);
    });
  }

  runBtn.addEventListener("click", run);
  newWindowBtn.addEventListener("click", newWindow);
  copyBtn.addEventListener("click", copyCode);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.altKey) {
      run();
    }
    if ((event.key === "c" || event.key === "C") && event.altKey) {
      event.preventDefault();
      copyCode();
    }
  });

  run();
});

let htmlBtn = document.querySelector("#html-btn");
let cssBtn = document.querySelector("#css-btn");
let jsBtn = document.querySelector("#js-btn");

let htmlPanel = document.querySelector("#html");
let cssPanel = document.querySelector("#css");
let jsPanel = document.querySelector("#js");

htmlBtn.addEventListener("click", function () {
  htmlBtn.classList.add("active");
  cssBtn.classList.remove("active");
  jsBtn.classList.remove("active");
  htmlPanel.style.display = "block";
  cssPanel.style.display = "none";
  jsPanel.style.display = "none";
});

cssBtn.addEventListener("click", function () {
  cssBtn.classList.add("active");
  htmlBtn.classList.remove("active");
  jsBtn.classList.remove("active");
  cssPanel.style.display = "block";
  htmlPanel.style.display = "none";
  jsPanel.style.display = "none";
});

jsBtn.addEventListener("click", function () {
  jsBtn.classList.add("active");
  htmlBtn.classList.remove("active");
  cssBtn.classList.remove("active");
  jsPanel.style.display = "block";
  htmlPanel.style.display = "none";
  cssPanel.style.display = "none";
});

htmlPanel.style.display = "block";

const themeBtn = document.querySelector("#theme-btn");
const root = document.documentElement;

themeBtn.addEventListener("click", function () {
  if (theme === "vs-dark") {
    theme = "vs-light";
    monaco.editor.setTheme("vs-light");
    theming();
  } else {
    theme = "vs-dark";
    monaco.editor.setTheme("vs-dark");
    theming();
  }
});

function theming(){
  if (theme === "vs-dark") {
  root.style.setProperty("--theme-color", "#242424");
  root.style.setProperty("--text-color", "#ffffff");
  root.style.setProperty("--btn-bg", "#333");
  root.style.setProperty("--active-bg", "#fff");
  root.style.setProperty("--active-color", "#000");
  root.style.setProperty("--icon-color", "#fff");
  root.style.setProperty("--border-color", "#ddd");
  root.style.setProperty("--iframe-bg", "#fff");
  root.style.setProperty("--primary-color", "#91dd70ff");
  themeBtn.innerHTML = "<span></span>Dark";
} else {
  root.style.setProperty("--theme-color", "#fffffe");
  root.style.setProperty("--text-color", "#000000");
  root.style.setProperty("--btn-bg", "#e0e0e0");
  root.style.setProperty("--active-bg", "#242424");
  root.style.setProperty("--active-color", "#ffffff");
  root.style.setProperty("--icon-color", "#242424");
  root.style.setProperty("--border-color", "#ddd");
  root.style.setProperty("--iframe-bg", "#fff");
  root.style.setProperty("--primary-color", "#659e4dff");
  themeBtn.innerHTML = "<span></span>Light";
}
}

theming();