class Diamond {
    // Constructor
    constructor() {
        this.type = 'diamond';
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

        // Pass the color of a point to u_Size variable
        gl.uniform1f(u_Size, size);

        // Draw
        var d = this.size / 200.0; // delta

        // First triangle (top half of the diamond)
        drawTriangle([xy[0], xy[1] + d, xy[0] - d, xy[1], xy[0], xy[1] - d]);

        // Second triangle (bottom half of the diamond)
        drawTriangle([xy[0], xy[1] + d, xy[0] + d, xy[1], xy[0], xy[1] - d]);
    }
}