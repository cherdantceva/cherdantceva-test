import Component from '../../common/component';

class Range extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
        const range = this.nRoot.querySelector('[data-range]'),
            counter = this.nRoot.querySelector('[data-counter]');

        range.addEventListener('change', () => {
            counter.innerHTML = range.value;
        })
    }

    destroy() {

    }
}
Component.register(Range, 'range');
Range.initialize();
export default Range.instances;