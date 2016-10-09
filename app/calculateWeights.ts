addEventListener('message', function (event) {
    switch (event.data.msg) {
        case 'calculate': {
            let data = event.data,
                result = calculate(data.block, data.weightMatrix, data.transposeWeightMatrix);

            this.postMessage({
                msg: 'result',
                result: result
            });
            break;
        }
        case 'stop': {
            this.close();
        }

    }
}, false);

/**
 * @param {any} block
 * @param {number[][]} weightMatrix
 * @param {number[][]} transposeWeightMatrix
 * @returns {{weightMatrix: number[][], transposeWeightMatrix: number[][]}}
 */
function calculate(block: any, weightMatrix: number[][], transposeWeightMatrix: number[][]) {
    let matrixX = block.buffer,
        matrixY = multipleMatrix(matrixX, weightMatrix),
        transposeMatrixX = multipleMatrix(matrixY, transposeWeightMatrix),
        deltaX = minus(transposeMatrixX, matrixX);

    // let alphaX = 1 / Matrix.vectorSum(matrixX),
    //     alphaY = 1 / Matrix.vectorSum(matrixY);

    let alphaX = 0.001,
        alphaY = 0.001;

    let w1 = transpose(matrixX),
        w2 = multipleSkalar(w1, alphaX),
        w3 = multipleMatrix(w2, deltaX),
        w4 = transpose(transposeWeightMatrix),
        w5 = multipleMatrix(w3, w4);

    weightMatrix = minus(weightMatrix, w5);
    let tw1 = transpose(matrixY),
        tw2 = multipleSkalar(tw1, alphaY),
        tw3 = multipleMatrix(tw2, deltaX);

    transposeWeightMatrix = minus(transposeWeightMatrix, tw3);

    weightMatrix = normalize(weightMatrix);
    transposeWeightMatrix = normalize(transposeWeightMatrix);

    return {
        weightMatrix: weightMatrix,
        transposeWeightMatrix: transposeWeightMatrix
    }
}

/**
 * @param {number[][]} matrix
 *
 * @returned {number[][]}
 */
function transpose(matrix: number[][]) {
    let transposeMatrix: number[][] = [];

    for (let i = 0; i < matrix.length; i++) {

        for (let j = 0; j < matrix[i].length; j++) {
            if (!transposeMatrix[j]) {
                transposeMatrix[j] = [];
            }

            transposeMatrix[j][i] = matrix[i][j];
        }
    }

    return transposeMatrix;
}

/**
 * @param {number[][]} matrix
 *
 * @returned {number[][]}
 */
function normalize(matrix: number[][]) {
    let normalizeMatrix: number[][] = [];

    for (let j = 0; j < matrix[0].length; j++) {
        let sum: number = 0;

        for (let i = 0; i < matrix.length; i++) {
            if (!normalizeMatrix[i]) {
                normalizeMatrix[i] = [];
            }

            sum += Math.pow(matrix[i][j], 2);
        }

        sum = Math.sqrt(sum);

        for (let i = 0; i < matrix.length; i++) {
            normalizeMatrix[i][j] = matrix[i][j] / sum;
        }
    }

    return normalizeMatrix;
}

/**
 * @param {number[][]} matrix1
 * @param {number[][]} matrix2
 *
 * @returned {number[][]}
 */
function multipleMatrix(matrix1: number[][], matrix2: number[][]) {
    let resultMatrix: number[][] = [];

    for (let i = 0; i < matrix1.length; i++) {
        resultMatrix[i] = [];

        for (let j = 0; j < matrix2[0].length; j++) {
            resultMatrix[i][j] = 0;

            for (let k = 0; k < matrix2.length; k++) {
                resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }

    }

    return resultMatrix;
}

/**
 * @param {number[][]} matrix
 * @param {number} multiplier
 *
 * @returns {number[][]}
 */
function multipleSkalar(matrix: number[][], multiplier: number) {
    let resultMatrix: number[][] = [];

    for (let i = 0; i < matrix.length; i++) {
        resultMatrix[i] = [];

        for (let j = 0; j < matrix[i].length; j++) {
            resultMatrix[i][j] = matrix[i][j] * multiplier;
        }
    }

    return resultMatrix;
}

/**
 * @param {number[][]} matrix1
 * @param {number[][]} matrix2
 *
 * @returns {number[][]}
 */
function minus(matrix1: number[][], matrix2: number[][]) {
    let resultMatrix: number[][] = [];

    for (let i = 0; i < matrix1.length; i++) {
        resultMatrix[i] = [];

        for (let j = 0; j < matrix1[i].length; j++) {
            resultMatrix[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }

    return resultMatrix;
}

/**
 * @param {number[][]} matrix
 *
 * @returned number
 */
function vectorSum(matrix: number[][]) {
    if (matrix.length > 1) {
        return 0;
    }

    let sum: number = 1;

    for (let i = 0; i < matrix[0].length; i++) {
        sum += Math.pow(matrix[0][i], 2);
    }

    return sum;
}