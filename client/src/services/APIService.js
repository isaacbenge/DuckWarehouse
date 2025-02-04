// client/src/services/APIService.js
import axios from 'axios';

class APIService {
    baseUrl = "http://localhost:3001/api/store/ducks";

    async fetchDucks() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async addDuck(duckData) {
        const response = await axios.post(`${this.baseUrl}/add`, duckData);
        return response.data;
    }

    async updateDuck(duckId, updatedData) {
        const response = await axios.put(`${this.baseUrl}/${duckId}`, updatedData);
        return response.data;
    }

    async deleteDuck(duckId) {
        await axios.delete(`${this.baseUrl}/${duckId}`);
    }
}

export default new APIService();
