import preloaderInstances from '../../components/preloader/preloader';
import title1Instances from '../../components/title-1/title-1';
import headerInstances from '../../components/header/header';
import logoInstances from '../../components/logo/logo';
import navigationInstances from '../../components/navigation/navigation';
import {TimelineLite} from 'gsap';
import {listen, splitContentByWords} from '../../common/helpers';
import Component from '../../common/component';
import ScrollMagic from "scrollmagic";


const preloader = preloaderInstances['preloader'];
listen('preloader:loaded', () => {
    const title1 = title1Instances['title-1-top'],
        topTextAnim = [...document.querySelectorAll('.top-text-anim')],
        header = headerInstances['header'],
        logo = logoInstances['logo-header'],
        navigation = navigationInstances['navigation-header'],
        topButton = [...document.querySelectorAll('.top__button')];

    let texts = []

    texts.push(title1.nRoot);

    topTextAnim.forEach(e => texts.push(e));

    texts.forEach( e => {
        splitContentByWords(e);
        const nTextAnimation = e;
        const nWords = [...e.childNodes].map(nWord => {
            nWord.parentNode.removeChild(nWord);
            return nWord;
        });

        nWords.forEach(nWord => {
            if (nWord.tagName === 'BR') {
                nTextAnimation.appendChild(nWord);
                return;
            }
            const nNodeWrap = document.createElement('span');
            nNodeWrap.style.display = 'inline-block';
            // nNodeWrap.classList.add('overflow-hidden');
            nNodeWrap.classList.add('animation__text_part')
            nTextAnimation.appendChild(nNodeWrap);
            nNodeWrap.appendChild(nWord);
            nTextAnimation.innerHTML += '\n';

        });
    });

    new TimelineLite()
        .set(title1.nRoot, {
            autoAlpha: 0,
            xPercent: 40,
        })
        .set(topTextAnim, {
            autoAlpha: 0,
            xPercent: 10,
        })
        .set(header.nRoot, {
            yPercent: -100,
            autoAlpha: 0
        })
        .set(topButton, {
            autoAlpha: 0,
            yPercent: 60
        })
        .set([logo.nRoot, navigation.nRoot], {
            autoAlpha: 0
        })
        .to(title1.nRoot, 0.8, {
            autoAlpha: 1,
            xPercent: 0,
            delay: 1.3
        })
        .staggerTo(topTextAnim, 0.8, {
            autoAlpha: 1,
            xPercent: 0,
            delay: 0.2
        }, 0.1, '-=0.6')
        .to(header.nRoot, 0.8, {
            yPercent: 0,
            autoAlpha: 1
        },'-=1.8')
        .to([logo.nRoot, navigation.nRoot], 0.4, {
            autoAlpha: 1
        },'-=1')
        .staggerTo(topButton, 0.6, {
            autoAlpha: 1,
            yPercent: 0
        }, 0.15, '-=0.1')




    const textPartAnimation = [...title1.nRoot.querySelectorAll('.animation__text_part')]
    new TimelineLite()
        .set(textPartAnimation, {
            autoAlpha: 0,
            yPercent: 20,
            ease: Power1.easeOut
        })
        .staggerTo(textPartAnimation, 0.3, {
            autoAlpha: 1,
            yPercent: 0,
            delay: 1.3
        }, 0.05);

    const textPartAnimation2 = [...document.querySelector('.infoblock-1').querySelectorAll('.animation__text_part')];
    new TimelineLite()
        .set(textPartAnimation2, {
            autoAlpha: 0,
            yPercent: 40,
            ease: Power1.easeOut
        })
        .staggerTo(textPartAnimation2, 0.3, {
            autoAlpha: 1,
            yPercent: 0,
            delay: 1.3
        }, 0.05);

}, preloader.nRoot);


