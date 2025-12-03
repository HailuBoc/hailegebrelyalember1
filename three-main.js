// Main UI interactions for Hailegebrel Yalember portfolio
// Handles navigation, custom cursor, scroll animations, tilt, and loader.

const ready = (cb) => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    cb();
  } else {
    document.addEventListener("DOMContentLoaded", cb);
  }
};

ready(() => {
  const body = document.body;

  /* Loader ------------------------------------------------------------ */
  const loader = document.getElementById("loader");
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hide");
    }
  }, 1200);

  /* Year in footer ---------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  /* Custom cursor ----------------------------------------------------- */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const moveCursor = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    };

    const animateOutline = () => {
      outlineX += (dotX - outlineX) * 0.13;
      outlineY += (dotY - outlineY) * 0.13;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateOutline);
    };

    window.addEventListener("mousemove", moveCursor);
    animateOutline();

    const hoverTargets = document.querySelectorAll("a:not(.nav-resume-btn), button, .tilt");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.opacity = "0.6";
        cursorOutline.style.transform += " scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.style.opacity = "1";
        cursorOutline.style.transform = cursorOutline.style.transform.replace(
          /scale\([^)]*\)/,
          ""
        );
      });
    });
  }

  /* Navigation & smooth scroll --------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  const closeNav = () => {
    nav?.classList.remove("open");
    navToggle?.classList.remove("open");
  };

  navToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // Skip smooth scroll for external links (like resume PDF)
      if (!href || !href.startsWith("#")) {
        // Allow default behavior for external links
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }

      closeNav();
    });
  });

  /* Premium Resume Button Ripple Effect ------------------------------- */
  const resumeBtn = document.querySelector(".nav-resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", function(e) {
      const ripple = this.querySelector(".resume-btn-ripple");
      if (ripple) {
        // Reset animation
        ripple.style.animation = "none";
        // Force reflow
        void ripple.offsetWidth;
        // Trigger animation
        ripple.style.animation = "rippleEffect 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    });

    // Enhanced cursor interaction for resume button
    if (cursorDot && cursorOutline) {
      resumeBtn.addEventListener("mouseenter", () => {
        cursorDot.style.opacity = "0.8";
        cursorOutline.style.transform += " scale(1.8)";
        cursorDot.style.boxShadow = "0 0 20px rgba(56, 189, 248, 1)";
      });
      resumeBtn.addEventListener("mouseleave", () => {
        cursorDot.style.opacity = "1";
        cursorOutline.style.transform = cursorOutline.style.transform.replace(
          /scale\([^)]*\)/g,
          ""
        );
        cursorDot.style.boxShadow = "0 0 15px rgba(56, 189, 248, 0.8)";
      });
    }
  }

  // Active nav link based on scroll
  const sections = document.querySelectorAll("section[id]");
  const setActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + section.offsetHeight;
      const id = section.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        link?.classList.add("active");
      } else {
        link?.classList.remove("active");
      }
    });
  };
  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  /* Scroll-triggered animations -------------------------------------- */
  const observerItems = document.querySelectorAll(".observer-fade");

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.2,
          }
        )
      : null;

  observerItems.forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add("is-visible");
  });

  /* Lightweight tilt interaction ------------------------------------- */
  const tiltElements = document.querySelectorAll(".tilt");

  tiltElements.forEach((card) => {
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    };

    const reset = () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);
  });

  /* Accessibility tweaks --------------------------------------------- */
  // Reduce motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  if (prefersReducedMotion.matches) {
    body.classList.add("reduced-motion");
  }
});

