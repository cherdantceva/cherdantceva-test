import Component from '../../common/component';

class Send extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(Send, 'send');
Send.initialize();
export default Send.instances;