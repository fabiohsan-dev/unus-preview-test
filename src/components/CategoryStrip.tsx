import { CollectionCard, type CollectionCardData } from '@/components/cards/CollectionCard';

const collections: CollectionCardData[] = [
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
              className="text-[var(--color-heading)] text-title-section leading-[1.1] tracking-[-0.02em] font-light"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
