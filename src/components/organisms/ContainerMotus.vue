<script setup>
import TheTitle from '@/components/atoms/TheTitle.vue'
import TheSection from '@/components/atoms/TheSection.vue'
import useWord from '@/composables/use-word'

const word = useWord()
</script>

<template>
  <TheSection class="container-motus">
    <TheTitle title="Motus" />
    <p>Le mot est : {{ word }}</p>
  </TheSection>
</template>

<style scoped>

</style>
