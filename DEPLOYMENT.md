# Amazon Adventure Lodge - Deploy

## Estrutura profissional

- `src/` - conteudo centralizado, rotas, dados EN/PT e gerador estatico.
- `assets/` - arquivos fonte de CSS, JavaScript, logo e imagens.
- `scripts/` - servidor local, validacao de links e smoke test HTTP.
- `dist/` - copia final gerada para plataformas que usam pasta de publicacao.
- `index.html` e pastas de rotas na raiz - site final pronto para upload direto da pasta pai.
- `design-system.html` - referencia visual original preservada.
- `IMAGE-PROMPTS.md` - prompts das imagens provisorias geradas.
- `package.json` - comandos do projeto.

## Deploy direto da pasta pai

Depois de rodar o build, a pasta principal `Amazon Adventure Lodge` fica pronta para deploy. Envie para o servidor estes itens da raiz:

- `index.html`
- `assets/`
- `the-lodge/`
- `experiences/`
- `gallery/`
- `contact/`
- `company-policy/`
- `pt/`
- `package/`
- `produto/`
- `photo-gallery/`
- `contact-us/`
- `politica-da-empresa/`
- `sport-fishing/`
- `sitemap.xml`
- `robots.txt`

As pastas `src/`, `scripts/`, `dist/` e arquivos de documentacao podem ficar fora do upload publico em deploy manual por FTP/cPanel.

## cPanel / Hostinger / FTP

1. Rode `npm.cmd run build`.
2. Envie os itens finais listados acima para `public_html/`.
3. O arquivo `index.html` da raiz deve ficar como `public_html/index.html`.

## Netlify / Vercel / Cloudflare Pages

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Tambem funciona publicar a raiz (`.`) depois do build, pois o gerador sincroniza os arquivos finais na pasta pai.

## Conferencia local

Os HTMLs finais foram gerados com caminhos relativos. Portanto, abrir `index.html` ou `dist/index.html` diretamente deve carregar CSS, JS e imagens.

Para testar como servidor:

```bash
npm.cmd run dev
```

URL local:

```text
http://localhost:4173/
```

## Validacao antes do deploy

Sempre rode:

```bash
npm.cmd run build
npm.cmd run validate
npm.cmd run smoke
```

Para testar a raiz como deploy direto:

```bash
npm.cmd run validate:root
npm.cmd run smoke:root
```

O deploy deve ser feito somente quando os comandos passarem sem erros.
