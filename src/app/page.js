"use client";
import { useState } from "react";
import useStore from "@/hook/gridStore";

export default function Home() {
  const { cells, deletedCells = {}, updateCell, deleteCell, restoreCell } = useStore(); // Ensuring deletedCells is always an object
  const [currentPage, setCurrentPage] = useState(1);
  const gridsPerPage = 20;


  const indexOfLastGrid = currentPage * gridsPerPage;
  const indexOfFirstGrid = indexOfLastGrid - gridsPerPage;
  const currentGrids = Array.from({ length: 1000 }, (_, index) => index + 1).slice(
    indexOfFirstGrid,
    indexOfLastGrid
  );

  const totalPages = Math.ceil(1000 / gridsPerPage);

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-2xl block m-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
          Next Grid <b>with Table</b>.
        </div>

        <div class=" grid items-center max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Total Grid Display {currentGrids.length}</h5>
            </a>

          </div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Total Grid with input {Object.keys(cells).length}</h5>
            </a>
          </div>
          <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Grid with number input {currentGrids.length / 2}</h5>
            </a>
          </div>

        </div>


        <div className="flex justify-center m-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>


        <div className="grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-4">
          {currentGrids.map((_, idx) => {
            const gridIdx = idx + indexOfFirstGrid;
            const isDeleted = deletedCells[gridIdx] !== undefined;

            return (
              <div className="h-12 flex items-center justify-center relative" key={gridIdx}>
                {!isDeleted ? (
                  <>
                    <input
                      className="ring-2 ring-gray-500 border-none placeholder-gray-300 w-20 h-10 text-center rounded-2xl"
                      value={cells[gridIdx] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        let newIn = idx + 1;
                        if (newIn % 2 == 0) {
                          if (!isNaN(value) || value === "") {
                            updateCell(gridIdx, value);
                          }
                        }
                        else if (!newIn % 2 == 0) {
                          updateCell(gridIdx, value);
                        }
                      }}
                      type="text"
                      placeholder={`${gridIdx + 1} cell`}
                    />


                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => deleteCell(gridIdx)}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <>

                    <div className="w-20 h-10 text-center flex items-center justify-center bg-gray-200 text-red-500">
                      Deleted
                    </div>

                    <button
                      className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => restoreCell(gridIdx)}
                    >
                      Restore
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
