import Component from '../../common/component';
import Choices from "choices.js";
import PerfectScrollbar from 'perfect-scrollbar';

class Select extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
        const select = this.nRoot
        console.log(select);
        const choices = new Choices(select, {
            itemSelectText: '',
            searchEnabled: false
        });

        const container = document.querySelector('.choices__list--dropdown .choices__list');
        const ps = new PerfectScrollbar(container);
    }

    destroy() {

    }
}
Component.register(Select, 'select');
Select.initialize();
export default Select.instances;