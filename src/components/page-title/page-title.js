import Component from '../../common/component';

class PageTitle extends Component {
    constructor(nRoot, componentName) {
        super(nRoot, componentName);
    }

    destroy() {

    }
}
Component.register(PageTitle, 'page-title');
PageTitle.initialize();
export default PageTitle.instances;