/* ═══════════════════════════════════════════════════════════
   MONISH SHRESTHA — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════════════════════ */

// ─── TYPED.JS ───
document.addEventListener("DOMContentLoaded", () => {
  new Typed("#typed-element", {
    strings: [
      "Web Developer",
      "Graphic Designer",
      "UI/UX Designer",
      "PERN Stack Learner",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    cursorChar: "|",
  });
});

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll("section[id]");
const navLinksList = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollY = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinksList.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open")
      ? "hidden"
      : "";
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ─── SCROLL REVEAL (Intersection Observer) ───
const revealElements = document.querySelectorAll(
  ".about-card, .skill-item, .tool-card, .design-card, .project-card, .cert-card, .contact-item, .stat-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ─── SKILL BAR ANIMATION ───
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute("data-width");
        entry.target.style.width = targetWidth + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// ─── COUNTER ANIMATION ───
const counters = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute("data-target");
        let current = 0;
        const increment = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          } else {
            entry.target.textContent = current;
          }
        }, 50);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// ─── CONTACT FORM (Demo Handler) ───
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("form-submit");
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Sent!</span><i class="fa-solid fa-check"></i>';
      submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2500);
    }, 1500);
  });
}

// ─── SMOOTH PARALLAX ON HERO SHAPES ───
window.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  shapes.forEach((shape, i) => {
    const speed = (i + 1) * 10;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
