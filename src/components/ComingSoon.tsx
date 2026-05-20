'use client';

import { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { UnusLogo } from '@/components/ui';
import { WHATSAPP_BASE } from '@/lib/constants';

interface ComingSoonProps {
  title: string;
  subtitle?: string;
}

export function ComingSoon({ title, subtitle }: ComingSoonProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f5f1ed] flex flex-col items-center overflow-hidden">
      {/* Background sutil baseado no seu CSS */}
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/404-bg.webp")' }}
      />

      {/* Header / Logo */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-12 pb-6"
      >
        <Link href="/" className="hover:opacity-60 transition-opacity">
          <UnusLogo className="h-7 w-auto text-[var(--secondary-900)]" />
        </Link>
      </motion.header>

      {/* Divider */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="relative z-10 w-full max-w-[740px] h-[1px] bg-[#ddd6ce] origin-center"
      />

      {/* Main Content */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center max-w-[720px]"
      >
        <motion.span 
          variants={itemVariants}
          className="text-[11px] font-medium tracking-[0.3em] text-[#7a8a7a] uppercase mb-6"
        >
          EM BREVE
        </motion.span>

        <motion.h1 
          variants={itemVariants}
          className="text-[32px] sm:text-[52px] leading-[1.2] text-[#2c3a3a] mb-8"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
        >
          {title || "O futuro do seu patrimônio está sendo desenhado."}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-[14px] sm:text-[15px] text-[#8a9494] font-light leading-[1.8] tracking-wide mb-12 max-w-[520px]"
        >
          {subtitle || "Estamos finalizando nossa nova curadoria digital. Deixe seu contato para receber acesso prioritário aos lançamentos."}
        </motion.p>

        {/* Email Form */}
        <motion.form 
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="w-full max-w-[520px]"
        >
          <div className="flex items-stretch border-b border-[#b8b0a8] focus-within:border-[#2c3a3a] transition-colors duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="flex-grow bg-transparent border-none outline-none py-4 text-[14px] text-[#2c3a3a] placeholder:text-[#8a9494] font-light"
            />
            <button 
              type="submit"
              className="flex items-center gap-2 pl-6 py-4 text-[11px] font-semibold tracking-[0.18em] text-[#2c3a3a] hover:translate-x-1 transition-transform"
            >
              NOTIFICAR-ME
              <Send className="w-3 h-3" />
            </button>
          </div>
          
          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[12px] text-[#4a7a5a] tracking-wider">
              Recebemos seu contato. Em breve novidades exclusivas.
            </motion.p>
          )}
        </motion.form>
      </motion.main>

      {/* Footer Social */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 w-full p-10 mt-auto"
      >
        <nav className="flex items-center justify-center gap-8 sm:gap-12">
          <Link href="https://www.instagram.com/unusnucleoimobiliario/" className="text-[10px] font-medium tracking-[0.2em] text-[#6b7a7a] uppercase hover:text-[#2c3a3a] transition-colors relative group">
            INSTAGRAM
            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#2c3a3a] transition-all group-hover:w-full group-hover:left-0" />
          </Link>
          <Link href="https://www.linkedin.com/company/unus-n%C3%BAcleo-imobili%C3%A1rio/?viewAsMember=true" className="text-[10px] font-medium tracking-[0.2em] text-[#6b7a7a] uppercase hover:text-[#2c3a3a] transition-colors relative group">
            LINKEDIN
            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#2c3a3a] transition-all group-hover:w-full group-hover:left-0" />
          </Link>
          <Link href={WHATSAPP_BASE} className="text-[10px] font-medium tracking-[0.2em] text-[#6b7a7a] uppercase hover:text-[#2c3a3a] transition-colors relative group">
            WHATSAPP
            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#2c3a3a] transition-all group-hover:w-full group-hover:left-0" />
          </Link>
        </nav>
      </motion.footer>
    </div>
  );
}
