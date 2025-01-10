function fetchProducts() {
    const itemTitle = document.getElementById('itemTitle').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const apiUrl = "https://otapi-aliexpress.p.rapidapi.com/BatchSearchItemsFrame";
    const params = new URLSearchParams({
        language: "fr",
        framePosition: "0",
        frameSize: "50",
        ItemTitle: itemTitle,
        OrderBy: "Popularity:Desc",
        MaxPrice: maxPrice
    });

    const headers = {
        "X-RapidAPI-Key": "b9ee6a42a7mshe7386d9bc393dadp14419fjsn8ae618abbf42",
        "X-RapidAPI-Host": "otapi-aliexpress.p.rapidapi.com"
    };

    axios.get(`${apiUrl}?${params}`, { headers })
        .then(response => {
            const products = response.data.Result.Items.Items.Content;
            const table = document.getElementById("productsTable");
            // Clear previous results
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            // Insert new results
            products.forEach(product => {
                if (!product.HasError) {
                    const row = table.insertRow();
                    const titleCell = row.insertCell(0);
                    const priceCell = row.insertCell(1);
                    const urlCell = row.insertCell(2);

                    titleCell.textContent = product.Title;
                    priceCell.textContent = product.Price.ConvertedPrice;
                    const link = document.createElement('a');
                    link.href = product.ExternalItemUrl;
                    link.textContent = product.ExternalItemUrl;
                    link.target = "_blank";
                    urlCell.appendChild(link);
                }
            });
        })
        .catch(error => {
            console.error("Failed to retrieve data:", error);
        });
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchProducts();
});

// Load initial products
fetchProducts();
