function main(){
    //canvas -> media untuk menggambar --> kertas, dsb
    var canvas = document.getElementById("myCanvas");
    //alat atau tools untuk menggambar --> pensil, bolpen, spidol, dsb
    var gl = canvas.getContext("webgl"); 

    //vertex shader
    var vertexShaderCode = `
        attribute vec2 aPosition;
        void main(){
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
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

    //memberikan warna background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //membersihkan background sebelum digambar
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 3);

}
