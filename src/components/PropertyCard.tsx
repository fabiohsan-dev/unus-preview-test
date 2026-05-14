import Link from 'next/link';
import { ArrowRight, BedDouble, Car, MapPin, Maximize } from 'lucide-react';
import { ContentImage } from './ContentImage';
import { FavoriteButton } from './FavoriteButton';
import { Badge, SectionHeader } from '@/components/ui';
import { buildPropertySlug } from '@/lib/slug';

export interface PropertyCardData {
  id: string | number;
  image: string;
  imagePequena?: string;
  badge?: string;
  badges?: string[];
  type: string;
  code: string;
  slug?: string;
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
  const href = `/imovel/${property.slug || buildPropertySlug({
    Codigo: property.code,
    Categoria: property.type,
    Bairro: property.location.split(',')[0],
  })}`;
  const isTerrain =
    property.type.toLowerCase().includes('terreno') ||
    property.type.toLowerCase().includes('lote');

  const amenities = isTerrain
    ? [{ icon: Maximize, value: property.area || 'Consulte', label: 'área' }]
    : [
        { icon: BedDouble, value: property.bedrooms, label: 'dorm.' },
        { icon: Car,       value: property.parkingSpots, label: 'vagas' },
        { icon: Maximize,  value: property.area || '—', label: 'm²' },
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
              protectedContent
            />
          </Link>
          <FavoriteButton propertyId={property.code} className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white z-10 shadow-sm" />
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <Link href={href} className="block">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[var(--color-accent-text)] text-[var(--text-micro)] uppercase tracking-[var(--tracking-micro)]"
                  style={{ fontWeight: 'var(--weight-semi)' }}
                >
                  {property.type}
                </span>
                <span
                  className="text-[var(--color-caption)] text-[var(--text-micro)] uppercase"
                  style={{ fontWeight: 'var(--weight-medium)' }}
                >
                  CÓD: {property.code}
                </span>
              </div>
              <h3 className="text-[var(--text-lg)] text-[var(--color-heading)] font-serif mb-2 line-clamp-1 group-hover:text-[var(--color-accent-text)] transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-caption)]" />
                <span className="text-[var(--color-body)] text-[var(--text-sm)]" style={{ fontWeight: 'var(--weight-light)' }}>
                  {property.location}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-[var(--text-sm)] text-[var(--color-body)] border-t border-[var(--neutral-100)] pt-4">
                {amenities.map((amenity) => (
                  <div key={amenity.label} className="flex items-center gap-1.5">
                    <amenity.icon
                      className="w-3.5 h-3.5 text-[var(--color-accent-text)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span>
                      <strong style={{ fontWeight: 'var(--weight-medium)' }}>{amenity.value}</strong> {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          <div className="mt-4 sm:mt-0 flex items-end justify-between">
            <div>
              <span
                className="text-[var(--text-micro)] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-caption)] block mb-1"
                style={{ fontWeight: 'var(--weight-bold)' }}
              >
                {property.transactionType}
              </span>
              <p className="text-[var(--text-xl)] text-[var(--gold-dark)] font-serif font-semibold tracking-[-0.01em]">
                {property.price}
              </p>
            </div>
            <Link
              href={href}
              className="text-[var(--color-accent-text)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-button)] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
              protectedContent
            />

            {(property.badges || property.badge) && (
              <div className="absolute top-4 left-4 flex gap-2">
                {(property.badges || [property.badge!]).map((badge, index) => (
                  <Badge key={`${badge}-${index}`} variant="blue">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Link>

        <FavoriteButton
          propertyId={property.code}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white hover:scale-110 z-10"
        />
      </div>

      <div className="flex flex-col flex-1">
        <Link href={href} className="block p-5 pb-0 flex-1">
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[var(--color-accent-text)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-eyebrow)]"
              style={{ fontWeight: 'var(--weight-semi)' }}
            >
              {property.type}
            </span>
            <span
              className="text-[var(--color-caption)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-link)]"
              style={{ fontWeight: 'var(--weight-medium)' }}
            >
              CÓD: {property.code}
            </span>
          </div>

          <h3
            className="text-[var(--color-heading)] text-[var(--text-xl)] leading-[1.25] mb-4 line-clamp-2 min-h-[60px]"
            style={{ fontWeight: 'var(--weight-normal)', fontFamily: 'var(--font-serif)' }}
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-5">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-caption)]" strokeWidth={1.5} />
            <span
              className="text-[var(--color-body)] text-[var(--text-sm)] line-clamp-1"
              style={{ fontWeight: 'var(--weight-light)' }}
            >
              {property.location}
            </span>
          </div>

          <div className="mb-5">
            <span
              className="text-[var(--color-caption)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-eyebrow)] block mb-1"
              style={{ fontWeight: 'var(--weight-semi)' }}
            >
              {property.transactionType}
            </span>
            <p
              className="text-[var(--gold-dark)] text-[var(--text-2xl)] tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--weight-semi)' }}
            >
              {property.price}
            </p>
          </div>
        </Link>

        <div className={`border-t border-[var(--color-border)] grid ${isTerrain ? 'grid-cols-1' : 'grid-cols-3'}`}>
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
                aria-hidden="true"
              />
              <div className="text-center">
                <span
                  className="text-[var(--color-heading)] text-[var(--text-body)] block"
                  style={{ fontWeight: 'var(--weight-medium)' }}
                >
                  {amenity.value}
                </span>
                <span
                  className="text-[var(--color-caption)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-micro)]"
                  style={{ fontWeight: 'var(--weight-medium)' }}
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

interface PropertyCardGridProps {
  properties?: PropertyCardData[];
}

export function PropertyCardGrid({ properties: initialProperties }: PropertyCardGridProps) {
  const displayProperties = initialProperties ?? [];

  if (displayProperties.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[var(--color-background)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <SectionHeader
            eyebrow="Imóveis em Destaque"
            title="Nosso portfólio"
            highlight="portfólio"
            surface="light"
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/venda"
            className="inline-flex items-center gap-3 border border-[var(--secondary-900)] text-[var(--color-heading)] px-10 py-4 text-[var(--text-xs)] uppercase tracking-[var(--tracking-button)] hover:bg-[var(--secondary-900)] hover:text-white transition-all duration-300"
            style={{ fontWeight: 'var(--weight-medium)' }}
          >
            Ver todos os imóveis
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
