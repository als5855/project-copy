
import { create } from "zustand";
import { MeetingGroup } from "../types";
import SearchResult from "../layouts/SearchBar";

interface SearchStore {
  groupCategory: string;
  region: string;
  results: MeetingGroup[];
  isResults: boolean|null;
  loading: boolean;

  setGroupCategory: (category: string) => void;
  setRegion: (region: string) => void;
  setResults: (results: MeetingGroup[]) => void;
  setIsResults: (isResults: boolean|null) => void;
  setLoading: (loading: boolean)=> void;

  groupTitle: string;
  searchResults: MeetingGroup[]; 

  setGroupTitle: (groupTitle: string) => void;
  setSearchResults: (searchResults: MeetingGroup[]) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  groupCategory: "",
  region: "",
  results: [],
  isResults: null,
  loading:false,

  searchResults: [],
  groupTitle: "",  

  setGroupCategory: (category) => set({ groupCategory: category }),
  setRegion: (region) => set({ region: region }),
  setResults: (results) => set({ results: results }),
  setIsResults: (isResults) => set({isResults: isResults}),
  setLoading: (loading) => set({loading: loading}),
  setSearchResults: (searchResults) => set({searchResults: searchResults}),
  setGroupTitle: (groupTitle) => set({ groupTitle: groupTitle})
}));

export default useSearchStore;