import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-6 first:mt-0" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
    ),
    h4: (props) => (
      <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2" {...props} />
    ),
    p: (props) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
    ),
    a: (props) => {
      const href = props.href || '';
      
      if (href.startsWith('http')) {
        return (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
          >
            {props.children}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      
      if (href.startsWith('/')) {
        return (
          <Link href={href} className="text-primary-600 dark:text-primary-400 hover:underline">
            {props.children}
          </Link>
        );
      }
      
      return (
        <a {...props} className="text-primary-600 dark:text-primary-400 hover:underline" />
      );
    },
    img: (props) => {
      const src = props.src || '';
      const alt = props.alt || '';
      
      if (!src) {
        return (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 my-8">
            画像を読み込めません
          </div>
        );
      }

      return (
        <div className="my-8">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={400}
            className="rounded-xl shadow-lg mx-auto"
          />
          {alt && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
              {alt}
            </p>
          )}
        </div>
      );
    },
    blockquote: (props) => (
      <blockquote className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 p-4 my-6 rounded-r-lg" {...props}>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
          <div className="text-gray-700 dark:text-gray-300 italic">{props.children}</div>
        </div>
      </blockquote>
    ),
    ul: (props) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
    ),
    li: (props) => (
      <li className="leading-relaxed" {...props} />
    ),
    code: (props) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-primary-600 dark:text-primary-400" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto my-6 text-sm" {...props} />
    ),
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props} />
      </div>
    ),
    th: (props) => (
      <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100" {...props} />
    ),
    td: (props) => (
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300" {...props} />
    ),
    hr: (props) => (
      <hr className="border-gray-300 dark:border-gray-600 my-8" {...props} />
    ),
    
    ...components,
  };
}