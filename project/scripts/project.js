// ==========================================================================
// PKAB Gas - Final Project Interactive Logic (WDD 131)
// File: project/scripts/project.js
// ==========================================================================

// --- 1. Data Source: Station Objects Array (Meets Criteria 12 & 13) ---
const stations = [
    {
        name: "Ahafo Nkaseim Main Branch",
        region: "Ahafo Region",
        town: "Nkaseim",
        landmark: "Opposite Cornelia Cornely School",
        services: "Domestic Refill & Autogas Dispensing",
        hours: "5:00 AM – 7:30 PM",
        contact: "+233 53 531 0042"
    },
    {
        name: "Gomoa Afransi Branch",
        region: "Central Region",
        town: "Afransi",
        landmark: "Main Highway Junction",
        services: "Domestic Refill & Autogas Dispensing",
        hours: "5:00 AM – 7:30 PM",
        contact: "+233 20 777 8899"
    },
    {
        name: "Awutu Bawjiase Branch",
        region: "Central Region",
        town: "Bawjiase",
        landmark: "Adjacent to the Cemetery",
        services: "Domestic Refill & Autogas Dispensing",
        hours: "6:00 AM – 9:00 PM",
        contact: "+233 24 333 4455"
    },
    {
        name: "Kasoa, Akweley Branch",
        region: "Central Region",
        town: "Kasoa",
        landmark: "Akweley, Kasoa Highway",
        services: "Domestic Refill & Autogas Dispensing",
        hours: "24 Hours Operational",
        contact: "+233 24 555 6677"
    },
    {
        name: "Kasoa Opeikuma Station",
        region: "Central Region",
        town: "Kasoa",
        landmark: "Opeikuma, Kasoa Highway",
        services: "Domestic Refill & Autogas Dispensing",
        hours: "6:00 AM – 9:00 PM",
        contact: "+233 27 111 2233"
    },
    {
        name: "Jei-River Branch",
        region: "Central Region",
        town: "Ofaakor",
        landmark: "Jei-River",
        services: "Domestic Refill & Autogas Dispensing",
        hours: "6:00 AM – 9:00 PM",
        contact: "+233 27 111 2233"
    }
];

// --- 2. Retail Unit Pricing Map (Meets Criterion 12) ---
const unitPrices = {
    "6kg": 95.0,
    "14kg": 220.0,
    "50kg": 760.0,
    "autogas": 15.5
};

// ==========================================================================
// DOM Initialization & Event Binding
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------------------------------------
    // A. Mobile Hamburger Navigation (Meets Criterion 10)
    // ------------------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = primaryNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });
    }

    // ------------------------------------------------------------------------
    // B. Dynamic Station Rendering & Filtering (Meets Criteria 9, 10, 13, 14)
    // ------------------------------------------------------------------------
    const branchGrid = document.getElementById("branch-grid");

    function displayStations(stationList) {
        if (!branchGrid) return;
        branchGrid.innerHTML = "";

        // Array Iteration using forEach (Criterion 13) and Template Literals (Criterion 14)
        stationList.forEach((station) => {
            const card = document.createElement("article");
            card.className = "branch-card";

            card.innerHTML = `
        <h3>${station.name}</h3>
        <p><strong>Location:</strong> ${station.landmark}, ${station.region}</p>
        <p><strong>Hours:</strong> ${station.hours}</p>
        <p><strong>Phone:</strong> ${station.contact}</p>
        <span class="branch-badge badge-autogas">${station.services}</span>
      `;
            branchGrid.appendChild(card);
        });
    }

    // Initial load: render all branches
    displayStations(stations);

    // Filter Buttons Handler (Conditional Branching & Array Filter - Criteria 11 & 13)
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedRegion = btn.getAttribute("data-filter");

            if (selectedRegion === "all") {
                displayStations(stations);
            } else {
                const filtered = stations.filter(
                    (station) => station.region === selectedRegion
                );
                displayStations(filtered);
            }
        });
    });

    // ------------------------------------------------------------------------
    // C. Refill Cost Estimator & LocalStorage (Meets Criteria 8, 9, 11, 15)
    // ------------------------------------------------------------------------
    const refillForm = document.getElementById("refill-form");
    const serviceTypeSelect = document.getElementById("service-type");
    const quantityInput = document.getElementById("quantity");
    const resultCostDisplay = document.getElementById("result-cost");

    const savedEstimateKey = "pkab_last_estimate";

    // Read and restore previous calculation from localStorage on load (Criterion 15)
    const savedData = localStorage.getItem(savedEstimateKey);
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            if (resultCostDisplay) {
                resultCostDisplay.textContent = `GH₵ ${parsed.cost} (Saved: ${parsed.date})`;
            }
            if (serviceTypeSelect && parsed.category) {
                serviceTypeSelect.value = parsed.category;
            }
            if (quantityInput && parsed.quantity) {
                quantityInput.value = parsed.quantity;
            }
        } catch (e) {
            console.error("Error reading saved estimate from localStorage", e);
        }
    }

    // Form submission handler (triggers on click or Enter key)
    if (refillForm && serviceTypeSelect && quantityInput && resultCostDisplay) {
        refillForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevents page reload

            const category = serviceTypeSelect.value;
            const quantity = Math.max(1, parseFloat(quantityInput.value) || 1);
            const unitRate = unitPrices[category] || 0;
            const totalCost = (unitRate * quantity).toFixed(2);

            // Update UI
            resultCostDisplay.textContent = `GH₵ ${totalCost}`;

            // Persist to localStorage (Criterion 15)
            const estimateRecord = {
                category: category,
                quantity: quantity,
                cost: totalCost,
                date: new Date().toLocaleDateString()
            };
            localStorage.setItem(savedEstimateKey, JSON.stringify(estimateRecord));
        });
    }

    // ------------------------------------------------------------------------
    // D. Dynamic Footer Dates
    // ------------------------------------------------------------------------
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedP = document.getElementById("lastModified");
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
    }
});