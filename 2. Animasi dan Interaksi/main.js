function main(){
    //canvas -> media untuk menggambar --> kertas, dsb
    var canvas = document.getElementById("myCanvas");
    //alat atau tools untuk menggambar --> pensil, bolpen, spidol, dsb
    var gl = canvas.getContext("webgl");

    var vertices = [       
        0.2, 0.1, 1.0, 0.0, 0.0,    //titik A
        0.6, 0.1, 1.0, 0.0, 0.0,    //titik B
        0.2, 0.5, 1.0, 0.0, 0.0,    //titik c
        0.6, 0.5, 1.0, 0.0, 0.0     //titik D
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //vertex shader
    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform mat4 uMatrix;
        void main(){
            gl_Position = vec4(aPosition, 0.0, 1.0) * uMatrix;
            vColor = aColor;
        }
    `;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    void main(){
        gl_FragColor = vec4(vColor, 1.0);
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
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    function onMouseClick(event){
        freeze = !freeze;
    }

    document.addEventListener('click', onMouseClick, false);

    function onKeydown(event){
        if(event.keyCode == 32){
            freeze = true;
        }
    }

    function onKeyup(event){
        if(event.keyCode == 32){
            freeze = false;
        }
    }

    document.addEventListener('keydown', onKeydown, false);
    document.addEventListener('keyup', onKeyup, false);

    var dx = 0.0, dy = 0.0, dz = 0.0;
    //var angle = 0;
    //var sx = 0.0, sy = 0.0, sz = 0.0;

    function render(time){
        if(!freeze){
            dx += 0.01;
            dy += 0.01;
        }
        
        translasi(gl, program, dx, dy, dz);

        
        //memberikan warna background
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        //membersihkan background sebelum digambar
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        window.requestAnimationFrame(render);
    }

    render(1);
    
}
