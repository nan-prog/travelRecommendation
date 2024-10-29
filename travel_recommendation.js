const urlJson = "travel_recommendation_api.json";

const searchResult =  {
    addCountry: (country, container) => {
        const resultDiv = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h2");
        const description = document.createElement("p");
        const button = document.createElement("button");

        resultDiv.className = "search-result";

        img.src = country.imageUrl;
        img.alt = country.name;
        title.textContent = country.name;
        description.textContent = country.description;
        button.textContent = "Visit";

        // Append all created elements to the result div
        resultDiv.appendChild(img);
        resultDiv.appendChild(title);
        resultDiv.appendChild(description);
        resultDiv.appendChild(button);
        
        container.appendChild(resultDiv);
    },

    countries: (results) => {
        const searchContainer = document.getElementById("search-result");
        searchContainer.innerHTML = "";

        let tokyo = results[1].cities[0];
        let rio = results[2].cities[0];

        searchResult.addCountry(tokyo, searchContainer);
        searchResult.addCountry(rio, searchContainer);
    },

    otherType: (results) => {
        const searchContainer = document.getElementById("search-result");
        searchContainer.innerHTML = "";

        results.forEach(item => {
            // Create a new div,image, title and button for each result
            const resultDiv = document.createElement("div");
            const img = document.createElement("img");
            const title = document.createElement("h2");
            const description = document.createElement("p");
            const button = document.createElement("button");

            resultDiv.className = "search-result";

            img.src = item.imageUrl;
            img.alt = item.name;
            title.textContent = item.name;
            description.textContent = item.description;
            button.textContent = "Visit";
    
            // Append all created elements to the result div
            resultDiv.appendChild(img);
            resultDiv.appendChild(title);
            resultDiv.appendChild(description);
            resultDiv.appendChild(button);
            
            searchContainer.appendChild(resultDiv);
        });
    },
}


async function executeSearch() {
    const query = document.getElementById("search-input").value;
    
    await fetch(urlJson)
    .then(response => response.json())
    .then(data => {
        const queryRes = query.trim().toLowerCase();

        if (queryRes.includes("beach")) {
            searchResult.otherType(data.beaches);
        } else if (queryRes.includes("temple")) {
            searchResult.otherType(data.temples);
        } else if (queryRes.includes("countr")) {
            searchResult.countries(data.countries);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function resetSearch() {
    document.getElementById("search-input").value = "";
    const searchContainer = document.getElementById("search-result");
    searchContainer.innerHTML = "";
}