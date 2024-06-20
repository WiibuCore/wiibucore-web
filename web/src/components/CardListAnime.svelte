<script lang="ts">
    import { onMount } from "svelte";
    import { createAnimeStore } from "../hooks/animeStore";
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
            <div
                class="w-[150px] h-[280px] rounded-xl overflow-hidden shadow-lg bg-gray-800"
            >
                <img
                    class="w-full h-[200px] object-cover"
                    src={item.images.jpg.large_image_url}
                    alt={item.title}
                />
                <div class="px-2 py-2">
                    <div class="font-bold text-xs text-white mb-2">
                        {item.title}
                    </div>
                </div>
            </div>
        {/each}
    {/if}
</div>
