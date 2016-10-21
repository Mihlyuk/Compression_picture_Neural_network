import ImageObject from './Image';

export default class Main {

    constructor(width: number, height: number, number_neural: number, error: number, alpha_X: number, alpha_Y: number) {
        let image = <HTMLImageElement> document.querySelector('.source_img img');

        image.onload = () => {
            let imageObject = new ImageObject(image, width, height, number_neural, error, alpha_X, alpha_Y);

            imageObject.paint();

            this.learning(imageObject);
        };

        image.src = 'app/images/losyash_256x256.bmp';

    }

    /**
     * @param {ImageObject} image
     */
    learning(image: ImageObject) {
        let iteration = 1;

        var intervalId = setInterval(function () {
            image.learning();

            image.paint();

            var content = <HTMLDivElement>document.querySelector('.console_content');

            var newP = document.createElement('p');
            newP.innerHTML = '<p>Iteration: ' + iteration++ + ', error: ' + image.error + '</p>';

            content.appendChild(newP);

            content.scrollTop = content.scrollHeight;

            if (image.error < image.marginError) {
                let L = image.blockArray.length;
                let n = image.blockW;
                let m = image.blockH;
                let p = image.neuronsLength;
                let comp_coef = (n * m * 4 * L) / ((n * m * 4 + L) * p + 2);

                var newP = document.createElement('p');
                newP.innerHTML = '<p>Compression_coefficient: ' + comp_coef + '</p>';

                content.appendChild(newP);

                content.scrollTop = content.scrollHeight;

                clearInterval(intervalId);
            }
        });
    }

}
