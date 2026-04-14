import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContentImage } from './ContentImage';

const collections = [
  {
    id: 1,
    title: 'Frente Mar',
    subtitle: 'Florianópolis & Litoral',
    image: 'https://images.unsplash.com/photo-1729605411960-4195875873c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmZpbml0eSUyMHBvb2wlMjBvY2VhbiUyMHZpZXd8ZW58MXx8fHwxNzc1MTU1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: 23,
    href: '/venda?tipo=Cobertura',
  },
  {
    id: 2,
    title: 'Campinas',
    subtitle: 'São José, SC',
    image: 'https://images.unsplash.com/photo-1774099690798-c4fe300374b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGZhY2FkZSUyMGdsYXNzfGVufDF8fHx8MTc3NTE1NTc2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: 41,
    href: '/venda?bairro=Campinas',
  },
  {
    id: 3,
    title: 'Investimento',
    subtitle: 'Rentabilidade + Valorização',
    image: 'https://images.unsplash.com/photo-1719682251752-eb9551977e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjByb29mdG9wJTIwY2l0eSUyMHZpZXd8ZW58MXx8fHwxNzc1MTU1NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: 18,
    href: '/#investimentos',
  },
  {
    id: 4,
    title: 'Coberturas',
    subtitle: 'Viver no Topo',
    image: 'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc1MTU1NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: 15,
    href: '/venda?tipo=Cobertura',
  },
];

export function CategoryStrip() {
  return (
    <section className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[var(--primary-500)]" />
              <span
                className="text-[var(--color-accent-text)] text-[10px] uppercase tracking-[0.3em]"
                style={{ fontWeight: 600 }}
              >
                Coleções Curadas
              </span>
            </div>
            <h2
              className="text-[var(--color-heading)] text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.02em]"
              style={{ fontWeight: 300 }}
            >
              Navegue por
              <br />
              <span style={{ fontWeight: 600 }}>estilo de vida</span>
            </h2>
          </div>
          <p
            className="text-[var(--color-body)] text-[15px] leading-relaxed max-w-[380px]"
            style={{ fontWeight: 300 }}
          >
            Cada seleção traduz um modo de viver. Encontre a coleção que reflete suas
            ambições e descubra propriedades alinhadas ao seu momento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative overflow-hidden cursor-pointer aspect-[3/4] bg-[var(--secondary-900)]"
            >
              <ContentImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className="text-white/60 text-[11px] uppercase tracking-[0.15em] mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {item.subtitle}
                    </p>
                    <h3 className="text-white text-[24px] leading-tight" style={{ fontWeight: 500 }}>
                      {item.title}
                    </h3>
                    <span className="text-white/50 text-[12px] mt-2 block" style={{ fontWeight: 500 }}>
                      {item.count} propriedades
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-white/5 backdrop-blur-sm">
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
