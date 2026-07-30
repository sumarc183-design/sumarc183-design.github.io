const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const navLinks = Array.from(nav.querySelectorAll("a"));
const year = document.querySelector("#year");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
year.textContent = new Date().getFullYear();
updateHeader();

// Scrollspy: highlight the nav link matching the section in view
if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find(
          (a) => a.getAttribute("href") === `#${entry.target.id}`
        );
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));
}

// Reveal-on-scroll for elements marked .reveal
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}
