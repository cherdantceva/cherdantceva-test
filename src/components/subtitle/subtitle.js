import Component from '../../common/component';

class Subtitle extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Subtitle, 'subtitle');
Subtitle.initialize();
export default Subtitle.instances;