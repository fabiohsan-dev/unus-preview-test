import { Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const links = {
    portfólio: ['Frente Mar', 'Campinas', 'Coberturas', 'Investimentos', 'Lançamentos'],
    institucional: ['O Núcleo', 'Metodologia', 'Inteligência', 'Parceiros', 'Trabalhe Conosco'],
    contato: ['(48) 3066-6767', 'contato@unusimoveis.com.br', 'K-Platz Corporate', 'São José, SC'],
  };

  return (
    <footer className="text-white pt-20 pb-10 px-6 sm:px-8 lg:px-12 bg-[var(--secondary-900)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 pb-16 border-b border-white/8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="https://unusnucleoimobiliario.com.br/wp-content/uploads/2021/07/xLogo_sm-1.png.pagespeed.ic.VQHWf0IouS.webp"
                alt="UNUS Núcleo Imobiliário"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-[260px] mb-8" style={{ fontWeight: 300 }}>
              Inteligência Imobiliária em Alto Padrão. São José, Campinas e praias de Florianópolis.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Linkedin, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-white/50" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4
                className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6"
                style={{ fontWeight: 600 }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-[14px] text-white/50 hover:text-white transition-colors flex items-center gap-1.5 group"
                      style={{ fontWeight: 300 }}
                    >
                      {item}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[12px]" style={{ fontWeight: 400 }}>
            &copy; 2026 UNUS Núcleo Imobiliário. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 text-[12px] hover:text-white/40 transition-colors" style={{ fontWeight: 400 }}>
              Política de Privacidade
            </a>
            <a href="#" className="text-white/20 text-[12px] hover:text-white/40 transition-colors" style={{ fontWeight: 400 }}>
              CRECI 12345-J
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
