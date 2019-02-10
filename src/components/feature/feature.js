import Component from '../../common/component';

class Feature extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Feature, 'feature');
Feature.initialize();
export default Feature.instances;