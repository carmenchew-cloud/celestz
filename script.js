const galleryImages = [
  {
    src: "assets/site/pool.jpg",
    alt: "The Celestz starlight pool and sky facilities",
  },
  {
    src: "assets/site/lobby.jpg",
    alt: "The Celestz grand lobby at Kebun Teh Johor Bahru",
  },
  {
    src: "assets/site/facilities-plan-new.jpg",
    alt: "The Celestz facilities plan with pool, gymnasium and lifestyle deck",
  },
  {
    src: "assets/site/freebies-1.jpg",
    alt: "The Celestz developer package and lifestyle benefits",
  },
  {
    src: "assets/site/freebies-2.jpg",
    alt: "The Celestz EXSIM sales package highlights",
  },
];

const galleryMain = document.querySelector(".gallery-main");
const dotWrap = document.querySelector(".gallery-dots");
let galleryIndex = 0;

function renderGallery() {
  galleryMain.src = galleryImages[galleryIndex].src;
  galleryMain.alt = galleryImages[galleryIndex].alt;
  [...dotWrap.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === galleryIndex);
  });
}

galleryImages.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show gallery image ${index + 1}`);
  dot.addEventListener("click", () => {
    galleryIndex = index;
    renderGallery();
  });
  dotWrap.appendChild(dot);
});

document.querySelectorAll(".gallery-arrow").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.dir);
    galleryIndex = (galleryIndex + direction + galleryImages.length) % galleryImages.length;
    renderGallery();
  });
});

renderGallery();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".accordion-card details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".accordion-card details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const unitPlanOptions = {
  c1: {
    label: "Type C1",
    image: "assets/site/unit-type-c1.png",
    alt: "Type C1 floor plan",
  },
  c1a: {
    label: "Type C1A",
    image: "assets/site/unit-type-c1a.png",
    alt: "Type C1A floor plan",
  },
  c2: {
    label: "Type C2",
    image: "assets/site/unit-type-c2.png",
    alt: "Type C2 floor plan",
  },
  c2a: {
    label: "Type C2A",
    image: "assets/site/unit-type-c2a.png",
    alt: "Type C2A floor plan",
  },
};

function activateUnit(unit) {
  document.querySelectorAll(".unit-tab").forEach((item) => {
    item.classList.toggle("active", item.dataset.unit === unit);
  });
  document.querySelectorAll(".unit-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.unitPanel === unit);
  });
}

function activateSubplan(subtab) {
  const tabGroup = subtab.closest(".unit-subtabs");
  const panel = subtab.closest(".unit-panel");
  const plan = unitPlanOptions[subtab.dataset.subplan];
  if (!tabGroup || !panel || !plan) return;
  tabGroup.querySelectorAll(".unit-subtab").forEach((item) => {
    item.classList.toggle("active", item === subtab);
  });
  const image = panel.querySelector("[data-plan-img]");
  const label = panel.querySelector("[data-plan-label]");
  image.src = plan.image;
  image.alt = plan.alt;
  label.textContent = plan.label;
}

document.querySelectorAll(".unit-tab").forEach((tab) => {
  tab.addEventListener("click", () => activateUnit(tab.dataset.unit));
});

document.querySelectorAll(".unit-subtab").forEach((subtab) => {
  subtab.addEventListener("click", () => activateSubplan(subtab));
});

activateUnit(document.querySelector(".unit-tab.active")?.dataset.unit || "a");
document.querySelectorAll(".unit-subtab.active").forEach(activateSubplan);

const imageModal = document.querySelector(".image-modal");
const imageModalImg = imageModal?.querySelector("img");
const modalClose = imageModal?.querySelector(".modal-close");

function closeImageModal() {
  imageModal?.classList.remove("open");
  imageModal?.setAttribute("aria-hidden", "true");
  if (imageModalImg) {
    imageModalImg.src = "";
    imageModalImg.alt = "";
  }
}

document.querySelectorAll("[data-enlarge]").forEach((image) => {
  image.addEventListener("click", () => {
    if (!imageModal || !imageModalImg) return;
    imageModalImg.src = image.currentSrc || image.src;
    imageModalImg.alt = image.alt || "Enlarged image";
    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
  });
});

modalClose?.addEventListener("click", closeImageModal);

imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeImageModal();
});
