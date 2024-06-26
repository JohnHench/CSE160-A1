// ColoredPoint.js 
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    //gl_PointSize = 30.0;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let g_numSegments = 10;

// Slider for segments on cirlce
function updateNumSegments() {
    let slider = document.getElementById('segmentSlider');
    g_numSegments = parseInt(slider.value);
    document.getElementById('segmentDisplay').textContent = g_numSegments; // Update the display
    renderAllShapes(); // Call the rendering function after updating the number of segments
}

function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    //gl = getWebGLContext(canvas);
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
  }

}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position'); // JS Variable to access GPU variable "a_position"
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor'); // JS Variable to access GPU variable "u_FragColor"
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }

}
// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const DIAMOND = 3;
const WEIRD1 = 4;
const WEIRD2 = 5;
//const STAR = 6;

// Globals related to UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;

function drawHouse() {
  renderHouse();
}
// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
    
    // Button Events (Shape Type)
    document.getElementById('green').onclick = function() { g_selectedColor = [0.0, 1.0, 0.0, 1.0]; };
    document.getElementById('red').onclick   = function() { g_selectedColor = [1.0, 0.0, 0.0, 1.0]; };
    document.getElementById('clearButton').onclick   = function() {g_shapesList = []; renderAllShapes(); };

    // Shape Events
    document.getElementById('pointButton').onclick   = function() {g_selectedType = POINT};
    document.getElementById('triangleButton').onclick   = function() {g_selectedType = TRIANGLE};    
    document.getElementById('circleButton').onclick   = function() {g_selectedType = CIRCLE}; 
    document.getElementById('diamondButton').onclick   = function() {g_selectedType = DIAMOND}; 
    document.getElementById('weird1Button').onclick   = function() {g_selectedType = WEIRD1};  
    document.getElementById('weird2Button').onclick   = function() {g_selectedType = WEIRD2};  
    // document.getElementById('starButton').onclick   = function() {g_selectedType = STAR}; 
    // document.getElementById('heartButton').onclick   = function() {g_selectedType = HEART};   

    // Color Slider Events
    document.getElementById('redSlide').addEventListener('mouseup',   function() { g_selectedColor[0] = this.value/100; });
    document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectedColor[1] = this.value/100; });
    document.getElementById('blueSlide').addEventListener('mouseup',  function() { g_selectedColor[2] = this.value/100; });

    // Transparency Slider Event
    document.getElementById('alphaSlide').addEventListener('mouseup',  function() { g_selectedColor[3] = this.value/100; });
    
    // Segment Slider Event
    document.getElementById('segmentSlider').addEventListener('input', updateNumSegments);

    // Size Slider Events
    document.getElementById('sizeSlide').addEventListener('mouseup',  function() { g_selectedSize = this.value; });

}

function main() {

    // Set up canvas and gl variables
    setupWebGL();
    // Set up GLSL shader programs and connect GLSL variables
    connectVariablesToGLSL();

    // Set up actions for the HTML UI elements
    addActionsForHtmlUI();

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = click;
    canvas.onmousemove = function(ev) { if(ev.buttons == 1) {click(ev) } };

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}


var g_shapesList = [];

// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_sizes = [];   // The array to store the size of a point

function click(ev) {

    // Exctract the event click and return it in WebGL coordinates
    let [x,y] = convertCoordinatesEventToGL(ev);

    // Create and store the new point
    let point;
    if (g_selectedType == POINT) {
        point = new Point();
    }
    else if (g_selectedType == TRIANGLE) {
        point = new Triangle();
    }
    else if (g_selectedType == CIRCLE) {
        point = new Circle();
    }
    else if (g_selectedType == DIAMOND) {
      point = new Diamond();
    } 
    // else if (g_selectedType == STAR) {
    //   point = new Star();
    // }
    // else if (g_selectedType == HEART) {
    //   point = new Heart();
    // }
    else if (g_selectedType == WEIRD1) {
      point = new Weird1();
    }
    else if (g_selectedType == WEIRD2) {
      point = new Weird2();
    }
    point.position = [x, y];
    point.color = g_selectedColor.slice();
    point.size = g_selectedSize;
    g_shapesList.push(point);

    // // Store the coordinates to g_points array
    // g_points.push([x, y]);

    // // Store the coordinates to g_points array
    // g_colors.push(g_selectedColor.slice());

    // // Store the size to the g_sizes array
    // g_sizes.push(g_selectedSize);

    // if (x >= 0.0 && y >= 0.0) {      // First quadrant
    //     g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
    // } else if (x < 0.0 && y < 0.0) { // Third quadrant
    //     g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
    // } else {                         // Others
    //     g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
    // }

    // Draw every shape that is supposed to be in the canvas
    renderAllShapes();

}

// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();
  
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    return([x,y]);
}

// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {

    // Check the time at the start of this function
    var startTime = performance.now();

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // var len = g_points.length;
    var len = g_shapesList.length;

    for(var i = 0; i < len; i++) {
        g_shapesList[i].render();
    }

    // var duration = performance.now() - startTime;
    // sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");

        // var xy = g_shapesList[i].position;
        // var rgba = g_shapesList[i].color;
        // var size = g_shapesList[i].size;

        // // var xy = g_points[i];
        // // var rgba = g_colors[i];
        // // var size = g_sizes[i];

        // // Pass the position of a point to a_Position variable
        // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        // // Pass the color of a point to u_FragColor variable
        // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // // Pass the color of a point to u_Size variable
        // gl.uniform1f(u_Size, size);

        // // Draw
        // gl.drawArrays(gl.POINTS, 0, 1);

}

// function sendTextToHTML(text, htmlID) {
//     var htlmElm = document.getElementById(htlmID);
//     if (!htmlElm) {
//         console.log("Failed to get " + htmlID + " from HTML");
//         return;
//     }
//     htmlElm.innerHTML = text;
// }