"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('news/')
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <div className="bg-white py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-5xl font-bold mb-16 text-center">Latest Updates</h1>

        <div className="space-y-16">
          {news.map((item) => (
            <article key={item.id} className="border-b border-gray-100 pb-16 last:border-0">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-widest mb-4 block">
                {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <h2 className="text-3xl font-bold font-playfair mb-6 hover:text-orange-600 transition-colors cursor-pointer">
                {item.title}
              </h2>
              <div className="text-gray-600 leading-relaxed text-lg">
                {item.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
