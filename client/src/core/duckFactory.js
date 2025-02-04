import DuckWarehouse from './duckWarehouse';
import Duck from './models/duckClass.js';

export default class DuckFactory {
    factoryMap = {
        duck: Duck,
        warehouse: DuckWarehouse,
    };

    register(type, classRef) {
        //? If I need new types of product other than ducks
        if (this.factoryMap[type]) {
            console.warn(type+" is already registered in the duckFactory. Overwriting...");
        }
        this.factoryMap[type] = classRef;
    };

    create(type, data) {
        //create ducks
        // oh also lets make warehouse
        const creation = this.factoryMap[type];
        if (!creation) {
            throw new Error(`I would...but ${type} is not registered`);
        }

        
        let component = new creation();
        
        component.updateJson(data);

        return component;
    };

}