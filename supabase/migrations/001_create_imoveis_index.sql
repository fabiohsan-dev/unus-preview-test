-- Migration: create imoveis_index table
-- Operational property index populated from Vista and used by the site.

CREATE TABLE IF NOT EXISTS imoveis_index (
  id            TEXT PRIMARY KEY,              -- código da Vista API
  url           TEXT NOT NULL,                 -- link para a página do imóvel no site
  titulo        TEXT NOT NULL,
  tipo          TEXT NOT NULL CHECK (tipo IN ('apartamento', 'casa', 'cobertura', 'terreno', 'comercial')),
  finalidade    TEXT NOT NULL CHECK (finalidade IN ('venda', 'locacao')),
  preco         NUMERIC NOT NULL DEFAULT 0,
  area_m2       NUMERIC NOT NULL DEFAULT 0,
  quartos       INTEGER NOT NULL DEFAULT 0,
  banheiros     INTEGER NOT NULL DEFAULT 0,
  vagas         INTEGER NOT NULL DEFAULT 0,
  bairro        TEXT NOT NULL DEFAULT '',
  cidade        TEXT NOT NULL DEFAULT '',
  caracteristicas TEXT[] NOT NULL DEFAULT '{}',
  foto_capa     TEXT,                          -- URL da imagem da Vista API
  destaque      BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for the most common filters
CREATE INDEX IF NOT EXISTS idx_imoveis_tipo        ON imoveis_index (tipo);
CREATE INDEX IF NOT EXISTS idx_imoveis_finalidade  ON imoveis_index (finalidade);
CREATE INDEX IF NOT EXISTS idx_imoveis_preco       ON imoveis_index (preco);
CREATE INDEX IF NOT EXISTS idx_imoveis_quartos     ON imoveis_index (quartos);
CREATE INDEX IF NOT EXISTS idx_imoveis_bairro      ON imoveis_index (bairro);
CREATE INDEX IF NOT EXISTS idx_imoveis_cidade      ON imoveis_index (cidade);
CREATE INDEX IF NOT EXISTS idx_imoveis_destaque    ON imoveis_index (destaque);

-- RLS: public reads, restricted writes
ALTER TABLE imoveis_index ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura pública dos imóveis" ON imoveis_index;
DROP POLICY IF EXISTS "Escrita apenas via service role" ON imoveis_index;

CREATE POLICY "Leitura pública dos imóveis"
  ON imoveis_index
  FOR SELECT
  USING (true);

CREATE POLICY "Escrita apenas via service role"
  ON imoveis_index
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
