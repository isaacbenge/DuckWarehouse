// client/src/services/APIService.js
import axios from 'axios';

class APIService {
    static baseUrl = "http://localhost:5000/api/store/ducks";

    static async fetchDucks() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    static async addDuck(duckData) {
        const response = await axios.post(`${this.baseUrl}/add`, duckData);
        return response.data;
    }

    static async updateDuck(duckId, updatedData) {
        const response = await axios.put(`${this.baseUrl}/${duckId}`, updatedData);
        return response.data;
    }

    static async deleteDuck(duckId) {
        await axios.delete(`${this.baseUrl}/${duckId}`);
    }
}

export default APIService;
