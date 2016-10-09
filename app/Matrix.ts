export {} from 'enum';

export default class Matrix {

    /**
     * @param {number[][]} matrix
     *
     * @returned {number[][]}
     */
    static transpose(matrix: number[][]) {
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
    static normalize(matrix: number[][]) {
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
    static multipleMatrix(matrix1: number[][], matrix2: number[][]) {
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
    static multipleSkalar(matrix: number[][], multiplier: number) {
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
    static minus(matrix1: number[][], matrix2: number[][]) {
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
    static vectorSum(matrix: number[][]) {
        if (matrix.length > 1) {
            return 0;
        }

        let sum: number = 1;

        for (let i = 0; i < matrix[0].length; i++) {
            sum += Math.pow(matrix[0][i], 2);
        }

        return sum;
    }

}