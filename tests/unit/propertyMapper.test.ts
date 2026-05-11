import assert from 'node:assert/strict';
import test from 'node:test';
import { mapToGridProperty } from '../../src/lib/mappers/propertyMapper';

test('mapToGridProperty includes canonical slug and prefers total area', () => {
  const mapped = mapToGridProperty({
    Codigo: '123',
    Categoria: 'Casa',
    Bairro: 'Centro',
    Cidade: 'Florianopolis',
    ValorVenda: '1500000',
    AreaTotal: '250',
    AreaPrivativa: '180',
  }, 0);

  assert.equal(mapped.slug, 'casa-centro-123');
  assert.match(mapped.area, /^250m/);
  assert.equal(mapped.location, 'Centro, Florianopolis');
});
