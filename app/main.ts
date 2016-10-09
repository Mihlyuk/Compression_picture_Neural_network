import ImageObject from './ImageObject';
import {BLOCK_WIDTH, BLOCK_HEIGHT, MIDDLE_NEURONS, ERROR} from './enum';
class Main {

    constructor() {
        let image = <HTMLImageElement> document.querySelector('.image');

        image.onload = () => {
            let imageObject = new ImageObject(image, BLOCK_WIDTH, BLOCK_HEIGHT, MIDDLE_NEURONS, ERROR);

            imageObject.paint();

            let worker = new Worker('app/calculateWeights.js');

            worker.postMessage('lalal bessmislenny message');

            // this.learning(imageObject);
        };

        // image.src = 'app/images/smile.png';

    }

    /**
     * @param {ImageObject} image
     */
    learning(image: ImageObject) {
        let i = 0;

        setInterval(() => {
            image.training();

            image.paint();

            console.log('Iteration: ', i++);
            console.log('Error: ', image.error);
        }, 17);

    }
}

new Main();

