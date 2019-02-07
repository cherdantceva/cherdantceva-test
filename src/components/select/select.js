import Component from '../../common/component';
import Choices from "choices.js";

class Select extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
        const select = this.nRoot.querySelector('[data-select]')
        console.log(select);
        const choices = new Choices(select, {
            itemSelectText: '',
            searchEnabled: false
        });
    }

    destroy() {

    }
}
Component.register(Select, 'select');
Select.initialize();
export default Select.instances;