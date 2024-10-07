import { create } from 'zustand';

const useStore = create((set) => ({
    cells: {},
    updateCell: (key, value) =>
        set((state) => ({
            cells: { ...state.cells, [key]: value },
        })),
    deletecell: (key, value) =>
        set((state) => ({
            // cells: { delete cells[key,]...state.cells },
        }))
}));

export default useStore;