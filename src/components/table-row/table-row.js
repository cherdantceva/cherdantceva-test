import Component from '../../common/component';

class TableRow extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(TableRow, 'table-row');
TableRow.initialize();
export default TableRow.instances;