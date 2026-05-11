import type { Metadata } from 'next';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Building2, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const metadata: Metadata = {
  title: 'Contato | UNUS Núcleo Imobiliário',
  description: 'Fale com nossos especialistas. Atendimento personalizado para compra, venda e parcerias em Santa Catarina.',
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header da Página */}
        <div className="mb-16 lg:mb-24">
          <h1 
            className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.03em] text-[var(--secondary-900)] mb-6"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Fale com o <span style={{ fontWeight: 600 }}>Núcleo.</span>
          </h1>
          <p className="text-[var(--neutral-500)] text-[18px] max-w-[600px] font-light leading-relaxed">
            Estamos prontos para transformar sua jornada imobiliária com inteligência, 
            estratégia e exclusividade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* Coluna Esquerda: Formulário e Localização */}
          <div className="space-y-20">
            
            {/* Formulário de Captura */}
            <section>
              <h2 className="text-[13px] uppercase tracking-[0.2em] text-[var(--secondary-900)] font-semibold mb-8 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[var(--secondary-900)]" />
                Contato Rápido
              </h2>
              
              <form className="space-y-6 max-w-[500px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input label="Nome" placeholder="Seu nome completo" required />
                  <Input label="Telefone" placeholder="(00) 00000-0000" required />
                </div>
                <Input label="E-mail" type="email" placeholder="seu@email.com" required />
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-[var(--neutral-500)] font-medium">
                    Como podemos ajudar?
                  </label>
                  <textarea 
                    className="w-full bg-transparent border-b border-[var(--neutral-200)] py-3 focus:border-[var(--secondary-900)] outline-none transition-colors min-h-[100px] resize-none text-[15px]"
                    placeholder="Conte-nos brevemente sobre seu interesse"
                  />
                </div>
                <Button className="w-full sm:w-auto px-12 py-6 h-auto text-[12px] uppercase tracking-[0.15em] font-semibold">
                  Iniciar conversa
                </Button>
              </form>
            </section>

            {/* Localização e Canais */}
            <section className="space-y-12">
              <div>
                <h2 className="text-[13px] uppercase tracking-[0.2em] text-[var(--secondary-900)] font-semibold mb-8 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[var(--secondary-900)]" />
                  Onde Estamos
                </h2>
                
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[var(--secondary-50)] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--secondary-900)]" />
                  </div>
                  <div>
                    <p className="text-[16px] text-[var(--secondary-900)] font-medium mb-1">
                      Unidade São José - K Platz Corporate
                    </p>
                    <p className="text-[14px] text-[var(--neutral-500)] leading-relaxed mb-4">
                      Rua Elizeu di Bernardi, 34 - Sala 601<br />
                      Campinas, São José - SC
                    </p>
                    <a 
                      href="https://goo.gl/maps/example" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--secondary-900)] uppercase tracking-wider border-b border-[var(--secondary-900)]/20 hover:border-[var(--secondary-900)] transition-colors pb-1"
                    >
                      Traçar rota <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-[var(--secondary-50)] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[var(--secondary-900)]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[var(--neutral-400)] font-medium">Central</p>
                    <p className="text-[15px] text-[var(--secondary-900)] font-medium">(48) 3066-6767</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[var(--neutral-400)] font-medium">WhatsApp</p>
                    <p className="text-[15px] text-[var(--secondary-900)] font-medium">(48) 9 9189-9903</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Coluna Direita: Action Cards */}
          <div className="space-y-10 lg:sticky lg:top-32">
            
            {/* Card: Quero Comprar */}
            <a 
              href="/venda" 
              className="group block p-10 bg-[var(--secondary-900)] text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <Building2 className="w-8 h-8 text-[var(--gold)] mb-6" strokeWidth={1.5} />
                <h3 className="text-[24px] font-light mb-2 font-serif">Quero comprar</h3>
                <p className="text-white/60 text-[14px] mb-8 max-w-[280px]">
                  Explore nossa curadoria de imóveis de alto padrão e encontre seu novo destino.
                </p>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold">
                  Ver imóveis <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
            </a>

            {/* Card: Quero Anunciar */}
            <a 
              href="/anuncie" 
              className="group block p-10 bg-[var(--secondary-50)] border border-[var(--secondary-100)] text-[var(--secondary-900)] relative overflow-hidden"
            >
              <div className="relative z-10">
                <MessageCircle className="w-8 h-8 text-[var(--secondary-900)] mb-6" strokeWidth={1.5} />
                <h3 className="text-[24px] font-light mb-2 font-serif">Quero anunciar</h3>
                <p className="text-[var(--neutral-500)] text-[14px] mb-8 max-w-[280px]">
                  Consultoria especializada para proprietários que buscam valorização e liquidez.
                </p>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold">
                  Falar com consultor <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>

            {/* Links Secundários */}
            <div className="pt-8 grid grid-cols-2 gap-4">
              <a href="#" className="p-6 border border-[var(--neutral-100)] hover:border-[var(--secondary-900)] transition-colors group">
                <p className="text-[11px] uppercase tracking-wider text-[var(--neutral-400)] mb-2">Carreiras</p>
                <p className="text-[13px] font-semibold flex items-center gap-2">
                  Trabalhe conosco <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </p>
              </a>
              <a href="#" className="p-6 border border-[var(--neutral-100)] hover:border-[var(--secondary-900)] transition-colors group">
                <p className="text-[11px] uppercase tracking-wider text-[var(--neutral-400)] mb-2">Parcerias</p>
                <p className="text-[13px] font-semibold flex items-center gap-2">
                  Seja parceiro <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </p>
              </a>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
