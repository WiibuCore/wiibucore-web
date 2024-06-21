<script lang="ts">
    import { onMount } from "svelte";
    import { createAnimeStore } from "../hooks/animeStore";

    const { loading, error, animeGenres, fetchAnimeGenres } =
        createAnimeStore();

    onMount(() => {
        fetchAnimeGenres(25);
    });
</script>

{#if $loading}
    <p>Loading...</p>
{:else if $error}
    <p>api call error</p>
{:else}
    <ul>
        {#each $animeGenres as item}
            <li class="text-white text-md flex justify-between items-center space-y-2">
                <p>{item.name}</p>
                <p class="rounded px-2 border border-primary text-xs">{item.count}</p>
            </li>
        {/each}
    </ul>
{/if}
