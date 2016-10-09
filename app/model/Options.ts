export default class Options{
    rgba: number;
    blockWidth: number;
    blockHeight: number;
    middleNeuron: number;
    errorValue: number;

    constructor(rgba: number,
                blockWidth: number,
                blockHeight: number,
                middleNeuron: number,
                errorValue: number
    ) {
        this.rgba = rgba;
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.middleNeuron = middleNeuron;
        this.errorValue = errorValue;
    }
}