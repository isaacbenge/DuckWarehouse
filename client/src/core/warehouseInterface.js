import DuckFactory from './duckFactory.js';
import Observer from './observer.js'

export default class WareHouseInterface {
    factory = undefined;
    observer = new Observer();

    constructor(){
        //I have to create a factory before createWarehouse
        this.getFactory()
    }

    //Add getObserver
    getObserver(){
        return this.observer;
    }

    getFactory(){
        if (!this.factory){
            this.factory = new DuckFactory();
        }
        return this.factory
    }

    createWarehouse(){
        let warehouse = this.factory.create("warehouse",);
        warehouse.setObserver(this.observer);
        warehouse.setFactory(this.factory);

        return warehouse
    }
}