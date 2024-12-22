'use client'

import { useState } from 'react'

interface SearchBoxProps {
  onSearch: (text: string) => Promise<void>;
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      try {
        await onSearch(searchText);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="输入商品标题，每行一个..."
        className="w-full p-4 border rounded-lg shadow-sm"
        rows={4}
      />
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
      >
        查询风险
      </button>
    </form>
  );
}
