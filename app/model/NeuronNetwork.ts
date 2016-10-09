import {ImageObject} from "./ImageObject";
import Options from "./Options";
import ImagePainter from "../view/ImagePainter";

export default class NeuronNetwork {

    options: Options;
    canTrain: boolean = false;
    compressedImage: ImageObject;
    uncompressedImage: HTMLImageElement;
    imagePainters: ImagePainter[] = [];
    //todo unnecessary value, app is so slow :(
    trainingDelay: number = 1;

    constructor(image: HTMLImageElement, options: Options) {
        this.options = options;
        this.uncompressedImage = image;
        this.compressedImage =  new ImageObject(image, options);
    }

    startTrain() {
        this.canTrain = true;
        this.train();
    }

    stopTrain() {
        this.canTrain = false;
    }

    train() {
        let self = this;
        let iteration = 0;
        let compressedImage = this.compressedImage;
        let trainingDelay = this.trainingDelay;

        let intervalId = setInterval(() => {
            if (self.canTrain) {
                compressedImage.train();
                self.notifyPainters();
                console.log('Iteration: ', iteration++);
                console.log('Error: ', compressedImage.error);
            } else {
                clearInterval(intervalId);
            }
        }, trainingDelay);
    }

    notifyPainters() {
        let compressedImage = this.compressedImage;

        this.imagePainters.forEach((imagePainter) => {
            imagePainter.paint(compressedImage);
        })
    }

    addImagePainter(imagePainter: ImagePainter) {
        this.imagePainters.push(imagePainter);
    }
}