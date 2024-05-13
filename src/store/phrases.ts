import { create } from 'zustand'

export type Phrase = {
  id: string
  movie_id: string
  full_text: string
  scene_s3_key?: string
}

type PhrasesStore = {
  phrases: Phrase[]
  activePhrase?: Phrase
  activePhraseIndex: number
  setPhrases: (phrases: Phrase[]) => void
  setActivePhrase: (phrase: Phrase) => void
  setActivePhraseIndex: (index: number) => void
}

export const usePhrasesStore = create<PhrasesStore>((set) => ({
  phrases: [],
  activePhraseIndex: 0,
  setPhrases: (phrases) => set({ phrases }),
  setActivePhrase: (phrase) => set({ activePhrase: phrase }),
  setActivePhraseIndex: (index) =>
    set((state) => {
      if (index >= 0 && index < state.phrases.length) {
        return { activePhraseIndex: index, activePhrase: state.phrases[index] }
      }

      return state
    })
}))
