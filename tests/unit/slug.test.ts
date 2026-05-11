import assert from 'node:assert/strict';
import test from 'node:test';
import { buildEmpreendimentoSlug, buildPropertySlug, extractCodigoFromSlug, slugSegment } from '../../src/lib/slug';

test('slugSegment normalizes accents and unsafe characters', () => {
  assert.equal(slugSegment('Cobertura & Vista Mar'), 'cobertura-e-vista-mar');
  assert.equal(slugSegment('  São José  '), 'sao-jose');
  assert.equal(slugSegment('', 'sc'), 'sc');
});

test('buildPropertySlug returns tipo-bairro-codigo', () => {
  assert.equal(
    buildPropertySlug({ Categoria: 'Apartamento', Bairro: 'Jurerê Internacional', Codigo: '74383' }),
    'apartamento-jurere-internacional-74383',
  );
});

test('buildEmpreendimentoSlug returns bairro-cidade-codigo', () => {
  assert.equal(
    buildEmpreendimentoSlug({ Bairro: 'Centro', Cidade: 'Florianópolis', Codigo: 'EMP123' }),
    'centro-florianopolis-EMP123',
  );
});

test('extractCodigoFromSlug supports old code-only URLs', () => {
  assert.equal(extractCodigoFromSlug('apartamento-centro-123'), '123');
  assert.equal(extractCodigoFromSlug('123'), '123');
});
