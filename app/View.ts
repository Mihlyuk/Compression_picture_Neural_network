import Main from './main';

export class View {
    constructor() {
        debugger;
        document.querySelector('button.start').addEventListener('click', function () {
            debugger;
            var width = +(<HTMLInputElement>document.querySelector('input.width')).value;
            var height = +(<HTMLInputElement>document.querySelector('input.height')).value;
            var number_neural = +(<HTMLInputElement>document.querySelector('input.number_neural')).value;
            var error = +(<HTMLInputElement>document.querySelector('input.error')).value;
            var alpha_X = +(<HTMLInputElement>document.querySelector('input.alpha_X')).value;
            var alpha_Y = +(<HTMLInputElement>document.querySelector('input.alpha_Y')).value;

            new Main(width, height, number_neural, error, alpha_X, alpha_Y);
        });

    }

}

new View();