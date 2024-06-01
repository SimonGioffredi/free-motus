import { words } from '@/data/words.data.js'
import { computed, type ComputedRef } from 'vue'

/**
 * Permet de récupérer un mot aléatoire dans la liste
 * @return {ComputedRef<string>}
 */
export default function useWord(): ComputedRef<string> {
  return computed<string>(() => {
    // On récupère un index aléatoire dans le tableau de mots
    const index: number = Math.floor(Math.random() * words.length)
    // On retourne le mot aléatoire
    return words[index].toLowerCase()
  })
}
