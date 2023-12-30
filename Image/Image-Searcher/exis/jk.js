const accessKey = "bCson2LBegDoT7xMlw0Kf1D8tPllRO-mSAGxiIUHyM8";
const formSearch = document.getElementById("search-form");
const inputSearch = document.getElementById("search-input");
const resultSearch = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function fetchImages() {
    keyword = inputSearch.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        const results = data.results;

        results.map(result => {
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            imageLink.appendChild(image);
            resultSearch.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";



    } catch (error) {
        console.error('There was a problem fetching the images:', error);
    }
}

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    resultSearch.innerHTML = ''; // Clear previous search results
    page = 1;
    fetchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    fetchImages();
});
