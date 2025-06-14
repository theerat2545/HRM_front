import { defineStore } from "pinia";
import axios from "axios";

export const usePositionStore = defineStore("positions", {
    state: () => ({
        positions: [],
        isLoading: false,
        error: null,
    }),
    
    getters: {
        allPositions: (state) => state.positions,
    },
    
    actions: {
        async fetchPositions() {
        this.isLoading = true;
        this.error = null;
        try {
            const res = await axios.get("http://localhost:5000/api/positions/");
            this.positions = res.data.data;
        } catch (err) {
            this.error = err;
            console.error("เกิดข้อผิดพลาด:", err);
        } finally {
            this.isLoading = false;
        }
        },
        
        setPositions(positions) {
        this.positions = positions;
        },
        
        async addPosition(data) {
        const res = await axios.post("http://localhost:5000/api/positions/", data);
        this.positions.push(res.data);
        },
        
        async updatePosition(id, data) {
        const res = await axios.put(`http://localhost:5000/api/positions/${id}`, data);
        const index = this.positions.findIndex(pos => pos.id === id);
        if (index !== -1) {
            this.positions[index] = res.data;
        }
        },
        
        async deletePosition(id) {
        await axios.delete(`http://localhost:5000/api/positions/${id}`);
        this.positions = this.positions.filter(pos => pos.id !== id);
        },
    },
    });