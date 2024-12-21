'use client'

import { useState } from 'react'
import Link from 'next/link'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* 汉堡按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <span className="sr-only">打开菜单</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* 菜单内容 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-2 px-4 transition-all duration-200 ease-in-out transform origin-top">
          <div className="space-y-2">
            <Link
              href="/#features"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              功能特点
            </Link>
            <Link
              href="/#guide"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              使用指南
            </Link>
            <Link
              href="/#download"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              插件下载
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 bg-yellow-400 text-white hover:bg-yellow-500 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              开始使用
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 