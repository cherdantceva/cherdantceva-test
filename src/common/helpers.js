import Component from "./component";

export const debounce = (
    func,
    wait,
    context,
    noTrailing = true,
    setTimeoutFunc = setTimeout,
    clearTimeoutFunc = clearTimeout
) => {
    let timeout;

    function debouncer(...args) {
        if (!timeout && noTrailing) {
            func.apply(context, args);
        }
        debouncer.reset();

        const callback = () => {
            if (!noTrailing) {
                func.apply(context, args);
            }
            timeout = null;
        };

        timeout = setTimeoutFunc(callback, wait);
    }

    debouncer.reset = () => {
        clearTimeoutFunc(timeout);
    };

    return debouncer;
};

export const throttle = (func, ms, noTrailing = true) => {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                if (!noTrailing) {
                    wrapper.apply(savedThis, savedArgs);
                }
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
};




export const loadImage = nImage => {
    const tmpImg = new Image();
    const promise = new Promise(resolve => {
        tmpImg.addEventListener("load", resolve);
        tmpImg.addEventListener("error", resolve);
    });
    tmpImg.src = nImage.getAttribute('src');
    return promise;
};

export const loadImages = () => {
    const nImages = [...document.querySelectorAll('img[src]')].filter(nImage => !nImage.hasAttribute('data-not-preload'));
    return Promise.all(nImages.map(nImage => loadImage(nImage)));
};

export const downloadImage = nImage => {
    const tmpImg = new Image();
    const promise = new Promise(resolve => {
        tmpImg.addEventListener("load", resolve);
        tmpImg.addEventListener("error", resolve);
    });
    tmpImg.src = nImage.getAttribute('data-src');
    promise.then(() => {
        nImage.src = nImage.getAttribute('data-src');
    });
    return promise;
};

export const downloadImages = () => {
    const nImages = [...document.querySelectorAll('img[data-src]')];
    console.log(nImages);
    return Promise.all(nImages.map(nImage => downloadImage(nImage))).then();
};

export const initialize = nRoot => {
    Component.registeredComponents.forEach(componentClass => {
        componentClass.initialize(nRoot);
    });
};

export const destroy = nRoot => {
    Component.registeredComponents.forEach(componentClass => {
        componentClass.destroy(nRoot);
    });
};

export const createElement = html => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.firstElementChild;
};

export const getNodeHTML = node => {
    const nWrap = document.createElement('div');
    nWrap.appendChild(node.cloneNode(true));
    return nWrap.innerHTML;
};

export const allowInitialization = node => {
    node.removeAttribute('data-no-init');
    [...node.querySelectorAll('[data-no-init]')].forEach(subNode => subNode.removeAttribute('data-no-init'));
};

const preventer = e => {
    if (e.currentTarget.href === window.location.href) {
        e.preventDefault();
        e.stopPropagation();
    }
};

export const addLoopLinksPreventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.addEventListener('click', preventer));
};

export const removeLoopLinksPreventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.removeEventListener('click', preventer));
};

const transitionPreventer = e => {
    e.preventDefault();
    e.stopPropagation();
};

export const addTransitionPeventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.addEventListener('click', transitionPreventer));
};

export const removeTransitionPeventer = () => {
    const nLinks = [...document.querySelectorAll('a[href]')];
    nLinks.forEach(nLink => nLink.removeEventListener('click', transitionPreventer));
};

export const getWindowSize = () => {
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
};


export const waitForEvent = (node, eventName) => {
    return new Promise((resolve, reject) => {
        node.addEventListener(eventName, resolve);
    });
};

export const objFiteIE = () => {

    const
        userAgent = window.navigator.userAgent,
        ieReg = /msie|Trident.*rv[ :]*11\./gi,
        ie = ieReg.test(userAgent);


    if(ie) {
        const nImgs = [...document.querySelectorAll('[data-obj-fit]')];
        nImgs.forEach(img => {
            const imgUrl = img.getAttribute('src');
                img.classList.add('featured-image');

            if (imgUrl) {
                img.parentNode.style.backgroundImage = `url(${imgUrl})`;
                img.parentNode.classList.add('custom-object-fit')
            }
        })
    }
};
