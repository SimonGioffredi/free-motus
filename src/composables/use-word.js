import { words } from '@/data/words.data.js'
import { computed } from 'vue'

/**
 * Permet de récupérer un mot aléatoire dans la liste
 * @return {ComputedRef<string>}
 */
export default function useWord() {
  return computed(() => {
    // On récupère un index aléatoire dans le tableau de mots
    const index  = Math.floor(Math.random() * words.length)
    // On retourne le mot aléatoire
    return words[index]
  })
}
