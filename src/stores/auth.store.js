import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    }),
    
    getters: {
        currentUser: (state) => state.user,
        isLoggedIn: (state) => !!state.token
    },
    
    actions: {
        async login(credentials) {
        this.isLoading = true;
        this.error = null;
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
            this.user = res.data.user;
            this.token = res.data.token;
            this.isAuthenticated = true;
            localStorage.setItem('token', this.token); // ✅ เก็บ token
        } catch (err) {
            this.error = err.response ? err.response.data : "Login failed";
            console.error("Login error:", this.error);
        } finally {
            this.isLoading = false;
        }
        },
    
       async logout() {
        try {
            await axios.post("http://localhost:5000/api/auth/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token'); // ✅ ล้าง token
        }
        },
    
        async register(userData) {
        this.isLoading = true;
        this.error = null;
        console.log("Register payload:", userData);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", userData);
            this.user = res.data.user;
            this.isAuthenticated = true;
        } catch (err) {
            this.error = err.response ? err.response.data : "Registration failed";
            console.error("Registration error:", this.error);
        } finally {
            this.isLoading = false;
        }
        },
    },
    });