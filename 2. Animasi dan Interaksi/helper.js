function translasi(gl, program, dx, dy, dz){
    var matriksTranslasi = new Float32Array([
        1.0, 0.0, 0.0, dx,
        0.0, 1.0, 0.0, dy,
        0.0, 0.0, 1.0, dz,
        0.0, 0.0, 0.0, 1
    ]);

    var uMatrix = gl.getUniformLocation(program, "uMatrix");
    gl.uniformMatrix4fv(uMatrix, false, matriksTranslasi);
}

function rotasiZ(gl, program, angle){
    var ca = Math.cos(angle);
    var sa = Math.sin(angle);

    var matriksRotasi = new Float32Array([
        ca, -sa, 0.0, 0.0,
        sa, ca, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
        ]);
    
    var uMatrix = gl.getUniformLocation(program, "uMatrix");
    gl.uniformMatrix4fv(uMatrix, false, matriksRotasi);
}

function skalasi(gl, program, sx, sy, sz){
    var matrixSkalasi = new Float32Array([
        sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var uMatrix = gl.getUniformLocation(program, "uMatrix");
    gl.uniformMatrix4fv(uMatrix, false, matrixSkalasi);
}

function shear(gl, program, theta){
    var theta = 45 * Math.PI/180;
    var cota = 1/Math.tan(theta);
    var matrixShear = new Float32Array([
        1.0, cota, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var uMatrix = gl.getUniformLocation(program, "uMatrix");
    gl.uniformMatrix4fv(uMatrix, false, matrixShear);
}
