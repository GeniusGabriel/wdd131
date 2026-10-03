const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    },]
    // Step 4.1: Populate the Product Name select element dynamically
    document.addEventListener("DOMContentLoaded", () => {
        const productSelect = document.getElementById("productName");

        if (productSelect) {
            products.forEach((product) => {
                const option = document.createElement("option");
                option.value = product.id; // Using array's id for the value field
                option.textContent = product.name; // Using array's name for display text
                productSelect.appendChild(option);
            });
        }

        // Footer current year & last modified dates
        const currentYearSpan = document.getElementById("currentyear");
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }

        const lastModifiedP = document.getElementById("lastModified");
        if (lastModifiedP) {
            lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
        }
    });
