function renderHouse() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Define vertices for the background (sky) and ground (grass) (painfully plotted the matrix for perfection lmfao)
    const vertices = [
        // Sky
        -1.0, 1.0,
        1.0, 1.0,
        1.0, -0.5,
        -1.0, -0.5,
        // House
        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5,
        // Roof
        -0.7, 0.5,
        0.7, 0.5,
        0.0, 0.9,
        // Roof decoration
        -0.7, 0.5,
        -0.5, 0.8,
        0.0, 0.9,
        0.5, 0.8,
        0.7, 0.5,
        // Door
        -0.1, -0.5,
        0.1, -0.5,
        0.1, 0.0,
        -0.1, 0.0,
        // Door knob
        0.05, -0.2,
        0.05, -0.3,
        -0.05, -0.3,
        -0.05, -0.2,
        // Windows
        -0.3, 0.1,
        -0.1, 0.1,
        -0.1, 0.3,
        -0.3, 0.3,
        0.3, 0.1,
        0.1, 0.1,
        0.1, 0.3,
        0.3, 0.3,
        // Additional Windows
        -0.3, 0.4,
        -0.1, 0.4,
        -0.1, 0.6,
        -0.3, 0.6,
        0.3, 0.4,
        0.1, 0.4,
        0.1, 0.6,
        0.3, 0.6,
        // Grass
        -1.0, -0.5,
        1.0, -0.5,
        1.0, -1.0,
        -1.0, -1.0
    ];

    // Create a buffer for the vertices
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.error('Failed to create the buffer object');
        return;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Get the attribute location
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.error('Failed to get the storage location of a_Position');
        return;
    }

    // Assign the buffer object to the attribute variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Set colors
    let skyColor = [0.5, 0.7, 1.0, 1.0]; // Sky Blue
    let houseColor = [0.7, 0.3, 0.2, 1.0]; // Brown
    let roofColor = [0.8, 0.2, 0.2, 1.0]; // Red
    let roofDecoColor = [0.9, 0.5, 0.5, 1.0]; // Light Red
    let doorColor = [0.4, 0.2, 0.1, 1.0]; // Dark Brown
    let knobColor = [0.5, 0.5, 0.5, 1.0]; // Gray
    let windowColor = [0.8, 0.8, 0.9, 1.0]; // Light Gray
    let grassColor = [0.2, 0.6, 0.3, 1.0]; // Green

    // Draw the background (sky)
    gl.uniform4fv(u_FragColor, skyColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); // Sky

    // Draw the house
    gl.uniform4fv(u_FragColor, houseColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4); // House

    // Draw the roof
    gl.uniform4fv(u_FragColor, roofColor);
    gl.drawArrays(gl.TRIANGLES, 8, 3); // Roof

    // Draw the roof decoration
    gl.uniform4fv(u_FragColor, roofDecoColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 11, 5); // Roof Decoration

    // Draw the door
    gl.uniform4fv(u_FragColor, doorColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 16, 4); // Door

    // Draw the door knob
    gl.uniform4fv(u_FragColor, knobColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 20, 4); // Door Knob

    // Draw the windows
    gl.uniform4fv(u_FragColor, windowColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 24, 4); // Window 1
    gl.drawArrays(gl.TRIANGLE_FAN, 28, 4); // Window 2
    // Additional Windows
    gl.drawArrays(gl.TRIANGLE_FAN, 32, 4); // Additional Window 1
    gl.drawArrays(gl.TRIANGLE_FAN, 36, 4); // Additional Window 2

    // Draw the ground (grass)
    gl.uniform4fv(u_FragColor, grassColor);
    gl.drawArrays(gl.TRIANGLE_FAN, 40, 4); // Grass
}