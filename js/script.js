// Select all hover images
document.querySelectorAll(".hover-sequence").forEach(img => {
  let intervalId;
  let originalSrc = img.src;
  let index = 0;

  // ✅ Full image list
  let images = [
    "art_images/0.jpg",
    "art_images/1.jpg",
    "art_images/2.jpg",
    "art_images/3.jpg",
    "art_images/9.jpg"
  ];

  // Add continuous images (16 → 89)
  for (let i = 16; i <= 89; i++) {
    images.push(`art_images/${i}.jpg`);
  }

  // ✅ Preload images (Smooth UX 🚀)
  images.forEach(src => {
    const preload = new Image();
    preload.src = src;
  });

  // Hover start
  img.addEventListener("mouseenter", () => {
    index = 0;
    intervalId = setInterval(() => {
      img.src = images[index];
      index = (index + 1) % images.length;
    }, 800); // speed
  });

  // Hover end
  img.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    img.src = originalSrc;
  });
});
