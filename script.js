(() => {
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a[data-nav]");
  const yearEl = document.getElementById("year");

  // 1. Dynamic Footer Year
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 2. Mobile Navigation Drawer
  const setMenuState = (open) => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) {
        setMenuState(false);
        menuToggle.focus();
      }
    });
  }

  // 3. Header Scroll Elevation & Active Section Scroll-Spy
  const sections = ["work", "services", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateScrollState = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    }

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
    let activeId = "";

    if (atBottom && sections.length > 0) {
      activeId = sections[sections.length - 1].id;
    } else {
      const scrollPosition = window.scrollY + 180;
      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          activeId = section.id;
        }
      });
    }

    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("data-nav") === activeId;
      link.classList.toggle("is-active", isMatch);
    });
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  // 4. Project Category Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const filterCount = document.getElementById("filter-count");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";

      filterButtons.forEach((btn) => {
        const isSelected = btn === button;
        btn.classList.toggle("is-active", isSelected);
        btn.setAttribute("aria-selected", String(isSelected));
      });

      let visibleCount = 0;
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
        if (shouldShow) {
          if (card.classList.contains("reveal-pending")) {
            card.classList.add("is-visible");
          }
          visibleCount += 1;
        }
      });

      if (filterCount) {
        const total = projectCards.length;
        const label = visibleCount === 1 ? "project" : "projects";
        filterCount.textContent = `Showing ${visibleCount} of ${total} ${label}`;
      }
    });
  });

  // 5. Accessible Project Details Modal (Ordered: VAI #1, DLuxe #2, Clothing #3, Friesland #4)
  const projectDetails = {
    vai: {
      meta: "01 / CLIENT PROJECT · WORDPRESS · 2026",
      title: "Visionary Africa Initiative",
      role: "Role: WordPress Developer & UI Implementation",
      image: "portfolio screenshot/vai.png",
      alt: "Visionary Africa Initiative website screenshot",
      description:
        "An organisational website built on WordPress to present the initiative's mission, leadership programmes, community impact, and participation opportunities in a clear, accessible format.",
      highlights: [
        "Content-manageable WordPress architecture allowing straightforward updates by the team.",
        "Custom PHP and CSS styling aligned with the organisation's visual identity.",
        "Responsive multi-device layout focused on readability and clear visitor navigation."
      ],
      tags: ["WordPress", "PHP", "CSS", "Responsive Design"],
      liveUrl: "https://visionaryafricainitiative.org/",
      liveLabel: "View live website"
    },
    dluxe: {
      meta: "02 / CLIENT PROJECT · WEB APP · 2026",
      title: "DLuxe Affairs",
      role: "Role: Design, Front-End & Firebase Integration",
      image: "portfolio screenshot/dluxe-affairs.png",
      alt: "DLuxe Affairs event booking website screenshot",
      description:
        "An event booking and enquiry management web application built to give prospective clients a clean booking experience while providing the admin with a structured workflow to track and update request statuses.",
      highlights: [
        "Structured event request submission flow tailored for prospective clients.",
        "Real-time database integration with Firebase and Firestore for storing and updating enquiries.",
        "Responsive layout optimised for both desktop and mobile visitors."
      ],
      tags: ["HTML & CSS", "JavaScript", "Firebase", "Firestore"],
      liveUrl: "https://d-luxe-web.web.app/",
      liveLabel: "View live website"
    },
    clothing: {
      meta: "03 / CONCEPT DEMO · E-COMMERCE · 2024",
      title: "Clothing Store Demo",
      role: "Role: UI Concept & Front-End Development",
      image: "portfolio screenshot/clothing-store.png",
      alt: "Clothing Store Demo e-commerce homepage screenshot",
      description:
        "An e-commerce fashion homepage demonstration designed around clean editorial product presentation, clear visual hierarchy, and mobile-first responsiveness.",
      highlights: [
        "Editorial storefront layout highlighting featured collections and product categories.",
        "Interactive front-end behaviour built with vanilla JavaScript.",
        "Hosted on Firebase with Firestore integration for structured product data."
      ],
      tags: ["HTML5 & CSS3", "JavaScript", "Firebase", "Firestore"],
      liveUrl: "https://clothing-store-cda5f.web.app/index.html",
      liveLabel: "Explore live demo"
    },
    friesland: {
      meta: "04 / CONCEPT DEMO · CORPORATE · 2024",
      title: "FrieslandCampina Demo",
      role: "Role: UI Concept & Front-End Development",
      image: "portfolio screenshot/frieslandcampinademo.png",
      alt: "FrieslandCampina Demo corporate website screenshot",
      description:
        "A corporate homepage demonstration and brand showcase presenting product portfolio highlights and heritage storytelling with a clean, responsive layout.",
      highlights: [
        "Structured corporate sections balancing brand storytelling and product highlights.",
        "Responsive grid and typography scaling smoothly across screen sizes.",
        "Lightweight static front-end deployed on Firebase Hosting."
      ],
      tags: ["HTML5 & CSS3", "JavaScript", "Responsive Design", "Firebase Hosting"],
      liveUrl: "https://frieslandcampinademo.web.app/",
      liveLabel: "Explore live demo"
    }
  };

  const modal = document.getElementById("project-modal");
  const modalMeta = document.getElementById("modal-meta");
  const modalTitle = document.getElementById("modal-title");
  const modalRole = document.getElementById("modal-role");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalHighlights = document.getElementById("modal-highlights");
  const modalTags = document.getElementById("modal-tags");
  const modalLiveLink = document.getElementById("modal-live-link");
  const modalEnquiryLink = document.getElementById("modal-enquiry-link");
  const modalCloseBtn = document.getElementById("modal-close");
  let lastTrigger = null;

  const openProjectModal = (key, triggerEl) => {
    const data = projectDetails[key];
    if (!modal || !data) return;

    lastTrigger = triggerEl;
    modalMeta.textContent = data.meta;
    modalTitle.textContent = data.title;
    if (modalRole) modalRole.textContent = data.role;
    modalImage.src = data.image;
    modalImage.alt = data.alt;
    modalDescription.textContent = data.description;

    modalHighlights.innerHTML = "";
    data.highlights.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    modalTags.innerHTML = "";
    data.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalLiveLink.href = data.liveUrl;
    modalLiveLink.textContent = `${data.liveLabel} `;
    const arrowSpan = document.createElement("span");
    arrowSpan.setAttribute("aria-hidden", "true");
    arrowSpan.textContent = "↗";
    modalLiveLink.appendChild(arrowSpan);

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
  };

  const closeProjectModal = () => {
    if (!modal) return;
    if (typeof modal.close === "function" && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  };

  document.querySelectorAll("[data-modal-trigger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.getAttribute("data-modal-trigger"), btn);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  if (modalEnquiryLink) {
    modalEnquiryLink.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeProjectModal();
      }
    });

    modal.addEventListener("cancel", () => {
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        setTimeout(() => lastTrigger.focus(), 0);
      }
    });
  }

  // 6. One-Click Email Copy
  const copyBtn = document.getElementById("copy-email-btn");
  const copyFeedback = document.getElementById("copy-feedback");
  let copyTimer = null;

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email");
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        copyFeedback.textContent = "Email copied to clipboard";
      } catch {
        copyFeedback.textContent = email;
      }

      copyFeedback.classList.add("is-visible");
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyFeedback.classList.remove("is-visible");
      }, 2800);
    });
  }

  // 7. Staggered Scroll Reveal (Respecting Reduced Motion)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealTargets = document.querySelectorAll(
      ".section-heading, .project-card, .service-item, .about-profile-card, .about-content, .contact-section h2"
    );

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-pending");
      if (element.classList.contains("project-card") || element.classList.contains("service-item")) {
        element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealTargets.forEach((element) => observer.observe(element));
  }
})();
