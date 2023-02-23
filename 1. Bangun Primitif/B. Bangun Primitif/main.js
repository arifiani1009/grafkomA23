function main(){
    //canvas -> media untuk menggambar --> kertas, dsb
    var canvas = document.getElementById("myCanvas");
    //alat atau tools untuk menggambar --> pensil, bolpen, spidol, dsb
    var gl = canvas.getContext("webgl");

    var vertices = [       
        -0.2, 0.7,  //titik A
        -0.6, 0.2,  //titik B
        0.8, 0.5,   //titik C
        0.5, 0.0    //titik D
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //vertex shader
    var vertexShaderCode = `
        attribute vec2 aPosition;
        void main(){
            gl_Position = vec4(aPosition, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //fragment shader
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //container untuk menampung informasi shader
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //memberikan warna background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //membersihkan background sebelum digambar
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 4);
    //gl.drawArrays(gl.LINES, 0, 4);
    //gl.drawArrays(gl.LINE_LOOP, 0, 4);
    //gl.drawArrays(gl.LINE_STRIP, 0, 4);
    //gl.drawArrays(gl.TRIANGLES, 0, 4);
    //gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
