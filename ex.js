"use strict";
const canvas = document.getElementById("ashiish-canvas"),
    context = canvas.getContext("2d");
function Circle(t, e, i, n, s) {
    (this.x = t),
        (this.y = e),
        (this.dx = i),
        (this.dy = n),
        (this.radius = s),
        (this.draw = function () {
            context.beginPath(),
                context.arc(this.x, this.y, this.radius, 2 * Math.PI, !1),
                (context.strokeStyle = "rgba(255,255,255, 0.1)"),
                context.stroke(),
                context.fill(),
                (context.fillStyle = "rgba(0,0,0,0.05)");
        }),
        (this.update = function () {
            (this.x + this.radius > innerWidth || this.x - this.radius < 0) &&
                (this.dx = -this.dx),
                (this.y + this.radius > innerHeight ||
                    this.y - this.radius < 0) &&
                    (this.dy = -this.dy),
                (this.x += this.dx),
                (this.y += this.dy),
                this.draw();
        });
}
(canvas.width = window.innerWidth),
    (canvas.height = window.innerHeight),
    (window.onresize = function () {
        (canvas.width = window.innerWidth),
            (canvas.height = window.innerHeight);
    });
let circles = [];
for (let t = 0; t < 100; t++) {
    let t = 10 * Math.random(),
        e = Math.random() * (innerWidth - 2 * t) + t,
        i = Math.random() * (innerHeight - 2 * t) + t,
        n = Math.random() - 0.5,
        s = Math.random() - 0.5;
    circles.push(new Circle(e, i, n, s, t));
}
function render() {
    requestAnimationFrame(render),
        context.clearRect(0, 0, innerWidth, innerHeight);
    for (var t = 0; t < circles.length; t++) circles[t].update();
}
render();
const menu_btn = document.getElementById("ashiishme-menu-btn"),
    menu = document.querySelector(".mobile-menu");
menu_btn.addEventListener("click", () => {
    "0" === menu_btn.dataset.clicked
        ? ((menu.style.marginLeft = "0px"),
          (menu.style.visibility = "visible"),
          (menu_btn.dataset.clicked = "1"))
        : ((menu.style.marginLeft = "-60%"), (menu_btn.dataset.clicked = "0"));
});
