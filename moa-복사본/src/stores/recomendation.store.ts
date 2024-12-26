import { create } from "zustand";
import { Recommendation, RecommendationsId } from "../types";

interface RecomendationStore {
  isLike: boolean;
  setIsLike: () => void;

}

const useRecomendationStore = create<RecomendationStore>((set) => ({

  isLike: false,
  setIsLike: () => set((state) => ({ isLike: !state.isLike })),
}));

export default useRecomendationStore;