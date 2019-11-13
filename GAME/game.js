const numberOfUFOs = 10;
      probSpawn = 0.1;
      sizeOfUFO = 30;
      probChangeDirection = 0.01;
      skyratio = 2/3;
      skycolor = "rgb(15, 15, 30)";
      groundcolordark = "rgb(17, 10, 17)";
      groundcolor = "rgb(60, 35, 60)";
      horizon = 0.05;
      twinkling = 0.5;
      starSizeMax = 3;
      starSizeMin = 1;
      starCount = 300;
      particleSize = 3;
      particleAlpha = 0.3;
      particleCount = 1000;
      particleV = 1;
      particleVz = 0.1;
      sigma = 50000;
      innerDepth = 5;
      frontBoundary = 0.001;
      bushInnerDepth = 10;
      bushSize = 100;
      bushCount = 150;
      shotRadius = 200;

var   velocity = 10;
      brightness = 30;


var canvas = document.querySelector('canvas');
    c = canvas.getContext('2d');


function UFO(x,y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = sizeOfUFO;
    this.updateCoord = function() {
        this.x += this.dx;
        this.y += this.dy;
    }
    this.collideBorders = function() {
        if(this.x < 0 || this.x > innerWidth)  {this.dx = -this.dx; };
        if(this.y < 0 || this.y > innerHeight*skyratio - sizeOfUFO) {this.dy = -this.dy; };
        if(this.y > this.y > innerHeight*skyratio - sizeOfUFO) {this.y = innerHeight*skyratio - sizeOfUFO}
    }
    this.changeDirection = function() {
        if(Math.random() < probChangeDirection) {
            var angle = Math.random() * Math.PI * 2;
                v = Math.random() * velocity;
            this.dx = v * Math.cos(angle);
            this.dy = v * Math.sin(angle);
        };
    };

    this.draw = function() {
        var dist = Math.max(Math.sqrt(Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2)), 20)
            c1 = 'rgb(' + 60*brightness/dist + ',' + 60*brightness/dist + ' , ' + 60*brightness/dist + ')';
            c2 = 'rgb(' + 140*brightness/dist + ',' + 140*brightness/dist + ' , ' + 140*brightness/dist + ')';
            c3 = 'rgb(' + 190*brightness/dist + ',' + 190*brightness/dist + ' , ' + 190*brightness/dist + ')';
            c4 = 'rgb(' + 220*brightness/dist + ',' + 220*brightness/dist + ' , ' + 220*brightness/dist + ')';

        c.beginPath();
        c.arc(this.x, this.y + this.size/10, this.size/2, 0, Math.PI);
        c.fillStyle = c1;
        c.fill();

        c.beginPath();
        c.ellipse(this.x, this.y + this.size/10, this.size, this.size/4, 0, 0, Math.PI);
        c.fillStyle = c2;
        c.fill();

        c.beginPath();
        c.fillRect(this.x - this.size, this.y - this.size/10 , 2*this.size, this.size/5);

        c.beginPath();
        c.ellipse(this.x, this.y - this.size/10, this.size, this.size/4, 0, 0, Math.PI * 2);
        c.fillStyle = c3;
        c.fill();

        c.beginPath();
        c.arc(this.x, this.y - this.size/10, this.size/2, 0, Math.PI, true);
        c.fillStyle = c4;
        c.fill();

        c.beginPath();
        c.ellipse(this.x, this.y - this.size/10, this.size/2, this.size/8, 0, 0, Math.PI);
        c.fill();

    }

    this.isNotShot = function() {
        var ret = !gun.shots || (Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2) > shotRadius);
        if(!ret) {
            scorebox += 100
        }
        return ret
    }

}

function Star(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.draw = function(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        c.fillStyle = "rgb(250,250,250)";
        c.fill()
    }
    this.twinkle = function() {
        this.size = Math.min(starSizeMax, Math.max(starSizeMin, this.size + twinkling*(Math.random() - 0.5)))
    }
}

