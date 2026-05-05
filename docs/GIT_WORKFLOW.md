# Git Workflow — UNUS Núcleo Imobiliário

## Branches

```
main        ← PRODUÇÃO (Vercel deploy automático)
dev         ← desenvolvimento e integração
feature/*   ← features individuais
fix/*       ← correções de bugs
hotfix/*    ← correções urgentes diretamente para main
```

## Regra fundamental

**Nunca commitar diretamente na `main`.** Toda mudança vai por PR.

## Fluxo padrão (feature/fix)

```bash
# 1. Sempre partir da dev atualizada
git checkout dev
git pull origin dev

# 2. Criar branch de trabalho
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug

# 3. Trabalhar, commitar pequenos e claros
git add src/components/NomeComponente.tsx
git commit -m "feat: adiciona componente X com comportamento Y"

# 4. Push e abrir PR → dev
git push origin feature/nome-da-feature
# Abrir PR no GitHub: feature/* → dev

# 5. Após aprovação e merge em dev, abrir PR: dev → main
# Só quando o conjunto de mudanças estiver pronto para produção
```

## Fluxo hotfix (bug crítico em produção)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/descricao-breve

# ... corrigir ...

git push origin hotfix/descricao-breve
# PR: hotfix/* → main (revisão rápida)
# Após merge em main, também fazer merge em dev:
git checkout dev && git merge main
```

## Convenções de commit (Conventional Commits)

```
feat:     nova funcionalidade
fix:      correção de bug
chore:    manutenção, deps, config
docs:     documentação
style:    formatação (sem mudança de lógica)
refactor: refatoração sem nova feature ou bugfix
perf:     melhoria de performance
test:     testes
```

**Exemplos:**
```
feat: adiciona calculadora de ROI na página de imóvel
fix: corrige overflow no carrossel mobile
chore: atualiza dependências Radix UI
docs: documenta integração Vista CRM
perf: adiciona lazy loading no componente SalesOpportunities
```

## Proteções configuradas (configurar no GitHub)

Em **Settings → Branches → Branch protection rules** para `main`:

- [x] Require a pull request before merging
- [x] Require approvals (1 aprovação mínima)
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require status checks to pass before merging (build/lint)
- [x] Do not allow bypassing the above settings

## Ambiente por branch

| Branch | Ambiente | Deploy |
|--------|----------|--------|
| `main` | Produção | Automático (Vercel) |
| `dev` | Preview | Automático (Vercel Preview) |
| `feature/*` | Preview isolado | Automático (Vercel Preview) |

## Checklist antes de abrir PR para main

- [ ] Build passa sem erros (`npm run build`)
- [ ] Sem warnings de TypeScript (`npm run lint`)
- [ ] Testado no browser (mobile + desktop)
- [ ] Variáveis de ambiente novas documentadas em `.env.example`
- [ ] CLAUDE.md atualizado se houver mudança arquitetural
