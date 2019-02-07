import Component from '../../common/component';

class Footer extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Footer, 'footer');
Footer.initialize();
export default Footer.instances;