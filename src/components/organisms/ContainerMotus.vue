<script setup lang="ts">
import TheTitle from '@/components/atoms/TheTitle.vue'
import TheSection from '@/components/atoms/TheSection.vue'
import useWord from '@/composables/use-word'
import { computed, type Ref, ref, watch } from 'vue'
import type { ContainerMotusAttemptsInterface } from '@/types/components/organisms/ContainerMotus.types'
import TheWrapper from '@/components/atoms/TheWrapper.vue'

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
  if (letter === word.value[index]) return 'bg-green-500'
  // Si elle est contenues dans le mot de base
  if (word.value.includes(letter)) return 'bg-orange-500'
  // Si elle n'est pas dans le mot
  return 'bg-red-500'
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
    <TheWrapper>
      <TheTitle :title="`Motus - ${word}`" />
      <div v-if="message">{{ message }}</div>
      <input
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="guess"
        :maxlength="word.length"
        :placeholder="placeholder"
        :disabled="isOver"
        @keyup.enter="onSubmit"
      >
      <ul v-for="attempt in attempts" :key="attempt.id" class="max-w-xs">
        <li>
          <p class="flex grid-cols-6">
            <span
              v-for="(letter, i) in attempt.word"
              :key="i"
              :class="`${getClass(letter, i)} flex items-center justify-center shrink-0 flex-1 aspect-square`"
            >
              {{ letter }}
            </span>
          </p>
        </li>
      </ul>
    </TheWrapper>
  </TheSection>
</template>

<style scoped>

</style>
