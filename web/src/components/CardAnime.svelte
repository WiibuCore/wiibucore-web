<script lang="ts">
    export let image: string;
    export let title: string;
    export let maxLength: number = 20;

    const truncatedTitle =
        title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
</script>

<div
    class="w-[150px] h-[250px] rounded-xl overflow-hidden shadow-lg bg-gray-800"
>
    <img class="w-full h-[200px] object-cover" src={image} alt={title} />
    <div class="px-2 py-2">
        <div class="font-bold text-xs text-white mb-2">
            {truncatedTitle}
        </div>
    </div>
</div>
