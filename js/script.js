document.querySelectorAll(".hover-sequence").forEach(img => {
  let intervalId;
  let originalSrc = img.src;
  let images = img.dataset.images.split(",");
  let index = 0;

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
