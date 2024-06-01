<script setup lang="ts">
import TheTitle from '@/components/atoms/TheTitle.vue'
import TheSection from '@/components/atoms/TheSection.vue'
import useWord from '@/composables/use-word'
import { computed, type Ref, ref, watch } from 'vue'
import type { ContainerMotusAttemptsInterface } from '@/types/components/organisms/ContainerMotus.types'

const word = useWord()
const guess = ref('')
const attempts: Ref<ContainerMotusAttemptsInterface> = ref([])
const maxAttempts = ref(7)
const message = ref('')
const isOver = ref(false)

/**
 * Permet de récupérer le placeholder du champ
 */
const placeholder = computed<string>(() => {
  return `Entrez un mot de ${word.value.length} lettres`
})

/**
 * Lorsqu'on valide le champ
 */
const onSubmit = () => {
  // Si il n'y a pas autant de lettre que prévu, on s'arrête là
  if (guess.value.length !== word.value.length) return
  // On met le mot en minuscule
  const guessLowerCase = guess.value.toLowerCase()
  // On garde nos tentatives en mémoire
  attempts.value.push({ id: attempts.value.length, word: guessLowerCase })
  // Si le mot est le bon
  if (guessLowerCase === word.value) {
    message.value = 'Félicitations ! Vous avez trouvé le mot !'
    return
  }
// Si trop de tentative on été effectuée
  if (attempts.value.length >= maxAttempts.value) {
    message.value = `Désolé, vous avez utilisé toutes vos tentatives. Le mot était : ${word.value}`
  }

  guess.value = ''
}


/**
 * Permet de récupérer la class pour afficher un design différent le placement des lettres
 * @param {string} letter La lettre
 * @param {number} index L'index de la lettre
 * @returns string Le nom de la classe
 */
const getClass = (letter: string, index: number): string => {
  // Si la lettre bien placée dans le mot
  if (letter === word.value[index]) return 'good'
  // Si elle est contenues dans le mot de base
  if (word.value.includes(letter)) return 'bad-placement'
  // Si elle n'est pas dans le mot
  return 'false'
}

/**
 * Quand le message se met à jour, on termine le jeu
 */
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
      :placeholder="placeholder"
      :disabled="isOver"
      @keyup.enter="onSubmit"
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
