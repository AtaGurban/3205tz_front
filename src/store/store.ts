import {create} from 'zustand';
import { SubmitResponse } from '../types/userTypes';

interface AppState {
  data: SubmitResponse;
  isFetched: boolean;
  setData: (data: SubmitResponse) => void;
}

export const useStore = create<AppState>((set) => ({
  data: {data: null, message: "", result: false},
  isFetched: false,
  setData: (data) => set((state) => ({...state, data, isFetched: true})),
}));
