'use client';

import dynamic from 'next/dynamic';

const SmartSearch = dynamic(() => import('@/components/SmartSearch'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center py-16">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--neutral-300)] border-t-[var(--primary-500)]" />
    </div>
  ),
});

export default function SmartSearchWrapper() {
  return <SmartSearch />;
}
