import Component from '../../common/component';

class Logo extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Logo, 'logo');
Logo.initialize();
export default Logo.instances;