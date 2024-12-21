'use client'

import { useState } from 'react'
import { checkRisk } from '@/utils/api'
import type { SearchResult } from '@/types/risk'
import { RiskCard } from './RiskCard'

export function SearchBox() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SearchResult | null>(null)

  const handleSearch = async () => {
    if (!input.trim()) {
      return
    }
    
    setLoading(true)
    try {
      // 将输入按行分割处理
      const titles = input.split('\n').filter(line => line.trim())
      const data = await checkRisk(titles)
      setResult(data)
    } catch (error) {
      console.error('搜索失败:', error)
      setResult({
        success: false,
        data: [],
        error: '搜索失败，请稍后重试'
      })
    } finally {
      setLoading(false)
    }
  }

  // 计算统计信息
  const getStats = () => {
    if (!result?.success || !result.data.length) return null

    const total = result.data.length
    const highRisk = result.data.filter(item => item.level === 3).length
    const mediumRisk = result.data.filter(item => item.level === 2).length
    const lowRisk = result.data.filter(item => item.level === 1).length
    const safe = result.data.filter(item => item.level === 0).length

    return { total, highRisk, mediumRisk, lowRisk, safe }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      {/* 卖家提示信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-blue-800 font-medium mb-2">风险监测说明</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 系统基于用户投诉数据，识别虚拟商品潜在风险</li>
          <li>• 主要针对电子书籍、教程视频、配方资料等虚拟产品</li>
          <li>• 提供历史投诉记录和相似案例参考</li>
          <li>• 建议在发布商品前进行风险检查，避免违规</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="输入商品标题（支持批量查询，一行一个）"
            rows={5}
          />
          <div className="text-sm text-gray-500 space-y-1">
            <p>提示：</p>
            <ul className="list-disc list-inside">
              <li>每行输入一个商品标题，支持同时查询多个商品</li>
              <li>系统会匹配历史投诉记录中的关键信息</li>
              <li>查询结果包含投诉次数、处理建议等信息</li>
            </ul>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !input.trim()}
          className={`w-full px-4 py-2 rounded-lg text-white font-medium transition-colors
            ${loading || !input.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500'
            }`}
        >
          {loading ? '查询中...' : '开始查询'}
        </button>
      </div>

      {result && (
        <div className="mt-6">
          {result.success ? (
            <div className="space-y-4">
              {result.data.length > 0 ? (
                <>
                  {/* 统计信息 */}
                  {(() => {
                    const stats = getStats()
                    if (!stats) return null
                    return (
                      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">查询结果统计</h4>
                        <div className="grid grid-cols-5 gap-4 text-center">
                          <div>
                            <div className="text-lg font-semibold text-gray-900">
                              {stats.total}
                            </div>
                            <div className="text-sm text-gray-500">总计</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-red-600">
                              {stats.highRisk}
                            </div>
                            <div className="text-sm text-gray-500">高风险</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-orange-600">
                              {stats.mediumRisk}
                            </div>
                            <div className="text-sm text-gray-500">中风险</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-yellow-600">
                              {stats.lowRisk}
                            </div>
                            <div className="text-sm text-gray-500">低风险</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-green-600">
                              {stats.safe}
                            </div>
                            <div className="text-sm text-gray-500">无风险</div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  {/* 风险卡片列表 */}
                  {result.data.map((item) => (
                    <RiskCard key={item.id} data={item} />
                  ))}
                </>
              ) : (
                <p className="text-center text-gray-500">
                  未找到相关商品信息
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-red-500">
              {result.error || '查询失败，请稍后重试'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
