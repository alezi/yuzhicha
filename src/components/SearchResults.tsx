interface SearchResult {
  title: string;
  word: string;
  description?: string;
  risk_level?: string;
  suggestion?: string;
}

function SearchResults({ results }: { results: SearchResult[] }) {
  if (!results.length) {
    return <div>未找到匹配的风险信息</div>;
  }

  return (
    <div>
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h3>标题: {result.title}</h3>
          <p>关键词: {result.word}</p>
          {result.description && <p>描述: {result.description}</p>}
          {result.risk_level && <p>风险等级: {result.risk_level}</p>}
          {result.suggestion && <p>建议: {result.suggestion}</p>}
        </div>
      ))}
    </div>
  );
}

export default SearchResults; 