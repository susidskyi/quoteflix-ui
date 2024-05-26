import { create } from 'zustand'

export type Phrase = {
  id: string
  movie_id: string
  full_text: string
  scene_s3_key: string
  matched_phrase: string
}

export type PaginatedPhrases = {
  items: Phrase[]
  total: number
  page: number
  size: number
  pages: number
}

type PhrasesStore = {
  phrases: Phrase[]
  activePhrase?: Phrase
  totalPhrases: number
  activePhraseIndex: number
  searchText: string
  setPhrases: (phrasesData: PaginatedPhrases, reset?: boolean) => void
  setActivePhrase: (phrase: Phrase) => void
  setActivePhraseIndex: (index: number) => void
  setSearchText: (searchText: string) => void
}

const handleSetPhrases = (phrasesData: PaginatedPhrases, state: PhrasesStore, reset: boolean = false) => {
  if (phrasesData.items.length) {
    if (reset === true) {
      return {
        phrases: phrasesData.items,
        activePhrase: phrasesData.items[0],
        totalPhrases: phrasesData.total,
        activePhraseIndex: 0
      }
    }
    return {
      phrases: [...state.phrases, ...phrasesData.items]
    }
  }

  return {
    phrases: [],
    activePhrase: undefined,
    totalPhrases: 0,
    activePhraseIndex: 0,
    searchText: ''
  }
}

const handleSetActivePhraseIndex = (index: number, state: PhrasesStore) => {
  if (index >= 0 && index < state.phrases.length) {
    return { activePhraseIndex: index, activePhrase: state.phrases[index] }
  }

  return state
}

export const usePhrasesStore = create<PhrasesStore>((set) => ({
  phrases: [],
  activePhraseIndex: 0,
  activePhrase: undefined,
  totalPhrases: 0,
  searchText: '',
  setPhrases: (phrasesData, reset) => set((state) => handleSetPhrases(phrasesData, state, reset)),
  setActivePhrase: (phrase) => set({ activePhrase: phrase }),
  setActivePhraseIndex: (index) => set((state) => handleSetActivePhraseIndex(index, state)),
  setSearchText: (searchText) => set({ searchText })
}))
