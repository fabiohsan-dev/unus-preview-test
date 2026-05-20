/**
 * UNUS — Constantes globais do site
 *
 * Ponto único de verdade para contato, URLs e identidade.
 * Nunca hardcode esses valores em componentes individuais.
 *
 * Para trocar o número de telefone: edite só aqui.
 * Para trocar o domínio: defina NEXT_PUBLIC_SITE_URL no .env.
 */

/* ── Contato ── */
export const PHONE_RAW      = '554830666767';               // sem formatação, para tel: e wa.me
export const PHONE_DISPLAY  = '(48) 3066-6767';             // para exibição em texto
export const PHONE_HREF     = `tel:+${PHONE_RAW}`;

export const PHONE2_RAW     = '5548991899903';
export const PHONE2_DISPLAY = '(48) 9 9189-9903';
export const PHONE2_HREF    = `tel:+${PHONE2_RAW}`;

export const WHATSAPP_NUMBER  = PHONE_RAW;
export const WHATSAPP_BASE    = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Monta link WhatsApp com mensagem pré-preenchida */
export function whatsappUrl(text: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

/* ── Site ── */
export const SITE_URL       = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unus-preview-test.vercel.app').replace(/\/$/, '');
export const SITE_NAME      = 'UNUS Núcleo Imobiliário';
export const SITE_TAGLINE   = 'Inteligência Imobiliária em Alto Padrão';
export const CRECI          = 'CRECI: 5.067 J';
export const PRIVACY_URL    = 'https://unusnucleoimobiliario.com.br/politica-de-privacidade/';
export const COOKIES_URL    = 'https://unusnucleoimobiliario.com.br/politica-de-privacidade-e-cookies/';

/* ── Unidades ── */
export const UNITS = [
  {
    city:    'Balneário Camboriú',
    address: 'Av. Brasil, 3322 — Sala 22',
    neighborhood: 'Centro',
    state:   'SC',
    cep:     '88.330-060',
    creci:   'CRECI 6854-J',
  },
  {
    city:    'Itapema',
    address: 'Av. Nereu Ramos, 3625 — Sala 04, 2º andar',
    neighborhood: 'Meia Praia',
    state:   'SC',
    cep:     '88.220-000',
    creci:   'CRECI 7172-J',
  },
] as const;

/* ── Mensagens WhatsApp padrão ── */
export const WA_DEFAULT     = 'Olá! Gostaria de falar com um corretor UNUS.';
export const WA_IMOVEL      = (titulo: string, bairro: string) =>
  `Olá! Tenho interesse no imóvel ${titulo} em ${bairro}. Gostaria de mais informações.`;
export const WA_EMPREENDIMENTO = (nome: string, bairro: string, cidade: string) =>
  `Olá! Tenho interesse no empreendimento ${nome} em ${bairro}, ${cidade}. Gostaria de mais informações.`;
export const WA_EMPREENDIMENTOS_PAGE =
  'Olá! Gostaria de conhecer os empreendimentos disponíveis na UNUS.';
export const WA_CONSULTIVO  =
  'Olá! Gostaria de atendimento consultivo.';
