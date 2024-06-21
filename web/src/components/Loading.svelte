<div class="loading-animation" />

<style>
    .loading-animation {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading-animation::after {
        content: "";
        display: block;
        width: 30px;
        height: 30px;
        border: 4px solid #ccc;
        border-top-color: #666;
        border-radius: 50%;
        animation: spin 1s ease-in-out infinite;
    }
</style>
