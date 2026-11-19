# Padrão de criação de sites

Este repositório guarda os sites que vendemos para clientes. Cada site fica em
`sites/<nome-do-cliente>/`. Fale com o usuário em português.

## O padrão: sites premium

Os sites são produtos que vendemos. Precisam parecer feitos por uma agência de
alto padrão, algo que ninguém faz em 10 minutos.

Evite:
- visual de "apresentação de PowerPoint": blocos estáticos, centralizados, sem movimento;
- layouts genéricos de template;
- usar as cores do material do cliente (Canva, Instagram) só porque estão lá.

Exija:
- animações suaves e intencionais em toda a página;
- tipografia com personalidade, como de revista;
- uma ideia visual forte por site.

## Processo para cada cliente

O usuário manda informações sobre o negócio: link, Canva, Instagram, fotos, texto.
Antes de escrever código:

1. **Entenda o negócio:** o que vende, para quem, faixa de preço e o tom da marca.
2. **Escolha o tipo de site** que combina com esse negócio. Por exemplo:
   - página única cinematográfica para um profissional;
   - catálogo para uma loja;
   - página de conversão para um serviço.
3. **Defina a direção visual** pensando no cliente, não no material recebido:
   - paleta de cores;
   - par de fontes (display + texto);
   - o "momento uau" do site.
   Use a skill `ui-ux-pro-max` como apoio, mas a decisão final é de design. Explique
   a escolha em poucas linhas.
4. **Use o conteúdo real do cliente:**
   - textos das legendas e do material dele;
   - todos os serviços;
   - links reais (WhatsApp com mensagem pronta, Maps, redes sociais).
   Nunca invente depoimentos, números ou prêmios.
5. Construa, confira e entregue (veja abaixo).

## Stack padrão

- React + Vite + TypeScript (site estático, hospeda em qualquer lugar).
- GSAP (ScrollTrigger, SplitText) para animações. Lenis para rolagem suave.
- WebGL próprio para fundos vivos quando fizer sentido (ex.: `SilkCanvas.tsx`).
- Fontes via `@fontsource` (auto-hospedadas), nunca de CDN em tempo de execução.
- Todo o conteúdo do cliente em `src/content.ts`; cores em tokens no topo de `src/styles.css`.
  Para um cliente novo, partir de um site existente e trocar conteúdo, direção e
  componentes que não combinam.

Referência: `sites/carolina-baron/` (estética avançada, direção "noir & champagne").

## Repertório de movimento

Escolha o que combina com cada cliente, sem usar tudo sempre:

- **Entrada:** tela de carregamento curta, com nome e contador, saindo como cortina.
- **Títulos:**
  - revelados palavra por palavra ou letra por letra, com máscara;
  - texto longo que "acende" conforme a rolagem.
- **Imagens:** fotos com revelação por clip-path e parallax.
- **Seções:**
  - seção travada com rolagem horizontal (desktop);
  - faixa marquee que reage à velocidade da rolagem.
- **Interação:**
  - cursor personalizado e botões magnéticos (só com mouse);
  - listas com card de prévia seguindo o cursor.
- **Acabamento:** grão sutil e barra de progresso de leitura.

Sempre respeite `prefers-reduced-motion`, funcione bem no celular (sem rolagem
lateral e com botão flutuante de contato) e mantenha os alvos de toque com 44px ou mais.

## Conferência e entrega

- Rode `npx tsc -b` e `npx vite build`. Tire screenshots no desktop (1440px) e no
  celular (iPhone 13) e corrija o que estiver quebrado.
- O usuário não consegue abrir o localhost da nuvem. Para ele ver o site:
  1. **Vídeo:** grave a rolagem com Playwright (`recordVideo`), converta para MP4 e
     envie. Isso mostra as animações.
  2. **Link de demonstração:** gere um build de arquivo único (`vite-plugin-singlefile`)
     com **nome, contatos e fotos fictícios** e publique como Artifact. Não publique
     link com nome, fotos ou contatos de uma pessoa ou empresa real.
  3. A versão real fica em `sites/<cliente>/`. Para rodar localmente:
     `npm install` e depois `npm run dev`, abrindo http://localhost:5173.
## Fluxo de venda (prévia de proposta)

O usuário vende assim: cria o site, manda o link para o dono do negócio e pergunta se ele quer comprar.

- Todo site novo começa em **modo prévia**:
  - `preview.enabled = true` em `src/content.ts`, com o nome e o WhatsApp da agência;
  - meta `robots` `noindex, nofollow` no `index.html`.
  O selo "Prévia feita para você" traz o botão "Quero este site", que abre o WhatsApp da agência.
- Gere o build (`npx vite build`), compacte o **conteúdo** de `dist/` num .zip e envie ao usuário.
  Ele publica pelo Netlify Drop (app.netlify.com/drop), arrastando a pasta, e manda o link ao cliente.
  Quem publica é o usuário, na conta dele. Claude não publica a versão com dados reais.
- Quando o cliente comprar: `preview.enabled = false`, remova a meta `robots`, peça as fotos
  originais e a autorização de uso, e coloque no domínio do cliente.

- Fotos de cliente vão em `public/`. Se vierem de print de tela, recorte bem e avise
  que os originais em alta resolução ficam melhores.
