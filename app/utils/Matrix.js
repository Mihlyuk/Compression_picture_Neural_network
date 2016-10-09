"use strict";
var Matrix = (function () {
    function Matrix() {
    }
    Matrix.transpose = function (matrix) {
        var transposeMatrix = [];
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (!transposeMatrix[j]) {
                    transposeMatrix[j] = [];
                }
                transposeMatrix[j][i] = matrix[i][j];
            }
        }
        return transposeMatrix;
    };
    Matrix.normalize = function (matrix) {
        var normalizeMatrix = [];
        for (var j = 0; j < matrix[0].length; j++) {
            var sum = 0;
            for (var i = 0; i < matrix.length; i++) {
                if (!normalizeMatrix[i]) {
                    normalizeMatrix[i] = [];
                }
                sum += Math.pow(matrix[i][j], 2);
            }
            sum = Math.sqrt(sum);
            for (var i = 0; i < matrix.length; i++) {
                normalizeMatrix[i][j] = matrix[i][j] / sum;
            }
        }
        return normalizeMatrix;
    };
    Matrix.multipleMatrix = function (matrix1, matrix2) {
        var resultMatrix = [];
        for (var i = 0; i < matrix1.length; i++) {
            resultMatrix[i] = [];
            for (var j = 0; j < matrix2[0].length; j++) {
                resultMatrix[i][j] = 0;
                for (var k = 0; k < matrix2.length; k++) {
                    resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        return resultMatrix;
    };
    Matrix.multipleSkalar = function (matrix, multiplier) {
        var resultMatrix = [];
        for (var i = 0; i < matrix.length; i++) {
            resultMatrix[i] = [];
            for (var j = 0; j < matrix[i].length; j++) {
                resultMatrix[i][j] = matrix[i][j] * multiplier;
            }
        }
        return resultMatrix;
    };
    Matrix.minus = function (matrix1, matrix2) {
        var resultMatrix = [];
        for (var i = 0; i < matrix1.length; i++) {
            resultMatrix[i] = [];
            for (var j = 0; j < matrix1[i].length; j++) {
                resultMatrix[i][j] = matrix1[i][j] - matrix2[i][j];
            }
        }
        return resultMatrix;
    };
    Matrix.vectorSum = function (matrix) {
        if (matrix.length > 1) {
            return 0;
        }
        var sum = 1;
        for (var i = 0; i < matrix[0].length; i++) {
            sum += Math.pow(matrix[0][i], 2);
        }
        return sum;
    };
    return Matrix;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Matrix;
//# sourceMappingURL=Matrix.js.map