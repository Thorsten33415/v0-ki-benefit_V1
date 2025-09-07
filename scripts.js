// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")
  const menuIcon = mobileMenuBtn.querySelector(".menu-icon")
  const closeIcon = mobileMenuBtn.querySelector(".close-icon")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = !mobileNav.classList.contains("hidden")

      if (isOpen) {
        // Close menu
        mobileNav.classList.add("hidden")
        menuIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
        mobileMenuBtn.setAttribute("aria-label", "Menü öffnen")
      } else {
        // Open menu
        mobileNav.classList.remove("hidden")
        menuIcon.classList.add("hidden")
        closeIcon.classList.remove("hidden")
        mobileMenuBtn.setAttribute("aria-label", "Menü schließen")
      }
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll(".nav-mobile-link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.add("hidden")
        menuIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
        mobileMenuBtn.setAttribute("aria-label", "Menü öffnen")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.add("hidden")
        menuIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
        mobileMenuBtn.setAttribute("aria-label", "Menü öffnen")
      }
    })
  }
})

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    }
  }
})

// Loading Animation for Dynamic Content
function showLoading(element) {
  if (element) {
    element.classList.add("loading")
  }
}

function hideLoading(element) {
  if (element) {
    element.classList.remove("loading")
  }
}

// Error Handling
function showError(message, container) {
  if (container) {
    container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #ef4444;">
                <p>Fehler beim Laden der Inhalte: ${message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
                    Seite neu laden
                </button>
            </div>
        `
  }
}

// Accessibility Enhancements
document.addEventListener("keydown", (event) => {
  // ESC key closes mobile menu
  if (event.key === "Escape") {
    const mobileNav = document.getElementById("mobileNav")
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const menuIcon = mobileMenuBtn?.querySelector(".menu-icon")
    const closeIcon = mobileMenuBtn?.querySelector(".close-icon")

    if (mobileNav && !mobileNav.classList.contains("hidden")) {
      mobileNav.classList.add("hidden")
      if (menuIcon) menuIcon.classList.remove("hidden")
      if (closeIcon) closeIcon.classList.add("hidden")
      if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-label", "Menü öffnen")
    }
  }
})

// Performance Optimization - Lazy Loading for Images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("loading")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Analytics and Tracking (placeholder for future implementation)
function trackPageView(page) {
  // Placeholder for analytics tracking
  console.log(`Page view tracked: ${page}`)
}

function trackEvent(category, action, label) {
  // Placeholder for event tracking
  console.log(`Event tracked: ${category} - ${action} - ${label}`)
}

// Initialize page tracking
document.addEventListener("DOMContentLoaded", () => {
  trackPageView(window.location.pathname)
})

// Service Worker Registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Placeholder for service worker registration
    // navigator.serviceWorker.register('/sw.js');
  })
}
