<script setup>
import useWord from '@/composables/use-word'

const word = useWord()
</script>

<template>
  <main>
    <h1>Motus</h1>
    <p>Le mot est : {{ word }}</p>
  </main>
</template>
