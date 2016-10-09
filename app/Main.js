"use strict";
var Consts_1 = require('./config/Consts');
var Options_1 = require("./model/Options");
var NeuronNetwork_1 = require("./model/NeuronNetwork");
var ImagePainter_1 = require('./view/ImagePainter');
var Main = (function () {
    function Main() {
        this.neuronNetwork = NeuronNetwork_1.default;
        var canvas = document.querySelector('canvas');
        var image = document.querySelector('.uncompressed-image');
        this.neuronNetwork = new NeuronNetwork_1.default(image, this.getOptions());
        this.neuronNetwork.addImagePainter(new ImagePainter_1.default(canvas));
        this.neuronNetwork.startTrain();
    }
    Main.prototype.getOptions = function () {
        if (!this.neuronNetworkOptions) {
            this.neuronNetworkOptions = new Options_1.default(Consts_1.RGBA, Consts_1.BLOCK_WIDTH, Consts_1.BLOCK_HEIGHT, Consts_1.MIDDLE_NEURONS, Consts_1.ERROR);
        }
        return this.neuronNetworkOptions;
    };
    Main.prototype.startAction = function () {
        this.neuronNetwork.startTrain();
    };
    Main.prototype.stopAction = function () {
        this.neuronNetwork.startTrain();
    };
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map