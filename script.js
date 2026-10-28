
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const searchInput = document.getElementById("productSearch");
    const filters = document.querySelectorAll(".filter");
    const productCards = document.querySelectorAll(".product-card");
    const cartCount = document.getElementById("cartCount");
    const toast = document.getElementById("toast");
    const emptyMessage = document.getElementById("emptyMessage");

    let activeFilter = "all";
    let cartTotal = 0;
    let toastTimeout;

    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-label", isOpen ? "Menyuni yopish" : "Menyuni ochish");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Menyuni ochish");
        });
    });

    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        productCards.forEach((card) => {
            const category = card.dataset.category;
            const name = card.dataset.name || "";
            const title = card.querySelector("h3").textContent.toLowerCase();
            const matchesCategory = activeFilter === "all" || category === activeFilter;
            const matchesSearch = name.toLowerCase().includes(searchTerm) || title.includes(searchTerm) || category.toLowerCase().includes(searchTerm);
            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) visibleCount++;
        });

        emptyMessage.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener("input", filterProducts);

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            filters.forEach((item) => item.classList.remove("active"));
            filter.classList.add("active");
            activeFilter = filter.dataset.filter;
            filterProducts();
        });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    }

    document.querySelectorAll(".quick-add").forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.dataset.name;
            cartTotal++;
            cartCount.textContent = cartTotal;
            showToast(`${productName} savatga qo‘shildi! 🛍️`);
        });
    });

    document.querySelectorAll(".heart").forEach((button) => {
        button.addEventListener("click", () => {
            const isFavorite = button.classList.toggle("active");
            button.textContent = isFavorite ? "♥" : "♡";
            button.setAttribute("aria-pressed", isFavorite ? "true" : "false");

            const productName = button.closest(".product-card").querySelector("h3").textContent;

            showToast(isFavorite ? `${productName} sevimlilarga qo‘shildi! ♥` : `${productName} sevimlilardan olib tashlandi.`);
        });
    });

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");

    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!newsletterForm.checkValidity()) {
            newsletterForm.reportValidity();
            return;
        }

        newsletterMessage.textContent = "Rahmat! Demo shakl yuborildi. Haqiqiy obuna uchun server ulash kerak.";
        newsletterForm.reset();
    });

    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("contactName").value.trim();

        contactMessage.textContent = `Rahmat, ${name}! Shakl tekshirildi, ammo xabar hali yuborilmadi.`;
        contactForm.reset();
    });

    document.getElementById("year").textContent = new Date().getFullYear();
});
