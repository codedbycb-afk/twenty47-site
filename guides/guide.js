// Adds a Copy button to every message block on a guide page
document.querySelectorAll(".msg").forEach((box) => {
  const label = box.querySelector(".label");
  const text = box.querySelector(".text");
  if (!label || !text) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "copy";
  btn.textContent = "Copy";
  label.appendChild(btn);
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text.innerText.trim());
      btn.textContent = "Copied";
    } catch {
      const r = document.createRange();
      r.selectNodeContents(text);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      btn.textContent = "Selected";
    }
    setTimeout(() => (btn.textContent = "Copy"), 2000);
  });
});
