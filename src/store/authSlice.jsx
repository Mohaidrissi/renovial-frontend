// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

function getUserFromToken() {

    const token = localStorage.getItem('token');

    if (!token) {
        return {
            token: null,
            user: null,
        };
    }

    try {
        const decoded = jwtDecode(token);

        // Vérifie si le token est expiré
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return {
                token: null,
                user: null,
            };
        }

        return {
            token,
            user: {
                username: decoded.sub,
                role: decoded.role
            },
        };
    } catch (error) {
        console.error('Token invalide :', error);
        localStorage.removeItem('token');
        return {
            token: null,
            user: null,
        };
    }
}

const initialState = getUserFromToken();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        loginSuccess: (state, action) => {
            console.log('Token reçu :', action.payload);
            localStorage.setItem('token', action.payload);
            const { token, user } = getUserFromToken();
            state.token = token;
            state.user = user;
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

export const {
    loginSuccess,
    logout,
} = authSlice.actions;

export default authSlice.reducer;