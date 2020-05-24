var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
/*
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(400, 100, 100, 100);
c.fillStyle = 'rgba(0, 255, 0, 0.5)';
c.fillRect(300, 300, 100, 100);
console.log(canvas);

// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3";
c.stroke();
 */

// Arc

/* for (var i = 0; i < 50; i++) {

    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var color = 'rgba(' + Math.random()*255 + ',' + Math.random()*255 + ', ' + Math.random()*255 + ', ' + Math.random() + ')';

    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI*2, false);
    c.strokeStyle = color;
    c.stroke();
    
} */
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 2 * radius * (1 + Math.random());
    this.minRadius = radius * (1 - Math.random()) + 1;
    this.dr = 1;

    var color = 'rgba(' + Math.random()*255 + ',' + Math.random()*255 + ', ' + Math.random()*255 + ', ' + Math.random() + ')';


    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = color;
        c.fillStyle = color;
        c.fill();
        c.stroke();
        }

    this.update = function() {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
            this.radius < this.maxRadius) {
            this.radius = Math.min(this.maxRadius, this.radius + this.dr);
        } else {
            if (this.radius > this.minRadius) {
                this.radius = Math.max(this.minRadius, this.radius - this.dr)
            }
        }
        this.draw();
    }
}
var circleArray = [];

for (i=0; i < 1000; i++) {
    var radius = 30 * Math.random();
    var x = Math.random() * (window.innerWidth - radius*2) + radius;
    var y = Math.random() * (window.innerHeight - radius*2) + radius;
    var dx = 1 * (Math.random() - 0.5);
    var dy = 1 * (Math.random() - 0.5);

    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i=0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();


var img = new Image();
img.onload = function() {
c.drawImage(img, 300, 300);
}
img.src = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg";

