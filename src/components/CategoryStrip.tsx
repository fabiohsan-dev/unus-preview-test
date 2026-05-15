import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContentImage } from './ContentImage';

const collections = [
  {
    id: 1,
    title: 'Pronto para Morar',
    subtitle: 'Entrega imediata',
    image: 'https://images.unsplash.com/photo-1729605411960-4195875873c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmZpbml0eSUyMHBvb2wlMjBvY2VhbiUyMHZpZXd8ZW58MXx8fHwxNzc1MTU1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    href: '/venda',
  },
  {
    id: 2,
    title: 'Lançamentos',
    subtitle: 'Na planta & em obras',
    image: 'https://images.unsplash.com/photo-1774099690798-c4fe300374b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGZhY2FkZSUyMGdsYXNzfGVufDF8fHx8MTc3NTE1NTc2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    href: '/venda?ordem=mais-novo',
  },
  {
    id: 3,
    title: 'Casas',
    subtitle: 'Alto Padrão',
    image: 'https://images.unsplash.com/photo-1667830501890-f18c74a8efac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwbWFuc2lvbiUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzc1MTU1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    href: '/venda?tipo=Casa',
  },
  {
    id: 4,
    title: 'Coberturas',
    subtitle: 'Viver no Topo',
    image: 'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc1MTU1NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
              <div className="w-6 h-[1px] bg-[var(--champagne)]" />
              <span
                className="text-[var(--champagne-readable)] text-[10px] font-semibold uppercase tracking-[0.3em]"
              >
                Coleções Curadas
              </span>
            </div>
            <h2
              className="text-[var(--color-heading)] text-[length:var(--title-section)] leading-[1.1] tracking-[-0.02em] font-light"
            >
              Navegue por
              <br />
              <span className="font-semibold">estilo de vida</span>
            </h2>
          </div>
          <p
            className="text-[var(--color-body)] text-[15px] leading-relaxed max-w-[380px] font-light"
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
                quality={60}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className="text-white/60 text-[11px] font-medium uppercase tracking-[0.15em] mb-1"
                    >
                      {item.subtitle}
                    </p>
                    <h3 className="text-white text-[24px] font-medium leading-tight">
                      {item.title}
                    </h3>
                <span className="text-white/50 text-[12px] font-medium mt-2 block">
                      Curadoria UNUS
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
