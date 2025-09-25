function showSection(id, event) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");

  if (id === "dashboard") renderDashboard();
}

function renderDashboard() {
  const subject = document.getElementById("subjectSelect").value;
  const container = document.getElementById("dashboardContent");
  container.innerHTML = "";

  const materialsBySubject = {
    physics: [
      { title: "Motion", file: "materials/physics/motion.pdf" }
    ],
    chemistry: [
      { title: "Acids & Bases", file: "materials/chemistry/acids-bases.pdf" }
    ],
    math: [
      { title: "Algebra Guide", file: "materials/math/algebra-guide.pdf" }
    ]
  };

  const selectedMaterials = materialsBySubject[subject] || [];

  selectedMaterials.forEach(item => {
    container.innerHTML += `
      <div class="dashboard-card">
        <h3>${item.title}</h3>
        <a href="${item.file}" target="_blank">Open Material</a>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("previewArea");

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      preview.innerHTML = "";

      if (!file) return;

      const url = URL.createObjectURL(file);

      if (file.type === "application/pdf") {
        preview.innerHTML = `<iframe src="${url}" height="500px"></iframe>`;
      } else if (file.type.startsWith("image/")) {
        preview.innerHTML = `<img src="${url}" />`;
      } else if (file.type.startsWith("video/")) {
        preview.innerHTML = `<video controls><source src="${url}" type="${file.type}"></video>`;
      } else {
        preview.innerHTML = `<p>Selected file: ${file.name}</p>`;
      }
    });
  }
});
