class Weird1 {

    // Constructor
    constructor() {
        this.type = 'weird1';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
    }

    render() {
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size, size);

        // Draw the Weird1 shape using triangles
        var d = this.size / 200.0; // delta
        var vertices = [
            xy[0], xy[1] + 0.5 * d,                     // Top vertex
            xy[0] - 0.15 * d, xy[1] + 0.15 * d,         // Top left inner vertex
            xy[0] - 0.5 * d, xy[1] + 0.3 * d,           // Top left outer vertex
            xy[0] - 0.25 * d, xy[1] - 0.25 * d,         // Bottom left vertex
            xy[0] - 0.4 * d, xy[1] - 0.6 * d,           // Bottom left outer vertex
            xy[0], xy[1] - 0.35 * d,                    // Bottom vertex
            xy[0] + 0.4 * d, xy[1] - 0.6 * d,           // Bottom right outer vertex
            xy[0] + 0.25 * d, xy[1] - 0.25 * d,         // Bottom right vertex
            xy[0] + 0.5 * d, xy[1] + 0.3 * d,           // Top right outer vertex
            xy[0] + 0.15 * d, xy[1] + 0.15 * d          // Top right inner vertex
        ];

        drawWeird1(vertices);
    }

}

function drawWeird1(vertices) {
    var n = 10; // 10 vertices to make a Weird1

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

class Weird2 {

    // Constructor
    constructor() {
        this.type = 'weird2';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
    }

    render() {
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size, size);

        // Draw the weird2 shape using triangles
        var d = this.size / 200.0; // delta
        var vertices = [
            xy[0], xy[1] + d,                         // Top vertex
            xy[0] - d, xy[1] - d,                     // Bottom left vertex
            xy[0] + d, xy[1] - d,                     // Bottom right vertex
            xy[0], xy[1] - 0.6 * d,                   // Inner top vertex
            xy[0] - 0.5 * d, xy[1] + 0.4 * d,         // Left inner vertex
            xy[0] + 0.5 * d, xy[1] + 0.4 * d          // Right inner vertex
        ];

        drawWeird2(vertices);
    }

}

function drawWeird2(vertices) {
    var n = 6; // 6 vertices to make a Weird2

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}