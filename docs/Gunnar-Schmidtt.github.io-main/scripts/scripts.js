document.addEventListener("DOMContentLoaded", function() {
  console.log("Script loaded and DOM ready!");

  const btn = document.getElementById("say-hi");
  if (btn) {
    const msg = document.getElementById("message");
    btn.addEventListener("click", function() {
      msg.style.display = "block";
      console.log("Hello message shown!");
      setTimeout(() => {
        msg.style.display = "none";
      }, 2000);
    });
  }

  // Load projects from JSON
  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) {
    fetch("../assets/projects.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }
        return response.json();
      })
      .then(projects => {
        renderProjects(projects);
      })
      .catch(error => {
        console.error("Error loading projects:", error);
        projectsContainer.innerHTML = "<p>Error loading projects. Please try again later.</p>";
      });
  }

  function renderProjects(projects) {
    const container = document.getElementById("projects-container");
    let html = "";
    let cardCount = 0;

    projects.forEach(project => {
      // Start a new row every 2 cards
      if (cardCount % 2 === 0) {
        if (cardCount > 0) html += "</div>"; // Close previous row
        html += '<div class="row' + (cardCount > 0 ? " mt-4" : "") + '">';
      }

      html += '<div class="col-sm-6">';
      html += '<div class="card h-100 mt-4">';
      html += '<div class="card-body">';
      html += '<h5 class="card-title">' + project.title + '</h5>';
      html += '<img src="' + project.image + '" class="card-img-top" alt="' + project.imageAlt + '">';
      html += '<p class="card-text">' + project.description + '</p>';

      if (project.links && project.links.length > 0) {
        html += '<ul class="list-group list-group-flush">';
        project.links.forEach(link => {
          html += '<li class="list-group-item"><a href="' + link.url + '" target="_blank">' + link.text + '</a></li>';
        });
        html += '</ul>';
      }

      html += '</div>';
      html += '</div>';
      html += '</div>';

      cardCount++;
    });

    if (cardCount > 0) html += "</div>"; // Close last row

    container.innerHTML = html;
  }
});
