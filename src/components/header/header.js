import Component from '../../common/component';

class Header extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Header, 'header');
Header.initialize();
export default Header.instances;