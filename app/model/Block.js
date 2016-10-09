"use strict";
var Block = (function () {
    function Block(startPixelX, startPixelY, width, height) {
        this.width = width;
        this.height = height;
        this.startPixelX = startPixelX;
        this.startPixelY = startPixelY;
        this.buffer = [];
    }
    Block.prototype.add = function (pixels) {
        this.buffer = pixels;
    };
    Block.prototype.getMatrix = function () {
        return this.buffer;
    };
    return Block;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Block;
//# sourceMappingURL=Block.js.map