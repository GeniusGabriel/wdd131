document.addEventListener("DOMContentLoaded", () => {
    // Retrieve current review count from localStorage or initialize to 0
    let reviewCount = Number(window.localStorage.getItem("reviewCount-ls")) || 0;

    // Increment counter for this submission
    reviewCount += 1;

    // Save back to localStorage as string
    window.localStorage.setItem("reviewCount-ls", reviewCount);

    // Display count on confirmation page
    const countDisplay = document.getElementById("reviewCount");
    if (countDisplay) {
        countDisplay.textContent = reviewCount;
    }

    // Footer dates
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedP = document.getElementById("lastModified");
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
    }
});