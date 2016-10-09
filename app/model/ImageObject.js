"use strict";
var Block_1 = require('./Block');
var Matrix_1 = require('../utils/Matrix');
var Consts_1 = require('../config/Consts');
var ImageObject = (function () {
    function ImageObject(image, options) {
        this.error = 0;
        this.image = image;
        this.blockArray = [];
        this.options = options;
        this.getImageData();
        this.createBlocks();
        this.createWeights();
    }
    ImageObject.prototype.train = function () {
        var _this = this;
        this.blockArray.forEach(function (block) {
            _this.calculateWeights(block);
            _this.calculateError(block);
        });
    };
    ImageObject.prototype.getImageData = function () {
        var canvas = document.querySelector('canvas');
        canvas.width = this.image.width;
        canvas.height = this.image.height;
        this.context = canvas.getContext('2d');
        this.context.drawImage(this.image, 0, 0);
    };
    //todo can be createBlocks method implemented without ``context.getImageData`` ?
    ImageObject.prototype.createBlocks = function () {
        for (var pixelX = 0; pixelX < this.image.width; pixelX += this.options.blockWidth) {
            for (var pixelY = 0; pixelY < this.image.height; pixelY += this.options.blockHeight) {
                var imageData = this.context.getImageData(pixelX, pixelY, this.options.blockWidth, this.options.blockHeight), bufferSquare = new Block_1.default(pixelX, pixelY, this.options.blockWidth, this.options.blockHeight);
                var block = Array.prototype.slice.call(imageData.data);
                block = block.map(function (colorPixel) {
                    return colorPixel / 255 * 2 - 1;
                });
                bufferSquare.add([block]);
                this.blockArray.push(bufferSquare);
            }
        }
    };
    ;
    ImageObject.prototype.createWeights = function () {
        var middleNeuronsLength = this.options.middleNeuron, blockLength = this.options.blockWidth * this.options.blockHeight * Consts_1.RGBA, buffer = [];
        for (var i = 0; i < blockLength; i++) {
            buffer[i] = [];
            for (var j = 0; j < middleNeuronsLength; j++) {
                buffer[i][j] = Math.random() * 2 - 1;
            }
        }
        this.weightMatrix = buffer;
        this.transposeWeightMatrix = Matrix_1.default.transpose(buffer);
        this.weightMatrix = Matrix_1.default.normalize(this.weightMatrix);
        this.transposeWeightMatrix = Matrix_1.default.normalize(this.transposeWeightMatrix);
    };
    ;
    ImageObject.prototype.calculateWeights = function (block) {
        var matrixX = block.getMatrix(), matrixY = Matrix_1.default.multipleMatrix(matrixX, this.weightMatrix), transposeMatrixX = Matrix_1.default.multipleMatrix(matrixY, this.transposeWeightMatrix), deltaX = Matrix_1.default.minus(transposeMatrixX, matrixX);
        var alphaX = 0.001, alphaY = 0.001;
        var w1 = Matrix_1.default.transpose(matrixX), w2 = Matrix_1.default.multipleSkalar(w1, alphaX), w3 = Matrix_1.default.multipleMatrix(w2, deltaX), w4 = Matrix_1.default.transpose(this.transposeWeightMatrix), w5 = Matrix_1.default.multipleMatrix(w3, w4);
        this.weightMatrix = Matrix_1.default.minus(this.weightMatrix, w5);
        var tw1 = Matrix_1.default.transpose(matrixY), tw2 = Matrix_1.default.multipleSkalar(tw1, alphaY), tw3 = Matrix_1.default.multipleMatrix(tw2, deltaX);
        this.transposeWeightMatrix = Matrix_1.default.minus(this.transposeWeightMatrix, tw3);
        this.weightMatrix = Matrix_1.default.normalize(this.weightMatrix);
        this.transposeWeightMatrix = Matrix_1.default.normalize(this.transposeWeightMatrix);
    };
    ImageObject.prototype.calculateError = function (block) {
        var matrixX = block.getMatrix(), matrixY = Matrix_1.default.multipleMatrix(matrixX, this.weightMatrix), transposeMatrixX = Matrix_1.default.multipleMatrix(matrixY, this.transposeWeightMatrix);
        this.error = 0;
        for (var i = 0; i < matrixX[0].length; i++) {
            this.error += Math.pow((matrixX[0][i] - transposeMatrixX[0][i]), 2);
        }
    };
    return ImageObject;
}());
exports.ImageObject = ImageObject;
//# sourceMappingURL=ImageObject.js.map