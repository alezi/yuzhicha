import type { RiskData } from '@/types/risk'

interface RiskCardProps {
  data: RiskData
}

const getRiskLevelInfo = (level: number) => {
  switch (level) {
    case 3:
      return {
        text: '高风险',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-200'
      }
    case 2:
      return {
        text: '中风险',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-200'
      }
    case 1:
      return {
        text: '低风险',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-200'
      }
    default:
      return {
        text: '无风险',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200'
      }
  }
}

export function RiskCard({ data }: RiskCardProps) {
  const { text, bgColor, textColor, borderColor } = getRiskLevelInfo(data.level)

  return (
    <div className={`p-4 border rounded-lg bg-white shadow-sm ${borderColor}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{data.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            被举报{data.report_count}次
          </span>
          <span className={`px-2 py-1 rounded text-sm ${bgColor} ${textColor}`}>
            {text}
          </span>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between">
        <p className="text-gray-600">{data.description}</p>
        <span className="text-sm text-gray-500">
          最近举报：{new Date(data.last_report_date).toLocaleDateString()}
        </span>
      </div>
      
      {data.keywords.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {data.keywords.map((keyword) => (
            <span
              key={keyword}
              className={`px-2 py-1 rounded-full text-sm ${bgColor} ${textColor}`}
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      {/* 风险类型 */}
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-gray-900">风险类型</h4>
        <p className="text-gray-600">{data.risk_type}</p>
      </div>

      {/* 举报详情 */}
      {data.report_details && data.report_details.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900">举报详情</h4>
          <ul className="list-disc list-inside space-y-1">
            {data.report_details.map((detail, index) => (
              <li key={index} className="text-gray-600 text-sm">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 处理建议 */}
      {data.handling_advice && data.handling_advice.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900">处理建议</h4>
          <ul className="list-disc list-inside space-y-1">
            {data.handling_advice.map((advice, index) => (
              <li key={index} className="text-gray-600 text-sm">
                {advice}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 相似案例 */}
      {data.similar_cases && data.similar_cases.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900">相似案例</h4>
          <div className="space-y-2">
            {data.similar_cases.map((case_, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                <span className="text-gray-700">{case_.title}</span>
                <span className="text-gray-500 mx-2">→</span>
                <span className="text-red-600">{case_.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
