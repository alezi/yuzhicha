'use client';

import { useState } from 'react';
import { SearchBox } from '@/components/SearchBox';
import { checkRisk } from '@/utils/api';
import SearchResults from '@/components/SearchResults';

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  async function handleSearch(searchText: string) {
    setError('');
    try {
      const result = await checkRisk(searchText);
      if (result.matches && result.matches.length > 0) {
        setResults(result.matches);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('搜索失败:', error);
      setError(error instanceof Error ? error.message : '查询失败，请稍后重试');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">商品风险查询</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <SearchBox onSearch={handleSearch} />
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
} 