import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { UI_CONFIG, ANIMATION_CONFIG } from '../constants';

interface LoadingSkeletonProps {
  message?: string;
}

export function LoadingSkeleton({ message = 'جاري تحميل الإشعارات...' }: LoadingSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className={`inline-block animate-spin rounded-full ${UI_CONFIG.LOADING_SIZE} border-b-2 border-blue-500`}></div>
      <p className="text-gray-400 mt-4">{message}</p>
    </motion.div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ 
  title = 'لا توجد إشعارات', 
  message = 'ستظهر إشعاراتك هنا عندما تكون متاحة' 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400 text-lg">{title}</p>
      <p className="text-gray-500">{message}</p>
    </motion.div>
  );
}

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          إعادة المحاولة
        </button>
      </div>
    </motion.div>
  );
}
