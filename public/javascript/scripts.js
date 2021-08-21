const button = document.getElementById("submit");

const colors = ["#000080ff", "#87de87ff", "#fa6722ff", "#f8cb30ff"];

button.style.backgroundColor = colors[0];

let index = 1;

setInterval(() => {
    if (index === colors.length) {
        button.style.backgroundColor = colors[0];
        index = 1;
    } else {
        button.style.backgroundColor = colors[index];
        index++;
    }
}, 4000);
