import Component from '../../common/component';

class Button extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Button, 'button');
Button.initialize();
export default Button.instances;