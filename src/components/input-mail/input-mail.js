import Component from '../../common/component';

class InputMail extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(InputMail, 'input-mail');
InputMail.initialize();
export default InputMail.instances;