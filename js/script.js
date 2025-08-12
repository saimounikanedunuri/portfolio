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

// Hover sequence logic
document.querySelectorAll('.hover-sequence').forEach(img => {
  let interval;
  let images = img.dataset.images.split(',');
  let index = 0;

  img.addEventListener('mouseenter', () => {
    interval = setInterval(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
    }, 1000); // change every 1 second
  });

  img.addEventListener('mouseleave', () => {
    clearInterval(interval);
    img.src = images[0]; // reset to first
    index = 0;
  });
});