function Particle() {
    this.x = Math.random() * innerWidth;
    this.y = Math.random() * innerHeight;
    this.z = Math.random() * innerDepth;
    this.dx = particleV*(Math.random() - 0.5);
    this.dy = particleV*(Math.random() - 0.5);
    this.dz = particleVz*(Math.random() - 0.5);

    this.draw = function(c) {
        var dist = Math.sqrt(Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2));
        c.beginPath();
        c.arc(this.x, this.y, particleSize*Math.exp(-this.z), 0, 2*Math.PI);
        c.fillStyle = 'rgba(' + Math.exp(-this.z)*200*brightness*Math.exp(-Math.pow(dist,2)/sigma*5) +
                      ','     + Math.exp(-this.z)*200*brightness*Math.exp(-Math.pow(dist,2)/sigma*5) +
                      ','     + Math.exp(-this.z)*200*brightness*Math.exp(-Math.pow(dist,2)/sigma*5) +
                      ','     + particleAlpha + ')';
        c.fill();
    }

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    };

    this.collideBorders = function() {
        if(this.x < -10 || this.x > innerWidth + 10) {this.dx = -this.dx};
        if(this.y < -10 || this.y > innerHeight + 10) {this.dy = -this.dy};
        if(this.z < frontBoundary || this.z > innerDepth) {this.dz = -this.dz};
    };

}
// bushes

function Bush() {
    this.x = Math.random() * innerWidth;
    this.z = Math.random() * bushInnerDepth + frontBoundary;
    this.y = innerHeight * (skyratio - horizon) + Math.exp(-this.z)*(1 - skyratio + horizon)*innerHeight;
    this.size = bushSize * Math.exp(-this.z);
    this.smallersize = this.size * Math.sin(Math.PI/8)
    this.draw = function(c) {
        var dist = Math.sqrt(Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2));
        c.fillStyle = 'rgb(' + (15+Math.exp(-this.z)*2.5*brightness*Math.exp(-Math.pow(dist,2)/sigma)) +
                    ','    + (15+Math.exp(-this.z)*5*brightness*Math.exp(-Math.pow(dist,2)/sigma)) +
                    ','    + (15+Math.exp(-this.z)*2.5*brightness*Math.exp(-Math.pow(dist,2)/sigma)) + ')';
        c.beginPath();
        c.arc(this.x, this.y, this.size*1.15, 0, Math.PI, true);
        c.fill();
        c.beginPath();
        c.arc(this.x - this.size, this.y, this.smallersize, 0, Math.PI, true);
        c.fill();
        c.beginPath();
        c.arc(this.x + this.size, this.y, this.smallersize, 0, Math.PI, true);
        c.fill();
        c.beginPath();
        c.arc(this.x - Math.sqrt(2)*this.size/2, this.y - Math.sqrt(2)*this.size/2, this.smallersize, 0, 2*Math.PI, true);
        c.fill();
        c.beginPath();
        c.arc(this.x + Math.sqrt(2)*this.size/2, this.y - Math.sqrt(2)*this.size/2, this.smallersize, 0, 2*Math.PI, true);
        c.fill();
        c.beginPath();
        c.arc(this.x, this.y - this.size, this.smallersize, 0, 2*Math.PI, true);
        c.fill();
    };
}

// mouse

var mouse = {
  x: 0,
  y: 0,
  down: false
};

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
);

window.addEventListener('mousedown',
  function() {
    mouse.down = true;
    console.log('mousedown')
  }
);

window.addEventListener('mouseup',
  function() {
    mouse.down = false;
    console.log('mouseup')
  }
);
// gun

var gun = {
    amo: 8,
    shots: false,
    reloads: false,
    timer: 0
}

function updateGun() {
    if(gun.amo == 0) {
        gun.amo = 8;
        scorebox -= 100;
    }
    if(!gun.reloads && mouse.down && gun.amo > 0) {
        gun.amo -= 1;
        gun.shots = true;
        gun.reloads = true;
        gun.timer = 15;
    }
    if(gun.timer > 0) {
        gun.timer -= 1;
    }
    if(gun.shots && gun.timer < 12) {
        gun.shots = false;
    }
    if(gun.timer == 0) {
        gun.reloads = false;
    }

}

function drawGun(c, x, y) {
    c.fillStyle = "white";
    c.font = "40px Consolas"
    c.fillText("|".repeat(gun.amo), x,y)
}

// world

var world = {
    ufos: [],
    bushes: [],
    stars: [],
    particles: []
};

