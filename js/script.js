document.addEventListener("DOMContentLoaded", () => {

  // ================= TAB FUNCTION =================
  function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
      tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");
  }

  // Make function global (for onclick)
  window.showTab = showTab;

  // ================= HOVER IMAGE SEQUENCE =================
  document.querySelectorAll(".hover-sequence").forEach(img => {
    let intervalId;
    let originalSrc = img.src;

    let images = img.dataset.images ? img.dataset.images.split(",") : [];
    let index = 0;

    if (images.length === 0) return;

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

  // ================= DEFAULT TAB =================
  showTab("procreate");

});
