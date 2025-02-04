import axios from 'axios';

class APIService {
    static baseUrl = "http://localhost:5000/api/store/ducks";

    static async fetchDucks() {
        try {
            const response = await axios.get(`${this.baseUrl}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching ducks:", error);
            throw error;
        }
    }

    static async addDuck(duckData) {
        try {
            const response = await axios.post(`${this.baseUrl}/add`, duckData);
            return response.data;
        } catch (error) {
            console.error("Error adding duck:", error);
            throw error;
        }
    }

    static async updateDuck(duckId, updatedData) {
        try {
            const response = await axios.put(`${this.baseUrl}/${duckId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error("Error updating duck:", error);
            throw error;
        }
    }

    static async deleteDuck(duckId) {
        try {
            await axios.delete(`${this.baseUrl}/${duckId}`);
        } catch (error) {
            console.error("Error deleting duck:", error);
        }
    }
}

export default APIService;
