"use client";
import { Search } from "lucide-react";

export default function FilterBar({
  query,
  setQuery,
  jenisFilter,
  setJenisFilter,
  jenisOptions,
}: {
  query: string;
  setQuery: (v: string) => void;
  jenisFilter: string;
  setJenisFilter: (v: string) => void;
  jenisOptions: string[];
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex items-center gap-2 w-full md:w-1/2">
        {/* Search Input */}
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full shadow-sm">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Nama atau NIM..."
            className="outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Filter Select */}
        <select
          value={jenisFilter}
          onChange={(e) => setJenisFilter(e.target.value)}
          className="ml-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm text-gray-700 text-center"
        >
          {jenisOptions.map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setQuery("");
          setJenisFilter("Semua");
        }}
        className="text-sm px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 text-gray-700"
      >
        Reset
      </button>
    </div>
  );
}
