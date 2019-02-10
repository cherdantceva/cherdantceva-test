import Component from '../../common/component';

class Features extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Features, 'features');
Features.initialize();
export default Features.instances;