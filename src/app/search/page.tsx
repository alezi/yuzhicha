import Link from 'next/link'
import { SearchBox } from '@/components/SearchBox'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                鱼智查
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link href="/#features" className="text-gray-600 hover:text-gray-900">
                  功能特点
                </Link>
                <Link href="/#guide" className="text-gray-600 hover:text-gray-900">
                  使用指南
                </Link>
                <Link href="/#download" className="text-gray-600 hover:text-gray-900">
                  插件下载
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ��要内容 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            商品风险查询
          </h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SearchBox />
          </div>

          {/* 使用说明 */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              使用说明
            </h2>
            <ul className="space-y-2 text-blue-800">
              <li>• 每行输入一个商品标题，支持批量查询</li>
              <li>• 系统会匹配历史投诉记录，识别潜在风险</li>
              <li>• 查询结果包含风险等级、投诉记录和处理建议</li>
              <li>• 建议在发布商品前进行风险检查，避免违规</li>
            </ul>
          </div>

          {/* 风险等级说明 */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                风险等级说明
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <span className="w-16 text-center px-2 py-1 bg-red-100 text-red-800 rounded">
                    高风险
                  </span>
                  <span className="text-gray-600">
                    存在严重违规，建议立即处理
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-16 text-center px-2 py-1 bg-orange-100 text-orange-800 rounded">
                    中风险
                  </span>
                  <span className="text-gray-600">
                    可能存在问题，需要注意
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-16 text-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    低风险
                  </span>
                  <span className="text-gray-600">
                    轻微问题，建议改进
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-16 text-center px-2 py-1 bg-green-100 text-green-800 rounded">
                    无风险
                  </span>
                  <span className="text-gray-600">
                    未发现明显问题
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                常见风险类型
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 版权侵权：未经授权使用他人知识产权</li>
                <li>• 盗版传播：非法传播付费内容</li>
                <li>• 虚假宣传：夸大或虚假的商品描述</li>
                <li>• 商业机密：泄露他人商业机密信息</li>
                <li>• 违规内容：含有平台禁止的内容</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 鱼智查. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 