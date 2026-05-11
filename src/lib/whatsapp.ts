import { SITE_URL, whatsappUrl } from '@/lib/constants';

function absoluteUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function whatsappPropertyLead(input: {
  title: string;
  bairro?: string;
  codigo?: string;
  pathOrUrl?: string;
  name?: string;
  email?: string;
  phone?: string;
}) {
  const lines = [
    `Ola! Tenho interesse no imovel ${input.title}${input.bairro ? ` em ${input.bairro}` : ''}.`,
    input.codigo ? `Codigo: ${input.codigo}` : '',
    `Link: ${absoluteUrl(input.pathOrUrl)}`,
    input.name ? `Nome: ${input.name}` : '',
    input.phone ? `Telefone: ${input.phone}` : '',
    input.email ? `E-mail: ${input.email}` : '',
    'Gostaria de mais informacoes e disponibilidade para visita.',
  ];

  return whatsappUrl(lines.filter(Boolean).join('\n'));
}

export function whatsappEmpreendimentoLead(input: {
  name: string;
  bairro?: string;
  cidade?: string;
  codigo?: string;
  pathOrUrl?: string;
}) {
  const location = [input.bairro, input.cidade].filter(Boolean).join(', ');
  const lines = [
    `Ola! Tenho interesse no empreendimento ${input.name}${location ? ` em ${location}` : ''}.`,
    input.codigo ? `Codigo: ${input.codigo}` : '',
    `Link: ${absoluteUrl(input.pathOrUrl)}`,
    'Gostaria de mais informacoes.',
  ];

  return whatsappUrl(lines.filter(Boolean).join('\n'));
}

export function whatsappContactLead(input: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  origin?: string;
}) {
  const lines = [
    `Ola! Me chamo ${input.name}.`,
    input.message || '',
    `Telefone: ${input.phone}`,
    input.email ? `E-mail: ${input.email}` : '',
    input.origin ? `Origem: ${input.origin}` : 'Origem: site UNUS',
  ];

  return whatsappUrl(lines.filter(Boolean).join('\n'));
}

export function whatsappAnuncieLead(input: {
  name: string;
  phone: string;
  tipo: string;
  email?: string;
  quartos?: string;
}) {
  const lines = [
    'Ola! Quero anunciar meu imovel pela UNUS.',
    `Nome: ${input.name}`,
    `Tipo de imovel: ${input.tipo}`,
    input.quartos ? `Numero de quartos: ${input.quartos}` : '',
    `Telefone: ${input.phone}`,
    input.email ? `E-mail: ${input.email}` : '',
    'Origem: formulario Anuncie',
  ];

  return whatsappUrl(lines.filter(Boolean).join('\n'));
}
