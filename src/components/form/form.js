import Component from '../../common/component';

class Form extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
        this.nRoot.querySelector('[data-button]').addEventListener('click', (e) => {
            e.preventDefault();
        })
    }

    destroy() {

    }
}
Component.register(Form, 'form');
Form.initialize();
export default Form.instances;

