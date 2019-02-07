import Component from '../../common/component';
import Choices from "choices.js";

class MultipleSelect extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
        const selectMultiple = this.nRoot.querySelector('[data-multiple-select]')
        console.log(selectMultiple);
        const choices = new Choices(selectMultiple, {
            delimiter: ',',
            renderSelectedChoices: 'always',
            itemSelectText: '',
            removeItemButton: true,
        });
    }

    destroy() {

    }
}
Component.register(MultipleSelect, 'multiple-select');
MultipleSelect.initialize();
export default MultipleSelect.instances;