(() => {
    // max and min particle radius, mass, color
    const config = {
        dotMinRad: 5,
        dotMaxRad: 20,
        massFactor: 0.002,
        defColor: `rgba(1250, 10, 30, 0.9)`,
    }
    const TWO_PI = 2 * Math.PI;
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //canvas height (h) and width(w)
    let w, h, mouse, dots;


    //class and constructor of an object
    class Dot {
        constructor() { // stored speed, radius, mass and particle size
            this.pos = { x: mouse.x, y: mouse.y } // draw a circle in a specific place
            this.vel = { x: 0, y: 0 } // speed
            this.rad = random(config.dotMinRad, config.dotMaxRad); // random radius of the point 6 - min and 20 - max

            // mass of the particle, used in calculating the attraction of one particle to another - affects the speed and direction
            this.mass = this.rad * config.massFactor;
            this.color = config.defColor; // color
        }

        // to draw points
        draw() {
            createCircle(this.pos.x, this.pos.y, this.rad, true, this.color);
            createCircle(this.pos.x, this.pos.y, this.rad, false, config.defColor);
        }
    }


    // draw a circle
    function createCircle(x, y, rad, fill, color) {
        ctx.fillStyle = ctx.strokeStyle = color; // set color
        ctx.beginPath(); // open the path
        ctx.arc(x, y, rad, 0, TWO_PI); // draw the arc
        ctx.closePath(); // close the path
        fill ? ctx.fill() : ctx.stroke(); // circle by the fill method if the fill variable is set to 'true', or the contour if 'false'
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    //assign values to variables
    function init() {
        w = canvas.width = innerWidth; // canvas width is equal to window width
        h = canvas.height = innerHeight;

        mouse = { x: w / 2, y: h / 2, down: false } // status and click information is also storedкнопки
        dots = []; // create an array of particles
    }

    // to redraw the particles
    function loop() {
        ctx.clearRect(0, 0, w, h); // clean the canvas
        if (mouse.down) {
            dots.push(new Dot());
        }
        dots.map(e => e.draw()); // call the Draw method for each particle
        window.requestAnimationFrame(loop); //loop the function
    }


    init(); // function call
    loop();

    function setPos({ layerX, layerY }) {
        [mouse.x, mouse.y] = [layerX, layerY]; // update mouse position
    }

    function isDown() {
        mouse.down = !mouse.down;
    }

    canvas.addEventListener('mousemove', setPos);
    // press and release mouse keys
    window.addEventListener('mousedown', isDown);
    window.addEventListener('mouseup', isDown);
})();