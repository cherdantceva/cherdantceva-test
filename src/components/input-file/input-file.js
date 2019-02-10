import Component from '../../common/component';

class InputFile extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(InputFile, 'input-file');
InputFile.initialize();
export default InputFile.instances;