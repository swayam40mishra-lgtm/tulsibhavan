
/* TULSI BHAWAN — AWEN DIGITALS
   Website navigation, enquiry form and WhatsApp integration.
*/

const TULSI_CONFIG = {
  // Add the property's confirmed WhatsApp number.
  // Format: country code + number, digits only.
  // Example format: 91XXXXXXXXXX
  whatsappNumber: ""
};

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const modal = document.getElementById("enquiryModal");
const modalClose = document.getElementById("modalClose");
const enquiryType = document.getElementById("enquiryType");
const enquiryForm = document.getElementById("enquiryForm");
const feedback = document.getElementById("formFeedback");
const copyButton = document.getElementById("copyMessage");

let lastEnquiryMessage = "";

document.getElementById("year").textContent =
  new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Open the enquiry form
function openModal(type = "General enquiry") {
  const options = Array.from(enquiryType.options).map(
    option => option.value
  );

  enquiryType.value = options.includes(type)
    ? type
    : "General enquiry";

  feedback.hidden = true;
  copyButton.hidden = true;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.getElementById("guestName").focus();
  }, 80);
}

// Close the enquiry form
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-enquiry]").forEach(button => {
  button.addEventListener("click", () => {
    openModal(button.dataset.openEnquiry);
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    modal.classList.contains("open")
  ) {
    closeModal();
  }
});

// Prepare the guest's enquiry message
function buildMessage(data) {
  return [
    "Namaste Tulsi Bhawan team,",
    "",
    "I would like to make an enquiry.",
    `Enquiry type: ${data.get("enquiryType")}`,
    `Name: ${data.get("guestName").trim()}`,
    `Phone: ${data.get("guestPhone").trim()}`,
    `Arrival / event date: ${
      data.get("arrivalDate") || "Not specified"
    }`,
    `Guests / rooms: ${
      data.get("guestCount").trim() || "Not specified"
    }`,
    `Additional details: ${
      data.get("message").trim() || "None"
    }`,
    "",
    "Please share the relevant details, rates and availability.",
    "Thank you."
  ].join("\n");
}

// Handle enquiry submission
enquiryForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) {
    return;
  }

  const data = new FormData(enquiryForm);
  lastEnquiryMessage = buildMessage(data);

  const validNumber = /^\d{10,15}$/.test(
    TULSI_CONFIG.whatsappNumber
  );

  if (validNumber) {
    const whatsappURL =
      `https://wa.me/${TULSI_CONFIG.whatsappNumber}` +
      `?text=${encodeURIComponent(lastEnquiryMessage)}`;

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    feedback.textContent =
      "Your enquiry is prepared in WhatsApp. " +
      "Please review the message and press Send.";

  } else {
    feedback.textContent =
      "Demo mode: your enquiry message is ready, but " +
      "direct WhatsApp integration has not been configured.\n\n" +
      lastEnquiryMessage;
  }

  feedback.hidden = false;
  copyButton.hidden = false;
});

// Copy the prepared enquiry message
copyButton.addEventListener("click", async () => {
  if (!lastEnquiryMessage) return;

  try {
    await navigator.clipboard.writeText(lastEnquiryMessage);
    copyButton.textContent = "Copied ✓";

  } catch {
    const area = document.createElement("textarea");

    area.value = lastEnquiryMessage;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";

    document.body.appendChild(area);
    area.select();

    const copied = document.execCommand("copy");
    area.remove();

    copyButton.textContent = copied
      ? "Copied ✓"
      : "Please copy the message manually";
  }

  setTimeout(() => {
    copyButton.textContent = "Copy enquiry message";
  }, 2200);
});

// Smooth scroll reveal animations
const revealItems = document.querySelectorAll(".reveal");

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
