import assert from 'node:assert/strict';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

test('FavoriteButton renders accessible pressed state', async () => {
  const { FavoriteButton } = await import('../../src/components/FavoriteButton');
  const html = renderToStaticMarkup(<FavoriteButton propertyId="imovel:123" className="w-11 h-11" />);

  assert.match(html, /aria-label="Adicionar aos favoritos"/);
  assert.match(html, /aria-pressed="false"/);
});

test('PropertyCard renders canonical property URL and protected watermark', async () => {
  const { PropertyCard } = await import('../../src/components/PropertyCard');
  const html = renderToStaticMarkup(
    <PropertyCard
      property={{
        id: '123',
        image: '',
        type: 'Casa',
        code: '123',
        title: 'Casa Centro',
        location: 'Centro, Florianopolis',
        transactionType: 'Venda',
        price: 'R$ 1.500.000',
        bedrooms: 3,
        suites: 1,
        parkingSpots: 2,
        bathrooms: 2,
        area: '250m2',
      }}
    />,
  );

  assert.match(html, /\/imovel\/casa-centro-123/);
  assert.match(html, /UNUS/);
});
