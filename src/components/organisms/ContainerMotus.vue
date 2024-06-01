<script setup>
import TheTitle from '@/components/atoms/TheTitle.vue'
import TheSection from '@/components/atoms/TheSection.vue'
import useWord from '@/composables/use-word'
import { computed, ref } from 'vue'

const word = useWord()
const guess = ref('')
const attempts = ref([])
const message = ref('')

const placeholder = computed(() => {
  return `Entrez un mot de ${word.value.length} lettres`
})

const onSubmit = () => {
  if (guess.value.length !== word.value.length) return

  const guessLowerCase = guess.value.toLowerCase()
  attempts.value.push({ id: attempts.value.length, word: guessLowerCase })

  if (guessLowerCase === word.value) {
    message.value = "Félicitations ! Vous avez trouvé le mot !";
    return;
  }

  if (attempts.value.length >= 6) {
    message.value = `Désolé, vous avez utilisé toutes vos tentatives. Le mot était : ${word.value}`;
  }

  guess.value = '';
}
</script>

<template>
  <TheSection class="container-motus">
    <TheTitle title="Motus" />
    <input
      v-model="guess"
      :maxlength="word.length"
      @keyup.enter="onSubmit"
      :placeholder="placeholder"
    >
    <p>Le mot est : {{ word }}</p>
    <p>Les essais : {{ attempts }}</p>
  </TheSection>
</template>

<style scoped>

</style>
