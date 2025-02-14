// Load Lucide when DOM is fully ready
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    } else {
        console.error("Lucide is not loaded!");
    }
});

// Theme toggle functionality
const themeToggles = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");
const moonIcon = `<i data-lucide="moon"></i>`;
const sunIcon = `<i data-lucide="sun"></i>`;

function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");

    themeToggles.forEach(toggle => {
        toggle.innerHTML = isDark ? sunIcon : moonIcon;
    });

    // Reinitialize Lucide icons after updating innerHTML
    setTimeout(() => {
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }, 10);

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Set initial theme based on preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
    themeToggles.forEach(toggle => {
        toggle.innerHTML = sunIcon;
    });
}

themeToggles.forEach(toggle => {
    toggle.addEventListener("click", toggleTheme);
});

// Mobile menu functionality
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = `<i data-lucide="menu"></i>`;
const closeIcon = `<i data-lucide="x"></i>`;

function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle("active");
    menuToggle.innerHTML = isOpen ? closeIcon : menuIcon;

    setTimeout(() => {
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }, 10);
}

menuToggle.addEventListener("click", toggleMenu);

// Close mobile menu when clicking a link
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.innerHTML = menuIcon;

        setTimeout(() => {
            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
        }, 10);
    });
});

// Form submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log("Form submitted:", data);

    contactForm.reset();

    alert("Message sent successfully!");
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
});
