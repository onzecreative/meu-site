---
description: Subir o site – commit, push e deploy no Vercel
---

# Deploy do Site LogiNord

Este workflow faz commit, push e deploy no Vercel automaticamente.

Execute **a partir da pasta do projeto**: `C:\Users\G11Work\.gemini\antigravity\scratch\meu-site`

## Passos

// turbo-all
1. Stage todos os arquivos modificados:
```
git add -A
```

// turbo
2. Commit com a mensagem passada (substitua a mensagem se quiser):
```
git commit -m "update: alterações no site"
```

// turbo
3. Push para o GitHub (branch main):
```
git push origin main
```

// turbo
4. Deploy em produção no Vercel:
```
node "C:\Users\G11Work\AppData\Roaming\npm\node_modules\vercel\dist\index.js" --prod --yes
```

5. O link final da produção será exibido no output do comando acima.
   Acesse também: https://project-6o5rg.vercel.app
