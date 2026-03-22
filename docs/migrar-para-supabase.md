# Migração Supabase e Hostinger VPS

A arquitetura do LogiNord Framer Clone foi desenvolvida para ser Serverless (Vercel) combinada com um poderoso repositório de dados estáticos (React State + APIs genéricas JSON file-based / Supabase Hooks).

## Variáveis de Ambiente Necessárias
Conforme o `.env.example` gerado na raíz, você precisará expor 3 chaves caso habilite a integração Supabase completa:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[Sua-Instancia].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
```

## Como ativar os serviços reais do Supabase
Na pasta raiz deste site, toda a leitura de dados ocorre via a camada abstrata em `/lib/services/`.
Se atentar ao método `section.service.ts` e `hero.service.ts`: neles basta remover/comentar o hook `if(fs.existsSync)` do modo standalone e liberar o construtor `supabase.from('tableName').select()`.

> **Nota para Deploy via Docker em VPS (Hostinger):**
O Next.js 14 turbopack foi estabilizado em "standalone mode" por debaixo dos panos. Com isso, basta engatilhar um arquivo Dockerfile simples na raiz usando as imagens nativas `node:22-alpine` e mapeando o port 3000.

## SQL Blueprint para Inicializar Componentes

```sql
CREATE TABLE hero_config (
  id uuid default uuid_generate_v4() primary key,
  type text default 'url',
  videoUrl text,
  youtubeId text,
  title text,
  subtitleIndicator text,
  bottomLeftText text,
  bottomRightText text,
  updated_at timestamp default current_timestamp
);

CREATE TABLE page_sections (
  id uuid default uuid_generate_v4() primary key,
  sectionId text unique,
  data jsonb default '{}'::jsonb,
  updated_at timestamp default current_timestamp
);
```

Após recriar essas tabelas, os Endpoints REST `app/api/...` voltarão automaticamente a hidratar o painel visual Admin com dados reativos e não efêmeros.
