<script lang="ts">
    import { onMount } from "svelte";
    import { createAnimeStore } from "../hooks/animeStore";

    import CardAnime from "./CardAnime.svelte";

    const { loading, error, animeSeasonUpcoming, fetchAnimeUpcoming } =
        createAnimeStore();
    console.log({ animeSeasonUpcoming });

    onMount(() => {
        fetchAnimeUpcoming(5);
    });
</script>

<div class="grid grid-cols-5 gap-2">
    {#if $loading}
        <p>Loading...</p>
    {:else if $error}
        <p>api call error</p>
    {:else}
        {#each $animeSeasonUpcoming as item}
            <CardAnime
                image={item.images.jpg.large_image_url}
                title={item.title}
                maxLength={20}
            />
        {/each}
    {/if}
</div>
