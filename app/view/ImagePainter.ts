import {ImageObject} from "../model/ImageObject";
import {Context} from "vm";
import Matrix from "../utils/Matrix";

export default class ImagePainter {
    context: Context;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
    }

    paint(image: ImageObject) {
        image.blockArray.forEach((block) => {
            let matrixX = block.getMatrix(),
                matrixY = Matrix.multipleMatrix(matrixX, image.weightMatrix),
                transposeMatrixX = Matrix.multipleMatrix(matrixY, image.transposeWeightMatrix),
                imageData = image.context.getImageData(block.startPixelX, block.startPixelY, image.options.blockHeight, image.options.blockWidth);

            transposeMatrixX[0].forEach((item, index) => {
                let pixel = (item + 1) * 255 / 2;
                imageData.data[index] = pixel > 255 ? 255 : pixel < 0 ? 0 : pixel;
            });
            this.context.putImageData(imageData, block.startPixelX, block.startPixelY);
        });
    }
}
