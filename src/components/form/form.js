import Component from '../../common/component';

class Form extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Form, 'form');
Form.initialize();
export default Form.instances;