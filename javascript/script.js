const form = document.getElementById("teamForm");
const teamInput = document.getElementById("teamInput");
const resultDiv = document.getElementById("result");
const clearBtn = document.getElementById("clearBtn");

// Event 1: Submit team search
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const teamName = teamInput.value.trim();

  if (!teamName) return;

  resultDiv.innerHTML = "Loading...";

  const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.teams) {
      resultDiv.innerHTML = `<p style="color: red;"><strong>Team not found.</strong> Please try a different name.</p>`;
      resultDiv.style.display = "block"; // Show the result even when showing an error
      return;
    }    

    const team = data.teams[0];

    // Clear previous results
    resultDiv.innerHTML = "";

    // Team info elements 
    const name = document.createElement("h2");
    name.textContent = `🏟️ ${team.strTeam}`;

    const country = document.createElement("div");
    country.classList.add("info-block");
    country.innerHTML = `<strong>Country:</strong> ${team.strCountry}`;

    const league = document.createElement("div");
    league.classList.add("info-block");
    league.innerHTML = `<strong>League:</strong> ${team.strLeague}`;

    const stadium = document.createElement("div");
    stadium.classList.add("info-block");
    stadium.innerHTML = `<strong>Stadium:</strong> ${team.strStadium}`;

    const year = document.createElement("div");
    year.classList.add("info-block");
    year.innerHTML = `<strong>Formed in:</strong> ${team.intFormedYear}`;

    const desc = document.createElement("div");
    desc.classList.add("info-block");
    desc.innerHTML = `<strong>Description:</strong> ${team.strDescriptionEN || "No description available."}`;

    resultDiv.append(name, country, league, stadium, year, desc);

    // Show the result container
    resultDiv.style.display = "flex";

    // Event 3: Mouseover effects
    resultDiv.addEventListener("mouseover", () => {
      resultDiv.style.backgroundColor = "#e0f7fa";
    });

    resultDiv.addEventListener("mouseout", () => {
      resultDiv.style.backgroundColor = "#f9f9f9";
    });

  } catch (err) {
    resultDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    resultDiv.style.display = "none"; // Hide the result if error occurs
    console.error(err);
  }
});

// Event 2: Keyup on input
teamInput.addEventListener("keyup", () => {
  if (teamInput.value.length >= 25) {
    alert("That team name is a bit long! '_' ");
  }
});

// Event 4: Clear results
clearBtn.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  teamInput.value = "";
  resultDiv.style.display = "none"; // Hide the result when cleared
});
