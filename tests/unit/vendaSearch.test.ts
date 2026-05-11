import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeVendaSearchParams, vendaFiltersFromParams, vendaUrl } from '../../src/lib/vendaSearch';

test('normalizeVendaSearchParams maps legacy aliases to canonical keys', () => {
  const normalized = normalizeVendaSearchParams({
    categoria: 'Casa',
    negocio: 'Locacao',
    page: '1',
    ordem: 'relevancia',
  });

  assert.equal(normalized.query, 'tipo=Casa&finalidade=Loca%C3%A7%C3%A3o');
  assert.equal(normalized.changed, true);
});

test('normalizeVendaSearchParams drops defaults and invalid numbers', () => {
  const normalized = normalizeVendaSearchParams({
    finalidade: 'Venda',
    precoMin: '-10',
    quartos: '2.7',
    view: 'grid',
  });

  assert.equal(normalized.query, 'quartos=2');
});

test('vendaUrl emits canonical venda URLs', () => {
  assert.equal(vendaUrl({ tipo: 'Apartamento', bairro: 'Centro', page: '1' }), '/venda?tipo=Apartamento&bairro=Centro');
  assert.equal(vendaUrl({}), '/venda');
});

test('vendaFiltersFromParams converts canonical params to Vista filters', () => {
  const normalized = normalizeVendaSearchParams({ tipo: 'Casa', suites: '3', page: '2' });
  assert.deepEqual(vendaFiltersFromParams(normalized.params), {
    codigo: undefined,
    cidade: undefined,
    bairro: undefined,
    tipo: 'Casa',
    finalidade: 'Venda',
    precoMin: undefined,
    precoMax: undefined,
    areaMin: undefined,
    areaMax: undefined,
    quartos: undefined,
    suites: 3,
    vagas: undefined,
    banheiros: undefined,
    ordem: 'relevancia',
    page: 2,
  });
});
