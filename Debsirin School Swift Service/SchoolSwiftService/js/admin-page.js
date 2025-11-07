/* ---------- Modal logic ---------- */
const modal = document.getElementById("reportModal");

function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

/*window.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
modal.addEventListener('click', (e) => e.target === modal && closeModal());

/* ---------- Search & Status filter ---------- */
const searchInput = document.getElementById("searchInput");
const rows = document
  .querySelector("#reportsTable tbody")
  .getElementsByTagName("tr");

searchInput.addEventListener("input", () => {
  filterTable(searchInput.value.trim().toLowerCase(), getSelectedStatus());
});

function filterByStatus(status) {
  filterTable(searchInput.value.trim().toLowerCase(), status);
}

function getSelectedStatus() {
  return document.querySelector(".status-filter").value; // '' | submitted | in-progress | completed
}

function filterTable(searchTerm, status) {
  Array.from(rows).forEach((row) => {
    /* คอลัมน์ Item (index 1) */
    const itemText = row.cells[1].textContent.trim().toLowerCase();

    /* ดึงสถานะจากคลาส span เช่น status-submitted */
    const statusSpan = row.cells[0].querySelector("span");
    const match = statusSpan?.className.match(
      /status-(submitted|in-progress|completed)/
    );
    const rowStatus = match ? match[1] : "";

    const searchMatch = !searchTerm || itemText.includes(searchTerm); // ใช้ includes() ให้ค้นคำในประโยคได้
    const statusMatch = !status || rowStatus === status;

    row.style.display = searchMatch && statusMatch ? "" : "none";
  });
}
