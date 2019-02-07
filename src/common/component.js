// import { throttle } from "./helpers";

export default class Component {
    constructor(nRoot, instanceName) {
        this.nRoot = nRoot;
        this.instanceName = instanceName;
    }

    get componentName() {
        return this.constructor.componentName;
    }

    get nBody() {
        return Component.nBody();
    }

     nFindSingle(key) {
        return this.nFind(key)[0];
    }

    nFind(key) {
        return [...this.nRoot.querySelectorAll(`.${this.componentName}__${key}`)];
    }

    nFindByDataAttrSingle(dataAttr) {
        return this.nFindByDataAttr(dataAttr)[0];
    }

    nFindByDataAttr(dataAttr) {
        return [...this.nRoot.querySelectorAll(`[data-${dataAttr}]`)];
    }

    switchToContrast() {
        this.nRoot.classList.add(`${this.componentName}_contrast`);
    }

    switchToNonContrast() {
        this.nRoot.classList.remove(`${this.componentName}_contrast`);
    }

    getParam(key) {
        return this.nRoot.dataset[key];
    }

    hasParam(key) {
        return key in this.nRoot.dataset;
    }

    getParentInstanceName() {
        return this.instanceName.split(':').slice(0, -1).join(':');
    }
}

Component.nBody = () => {
    return document.querySelector('body');
};
Component.findInstancesByRegex = (insts, regex) => {
    const keys = Object.keys(insts).filter(key => key.match(regex));
    return keys.map(key => insts[key]);
};
Component.findInstancesByRegexAnyComponent = regex => {
    return Component.registeredComponents.reduce((insts, componentClass) => {
        const componentInsts = Component.findInstancesByRegex(componentClass.instances, regex);
        return insts.concat(componentInsts);
    }, []);
};
const getDeviceType = () => {
    const devices = [
        {
            from: 0,
            to: 768,
            device: 'Mobile',
        },
        {
            from: 768,
            to: 1024,
            device: 'Tablet',
        },
        {
            from: 1024,
            to: 1366,
            device: 'Laptop',
        },
        {
            from: 1366,
            to: Infinity,
            device: 'Desktop',
        },
    ];
    const currentDeviceWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return devices.filter(deviceType => deviceType.from <= currentDeviceWidth && deviceType.to > currentDeviceWidth)[0].device;
};
Component.lastDeviceType = getDeviceType();
Component.notifyDeviceTypeChange = (currentDeviceType) => {
    Component.registeredComponents.forEach(componentClass => {
        Object.keys(componentClass.instances).forEach(instName => {
            const inst = componentClass.instances[instName];
            const instCallback = inst[`onSwitchedTo${currentDeviceType}`];
            if (instCallback) {
                instCallback.bind(inst)(Component.lastDeviceType);
            }
        });
    });
};
Component.notifyTransitionOver = () => {
    Component.registeredComponents.forEach(componentClass => {
        Object.keys(componentClass.instances).forEach(instName => {
            const inst = componentClass.instances[instName];
            const instCallback = inst.transitionOver;
            if (instCallback) {
                instCallback.bind(inst)();
            }
        });
    });
};
Component.registeredComponents = [];

Component.register = (componentClass, componentName) => {
    Component.registeredComponents.push(componentClass);
    componentClass.instances = {};
    componentClass.initialize = (nContainer = document, containerIsRoot = false) => {
        const nComponents = containerIsRoot ? [nContainer] : [...nContainer.querySelectorAll(`.${componentName}`)];
        nComponents.forEach(nComponent => {
            if (nComponent.hasAttribute('data-no-init')) {
                return;
            }
            const name = nComponent.hasAttribute('data-inst') ? nComponent.getAttribute('data-inst') : undefined;
            componentClass.componentName = componentName;
            const instance = new componentClass(nComponent, name);
            componentClass.instances[name] = instance;
        });
    };
    componentClass.destroy = (nContainer = document, containerIsRoot = false) => {
        const nComponents = containerIsRoot ? [nContainer] : [...nContainer.querySelectorAll(`.${componentName}`)];
        nComponents.forEach(nComponent => {
            const name = nComponent.hasAttribute('data-inst') ? nComponent.getAttribute('data-inst') : undefined;
            const instance = componentClass.instances[name];
            if (instance) {
                instance.destroy();
                delete componentClass.instances[name];
            }
        });
    }
};

window.addEventListener('resize', () => {
    const currentDeviceType = getDeviceType();
    if (Component.lastDeviceType !== currentDeviceType) {
        Component.registeredComponents.forEach(componentClass => {
            Object.keys(componentClass.instances).forEach(instName => {
                const inst = componentClass.instances[instName];
                const instCallback = inst[`onSwitchedTo${currentDeviceType}`];
                if (instCallback) {
                    instCallback.bind(inst)(Component.lastDeviceType);
                }
            });
        });
        Component.lastDeviceType = currentDeviceType;
    }
});