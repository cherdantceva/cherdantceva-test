import Component from '../../common/component';

class SandwichButton extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(SandwichButton, 'sandwich-button');
SandwichButton.initialize();
export default SandwichButton.instances;