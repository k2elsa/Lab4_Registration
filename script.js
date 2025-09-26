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
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];

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

    if (!photoFile) {
      document.getElementById("err-photo").textContent = "Please upload a photo.";
      isValid = false;
    }

    if (!isValid) return;

    const yearValue = year.value;
    const photoURL = URL.createObjectURL(photoFile);

    // Create student card
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${photoURL}" alt="Student Photo">
      <div>
        <h3>${firstName} ${lastName}</h3>
        <p><strong>Programme:</strong> ${programme}</p>
        <p><strong>Year:</strong> ${yearValue}</p>
        <p><strong>Interests:</strong> ${interests || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
    `;
    cardsContainer.appendChild(card);

    // Create summary table row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${firstName} ${lastName}</td>
      <td>${email}</td>
      <td>${programme}</td>
      <td>${yearValue}</td>
      <td>${interests || 'N/A'}</td>
      <td><img src="${photoURL}" alt="Photo" style="width:50px; height:50px; border-radius:50%; object-fit:cover;"></td>
      <td><button class="btn remove-btn">Remove</button></td>
    `;
    summaryTableBody.appendChild(row);

    // Remove both row and card when button is clicked
    row.querySelector(".remove-btn").addEventListener("click", () => {
      row.remove();
      card.remove();
    });

    // Reset form
    form.reset();
  });
});