for(i = 0; i < starCount; i++) {
    world.stars.push(new Star(Math.random() * innerWidth,
                              Math.random() * innerHeight*(skyratio - horizon),
                              Math.random() * (starSizeMax - starSizeMin) + starSizeMin));
}

for(i = 0; i < particleCount; i++) {
    world.particles.push(new Particle());
}

for(i = 0; i < bushCount; i++) {
    world.bushes.push(new Bush());
}
world.bushes.sort((b1, b2) => b1.y - b2.y)
// scorebox

var scorebox = 0000;

function drawScoreBox(c, x, y, width, height, radius, ) {

  c.beginPath();
  c.moveTo(x + radius, y);
  c.lineTo(x + width - radius, y);
  c.quadraticCurveTo(x + width, y, x + width, y + radius);
  c.lineTo(x + width, y + height - radius);
  c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  c.lineTo(x + radius, y + height);
  c.quadraticCurveTo(x, y + height, x, y + height - radius);
  c.lineTo(x, y + radius);
  c.quadraticCurveTo(x, y, x + radius, y);
  c.closePath();
  c.fillStyle = "black";
  c.fill();
  c.strokeStyle = "white";
  c.lineWidth = 5;
  c.stroke();
  c.fillStyle = "white";
  c.font = "50px Consolas"
  c.fillText("SCORE " + scorebox, x + radius, y + height - radius);

}
// ufosys

function spawnUFOs(ufos) {
    if (ufos.length < numberOfUFOs && Math.random() < probSpawn) {
        ufos.push(new UFO(Math.random() * innerWidth, Math.random() * innerHeight * skyratio));
    }
};

function moveUFOs(ufos) {
    ufos.forEach(ufo => ufo.changeDirection());
    ufos.forEach(ufo => ufo.collideBorders());
    ufos.forEach(ufo => ufo.updateCoord());
}

function drawUFOs(ufos,c) {
    ufos.forEach(ufo => ufo.draw(c));
}

function filterInPlace(a, condition) {
  let i = 0, j = 0;

  while (i < a.length) {
    const val = a[i];
    if (condition(val, i, a)) a[j++] = val;
    i++;
  }

  a.length = j;
  return a;
}

function destroyUFOs(ufos) {
    filterInPlace(ufos, ufo => ufo.isNotShot());
}

function ufoSys(world, c) {
    destroyUFOs(world.ufos);
    spawnUFOs(world.ufos);
    moveUFOs(world.ufos);
    drawUFOs(world.ufos, c);
};

// background

function drawBackground(world, c) {
    // sky
    c.beginPath();
    c.fillStyle = skycolor;
    c.fillRect(0, 0, innerWidth, innerHeight*skyratio);
    // ground
    var grd = c.createRadialGradient(mouse.x, mouse.y, 8*brightness,
                                     mouse.x, mouse.y, 0);
    grd.addColorStop(0, groundcolordark);
    grd.addColorStop(1, groundcolor);
    c.fillStyle = grd;
    c.fillRect(0, innerHeight*(skyratio - horizon), innerWidth, innerHeight*(1-skyratio+horizon));

    grd = c.createLinearGradient(0, innerHeight*(skyratio - horizon),
                                 0, innerHeight);
    grd.addColorStop(0, 'rgba(0,0,0,0.6)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = grd;
    c.fillRect(0, innerHeight*(skyratio - horizon), innerWidth, innerHeight*(1-skyratio+horizon));

    // stars
    world.stars.forEach(star => star.twinkle());
    world.stars.forEach(star => star.draw(c));
    // bushes
    world.bushes.forEach(bush => bush.y < skyratio*innerHeight ? bush.draw(c) : null)
}

// foreground
function drawForeground(world, c) {
    //bushes
    world.bushes.forEach(bush => bush.y > skyratio*innerHeight ? bush.draw(c) : null);
    //particles
    world.particles.forEach(particle => particle.move());
    world.particles.forEach(particle => particle.collideBorders());
    world.particles.forEach(particle => particle.draw(c));
}

console.log(world);

function animate() {
    requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.clearRect(0,0,innerWidth,innerHeight);
    updateGun();
    drawBackground(world, c);
    ufoSys(world, c);
    drawForeground(world,c);
    drawScoreBox(c, 30, innerHeight - 80, 157, 51, 10);
    drawGun(c, 20, innerHeight - 100);
};

animate();
