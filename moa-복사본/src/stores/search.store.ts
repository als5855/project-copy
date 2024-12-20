
import { create } from "zustand";
import { MeetingGroup } from "../types";

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

  keyword: string;
  searchResults: MeetingGroup[]; 
  searchLoading: boolean;
  searchKeyword: string;
  searchAllResults: MeetingGroup[];
  isSearchResults: boolean|null;

  setKeyword: (groupTitle: string) => void;
  setSearchResults: (searchResults: MeetingGroup[]) => void;
  setSearchLoading: (loading: boolean) => void;
  setSearchKeyword: (searchKeyword: string) => void;
  setSearchAllResults: (searchAllResults: MeetingGroup[]) => void;
  setIsSearchResults: (isSearchReuslts: boolean|null) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  groupCategory: "",
  region: "",
  results: [],
  isResults: null,
  loading:false,

  searchResults: [],
  keyword: "", 
  searchLoading: false, 
  searchKeyword: "",
  searchAllResults: [],
  isSearchResults: null,

  setGroupCategory: (category) => set({ groupCategory: category }),
  setRegion: (region) => set({ region: region }),
  setResults: (results) => set({ results: results }),
  setIsResults: (isResults) => set({isResults: isResults}),
  setLoading: (loading) => set({loading: loading}),

  setSearchResults: (searchResults) => set({searchResults: searchResults}),
  setKeyword: (groupTitle) => set({ keyword: groupTitle}),
  setSearchLoading: (searchLoading) => set({searchLoading: searchLoading}),
  setSearchKeyword: (searchKeyword) => set({searchKeyword: searchKeyword}),
  setSearchAllResults: (searchAllResults) => set({searchAllResults: searchAllResults}),
  setIsSearchResults: (isSearchResults) => set({isSearchResults: isSearchResults}),
}));

export default useSearchStore;