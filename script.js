 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const cardsContainer = document.getElementById("cardsContainer");
  const summaryTableBody = document.querySelector("#summaryTable tbody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Get form values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const programme = document.getElementById("programme").value.trim();
    const year = document.querySelector("input[name='year']:checked");
    const interests = document.getElementById("interests").value.trim();
    const photo = document.getElementById("photo").value.trim();

    let isValid = true;

    // Validation
    if (!firstName) {
      document.getElementById("err-firstName").textContent = "First name is required.";
      isValid = false;
    }

    if (!lastName) {
      document.getElementById("err-lastName").textContent = "Last name is required.";
      isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("err-email").textContent = "Enter a valid email.";
      isValid = false;
    }

    if (!programme) {
      document.getElementById("err-programme").textContent = "Programme is required.";
      isValid = false;
    }

    if (!year) {
      document.getElementById("err-year").textContent = "Select a year.";
      isValid = false;
    }

    if (!isValid) return;

    const yearValue = year.value;

    // Create card
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div>
        <img src="${photo || 'https://placehold.co/100x100'}" alt="Student Photo" style="width:80px; height:80px; border-radius:50%; object-fit:cover; margin-right:10px;">
      </div>
      <div style="flex-grow:1;">
        <h3>${firstName} ${lastName}</h3>
        <p><strong>Programme:</strong> ${programme}</p>
        <p><strong>Year:</strong> ${yearValue}</p>
        <p><strong>Interests:</strong> ${interests || 'N/A'}</p>
      </div>
      <button class="btn remove-btn">Remove</button>
    `;

    cardsContainer.appendChild(card);

    // Add to summary table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${firstName} ${lastName}</td>
      <td>${programme}</td>
      <td>${yearValue}</td>
    `;
    summaryTableBody.appendChild(row);

    // Remove functionality
    card.querySelector(".remove-btn").addEventListener("click", () => {
      card.remove();
      row.remove();
    });

    // Reset form
    form.reset();
  });
});
