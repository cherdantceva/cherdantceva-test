import Component from '../../common/component';

class Input extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Input, 'input');
Input.initialize();
export default Input.instances;