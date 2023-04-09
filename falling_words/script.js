// Import some stuff from matter.js
const { Engine, World, Bodies, Body, Vector, SAT } = Matter;

// Our world and engine
let world, engine;

// An array of all bodies
let bodies = [];

// A class for all bodies displayed in p5.js
// class _Body {
//   constructor(body, text=''){
//     this.body = body;

//     // Add the body to the world
//     World.add(world, this.body);

//     // Generate a random pastel color
//     let r = random(200, 255);
//     let g = random(200, 255);
//     let b = random(200, 255);
//     this.color = color(r, g, b, 200);
//   }
  
//   draw(){
//     // Draw the body by its vertices
//     fill(this.color);
//     let pos = this.body.position;
//     let angle = this.body.angle;
//     let text = this.text
//       textSize(fontsize);
//     textAlign(CENTER, CENTER);  
//     beginShape();
//     for(var i = 0; i < this.body.vertices.length; i++){
// text(this.body.vertices[i].x,   this.body.vertices[i].y)
//   vertex(this.body.vertices[i].x, this.body.vertices[i].y);
//     }
//     endShape();
//   }  
// }


class _Body {
  constructor(body){
    this.body = body;

    // Add the body to the world
    World.add(world, this.body);

    // Generate a random pastel color
    let r = random(200, 255);
    let g = random(200, 255);
    let b = random(200, 255);
    this.color = color(r, g, b, 200);
  }
  
  draw(){
    // Draw the body by its vertices
    fill(this.color);
    let pos = this.body.position;
    let angle = this.body.angle;
    beginShape();
    for(var i = 0; i < this.body.vertices.length; i++){
      vertex(this.body.vertices[i].x, this.body.vertices[i].y);
    }
    endShape();

    // Add the text label to the body
    textAlign(CENTER, CENTER);
    textSize(16);
    fill('#000');
    text(this.body.text, pos.x, pos.y);
  }  
}


function setup(){
  // Setting up our p5.js environment
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  rectMode(CENTER);
  noStroke();

    greeting = createElement('h3', 'Falling Text');
  greeting.position(10, 0)
  

  // Configuring and creating our matter world and engine
  engine = Engine.create({
    gravity: {
      y: 2.5
    }
  });
  world = engine.world;
  Matter.Runner.run(engine);

  // This is the floor.  Any bodies with the isStatic property means something unmoving, like a solid wall
  bodies.push(new _Body(Bodies.rectangle(width/2, height - 15, width, 30, {isStatic: true})));
  
  // Creating an input field
  let input = createInput();
  input.position(10, 50);
  input.size(200);
  input.input(inputEvent);

  input.attribute('placeholder', 'Enter text');
  input.style('border', 'none'); // remove the border
input.style('outline', 'none'); // remove the outline
}
function inputEvent() {
  // Get the value of the input field
  let text = this.value();
  
  // If the input field is not empty and the Enter key is pressed
  // if (text !== '' && key === 'Enter') {
    // Create a new body with a text label
    let newBody = Bodies.rectangle(random(0, width), 50, text.length * 10, 50, {
      restitution: 0.5,
  //     render: {
  //   text: text,
  //   fillStyle: "black"
  // }
    });
    
    // Add the text as a property of the new body
    newBody.text = text;
    
    bodies.push(new _Body(newBody));

    // Apply a downward force to the new body
    Body.applyForce(newBody, newBody.position, { x: 0, y: 0.1 });

    // Clear the input field
  //   this.value('');
  // }
}

function draw(){
  background(200);

  if(frameCount % 10 === 0){ // Every ten frames, add a new body.
    bodies.push(new _Body(Bodies.rectangle(random(0, width), 50, random(10, 50), random(10, 50))))
  }
  
  bodies.forEach(body => body.draw()); // Draw every body
}
