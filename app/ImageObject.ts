import Block from './Block';
import {RGBA} from './enum';
import Matrix from './Matrix';

export default class ImageObject {

    image: HTMLImageElement;
    blockArray: Block[];
    blockWidth: number;
    blockHeight: number;
    middleNeurons: number;
    weightMatrix: number[][];
    transposeWeightMatrix: number[][];
    marginError: number;
    error: number = 0;
    context: CanvasRenderingContext2D;

    /**
     * @param {HTMLImageElement} image
     * @param {number} blockWidth
     * @param {number} blockHeight
     * @param {number} middleNeurons
     * @param {number} error
     */
    constructor(image: HTMLImageElement, blockWidth: number, blockHeight: number, middleNeurons: number, error: number) {
        this.image = image;
        this.blockArray = [];
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.middleNeurons = middleNeurons;
        this.marginError = error;

        this.getImageData();
        this.createWeights();
    }

    paint() {
        this.blockArray.forEach((block) => {
            let matrixX = block.getMatrix(),
                matrixY = Matrix.multipleMatrix(matrixX, this.weightMatrix),
                transposeMatrixX = Matrix.multipleMatrix(matrixY, this.transposeWeightMatrix),
                imageData = this.context.getImageData(block.startPixelX, block.startPixelY, this.blockHeight, this.blockWidth);

            for (let i = 0; i < transposeMatrixX[0].length; i++) {
                let pixel = (transposeMatrixX[0][i] + 1) * 255 / 2;

                imageData.data[i] = pixel > 255 ? 255 : pixel < 0 ? 0 : pixel;
            }
            this.context.putImageData(imageData, block.startPixelX, block.startPixelY);
        });

    }

    /**
     * @param {Block} block
     */
    paintBlock(block: Block) {
        let matrixX = block.getMatrix(),
            matrixY = Matrix.multipleMatrix(matrixX, this.weightMatrix),
            transposeMatrixX = Matrix.multipleMatrix(matrixY, this.transposeWeightMatrix),
            imageData = this.context.getImageData(block.startPixelX, block.startPixelY, this.blockHeight, this.blockWidth);

        for (let i = 0; i < transposeMatrixX[0].length; i++) {
            let pixel = (transposeMatrixX[0][i] + 1) * 255 / 2;

            imageData.data[i] = pixel > 255 ? 255 : pixel < 0 ? 0 : pixel;
        }
        this.context.putImageData(imageData, block.startPixelX, block.startPixelY);
    }

    getImageData() {
        let canvas = <HTMLCanvasElement> document.querySelector('canvas');

        canvas.width = this.image.width;
        canvas.height = this.image.height;

        this.context = canvas.getContext('2d');

        this.context.drawImage(this.image, 0, 0);
        this.createBlocks();

    }

    createBlocks() {
        for (let pixelX = 0; pixelX < this.image.width; pixelX += this.blockWidth) {
            for (let pixelY = 0; pixelY < this.image.height; pixelY += this.blockHeight) {

                let imageData = this.context.getImageData(pixelX, pixelY, this.blockWidth, this.blockHeight),
                    bufferSquare = new Block(pixelX, pixelY, this.blockWidth, this.blockHeight),
                    block = Array.prototype.slice.call(imageData.data);

                block = block.map((colorPixel: any) => {
                    return colorPixel / 255 * 2 - 1;
                });

                bufferSquare.add([block]);
                this.blockArray.push(bufferSquare)
            }
        }

    }

    createWeights() {
        let middleNeuronsLength = this.middleNeurons,
            blockLength = this.blockWidth * this.blockHeight * RGBA,
            buffer: number[][] = [];

        for (let i = 0; i < blockLength; i++) {
            buffer[i] = [];

            for (let j = 0; j < middleNeuronsLength; j++) {
                buffer[i][j] = Math.random() * 2 - 1;
            }
        }

        this.weightMatrix = buffer;
        this.transposeWeightMatrix = Matrix.transpose(buffer);

        this.weightMatrix = Matrix.normalize(this.weightMatrix);
        this.transposeWeightMatrix = Matrix.normalize(this.transposeWeightMatrix);
    }

    training() {
        let blockArray = this.blockArray;

        blockArray.forEach((block) => {
            this.calculateWeights(block);

            this.paintBlock(block);
        });

        blockArray.forEach((block) => {
            this.calculateError(block);
        });

    }

    /**
     * @param {Block} block
     */
    calculateWeights(block: Block) {
        let matrixX = block.getMatrix(),
            matrixY = Matrix.multipleMatrix(matrixX, this.weightMatrix),
            transposeMatrixX = Matrix.multipleMatrix(matrixY, this.transposeWeightMatrix),
            deltaX = Matrix.minus(transposeMatrixX, matrixX);

        // let alphaX = 1 / Matrix.vectorSum(matrixX),
        //     alphaY = 1 / Matrix.vectorSum(matrixY);

        let alphaX = 0.001,
            alphaY = 0.001;

        let w1 = Matrix.transpose(matrixX),
            w2 = Matrix.multipleSkalar(w1, alphaX),
            w3 = Matrix.multipleMatrix(w2, deltaX),
            w4 = Matrix.transpose(this.transposeWeightMatrix),
            w5 = Matrix.multipleMatrix(w3, w4);

        this.weightMatrix = Matrix.minus(this.weightMatrix, w5);

        let tw1 = Matrix.transpose(matrixY),
            tw2 = Matrix.multipleSkalar(tw1, alphaY),
            tw3 = Matrix.multipleMatrix(tw2, deltaX);

        this.transposeWeightMatrix = Matrix.minus(this.transposeWeightMatrix, tw3);

        this.weightMatrix = Matrix.normalize(this.weightMatrix);
        this.transposeWeightMatrix = Matrix.normalize(this.transposeWeightMatrix);
    }

    /**
     * @param {Block} block
     */
    calculateError(block: Block) {
        let matrixX = block.getMatrix(),
            matrixY = Matrix.multipleMatrix(matrixX, this.weightMatrix),
            transposeMatrixX = Matrix.multipleMatrix(matrixY, this.transposeWeightMatrix);

        this.error = 0;

        for (let i = 0; i < matrixX[0].length; i++) {
            this.error += Math.pow((matrixX[0][i] - transposeMatrixX[0][i]), 2)
        }
    }

}
