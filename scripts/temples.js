const currentYearSpan = document.querySelector("#currentyear");
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

const lastModifiedParagraph = document.querySelector("#lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;


const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("nav ul");

// Listen for clicks on the hamburger button
menuButton.addEventListener("click", () => {
    // Toggle the 'open' class on the <ul> list to show/hide it
    navMenu.classList.toggle("open");

    // Toggle the 'open' class on the button to switch from ☰ to ✕
    menuButton.classList.toggle("open");
});