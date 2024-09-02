// Gets all buttons.
const buttons = document.querySelectorAll(".button-container button");
// Gets all graphs.
const figures = document.querySelectorAll(".graph-container figure");

// Defines the behavior when a button is clicked.
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        // Each button contains a data tag that is the ID of the corresponding graph.
        let selected = e.target.dataset.section;

        deselectAllButtons();
        selectButton(selected);
        hideAllSections();
        showSection(selected);
    })
})

// Removes the "selected" class from all buttons.
function deselectAllButtons() {
    buttons.forEach(button => button.classList.remove("selected"));
}

// Adds the "selected" class to the button corresponding to "section".
function selectButton(section) {
    buttons.forEach(button => {
        if (button.dataset.section === section) {
            button.classList.add("selected");
        }
    });
}

// Removes the "visible" class from all figures.
function hideAllSections() {
    figures.forEach(figure => figure.classList.remove("visible"));
}

// Adds the "visible" class to the figure corresponding to "section".
function showSection(section) {
    figures.forEach(figure => {
        if (figure.getAttribute("id") === section) {
            figure.classList.add("visible");
        }
    })
}