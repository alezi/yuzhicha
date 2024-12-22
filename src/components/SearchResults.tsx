interface SearchResult {
  word: string;          // 关键词
  description: string;   // 描述
  image_url?: string;    // 可选的图片URL
}

function SearchResults({ results }: { results: SearchResult[] }) {
  if (!results.length) {
    return <div>未找到匹配的风险信息</div>;
  }

  return (
    <div className="mt-6 space-y-4">
      {results.map((result, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-lg font-semibold mb-2">
            关键词: {result.word}
          </div>
          <div className="text-gray-600 mb-2">
            {result.description}
          </div>
          {result.image_url && (
            <img 
              src={result.image_url} 
              alt={result.word}
              className="max-w-xs rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default SearchResults; 