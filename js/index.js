document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const resultsDiv = document.getElementById("results");
    const toggleSearchButton = document.getElementById("toggle-search");
    let searchType = "user"; // Default search type
  
    // Function to make API requests
    async function fetchData(url) {
      try {
        const response = await fetch(url, {
          headers: {
            "Accept": "application/vnd.github.v3+json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    // Function to display user information
    function displayUser(user) {
      resultsDiv.innerHTML = `
        <div>
          <img src="${user.avatar_url}" alt="${user.login}" width="100">
          <h2>${user.login}</h2>
          <a href="${user.html_url}" target="_blank">GitHub Profile</a>
        </div>
      `;
    }
  
    // Function to handle form submission
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchQuery = searchInput.value;
      if (searchQuery) {
        let endpoint;
  
        if (searchType === "user") {
          endpoint = `https://api.github.com/search/users?q=${searchQuery}`;
        } else if (searchType === "repo") {
          endpoint = `https://api.github.com/search/repositories?q=${searchQuery}`;
        }
  
        const data = await fetchData(endpoint);
  
        if (searchType === "user") {
          const user = data.items[0]; // Assuming you want to display the first result
          displayUser(user);
        } else if (searchType === "repo") {
          // Display repositories here
        }
      }
    });
  
    // Function to toggle search type between users and repositories
    toggleSearchButton.addEventListener("click", () => {
      if (searchType === "user") {
        searchType = "repo";
        searchInput.placeholder = "Enter a repository name";
      } else {
        searchType = "user";
        searchInput.placeholder = "Enter a GitHub username";
      }
    });
  });