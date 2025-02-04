import APIService from "../services/APIService";
import BaseClass from "./models/baseClass";

export default class DuckWarehouse extends BaseClass {
    //I'll set these in interface
    factory = undefined;
    observer = undefined;

    json = {
        ...this.json,
        ducklist: [],
        currentDuck: undefined
    };



    setObserver(ob) {
        this.observer = ob;
        ///get from an interface
    }

    async initializeDuckList() {
        try {
            const ducksFromBackend = await APIService.fetchDucks();

            // Don't create duplicates if they already exist locally
            for (let duckJson of ducksFromBackend) {
                const existingDuck = this.getDuckById(duckJson._id);
                if (!existingDuck) {
                    const newDuck = this.factory.create('duck', duckJson);
                    this.json.ducklist.push(newDuck);
                }
            }

            // Notify observer with the full updated list
            this.observer.notify({ ducklist: this.json.ducklist });
        } catch (err) {
            console.error("Failed to initialize duck list:", err);
        }
    }

    setFactory(f) {
        this.factory = f;
        ///get from an interface
    }


    getDucks() {
        return this.json.ducklist;
    }

    getDuckById(_id) {
        return this.json.ducklist.find(
            (duck) => duck.getJson()._id === _id
        );
    }


    // in case I need to check if Duck _id is already in list
    verifyDuck(obj) {
        let verified = this.getDuckColorandSize(obj);

        if (verified) {
            verified.updateQuantity();
        }

        return verified
    }

    async addDuck(data) {
        if (!this.factory) {
            throw new Error("Please call setFactory()");
        }

        let verified = this.verifyDuck(data);
        let newDuck = verified;
        if (!verified) {
            newDuck = this.factory.create('duck', data);
            this.json.ducklist.push(newDuck);

            try {
                const backendDuck = await APIService.addDuck(newDuck.getJson());
                const updatedDuck = this.factory.create('duck', backendDuck);
                this.json.ducklist[this.json.ducklist.length - 1] = updatedDuck;

                this.observer.notify({ ducklist: this.json.ducklist });
            } catch (error) {
                console.error("Failed to add duck:", error);
            }
        }
        return newDuck;
    }

    addDucks(arr) {
        for (let duckJson of arr) {
            this.addDuck(duckJson);
        }

    }



    async removeDuckfromList(duck) {
        try {
            // Update 'deleted' to true in the backend
            await APIService.updateDuck(duck.getJson()._id, { deleted: true });
    
            // Remove from local list
            const index = this.json.ducklist.indexOf(duck);
            if (index !== -1) {
                this.json.ducklist.splice(index, 1);
            }
            this.observer.notify({ lastDeleted: duck });
        } catch (error) {
            console.error("Failed to logically delete duck:", error);
        }
    }


    getDuckColorandSize(obj) {
        const { color, size } = obj;
        let returnDuck = undefined;
        for (let i = 0; i < this.json.ducklist.length; i++) {
            const duck = this.json.ducklist[i];
            const dJson = duck.getJson();
            if (dJson.color === color && dJson.size === size) {
                returnDuck = duck;
            }
        }
        return returnDuck; // no match found
    }



}