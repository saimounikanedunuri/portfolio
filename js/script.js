// ================= TAB FUNCTION =================
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.style.display = "none";
  });

  document.getElementById(tabId).style.display = "block";
}


// ================= HOVER IMAGE SEQUENCE =================
document.querySelectorAll(".hover-sequence").forEach(img => {
  let intervalId;
  let originalSrc = img.src;

  // ⚠️ Safe check (prevents errors if data-images not present)
  let images = img.dataset.images ? img.dataset.images.split(",") : [];

  let index = 0;

  if (images.length === 0) return; // skip if no images

  img.addEventListener("mouseenter", () => {
    index = 0;
    intervalId = setInterval(() => {
      img.src = images[index];
      index = (index + 1) % images.length;
    }, 800);
  });

  img.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    img.src = originalSrc;
  });
});
