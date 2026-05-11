import assert from 'node:assert/strict';
import test from 'node:test';
import { favoriteToken, normalizeFavoriteToken } from '../../src/lib/favoriteIds';

test('normalizeFavoriteToken preserves v2 ids', () => {
  assert.deepEqual(normalizeFavoriteToken('imovel:123'), {
    kind: 'imovel',
    code: '123',
    token: 'imovel:123',
  });

  assert.deepEqual(normalizeFavoriteToken('empreendimento:EMP1'), {
    kind: 'empreendimento',
    code: 'EMP1',
    token: 'empreendimento:EMP1',
  });
});

test('normalizeFavoriteToken migrates legacy ids', () => {
  assert.equal(normalizeFavoriteToken('123')?.token, 'imovel:123');
  assert.equal(normalizeFavoriteToken('imovel-123')?.token, 'imovel:123');
  assert.equal(normalizeFavoriteToken('emp-EMP1')?.token, 'empreendimento:EMP1');
});

test('favoriteToken returns safe no-id sentinel for empty codes', () => {
  assert.equal(favoriteToken('imovel', ''), '__no-id__');
  assert.equal(favoriteToken('empreendimento', 'EMP2'), 'empreendimento:EMP2');
});
