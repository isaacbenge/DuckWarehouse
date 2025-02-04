class IdService {
    createId() {
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomPart = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            randomPart += chars[randomIndex];
        }

        
        const now = new Date();
        let mm = String(now.getMonth() + 1).padStart(2, '0');
        let dd = String(now.getDate()).padStart(2, '0');
        let yy = String(now.getFullYear()).slice(-2);

        const datePart = mm + dd + yy;

        
        return randomPart + datePart;
    }
}

export default new IdService();