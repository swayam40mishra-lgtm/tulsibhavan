
/* ==========================================
   TULSI BHAWAN 2.0 — AWEN DIGITALS
   Navigation, enquiries, WhatsApp and motion
   ========================================== */

const TULSI_CONFIG = {
  // Confirm this number with the property owner.
  // Format: country code + number, digits only.
  whatsappNumber: "917080204347",
  phoneNumber: "917080204347"
};

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const menuToggle = $("#menuToggle");
const siteNav = $("#siteNav");
const modal = $("#enquiryModal");
const modalClose = $("#modalClose");
const enquiryForm = $("#enquiryForm");
const enquiryType = $("#enquiryType");
const feedback = $("#formFeedback");
const copyButton = $("#copyMessage");

let lastEnquiryMessage = "";

// Current year
const yearElement = $("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  $$("a", siteNav).forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Open enquiry modal
function openModal(type = "General enquiry") {
  if (!modal) return;

  if (enquiryType) {
    const availableTypes = [...enquiryType.options]
      .map(option => option.value);

    enquiryType.value = availableTypes.includes(type)
      ? type
      : "General enquiry";
  }

  if (feedback) feedback.hidden = true;
  if (copyButton) copyButton.hidden = true;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const nameField = $("#guestName");

  if (nameField) {
    setTimeout(() => nameField.focus(), 80);
  }
}

// Close enquiry modal
function closeModal() {
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Enquiry buttons
$$("[data-open-enquiry]").forEach(button => {
  button.addEventListener("click", () => {
    openModal(button.dataset.openEnquiry);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    modal?.classList.contains("open")
  ) {
    closeModal();
  }
});

// Create a guest enquiry message
function buildMessage(data) {
  return [
    "Namaste Tulsi Bhawan team,",
    "",
    "I would like to make an enquiry.",
    `Enquiry type: ${data.get("enquiryType") || "General enquiry"}`,
    `Name: ${(data.get("guestName") || "").trim()}`,
    `Phone: ${(data.get("guestPhone") || "").trim()}`,
    `Arrival / event date: ${
      data.get("arrivalDate") || "Not specified"
    }`,
    `Guests / rooms: ${
      (data.get("guestCount") || "").trim() || "Not specified"
    }`,
    `Additional details: ${
      (data.get("message") || "").trim() || "None"
    }`,
    "",
    "Please share the relevant details, rates and availability.",
    "Thank you."
  ].join("\n");
}

// Submit enquiry
if (enquiryForm) {
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    lastEnquiryMessage = buildMessage(formData);

    const validNumber = /^\d{10,15}$/.test(
      TULSI_CONFIG.whatsappNumber
    );

    if (validNumber) {
      const whatsappURL =
        `https://wa.me/${TULSI_CONFIG.whatsappNumber}` +
        `?text=${encodeURIComponent(lastEnquiryMessage)}`;

      // User reviews and sends the message in WhatsApp.
      const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      if (whatsappWindow) {
        showFeedback(
          "Your enquiry is prepared in WhatsApp. " +
          "Please review the details and press Send."
        );
      } else {
        showFeedback(
          "WhatsApp could not open automatically. " +
          "Copy your enquiry message below and send it manually."
        );
      }
    } else {
      showFeedback(
        "The enquiry message is ready, but WhatsApp " +
        "has not been configured with a valid number."
      );
    }

    if (copyButton) copyButton.hidden = false;
  });
}

function showFeedback(message) {
  if (!feedback) {
    alert(message);
    return;
  }

  feedback.textContent =
    `${message}\n\n${lastEnquiryMessage}`;

  feedback.hidden = false;
}

// Copy enquiry message
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!lastEnquiryMessage) return;

    let copied = false;

    try {
      await navigator.clipboard.writeText(
        lastEnquiryMessage
      );

      copied = true;
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = lastEnquiryMessage;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      copied = document.execCommand("copy");
      textarea.remove();
    }

    copyButton.textContent = copied
      ? "Copied ✓"
      : "Please copy the message manually";

    setTimeout(() => {
      copyButton.textContent = "Copy enquiry message";
    }, 2200);
  });
}

// Connect call buttons to the confirmed phone number
$$("[data-call-property]").forEach(link => {
  if (/^\d{10,15}$/.test(TULSI_CONFIG.phoneNumber)) {
    link.href = `tel:+${TULSI_CONFIG.phoneNumber}`;
  }
});

// Connect WhatsApp buttons
$$("[data-whatsapp-property]").forEach(link => {
  if (/^\d{10,15}$/.test(TULSI_CONFIG.whatsappNumber)) {
    link.href =
      `https://wa.me/${TULSI_CONFIG.whatsappNumber}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

// Scroll reveal animations
const revealItems = $$(".reveal");

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => {
    item.classList.add("visible");
  });
}

// Smooth scrolling for on-page links
$$('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = $(targetId);
    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth",
      block: "start"
    });

    history.replaceState(null, "", targetId);
  });
});
    
