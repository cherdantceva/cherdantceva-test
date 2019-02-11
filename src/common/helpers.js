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

export const innerHeight = (node) => {
    const computedStyle = getComputedStyle(node);
    const elementHeight = node.clientHeight;
    const res = elementHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
    return res < 0 ? 0 : res;
};

export const listen = (evtType, handler, env = document) => {
    env.addEventListener(evtType, handler);
};
export const unlisten = (evtType, handler, env = document) =>
    env.removeEventListener(evtType, handler);

export const emit = (
    evtType,
    evtData,
    shouldBubble = false,
    env = document
) => {
    let evt;
    if (typeof CustomEvent === "function") {
        evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
        });
    } else {
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    env.dispatchEvent(evt);
};

export const isFunction = (obj) => {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

export const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};

export const getCSSValue = (nElement, property) => {
    const computedStyle = getComputedStyle(nElement);
    return computedStyle[property];
};

export const requestAnimationFrame = () => {
    return new Promise((resolve, reject) => {
        requestAnimationFrame(resolve);
    });
};

export const normalizeWheel = event => {
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;

    if ("detail" in event) {
        sY = event.detail;
    }
    if ("wheelDelta" in event) {
        sY = -event.wheelDelta / 120;
    }
    if ("wheelDeltaY" in event) {
        sY = -event.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in event) {
        sX = -event.wheelDeltaX / 120;
    }

    if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
    }

    pX = sX * 10;
    pY = sY * 10;

    if ("deltaY" in event) {
        pY = event.deltaY;
    }
    if ("deltaX" in event) {
        pX = event.deltaX;
    }

    if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode === 1) {
            pX *= 40;
            pY *= 40;
        } else {
            pX *= 800;
            pY *= 800;
        }
    }

    if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
    }

    return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
    };
};

export const offset = el => {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        bottom: rect.bottom + scrollTop,
        right: rect.right + scrollLeft,
    }
};

export const windowScrollTop = () => {
    return (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
};

export const normalizeKey = event => {
    let code;
    if (event.key !== undefined) {
        code = event.key;
    } else if (event.keyIdentifier !== undefined) {
        code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        code = event.keyCode;
    }
    return code;
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

export const nodesFromHTML = html => {
    const nodes = [...document.createRange().createContextualFragment(html).childNodes];
    const nContainer = document.createElement('div');
    nodes.forEach(node => nContainer.appendChild(node));
    initialize(nContainer);
    return [...nContainer.childNodes].filter(nChild => nChild.nodeType === Node.ELEMENT_NODE);
};

export const getDocumentHeight = () => {
    const nBody = document.querySelector('body');
    const nHtml = document.documentElement;
    return Math.max(nBody.scrollHeight, nBody.offsetHeight,
        nHtml.clientHeight, nHtml.scrollHeight, nHtml.offsetHeight );
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

export const isDirectEnter = () => Barba.Pjax.History.history.length === 0;

export const waitForEvent = (node, eventName) => {
    return new Promise((resolve, reject) => {
        node.addEventListener(eventName, resolve);
    });
};

export const splitContentByWords = node => {
    let newContent = node.innerHTML.trim();
    node.innerHTML = newContent;
    const res = [];
    [...node.childNodes].forEach(subNode => {
        if (subNode.nodeType === Node.ELEMENT_NODE) {
            res.push(subNode);
            return;
        }
        const words = subNode.textContent.split(' ');
        words.forEach(word => {
            const nWordWrapper = document.createElement('span');
            nWordWrapper.style.display = 'inline-block';
            nWordWrapper.innerHTML = `${word} `;
            res.push(nWordWrapper);
        });
    });
    node.innerHTML = '';
    res.forEach(subNode => {
        node.appendChild(subNode);
    })
};


export const objFiteIE = () => {

    const
        userAgent = window.navigator.userAgent,
        ieReg = /msie|Trident.*rv[ :]*11\./gi,
        ie = ieReg.test(userAgent);


    if(ie) {
        const nImgs = [...document.querySelectorAll('[data-obj-fit]')];
        if (nImgs) {
            nImgs.forEach(img => {
                const imgUrl = img.getAttribute('src'),
                    imgDataUrl = img.dataset.src;
                img.classList.add('featured-image');

                if (imgUrl) {
                    img.parentNode.style.backgroundImage = `url(${imgUrl})`;
                    img.parentNode.classList.add('custom-object-fit')
                } else if (imgDataUrl) {
                    img.parentNode.style.backgroundImage = `url(${imgDataUrl})`;
                    img.parentNode.classList.add('custom-object-fit')
                }
            })
        }

    }
};

export const isIE = () => {
    const
        userAgent = window.navigator.userAgent,
        ieReg = /msie|Trident.*rv[ :]*11\./gi,
        ie = ieReg.test(userAgent);
    return ie;
}