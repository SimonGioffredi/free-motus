import { mount } from '@vue/test-utils'
import ContainerMotus from '@/components/organisms/ContainerMotus.vue'

import { describe, test } from 'node:test'
import { expect } from 'vitest'

describe('ContainerMotus', () => {
  test('Word exist and is a string', () => {
    // On instancie le composant ContainerMotus
    const wrapper = mount(ContainerMotus)
    // On vérifie que le mot existe
    expect(wrapper.vm.word).toBeTruthy()
    // On vérifie que le mot est une string
    expect(wrapper.vm.word).toBeTypeOf('string')
  })
  test('Word is random', () => {
    // On instancie 3 fois le composant ContainerMotus
    const wrapper = mount(ContainerMotus)
    const wrapperSecond = mount(ContainerMotus)
    const wrapperThird = mount(ContainerMotus)
    // On récupère le mot à chercher
    let words = [wrapper.vm.word, wrapperSecond.vm.word, wrapperThird.vm.word]
    // On supprime les doublons
    words = [...new Set(words)]
    // On passe le test si il y a bien toujours 3 mots
    expect(words.length).toBe(3)
  })
  test('Word is the good one', async () => {
    // On instancie le composant ContainerMotus
    const wrapper = mount(ContainerMotus)
    // On récupère le bouton
    const button = wrapper.find('input')

    // On set une mauvaise valeur
    await button.setValue('aaaaaa')
    // On trigger l'event keyup.enter
    await button.trigger('keyup.enter')
    // On vérifie que le nombre d'essais soit de 1
    expect(wrapper.vm.attempts.length).toBe(1)
    // On vérifie que le jeu ne soit pas terminé
    expect(wrapper.vm.isOver).toBe(false)

    // On set la bonne valeur
    await button.setValue(wrapper.vm.word)
    // On trigger l'event keyup.enter
    await button.trigger('keyup.enter')
    // On vérifie que le nombre d'essais soit de 2
    expect(wrapper.vm.attempts.length).toBe(2)
    // On vérifie que le message soit le bon
    expect(wrapper.vm.message).toBe('Félicitations ! Vous avez trouvé le mot !')
  })
})
