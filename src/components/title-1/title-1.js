import Component from '../../common/component';

class Title1 extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Title1, 'title-1');
Title1.initialize();
export default Title1.instances;