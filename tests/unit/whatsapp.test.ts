import assert from 'node:assert/strict';
import test from 'node:test';
import { whatsappAnuncieLead, whatsappContactLead, whatsappEmpreendimentoLead, whatsappPropertyLead } from '../../src/lib/whatsapp';

function decodedText(url: string) {
  const parsed = new URL(url);
  return parsed.searchParams.get('text') ?? '';
}

test('whatsappPropertyLead includes structured lead data and absolute URL', () => {
  const text = decodedText(whatsappPropertyLead({
    title: 'Casa Vista Mar',
    bairro: 'Centro',
    codigo: '123',
    pathOrUrl: '/imovel/casa-centro-123',
    name: 'Ana',
    email: 'ana@example.com',
    phone: '48999999999',
  }));

  assert.match(text, /Casa Vista Mar/);
  assert.match(text, /Codigo: 123/);
  assert.match(text, /Link: http/);
  assert.match(text, /Ana/);
});

test('whatsappEmpreendimentoLead includes code and location', () => {
  const text = decodedText(whatsappEmpreendimentoLead({
    name: 'Arkki',
    bairro: 'Centro',
    cidade: 'Florianopolis',
    codigo: 'EMP1',
  }));

  assert.match(text, /Arkki/);
  assert.match(text, /Centro, Florianopolis/);
  assert.match(text, /Codigo: EMP1/);
});

test('contact and anuncie helpers keep origin data', () => {
  assert.match(decodedText(whatsappContactLead({ name: 'Joao', phone: '48', origin: 'Contato' })), /Origem: Contato/);
  assert.match(decodedText(whatsappAnuncieLead({ name: 'Joao', phone: '48', tipo: 'Casa', quartos: '3' })), /Origem: formulario Anuncie/);
});
