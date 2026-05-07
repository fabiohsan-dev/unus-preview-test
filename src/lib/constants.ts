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
export const CRECI          = 'CRECI-SC 3034-J';

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
