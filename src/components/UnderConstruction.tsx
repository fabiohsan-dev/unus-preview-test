'use client';

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function UnderConstruction({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[var(--neutral-50)] flex items-center justify-center px-6 pt-20 lg:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-md"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[var(--primary-500)]" />
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-[var(--secondary-500)]"
            style={{ fontWeight: 600 }}
          >
            Em breve
          </span>
          <div className="w-8 h-[1px] bg-[var(--primary-500)]" />
        </div>

        <h1
          className="text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--secondary-900)] mb-6"
          style={{ fontWeight: 300 }}
        >
          {title}
        </h1>

        <p
          className="text-[16px] leading-[1.6] text-[var(--secondary-500)] mb-12"
          style={{ fontWeight: 300 }}
        >
          Esta página está sendo preparada com o cuidado que você merece.
          Em breve, estará disponível.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[var(--secondary-900)] hover:text-[var(--primary-500)] transition-colors"
          style={{ fontWeight: 600 }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Voltar à Home
        </Link>
      </motion.div>
    </div>
  );
}
