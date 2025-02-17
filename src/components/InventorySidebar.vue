<script setup lang="ts">
</script>

<template>
    <div class="inventory__sidebar">
        <img src="../assets/images/logo.png" class="inventory__sidebar__logo" alt="logo">
        <div class="inventory__sidebar__info">
            <div v-for="i in 5" class="skeleton"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.inventory__sidebar {
    background: #262626;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 20px;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #4D4D4D;

    .inventory__sidebar__logo {
        width: 100%;
        max-height: 50%;
        object-fit: cover;
    }

    .inventory__sidebar__info {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .skeleton {
            background: linear-gradient(90deg, #3C3C3C 25%, #444444 50%, #333333 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite linear;
            border-radius: 4px;
            width: 100%;
            height: 30px;
        }
    
        @keyframes skeleton-loading {
            0% {
                background-position: 100% 0;
            }
    
            100% {
                background-position: -100% 0;
            }
        }
    }
}
</style>
