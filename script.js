const grid = document.querySelector(".grid");
const color_picker =  document.querySelector(".color_picker");
const click_mode_button = document.querySelector(".click_mode");
const hover_mode_button = document.querySelector(".hover_mode");
const color_mode_button = document.querySelector(".color_mode");
const rainbow_mode_button = document.querySelector(".rainbow_mode");
const eraser_button = document.querySelector(".eraser");
const clear_button = document.querySelector(".clear");
const slider = document.querySelector(".slider");
const slider_indicator =  document.querySelector(".slider_indicator");

const GRID_SIZE = 500;
const EASE_BLACK = "#22272e";
const EASE_BLUE = "#2196f3"
let hover_mode = false;
let color_mode = false;
let eraser = false;

window.onload = () => {
    color_picker.value = "#FFFFFF";
    slider.value = "16";
    setUpGrid(16);
    toggle_event_mode();
    toggle_color_mode();
}

function setUpGrid(size) {
    slider_indicator.textContent = size;
    grid.innerHTML = "";
    for (let i  = 0; i < size; i++) {
        let div = document.createElement("div");
        div.classList.add("grid_row");
        div.style.height = GRID_SIZE / size + "px";
        grid.appendChild(div);
        for (let j = 0; j < size; j++) {
            let element = document.createElement("div");
            element.style.height =  GRID_SIZE / size + "px";
            element.style.width = GRID_SIZE / size + "px";
            element.classList.add("grid_element");
            element.addEventListener("click", () => {
                if (!hover_mode) {
                    element.style.background = eraser ? EASE_BLACK : (color_mode ? color_picker.value : random_color());
                }
            }); 
            element.addEventListener("mouseover", () => {
                if (hover_mode) {
                    element.style.background = eraser ? EASE_BLACK : (color_mode ? color_picker.value : random_color());
                }
            }); 
            div.appendChild(element);
        }
    }
}

function toggle_event_mode() {
    hover_mode = !hover_mode;
    if (hover_mode) {
        hover_mode_button.style.background = EASE_BLUE;
        click_mode_button.style.background = EASE_BLACK;
    }
    else {
        click_mode_button.style.background = EASE_BLUE;
        hover_mode_button.style.background = EASE_BLACK;
    }
}

click_mode_button.addEventListener("click", () => {
    if(hover_mode) {
        toggle_event_mode();
    }
})

hover_mode_button.addEventListener("click", () => {
    if(!hover_mode) {
        toggle_event_mode();
    }
})

function toggle_color_mode() {
    color_mode = !color_mode;
    if (color_mode) {
        color_mode_button.style.background = EASE_BLUE;
        rainbow_mode_button.style.background = EASE_BLACK;
    }
    else {
        color_mode_button.style.background = EASE_BLACK;
        rainbow_mode_button.style.background = EASE_BLUE;
    }
}


color_mode_button.addEventListener('click', () => {
    if (!color_mode) {
        toggle_color_mode();
    }
})
rainbow_mode_button.addEventListener('click', () => {
    if (color_mode) {
        toggle_color_mode();
    }
})
function random_color() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}


eraser_button.addEventListener("click", () => {
    eraser_button.style.background = eraser ? EASE_BLACK : EASE_BLUE;
    eraser = !eraser;
})

clear_button.addEventListener("click", () => {
    document.querySelectorAll(".grid_element").forEach(grid_element => {
        grid_element.style.background = EASE_BLACK;
    })
}) 
slider.addEventListener('input', () => {
    setUpGrid(slider.value);
})

