import Link from 'next/link';
import { ArrowRight, BedDouble, Car, MapPin, Maximize, ShowerHead } from 'lucide-react';
import { ContentImage } from './ContentImage';
import { FavoriteButton } from './FavoriteButton';

export interface PropertyCardData {
  id: string | number;
  image: string;
  imagePequena?: string;
  badge?: string;
  badges?: string[];
  type: string;
  code: string;
  title: string;
  location: string;
  transactionType: string;
  price: string;
  bedrooms: number;
  suites: number;
  parkingSpots: number;
  bathrooms: number;
  area?: string;
}

interface PropertyCardProps {
  property: PropertyCardData;
  variant?: 'grid' | 'list';
}

export function PropertyCard({ property, variant = 'grid' }: PropertyCardProps) {
  const href = `/imovel/${property.code}`;
  const isTerrain =
    property.type.toLowerCase().includes('terreno') ||
    property.type.toLowerCase().includes('lote');

  const amenities = isTerrain
    ? [{ icon: Maximize, value: property.area || 'Consulte', label: 'área total' }]
    : [
        { icon: BedDouble, value: property.bedrooms, label: 'quartos' },
        { icon: BedDouble, value: property.suites, label: 'suítes' },
        { icon: Car, value: property.parkingSpots, label: 'vagas' },
        { icon: ShowerHead, value: property.bathrooms, label: 'banheiros' },
      ];

  if (variant === 'list') {
    return (
      <article className="bg-white overflow-hidden group flex flex-col sm:flex-row h-auto sm:h-64 transition-all hover:shadow-lg border border-[var(--neutral-200)] rounded-xl">
        <div className="relative w-full sm:w-80 h-48 sm:h-full overflow-hidden shrink-0">
          <Link href={href} className="block h-full">
            <ContentImage
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 320px"
            />
          </Link>
          <FavoriteButton propertyId={property.code} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white z-10 shadow-sm" />
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <Link href={href} className="block">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[var(--color-accent-text)] text-[10px] uppercase tracking-widest"
                  style={{ fontWeight: 600 }}
                >
                  {property.type}
                </span>
                <span
                  className="text-[var(--color-caption)] text-[10px] uppercase font-medium"
                >
                  CÓD: {property.code}
                </span>
              </div>
              <h3 className="text-[18px] text-[var(--color-heading)] font-serif mb-2 line-clamp-1 group-hover:text-[var(--color-accent-text)] transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 mb-4">
                <MapPin className="w-3 h-3 text-[var(--color-caption)]" />
                <span className="text-[var(--color-body)] text-[12px] font-light">
                  {property.location}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-[12px] text-[var(--color-body)] border-t border-[var(--neutral-100)] pt-4">
                {amenities.map((amenity) => (
                  <div key={amenity.label} className="flex items-center gap-1.5">
                    <amenity.icon
                      className="w-3.5 h-3.5 text-[var(--color-accent-text)]"
                      strokeWidth={1.5}
                    />
                    <span>
                      <strong className="font-medium">{amenity.value}</strong> {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          <div className="mt-4 sm:mt-0 flex items-end justify-between">
            <div>
              <span
                className="text-[9px] uppercase tracking-widest text-[var(--color-caption)] font-bold block mb-0.5"
              >
                {property.transactionType}
              </span>
              <p className="text-[24px] text-[var(--gold-dark)] font-serif font-semibold tracking-[-0.01em]">
                {property.price}
              </p>
            </div>
            <Link
              href={href}
              className="text-[var(--color-accent-text)] text-[11px] uppercase tracking-widest font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white overflow-hidden group flex flex-col h-full" style={{ boxShadow: 'var(--shadow-soft)' }}>
      <div className="relative">
        <Link href={href} className="block">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ContentImage
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {(property.badges || property.badge) && (
              <div className="absolute top-4 left-4 flex gap-2">
                {(property.badges || [property.badge!]).map((badge, index) => (
                  <div
                    key={`${badge}-${index}`}
                    className="px-3.5 py-1.5 bg-[var(--color-brand-500)] text-white text-[10px] uppercase tracking-[0.15em]"
                    style={{ fontWeight: 700 }}
                  >
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Link>

        <FavoriteButton
          propertyId={property.code}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white hover:scale-110 z-10"
        />
      </div>

      <div className="flex flex-col flex-1">
        <Link href={href} className="block p-5 pb-0 flex-1">
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[var(--color-accent-text)] text-[11px] uppercase tracking-[0.15em]"
              style={{ fontWeight: 600 }}
            >
              {property.type}
            </span>
            <span
              className="text-[var(--color-caption)] text-[11px] uppercase tracking-[0.08em]"
              style={{ fontWeight: 500 }}
            >
              CÓD: {property.code}
            </span>
          </div>

          <h3
            className="text-[var(--color-heading)] text-[20px] leading-[1.2] mb-4 line-clamp-2 min-h-[48px]"
            style={{ fontWeight: 400, fontFamily: 'var(--font-serif)' }}
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-5">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-caption)]" strokeWidth={1.5} />
            <span
              className="text-[var(--color-body)] text-[13px] line-clamp-1"
              style={{ fontWeight: 300 }}
            >
              {property.location}
            </span>
          </div>

          <div className="mb-5">
            <span
              className="text-[var(--color-caption)] text-[10px] uppercase tracking-[0.15em] block mb-1"
              style={{ fontWeight: 600 }}
            >
              {property.transactionType}
            </span>
            <p
              className="text-[var(--gold-dark)] text-[28px] tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
            >
              {property.price}
            </p>
          </div>
        </Link>

        <div className={`border-t border-[var(--color-border)] grid ${isTerrain ? 'grid-cols-1' : 'grid-cols-4'}`}>
          {amenities.map((amenity, index) => (
            <div
              key={amenity.label}
              className={`flex flex-col items-center justify-center py-4 gap-1 ${
                !isTerrain && index < amenities.length - 1 ? 'border-r border-[var(--color-border)]' : ''
              }`}
            >
              <amenity.icon
                className="w-[18px] h-[18px] text-[var(--color-accent-text)]"
                strokeWidth={1.2}
              />
              <div className="text-center">
                <span
                  className="text-[var(--color-heading)] text-[14px] block"
                  style={{ fontWeight: 500 }}
                >
                  {amenity.value}
                </span>
                <span
                  className="text-[var(--color-caption)] text-[10px] uppercase"
                  style={{ fontWeight: 500 }}
                >
                  {amenity.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

const demoProperties: PropertyCardData[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1766866574522-920761fc93b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaGZyb250JTIwdHJvcGljYWwlMjB2aWxsYSUyMGFlcmlhbHxlbnwxfHx8fDE3NzU1MDI0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Lançamento',
    badges: ['Lançamento', 'Exclusivo UNUS'],
    type: 'Cobertura',
    code: '102',
    title: 'Penthouse Beira-Mar Norte',
    location: 'Beira-Mar Norte, Florianópolis',
    transactionType: 'Venda',
    price: 'R$ 8.900.000,00',
    bedrooms: 4,
    suites: 4,
    parkingSpots: 3,
    bathrooms: 5,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1667830501890-f18c74a8efac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwbWFuc2lvbiUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzc1MTU1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Exclusivo',
    type: 'Casa',
    code: '087',
    title: 'Residência Jurerê Internacional',
    location: 'Jurerê Internacional, Florianópolis',
    transactionType: 'Venda',
    price: 'R$ 18.500.000,00',
    bedrooms: 5,
    suites: 5,
    parkingSpots: 4,
    bathrooms: 6,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydCUyMGhvbWUlMjBsdXh1cnklMjBraXRjaGVufGVufDF8fHx8MTc3NTE1NTc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'Apartamento',
    code: '145',
    title: 'Smart Home Pedra Branca',
    location: 'Pedra Branca, Palhoça',
    transactionType: 'Venda',
    price: 'R$ 12.800.000,00',
    bedrooms: 4,
    suites: 4,
    parkingSpots: 3,
    bathrooms: 5,
  },
];

interface PropertyCardGridProps {
  properties?: PropertyCardData[];
}

export function PropertyCardGrid({ properties: initialProperties }: PropertyCardGridProps) {
  const displayProperties =
    initialProperties && initialProperties.length > 0 ? initialProperties : demoProperties;

  return (
    <section className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--color-background)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[var(--gold)]" />
            <span
              className="text-[var(--gold-dark)] text-[10px] uppercase tracking-[0.3em]"
              style={{ fontWeight: 600 }}
            >
              Imóveis em Destaque
            </span>
          </div>
          <h2
            className="text-[var(--color-heading)] text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.02em]"
            style={{ fontWeight: 300 }}
          >
            Nosso <span style={{ fontWeight: 600 }}>portfólio</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/venda"
            className="inline-flex items-center gap-3 border border-[var(--secondary-900)] text-[var(--color-heading)] px-10 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[var(--secondary-900)] hover:text-white transition-all duration-300"
            style={{ fontWeight: 500 }}
          >
            Ver todos os imóveis
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
