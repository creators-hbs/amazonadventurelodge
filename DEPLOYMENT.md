# Amazon Adventure Lodge - Deploy

O projeto esta organizado na pasta principal `Amazon Adventure Lodge`, com codigo-fonte separado do pacote final de publicacao.

## Estrutura profissional

- `src/` - conteudo centralizado, rotas, dados EN/PT e gerador estatico.
- `assets/` - arquivos fonte de CSS, JavaScript, logo e imagens.
- `scripts/` - servidor local, validacao de links e smoke test HTTP.
- `dist/` - site final pronto para publicacao.
- `design-system.html` - referencia visual original preservada.
- `IMAGE-PROMPTS.md` - prompts das imagens provisorias geradas.
- `package.json` - comandos do projeto.

## Importante

Para deploy, nao envie a pasta inteira `Amazon Adventure Lodge` como raiz publica do site.

Envie somente o conteudo de:

```text
dist/
```

Ou configure sua plataforma para usar `dist` como pasta de publicacao.

## cPanel / Hostinger / FTP

1. Rode `npm.cmd run build`.
2. Abra a pasta `dist/`.
3. Envie todo o conteudo de `dist/` para `public_html/`.
4. O arquivo `dist/index.html` deve ficar como `public_html/index.html`.

## Netlify / Vercel / Cloudflare Pages

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

## Conferencia local

O pacote `dist/` foi gerado com caminhos relativos. Portanto, abrir `dist/index.html` diretamente deve carregar CSS e imagens.

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

O deploy deve ser feito somente quando os tres comandos passarem sem erros.
