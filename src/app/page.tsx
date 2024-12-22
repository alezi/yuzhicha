'use client';

import { useState } from 'react';
import Link from 'next/link'
import { SearchBox } from '@/components/SearchBox'
import { MobileMenu } from '@/components/MobileMenu'
import { checkRisk } from '@/utils/api';
import SearchResults from '@/components/SearchResults';

export default function Home() {
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
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900 hover-scale">
                鱼智查
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 button-pop">
                  功能特点
                </Link>
                <Link href="#guide" className="text-gray-600 hover:text-gray-900 button-pop">
                  使用指南
                </Link>
                <Link href="#download" className="text-gray-600 hover:text-gray-900 button-pop">
                  插件下载
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/search"
                className="hidden md:inline-flex bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 button-pop"
              >
                开始使用
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main>
        {/* Hero区域 */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 hover-scale">
              智能识别商品风险
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              为闲鱼卖家提供专业的虚拟商品风险监测服务
            </p>
            <div className="max-w-3xl mx-auto">
              <SearchBox onSearch={handleSearch} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg">
                  {error}
                </div>
              )}
              {results.length > 0 && <SearchResults results={results} />}
            </div>
          </div>
        </section>

        {/* 功能特点 */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 hover-scale">
              功能特点
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 hover-scale">
                <div className="text-yellow-500 text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">实时风险监测</h3>
                <p className="text-gray-600">
                  基于用户投诉数据，实时识别商品潜在风险
                </p>
              </div>
              <div className="text-center p-6 hover-scale">
                <div className="text-yellow-500 text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">批量查询</h3>
                <p className="text-gray-600">
                  支持多个商品同时查询，提高效率
                </p>
              </div>
              <div className="text-center p-6 hover-scale">
                <div className="text-yellow-500 text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">详细分析</h3>
                <p className="text-gray-600">
                  提供风险详情、处理建议和相似案例
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 使用指南 */}
        <section id="guide" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 hover-scale">
              使用指南
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start space-x-4 hover-scale">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">输入商品标题</h3>
                    <p className="text-gray-600">
                      在搜索框中输入要查询的商品标题，支持多行批量输入
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 hover-scale">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">查看风险分析</h3>
                    <p className="text-gray-600">
                      系统会显示风险等级、投诉记���和处理建议
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 hover-scale">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">采取措施</h3>
                    <p className="text-gray-600">
                      根据系统建议采取相应措施，规避风险
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 插件下载 */}
        <section id="download" className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 hover-scale">
              下载Chrome插件
            </h2>
            <p className="text-gray-600 mb-8">
              安装Chrome插件，享受更便捷的风险监测服务
            </p>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 button-pop"
            >
              <span className="mr-2">🔽</span>
              下载插件
            </a>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="hover-scale">
              <h3 className="text-lg font-semibold mb-4">关于我们</h3>
              <p className="text-gray-400">
                鱼智查致力于为闲鱼卖家提供专业的商品风险监测服务
              </p>
            </div>
            <div className="hover-scale">
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white button-pop">
                    功能特点
                  </Link>
                </li>
                <li>
                  <Link href="#guide" className="text-gray-400 hover:text-white button-pop">
                    使用指南
                  </Link>
                </li>
                <li>
                  <Link href="#download" className="text-gray-400 hover:text-white button-pop">
                    插件下载
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hover-scale">
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">邮箱：support@yuzhicha.com</li>
                <li className="text-gray-400">微信：yuzhicha</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 鱼智查. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
