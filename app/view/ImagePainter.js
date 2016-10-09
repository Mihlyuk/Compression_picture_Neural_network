"use strict";
var Matrix_1 = require("../utils/Matrix");
var ImagePainter = (function () {
    function ImagePainter(canvas) {
        this.context = canvas.getContext('2d');
    }
    ImagePainter.prototype.paint = function (image) {
        var _this = this;
        image.blockArray.forEach(function (block) {
            var matrixX = block.getMatrix(), matrixY = Matrix_1.default.multipleMatrix(matrixX, image.weightMatrix), transposeMatrixX = Matrix_1.default.multipleMatrix(matrixY, image.transposeWeightMatrix), imageData = image.context.getImageData(block.startPixelX, block.startPixelY, image.options.blockHeight, image.options.blockWidth);
            transposeMatrixX[0].forEach(function (item, index) {
                var pixel = (item + 1) * 255 / 2;
                imageData.data[index] = pixel > 255 ? 255 : pixel < 0 ? 0 : pixel;
            });
            _this.context.putImageData(imageData, block.startPixelX, block.startPixelY);
        });
    };
    return ImagePainter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImagePainter;
//# sourceMappingURL=ImagePainter.js.map