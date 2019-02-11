import {emit, loadImages} from '../../common/helpers';
import {TimelineLite} from 'gsap';
import Component from '../../common/component';
import logoInstances from '../logo/logo';


class Preloader extends Component {
    constructor(nRoot, instanceName) {
        super(nRoot, instanceName);
        this.playbackOverPromise = new Promise((resolve, reject) => {
            const logo = logoInstances['logo-preloader'];
            const logoPart = logo.nFind('part');
            // const preloaderImg = this.nRoot.querySelector('.preloader__img');
            this.nBody.style.overflow = 'hidden';
            this.nBody.classList.add('fixed');
            new TimelineLite({
                onComplete: () => {
                    resolve();
                }
            })
                .set(logo.nRoot, {xPercent: 30, autoAlpha: 0})
                .to(logo.nRoot, 1.2, {xPercent: 0, autoAlpha: 1, ease: Power2.easeIn, force3D: true})
                .staggerFromTo(logoPart, 0.3, {yPercent: -30, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1, ease: Power2.easeIn, force3D: true}, 0.1, '-=1.15');
        });
        Promise.all([this.playbackOverPromise, loadImages()])
            .then(() => {
                this.nBody.style.removeProperty('overflow');
                emit('preloader:loaded', null, false, this.nRoot);
                this.hide();
            });
    }

    hide() {
        new TimelineLite()
            .to(this.nRoot, 0.6, {autoAlpha: 0, delay: 0.8})
            .call(() => {
                this.nBody.classList.remove('fixed');

            })
    }

    destroy() {

    }
}
Component.register(Preloader, 'preloader');
Preloader.initialize();
export default Preloader.instances;