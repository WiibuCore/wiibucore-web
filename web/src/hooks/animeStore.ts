import { writable } from "svelte/store";
import axiosInstance from "../utils/axios";

export const animePopuler: any = writable([]);
export const animeSeasonNow: any = writable([]);
export const loading = writable(true);
export const error = writable<string | null>(null);

export const fetchAnimeTop = async (countSlice?: number) => {
    try {
        const response = await axiosInstance.get(`/top/anime`);
        const data = response.data.data
        if (countSlice !== undefined && countSlice > 0) {
            animePopuler.set(data.slice(0, countSlice));
        } else {
            animePopuler.set(data)
        }
        loading.set(false);
    } catch (err) {
        error.set((err as Error).message);
        loading.set(false);
    }
};

interface Anime {
    mal_id: number;
    title: string;
    type: string
    status: string
    season: string
    year: string
    score: string
    episodes: string
    genres: [
        {
            name: string
        }
    ]
    synopsis: string;
    images: {
        jpg: {
            large_image_url: string;
        };
    };
    trailer: {
        images: {
            maximum_image_url: string
        }
    }
}

export const createAnimeStore = () => {
    const animeSeasonNow = writable<Anime[]>([]);
    const animeSeasonUpcoming = writable<Anime[]>([]);
    const loading = writable(true);
    const error = writable<string | null>(null);

    const fetchAnimeNow = async (countSlice?: number) => {
        loading.set(true);
        error.set(null);
        try {
            const response = await axiosInstance.get(`/seasons/now`);
            const data = response.data.data;
            if (countSlice !== undefined && countSlice > 0) {
                animeSeasonNow.set(data.slice(0, countSlice));
            } else {
                animeSeasonNow.set(data);
            }
        } catch (err) {
            error.set((err as Error).message);
        } finally {
            loading.set(false);
        }
    };

    const fetchAnimeUpcoming = async (countSlice?: number) => {
        loading.set(true);
        error.set(null);
        try {
            const response = await axiosInstance.get(`/seasons/upcoming`);
            const data = response.data.data;
            if (countSlice !== undefined && countSlice > 0) {
                animeSeasonUpcoming.set(data.slice(0, countSlice));
            } else {
                animeSeasonUpcoming.set(data);
            }
        } catch (err) {
            error.set((err as Error).message);
        } finally {
            loading.set(false);
        }
    };

    return { animeSeasonNow, animeSeasonUpcoming, loading, error, fetchAnimeNow, fetchAnimeUpcoming };
};
