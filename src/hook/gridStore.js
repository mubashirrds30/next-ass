import { create } from "zustand";

const useStore = create((set) => ({
    cells: {}, // Stores active cells with values
    deletedCells: {}, // Stores deleted cells

    // Update or add a new cell value
    updateCell: (key, value) =>
        set((state) => ({
            cells: { ...state.cells, [key]: value },
        })),

    // Delete a cell by moving it to the deletedCells object
    deleteCell: (key) =>
        set((state) => {
            const newCells = { ...state.cells };
            const deletedValue = newCells[key];
            delete newCells[key];
            return {
                cells: newCells,
                deletedCells: { ...state.deletedCells, [key]: deletedValue },
            };
        }),

    // Restore a deleted cell back to cells from deletedCells
    restoreCell: (key) =>
        set((state) => {
            const restoredValue = state.deletedCells[key];
            const newDeletedCells = { ...state.deletedCells };
            delete newDeletedCells[key];
            return {
                cells: { ...state.cells, [key]: restoredValue },
                deletedCells: newDeletedCells,
            };
        }),
}));

export default useStore;
