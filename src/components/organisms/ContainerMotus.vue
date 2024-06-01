<script setup>
import TheTitle from '@/components/atoms/TheTitle.vue'
import TheSection from '@/components/atoms/TheSection.vue'
import useWord from '@/composables/use-word'
import { computed, ref, watch } from 'vue'

const word = useWord()
const guess = ref('')
const attempts = ref([])
const message = ref('')
const isOver = ref(false)

const placeholder = computed(() => {
  return `Entrez un mot de ${word.value.length} lettres`
})

const onSubmit = () => {
  if (guess.value.length !== word.value.length) return

  const guessLowerCase = guess.value.toLowerCase()
  attempts.value.push({ id: attempts.value.length, word: guessLowerCase })

  if (guessLowerCase === word.value) {
    message.value = 'Félicitations ! Vous avez trouvé le mot !'
    return
  }

  if (attempts.value.length >= 6) {
    message.value = `Désolé, vous avez utilisé toutes vos tentatives. Le mot était : ${word.value}`
  }

  guess.value = ''
}

const getClass = (letter, index) => {
  if (letter === word.value[index]) {
    return 'good'
  } else if (word.value.includes(letter)) {
    return 'bad-placement'
  } else {
    return 'false'
  }
}

watch(message, () => {
  isOver.value = true
})
</script>

<template>
  <TheSection class="container-motus">
    <TheTitle :title="`Motus - ${word}`" />
    <input
      v-model="guess"
      :maxlength="word.length"
      @keyup.enter="onSubmit"
      :placeholder="placeholder"
      :disabled="isOver"
    >
    <ul v-for="attempt in attempts" :key="attempt.id">
      <li>
        <p>
          <span v-for="(letter, i) in attempt.word" :key="i" :class="getClass(letter, i)">
            {{ letter }}
          </span>
        </p>
      </li>
    </ul>

    <div v-if="message">{{ message }}</div>
  </TheSection>
</template>

<style scoped>

</style>
