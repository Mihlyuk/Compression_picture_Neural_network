import {RGBA, BLOCK_WIDTH, BLOCK_HEIGHT, MIDDLE_NEURONS, ERROR} from './config/Consts'
import Options from "./model/Options";
import NeuronNetwork from "./model/NeuronNetwork";
import ImagePainter from './view/ImagePainter'

class Main {
    neuronNetworkOptions: Options;
    neuronNetwork = NeuronNetwork;

    constructor() {
        let canvas = <HTMLCanvasElement> document.querySelector('canvas');
        let image = <HTMLImageElement> document.querySelector('.uncompressed-image');
        this.neuronNetwork = new NeuronNetwork(image, this.getOptions());
        this.neuronNetwork.addImagePainter(new ImagePainter(canvas));
        this.neuronNetwork.startTrain();
    }

    getOptions() {
        if (!this.neuronNetworkOptions) {
            this.neuronNetworkOptions = new Options(RGBA, BLOCK_WIDTH, BLOCK_HEIGHT, MIDDLE_NEURONS, ERROR);
        }

        return this.neuronNetworkOptions;
    }

    startAction() {
        this.neuronNetwork.startTrain();
    }

    stopAction() {
        this.neuronNetwork.startTrain();
    }
}

new Main();
