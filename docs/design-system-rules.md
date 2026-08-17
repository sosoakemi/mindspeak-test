# MindSpeak — Design System Rules (Figma MCP)

Guia para integração de designs Figma via MCP ao codebase `mindspeak-frontend`.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | React 19 + TypeScript |
| Roteamento | React Router 7 |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 (`@import 'tailwindcss'`) |
| Ícones | Lucide React |
| Utilitários | `clsx` + `tailwind-merge` (`src/lib/cn.ts`) |

## Tokens

### Global (`src/index.css`)

Variáveis `--ms-*` no `:root` e `.dark` — fundo, superfície, texto, bordas, acentos. Mapeadas em `@theme` como `--color-ms-*` para classes Tailwind (`bg-ms-page`, `text-ms-primary`, etc.).

### Acesso Seguro — Seleção (`src/design-system/secure-access/tokens.css`)

Escopo `[data-secure-access]` — tela inicial de escolha de portal (`/`).

| Token | Uso |
|-------|-----|
| `--sa-bg` | Fundo claro `#F8FAFC` |
| `--sa-container` | Card escuro `#020B2D` |
| `--sa-card-selected-bg` | Seleção `#DDF5E8` |
| `--sa-continue` | Botão continuar `#22C55E` |

Componentes: `src/components/ui/secure-access/` — `PortalSelectionCard`, `AccessSelector`, `SecureAccessContainer`, `ContinueButton`.

### Portal Familiar — Auth (`src/design-system/family-auth/tokens.css`)

Escopo `[data-family-auth]`:

| Token | Uso Figma |
|-------|-----------|
| `--fa-bg` | Fundo off-white `#F9FAFB` |
| `--fa-surface` | Card branco |
| `--fa-input-bg` | Inputs cinza `#F3F4F6` |
| `--fa-cta` | Botão preto `#111827` |
| `--fa-link` | Links verde escuro `#064E3B` |
| `--fa-badge-bg` / `--fa-badge-text` | Pill “Início da jornada” |
| `--fa-shadow` | Sombra suave do card |
| `--fa-radius` / `--fa-radius-sm` | 12px card / 8px inputs |
| `--fa-space-*` | Escala 4/8px |
| `--fa-text-*` | Escala tipográfica |

**Regra Figma → código:** cores da referência auth mapeiam para `--fa-*`, nunca hex solto nos componentes.

## Componentes

### Auth familiar (`src/components/ui/family-auth/`)

| Componente | Uso |
|----------|-----|
| `AuthInput` | Labels uppercase, ícone à esquerda, erro |
| `AuthButton` | CTA preto (`primary`), outline (`secondary`), loading |
| `AuthCard` | Card branco com sombra |
| `AuthCheckbox` | Termos de uso |
| `AuthAlert` | Feedback info/success/error |
| `FormLabel` / `FormError` | Acessibilidade |
| `PasswordStrength` | Barra de força da senha |
| `AuthProgress` | Etapas do cadastro |
| `FamilyAuthHero` | Painel de destaque (desktop split) |

### Layout (`src/components/layout/FamilyAuthShell.tsx`)

- `data-family-auth` no root
- Logo, `ThemeToggle`, botão Sair
- `layout="centered"` ou `layout="split"` + prop `hero`

### App geral (`src/components/shared/`)

`Button`, `LinkButton`, `ThemeToggle` — dashboards.

### Marca (`src/components/brand/MindSpeakLogo.tsx`)

Logo via `/favicon.svg`; wordmark via `wordmarkClassName`.

## Padrão de implementação Figma

```tsx
<FamilyAuthShell layout="split" hero={<FamilyAuthHero variant="login" />}>
  <h1>Portal Familiar</h1>
  <AuthCard as="form" className="p-6 sm:p-8">
    <AuthInput label="E-mail" icon={<Mail />} error={errors.email} />
    <AuthButton type="submit" isLoading={loading}>Próximo passo</AuthButton>
  </AuthCard>
</FamilyAuthShell>
```

## Assets

- `public/logos/`, `public/favicon.svg`
- Ilustração auth: componente `FamilyAuthHero` (CSS + Lucide, sem imagem externa)

## Ícones

Lucide React: `import { Mail } from 'lucide-react'`. Tamanho padrão `h-4 w-4` em inputs.

## Responsividade

- Mobile-first; hero oculto em `< lg`, conteúdo hero duplicado no cadastro mobile
- Touch targets ≥ 44px (botões auth: 52px)
- Split layout a partir de `lg` (1024px)

## Acessibilidade

- `FormLabel` + `FormError` com `aria-invalid` / `aria-describedby`
- `aria-busy` no botão loading
- Focus visible em links e botões
- Contraste WCAG AA

## Páginas auth

| Rota | Componente | Layout |
|------|------------|--------|
| `/` | `AccessSelectionPage` | Seleção de portal |
| `/familiar/login` | `LoginPage` | `FamilyAuthShell` split |
| `/familiar/cadastro` | `RegisterPage` | 2 etapas |
| `/clinico/login` | `ClinicalLoginPage` | `FamilyAuthShell` split |
| `/clinico/cadastro` | `ClinicalRegisterPage` | 2 etapas + instituição |

Rotas legadas `/login`, `/cadastro` redirecionam para `/familiar/*`.
