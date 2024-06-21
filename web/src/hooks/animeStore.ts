import { writable } from "svelte/store";
import axiosInstance from "../utils/axios";

interface Anime {
    mal_id: number
    name: string
    count: number
    title: string
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
    synopsis: string
    images: {
        jpg: {
            large_image_url: string
        };
    };
    trailer: {
        images: {
            maximum_image_url: string
        }
    }
}

export const createAnimeStore = () => {
    const animePopuler: any = writable([]);
    const animeSeasonNow = writable<Anime[]>([]);
    const animeSeasonUpcoming = writable<Anime[]>([]);
    const animeGenres = writable<Anime[]>([]);
    const loading = writable(true);
    const error = writable<string | null>(null);

    const fetchWithRateLimit = async (fetchFunction: () => Promise<any>, delay = 2000) => {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchFunction();
    };

    const fetchAnimeTop = async (countSlice?: number) => {
        loading.set(true);
        error.set(null);

        try {
            const response = await fetchWithRateLimit(() => axiosInstance.get(`/top/anime`));
            const data = response.data.data
            if (countSlice !== undefined && countSlice > 0) {
                animePopuler.set(data.slice(0, countSlice));
            } else {
                animePopuler.set(data)
            }
        } catch (err: any) {
            error.set((err as Error).message);
        } finally {
            loading.set(false);
        }
    };

    const fetchAnimeNow = async (countSlice?: number) => {
        loading.set(true);
        error.set(null);

        try {
            const response = await fetchWithRateLimit(() => axiosInstance.get(`/seasons/now`));
            const data = response.data.data;
            if (countSlice !== undefined && countSlice > 0) {
                animeSeasonNow.set(data.slice(0, countSlice));
            } else {
                animeSeasonNow.set(data);
            }
            return;
        } catch (err: any) {
            error.set((err as Error).message);
        } finally {
            loading.set(false);
        }

    };

    const fetchAnimeUpcoming = async (countSlice?: number) => {
        loading.set(true);
        error.set(null);
        try {
            const response = await fetchWithRateLimit(() => axiosInstance.get(`/seasons/upcoming`));
            const data = response.data.data;
            if (countSlice !== undefined && countSlice > 0) {
                animeSeasonUpcoming.set(data.slice(0, countSlice));
            } else {
                animeSeasonUpcoming.set(data);
            }
        } catch (err: any) {
            error.set((err as Error).message);
        } finally {
            loading.set(false);
        }
    };

    const fetchAnimeGenres = async (countSlice?: number) => {
        loading.set(true);
        error.set(null);
        try {
            const response = await fetchWithRateLimit(() => axiosInstance.get(`/genres/anime`));
            const data = response.data.data;
            if (countSlice !== undefined && countSlice > 0) {
                animeGenres.set(data.slice(0, countSlice));
            } else {
                animeGenres.set(data);
            }
        } catch (err: any) {
            error.set((err as Error).message);
        } finally {
            loading.set(false);
        }
    };

    return { animePopuler, animeSeasonNow, animeSeasonUpcoming, animeGenres, loading, error, fetchAnimeNow, fetchAnimeUpcoming, fetchAnimeGenres, fetchAnimeTop };
};
