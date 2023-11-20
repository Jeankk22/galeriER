const gallery = document.getElementById("imageGallery");

const directoryPath = "galeriER/uploads";

// An array to hold image file names dynamically
const imageFiles = [];

// Function to load images from the "uploads" directory
function loadImages() {
    fetch(directoryPath)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const links = Array.from(doc.querySelectorAll('a'));
            
            links.forEach((link) => {
                const fileName = link.href.split("/").pop();
                if (/\.(jpg|jpeg)$/i.test(fileName)) {
                    imageFiles.push(fileName);
                }
            });
            
            displayImages();
        })
        .catch((error) => {
            console.error("Error loading images:", error);
        });
}

// Function to display images
function displayImages() {
    imageFiles.forEach((fileName) => {
        const imageDiv = document.createElement("div");
        imageDiv.className = "image";

        const image = document.createElement("img");
        image.src = directoryPath + fileName;
        image.alt = fileName;

        imageDiv.appendChild(image);
        gallery.appendChild(imageDiv);
    });
}

loadImages();
