<script setup lang="ts">
interface PropsInterface {
  title: string
}
defineProps<PropsInterface>()

// TODO | Faire ici une computed permettant de retourner le type de titre qu'on veut (h1, h2, etc...)
const tag = 'h1'
</script>

<template>
  <component :is="tag" class="text-3xl font-bold underline my-5">{{ title }}</component>
</template>
