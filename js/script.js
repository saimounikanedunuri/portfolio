// Show/hide top button
window.onscroll = function () {
  const topBtn = document.getElementById("topBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Image hover swap for gardening
document.querySelectorAll('.book-grid img').forEach(img => {
  const original = img.src;
  const hover = img.getAttribute('data-hover');

  if (hover) {
    img.addEventListener('mouseover', () => img.src = hover);
    img.addEventListener('mouseout', () => img.src = original);
  }
});
