import Component from '../../common/component';

class Title2 extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Title2, 'title-2');
Title2.initialize();
export default Title2.instances;