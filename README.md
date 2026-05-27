🎥 Site do Canal YouTube - @goncas_pro650
========================================

Um site moderno para exibir e sincronizar vídeos do seu canal YouTube com dados em tempo real (visualizações, likes, comentários e inscritos).

## ✨ Funcionalidades

✅ **Sincronização em Tempo Real**
- Atualiza inscritos, visualizações e contagem de vídeos
- Sincroniza views, likes e comentários de cada vídeo
- Atualização automática a cada 5 minutos

✅ **Interface Moderna**
- Design minimalista estilo YouTube
- Tema escuro com cores da marca (vermelho)
- Responsivo para mobile, tablet e desktop
- Animações suaves e fluidas

✅ **Reprodução de Vídeos**
- Player embarcado do YouTube
- Sem deixar o site para assistir

✅ **Informações Detalhadas**
- Modal com estatísticas completas do vídeo
- Descrição do vídeo
- Seção de comentários ao vivo
- Likes, visualizações e comentários

✅ **Performance**
- Cache de dados
- Carregamento assíncrono
- Sem bloqueios na interface

## 🚀 Como Usar

### 1️⃣ Obter Chave de API do Google

1. Vá para [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a API do YouTube Data v3
4. Crie uma chave de API
5. Copie a chave

### 2️⃣ Configurar o Site

1. Abra o arquivo `api.js`
2. Procure esta linha:
   ```javascript
   export const YOUTUBE_API_KEY = 'COLE_SUA_CHAVE_DE_API_AQUI';
   ```
3. Substitua `'COLE_SUA_CHAVE_DE_API_AQUI'` pela sua chave de API
4. **NÃO COMPARTILHE** esta chave com ninguém!

### 3️⃣ Publicar o Site

**Opção A: GitHub Pages**
```bash
git add .
git commit -m "Deploy site do canal"
git push origin main
```

Depois vá em `Configurações > Pages` do seu repositório e ative GitHub Pages.

**Opção B: Outro Servidor**
- Upload dos arquivos via FTP
- Netlify
- Vercel
- Qualquer servidor web

## 📁 Estrutura de Ficheiros

```
site-canal/
├── index.html          # Página principal
├── styles.css          # Estilos (tema escuro, responsivo)
├── main.js             # Lógica principal do site
├── api.js              # Configuração de API e funções
└── README.md           # Este ficheiro
```

## 🔧 Ficheiros Importantes

### api.js
- ⚠️ **Onde adicionar a chave de API**
- Contém todas as funções de integração com YouTube
- Nunca commit a chave de API real!

### index.html
- Estrutura HTML do site
- Inclui header, grid de vídeos e modal

### styles.css
- Toda a estilização visual
- Tema escuro com cores vermelhas
- Totalmente responsivo

### main.js
- Lógica de renderização de vídeos
- Sincronização de dados
- Eventos de interação

## 🔒 Segurança

⚠️ **IMPORTANTE: Nunca compartilhe sua chave de API!**

Se acidentalmente a compartilhar:
1. Vá ao [Google Cloud Console](https://console.cloud.google.com/)
2. Delete a chave comprometida
3. Crie uma nova chave

## 🎨 Customização

### Mudar Canal
No ficheiro `main.js`, mude esta linha:
```javascript
const CHANNEL_NAME = '@goncas_pro650';
```

### Mudar Cores
No ficheiro `styles.css`, edite as cores em `:root`:
```css
:root {
    --primary-color: #ff0000;    /* Cor principal (vermelho) */
    --background: #0f0f0f;       /* Fundo escuro */
    --text-primary: #ffffff;     /* Texto branco */
}
```

### Mudar Intervalo de Atualização
No ficheiro `main.js`:
```javascript
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos (ajuste conforme necessário)
```

## ⚡ Performance

- Carregamento de até 50 vídeos por vez
- Cache de dados do canal
- Atualização automática sem reload
- Lazy loading de imagens

## 🐛 Troubleshooting

### "Erro ao buscar o canal"
- Verifique se a chave de API está correta
- Verifique se a API do YouTube está ativada
- Verifique se tem quota disponível

### Vídeos não aparecem
- Certifique-se que o canal é público
- Verifique a chave de API
- Veja a consola (F12) para erros

### Comentários não carregam
- Alguns vídeos podem ter comentários desativados
- Verifique as permissões da chave de API

## 📊 Estatísticas Sincronizadas

✅ Inscritos do canal
✅ Visualizações totais
✅ Quantidade de vídeos
✅ Views por vídeo
✅ Likes por vídeo
✅ Comentários por vídeo
✅ Dados de cada comentário

## 🔄 Atualização Automática

O site atualiza automaticamente a cada 5 minutos:
- Dados do canal (inscritos, views)
- Lista de vídeos
- Estatísticas de cada vídeo

Você também pode clicar no botão 🔄 para atualizar manualmente.

## 💡 Dicas

1. Guarde a chave de API em lugar seguro
2. Monitore o uso da API no Google Cloud Console
3. Customize as cores e o layout conforme quiser
4. Teste em diferentes dispositivos

## 📞 Suporte

Se encontrar problemas:
1. Verifique a consola do navegador (F12 > Console)
2. Leia as mensagens de erro
3. Verifique se a chave de API é válida
4. Verifique se a API do YouTube está ativada

## 📝 Licença

Sinta-se livre para usar, modificar e compartilhar!

---

**Desenvolvido com ❤️ para @goncas_pro650**

Enjoy! 🎬✨