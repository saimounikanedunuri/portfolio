document.addEventListener("DOMContentLoaded", () => {

  // ================= TAB FUNCTION =================
  function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
      tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");

    // optional: scroll top when tab changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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


  // ================= LAZY LOADING (FALLBACK) =================
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));


  // ================= LIGHTBOX (INSTAGRAM + PINTEREST STYLE) =================
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
    <span id="lightbox-close">&times;</span>
    <img id="lightbox-img">
    <div id="lightbox-caption"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  // Open lightbox on image click
  document.querySelectorAll(".gallery img, .book img, img.zoomable").forEach(img => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;

      // caption support (alt text)
      lightboxCaption.textContent = img.alt || "Artwork";

      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });


  // ================= ZOOM ON SCROLL (PINTEREST FEEL) =================
  document.querySelectorAll(".gallery img, .book img").forEach(img => {
    img.addEventListener("wheel", (e) => {
      if (!img.classList.contains("zoom-active")) return;

      e.preventDefault();

      let scale = img.dataset.scale ? parseFloat(img.dataset.scale) : 1;

      if (e.deltaY < 0) {
        scale += 0.1;
      } else {
        scale = Math.max(1, scale - 0.1);
      }

      img.dataset.scale = scale;
      img.style.transform = `scale(${scale})`;
      img.style.transition = "transform 0.1s ease";
    });

    img.addEventListener("dblclick", () => {
      img.classList.toggle("zoom-active");

      if (!img.classList.contains("zoom-active")) {
        img.dataset.scale = 1;
        img.style.transform = "scale(1)";
      }
    });
  });


  // ================= SCROLL TO TOP BUTTON =================
  const scrollBtn = document.createElement("button");
  scrollBtn.innerText = "↑";
  scrollBtn.id = "scrollTopBtn";
  document.body.appendChild(scrollBtn);

  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 14px;
    border-radius: 50%;
    border: none;
    background: black;
    color: white;
    font-size: 18px;
    cursor: pointer;
    display: none;
    z-index: 9999;
  `;

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  // ================= DEFAULT TAB =================
  showTab("procreate");
});
