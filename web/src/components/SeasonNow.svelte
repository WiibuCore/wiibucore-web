<script lang="ts">
    import { onMount } from "svelte";
    import { createAnimeStore } from "../hooks/animeStore";

    import CardAnime from "./CardAnime.svelte";
    import Loading from "./Loading.svelte";

    const { loading, error, animeSeasonNow, fetchAnimeNow } =
        createAnimeStore();
    console.log({ animeSeasonNow });

    onMount(() => {
        fetchAnimeNow(5);
    });
</script>

<div class="grid grid-cols-5 gap-2">
    {#if $loading}
        <Loading />
    {:else if $error}
        <p>api call error</p>
    {:else}
        {#each $animeSeasonNow as item}
            <CardAnime
                image={item.images.jpg.large_image_url}
                title={item.title}
                maxLength={20}
            />
        {/each}
    {/if}
</div>
