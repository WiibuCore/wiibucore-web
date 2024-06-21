<script lang="ts">
    import { onMount } from "svelte";
    import { createAnimeStore } from "../hooks/animeStore";

    const { loading, error, animePopuler, fetchAnimeTop } =
        createAnimeStore();

    onMount(() => {
        fetchAnimeTop(4);
    });  
</script>

<div class="text-white px-5">
    <div class="flex justify-between gap-5">
        <h1 class="text-2xl font-semibold font-comic-shanns">Popular</h1>
        <p
            class="bg-primary flex items-center px-3 rounded-xl font-semibold text-xs text-black"
        >
            <a href="/anime">Show More</a>
        </p>
    </div>
    {#if $loading}
        <p>Loading...</p>
    {:else if $error}
        <p>api call error</p>
    {:else}
        <ul class="pt-4">
            {#each $animePopuler as anime}
                <li class="relative overflow-hidden rounded-xl mb-3">
                    <img
                        class="w-full h-[90px] object-cover object-center rounded-xl"
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                    />
                    <div
                        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                    >
                        <h2 class="text-white text-sm">{anime.title}</h2>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
