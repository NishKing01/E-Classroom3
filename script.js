function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";

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
        preview.innerHTML = `<iframe src="${url}" width="100%" height="500px"></iframe>`;
      } else if (file.type.startsWith("image/")) {
        preview.innerHTML = `<img src="${url}" style="max-width:100%;"/>`;
      } else if (file.type.startsWith("video/")) {
        preview.innerHTML = `<video width="100%" controls><source src="${url}" type="${file.type}"></video>`;
      } else {
        preview.innerHTML = `<p>Selected file: ${file.name}</p>`;
      }
    });
  }
});
