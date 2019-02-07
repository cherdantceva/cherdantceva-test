import Component from './component';

const init = () => {
    Component.registeredComponents.forEach(componentClass => {
        Object.keys(componentClass.instances).forEach(instName => {
            const inst = componentClass.instances[instName];
            if (inst.init) {
                inst.init();
            }
        });
    });
};

init();

export default init;