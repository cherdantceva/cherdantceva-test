import Component from '../../common/component';

class Navigation extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Navigation, 'navigation');
Navigation.initialize();
export default Navigation.instances;