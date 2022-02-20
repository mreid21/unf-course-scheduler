<script setup lang="ts">

const {headers} = defineProps<{
    headers: string[]
}>()
</script>

<template>
    <tr>
        <th class="capitalize" v-for="header in headers">
            <slot :header="header"></slot>
        </th>
    </tr>
</template>


