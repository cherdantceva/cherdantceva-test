import Component from '../../common/component';

class Top extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }



    destroy() {

    }
}
Component.register(Top, 'top');
Top.initialize();
export default Top.instances;