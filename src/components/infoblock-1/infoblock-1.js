import Component from '../../common/component';

class Infoblock1 extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Infoblock1, 'infoblock-1');
Infoblock1.initialize();
export default Infoblock1.instances;