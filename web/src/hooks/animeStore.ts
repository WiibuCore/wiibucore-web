import { writable } from "svelte/store";
import axios from "axios";
import { apiUrl } from "../utils/env";

export const animePopuler: any = writable([]);
export const animeSeasonNow: any = writable([]);
export const loading = writable(true);
export const error = writable<string | null>(null);

export const fetchAnimeData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/top/anime`);
        animePopuler.set(response.data.data.slice(0, 4));
        loading.set(false);
    } catch (err) {
        error.set((err as Error).message);
        loading.set(false);
    }
};

export const fetchAnimeNow = async () => {
    try {
        const response = await axios.get(`${apiUrl}/seasons/now`);
        animeSeasonNow.set(response.data.data.slice(0, 10));
        loading.set(false);
    } catch (err) {
        error.set((err as Error).message);
        loading.set(false);
    }
};
