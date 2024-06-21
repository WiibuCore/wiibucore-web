<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createAnimeStore } from "../hooks/animeStore";

    const { loading, error, animeSeasonNow, fetchAnimeNow } =
        createAnimeStore();

    let currentIndex = 0;
    let intervalId: number | undefined;

    function next() {
        if ($animeSeasonNow && $animeSeasonNow.length > 0) {
            currentIndex = (currentIndex + 1) % $animeSeasonNow.length;
        }
    }

    function prev() {
        if ($animeSeasonNow && $animeSeasonNow.length > 0) {
            currentIndex =
                (currentIndex - 1 + $animeSeasonNow.length) %
                $animeSeasonNow.length;
        }
    }

    onMount(() => {
        fetchAnimeNow(10);
        intervalId = setInterval(next, 2000);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<div class="relative w-full max-w-4xl">
    {#if $loading}
        <p>Loading...</p>
    {:else if $error}
        <p>Error calling API...</p>
    {:else if $animeSeasonNow && $animeSeasonNow.length > 0}
        <div class="overflow-hidden relative">
            <img
                class="w-full h-[450px] object-cover object-center rounded-xl"
                src={$animeSeasonNow[currentIndex].trailer.images
                    .maximum_image_url}
                alt={`Slide ${currentIndex + 1}`}
            />
            <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
            >
                <h1 class="text-white text-3xl font-comic-shanns font-bold">
                    {$animeSeasonNow[currentIndex].title}
                </h1>
                <div class="text-white text-md flex gap-2">
                    <h2>{$animeSeasonNow[currentIndex].type}</h2>
                    ·
                    <h2>{$animeSeasonNow[currentIndex].status}</h2>
                    ·
                    <h2>
                        {$animeSeasonNow[currentIndex].season}-{$animeSeasonNow[
                            currentIndex
                        ].year}
                    </h2>
                    ·
                    <h2>★ {$animeSeasonNow[currentIndex].score}</h2>
                    ·
                    <h2>{$animeSeasonNow[currentIndex].episodes} eps</h2>
                </div>
                <div class="text-white text-md flex gap-2 my-2">
                    {#each $animeSeasonNow[currentIndex].genres as genre}
                        <div
                            class="bg-primary px-3 rounded-md text-sm text-black font-semibold shadow"
                        >
                            {genre.name}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <button
            class="absolute top-1/2 left-0 -ml-7 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-2 rounded-full"
            on:click={prev}
        >
            <img
                class="w-[25px] text-white"
                src="/icons/arrow-left-line.svg"
                alt="icon"
            />
        </button>
        <button
            class="absolute top-1/2 right-0 -mr-7 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-2 rounded-full"
            on:click={next}
        >
            <img
                class="w-[25px] text-white"
                src="/icons/arrow-right-line.svg"
                alt="icon"
            />
        </button>
    {/if}
</div>
