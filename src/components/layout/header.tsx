"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // 关闭移动端搜索框
    if (!mobileMenuOpen) {
      setMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    // 关闭移动端菜单
    if (!mobileSearchOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 导航到搜索结果页面
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // 清空搜索框
      setSearchQuery('');
      // 关闭移动端搜索框
      setMobileSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ONAHO</span>
          </Link>

          {/* 导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              首页
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              产品
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-blue-600 font-medium">
              测评
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              关于我们
            </Link>
          </nav>

          {/* 桌面端搜索框和按钮 */}
          <div className="hidden md:flex items-center space-x-2">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="搜索产品或测评..."
                className="w-40 lg:w-64 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* 移动端搜索和菜单按钮 */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileSearch}
              aria-label="搜索"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
              aria-label="打开菜单"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端搜索框 */}
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="搜索产品或测评..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
          <nav className="flex flex-col py-2">
            <Link 
              href="/" 
              className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              href="/products" 
              className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              产品
            </Link>
            <Link 
              href="/reviews" 
              className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              测评
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              关于我们
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 