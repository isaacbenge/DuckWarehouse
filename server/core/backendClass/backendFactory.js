export default class BaseFactory {
    factoryMap = {
        
    };

    register(type, classRef) {
        
        if (this.factoryMap[type]) {
            console.warn(`Type "${type}" is already registered. Overwriting...`);
        }
        this.factoryMap[type] = classRef;
    }

    create(type, data) {
        
        const Cls = this.factoryMap[type];
        if (!Cls) {
            throw new Error(`Unrecognized type: ${type}`);
        }
        let component = new Cls();
        component.updateJson(data);

        return component;
    }
}