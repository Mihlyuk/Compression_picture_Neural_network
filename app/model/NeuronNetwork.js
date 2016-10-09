"use strict";
var ImageObject_1 = require("./ImageObject");
var NeuronNetwork = (function () {
    function NeuronNetwork(image, options) {
        this.canTrain = false;
        this.imagePainters = [];
        //todo unnecessary value, app is so slow :(
        this.trainingDelay = 1;
        this.options = options;
        this.uncompressedImage = image;
        this.compressedImage = new ImageObject_1.ImageObject(image, options);
    }
    NeuronNetwork.prototype.startTrain = function () {
        this.canTrain = true;
        this.train();
    };
    NeuronNetwork.prototype.stopTrain = function () {
        this.canTrain = false;
    };
    NeuronNetwork.prototype.train = function () {
        var self = this;
        var iteration = 0;
        var compressedImage = this.compressedImage;
        var trainingDelay = this.trainingDelay;
        var intervalId = setInterval(function () {
            if (self.canTrain) {
                compressedImage.train();
                self.notifyPainters();
                console.log('Iteration: ', iteration++);
                console.log('Error: ', compressedImage.error);
            }
            else {
                clearInterval(intervalId);
            }
        }, trainingDelay);
    };
    NeuronNetwork.prototype.notifyPainters = function () {
        var compressedImage = this.compressedImage;
        this.imagePainters.forEach(function (imagePainter) {
            imagePainter.paint(compressedImage);
        });
    };
    NeuronNetwork.prototype.addImagePainter = function (imagePainter) {
        this.imagePainters.push(imagePainter);
    };
    return NeuronNetwork;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NeuronNetwork;
//# sourceMappingURL=NeuronNetwork.js.map