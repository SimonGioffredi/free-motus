<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})

// TODO | Faire ici une computed permettant de retourner le type de titre qu'on veut (h1, h2, etc...)
const tag = 'h1'
</script>

<template>
  <component :is="tag">{{ title }}</component>
</template>
