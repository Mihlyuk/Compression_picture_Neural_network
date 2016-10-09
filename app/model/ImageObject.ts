import Block from './Block';
import Matrix from '../utils/Matrix';
import Options from './Options';
import {RGBA} from '../config/Consts';

export class ImageObject {

    image: HTMLImageElement;
    blockArray: Block[];
    options: Options;
    weightMatrix: number[][];
    transposeWeightMatrix: number[][];
    error: number = 0;
    context: CanvasRenderingContext2D;

    constructor(image: HTMLImageElement, options: Options) {
        this.image = image;
        this.blockArray = [];
        this.options = options;
        this.getImageData();
        this.createBlocks();
        this.createWeights();
    }

    train() {
        this.blockArray.forEach((block) => {
            this.calculateWeights(block);
            this.calculateError(block);
        });
    }

    getImageData() {
        let canvas = <HTMLCanvasElement> document.querySelector('canvas');
        canvas.width = this.image.width;
        canvas.height = this.image.height;
        this.context = canvas.getContext('2d');
        this.context.drawImage(this.image, 0, 0);
    }

    //todo can be createBlocks method implemented without ``context.getImageData`` ?
    createBlocks() {
        for (let pixelX = 0; pixelX < this.image.width; pixelX += this.options.blockWidth) {
            for (let pixelY = 0; pixelY < this.image.height; pixelY += this.options.blockHeight) {

                let imageData = this.context.getImageData(pixelX, pixelY, this.options.blockWidth, this.options.blockHeight),
                    bufferSquare = new Block(pixelX, pixelY, this.options.blockWidth, this.options.blockHeight);
                let block = Array.prototype.slice.call(imageData.data);

                block = block.map((colorPixel: any) => {
                    return colorPixel / 255 * 2 - 1;
                });

                bufferSquare.add([block]);
                this.blockArray.push(bufferSquare)
            }
        }
    };

    createWeights() {
        let middleNeuronsLength = this.options.middleNeuron,
            blockLength = this.options.blockWidth * this.options.blockHeight * RGBA,
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
    };

    calculateWeights(block: Block) {
        let matrixX = block.getMatrix(),
            matrixY = Matrix.multipleMatrix(matrixX, this.weightMatrix),
            transposeMatrixX = Matrix.multipleMatrix(matrixY, this.transposeWeightMatrix),
            deltaX = Matrix.minus(transposeMatrixX, matrixX);

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