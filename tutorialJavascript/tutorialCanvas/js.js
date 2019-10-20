var canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');

function collide(x,y,v) {
  dx = v[0]
  dy = v[1]
  if (x > innerWidth || x < 0) {
    dx = -dx
  }

  if (y > innerHeight || y < 0) {
    dy = -dy
  }
  return [dx,dy]
}

function Circle(x,y,dx,dy,color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.size = 10;
  this.collide = function() {
    if (this.x > innerWidth || this.x < 0) {
      this.dx = -this.dx
    }
    if (this.y > innerHeight || this.y < 0) {
      this.dy = -this.dy
    }
  }
  this.setV = function(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
  this.show = function(c) {
    c.beginPath()
    c.ellipse(this.x, this.y, this.size, this.size/2, 0, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
  }
  this.resize = function() {
    var dist = Math.sqrt(
      Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2)
    )

    if (dist > 1500) {
      // if (this.size > 0) {
      //   this.size -= 0.5;
      // }
      this.size = 0
    } else {
      // if (this.size < 50) {
      //   this.size += 0.5;
      // }
      this.size = 10*Math.exp(-Math.pow(Math.floor(dist), 2)/10000)
    }

  }
  this.update = function() {
    this.x += this.dx
    this.y += this.dy
  }
}

var colors = ['rgb(50,50,50)', 'rgb(220,220,220)', 'rgb(220, 55, 20)']
var circles = []
for(i = 0; i<500; i++) {
  circles.push(new Circle(
    Math.random() * innerWidth,
    Math.random() * innerHeight,
    Math.random() * 2,
    Math.random() * 2,
    colors[Math.floor(Math.random()*colors.length)]
  ))
}

var mouse = {
  x: undefined,
  y: undefined,
  up: undefined,
}

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

  }
)

window.addEventListener('mousedown',
  function() {
    mouse.up = false;
  }
)

window.addEventListener('mouseup',
  function(event) {
    mouse.up = true;
  }
)

function animate() {
  requestAnimationFrame(animate);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c.clearRect(0, 0, innerWidth, innerHeight)

  circles.forEach(circle => circle.collide());
  circles.forEach(circle => circle.resize());
  circles.forEach(circle => circle.update());
  circles.forEach(circle => circle.show(c));
  console.log(circles[0].size)
}

console.log([1,2] - [2,3])

animate()
