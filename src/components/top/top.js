import Component from '../../common/component';
import TweenMax, {TimelineLite} from 'gsap'
import {splitContentByWords} from '../../common/helpers';

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