import Component from '../../common/component';

class PageTable extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(PageTable, 'page-table');
PageTable.initialize();
export default PageTable.instances;