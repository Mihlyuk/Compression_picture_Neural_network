import ImageObject from './ImageObject';
import {BLOCK_WIDTH, BLOCK_HEIGHT, MIDDLE_NEURONS, ERROR} from './enum';
class Main {

    constructor() {
        let image = <HTMLImageElement> document.querySelector('.image');

        image.onload = () => {
            let imageObject = new ImageObject(image, BLOCK_WIDTH, BLOCK_HEIGHT, MIDDLE_NEURONS, ERROR);

            imageObject.paint();

            imageObject.learning();
        };

        image.src = 'app/images/donatello.png';

    }


}

new Main();

