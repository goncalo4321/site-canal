import {
    YOUTUBE_API_KEY,
    getChannelId,
    getChannelShorts,
    getChannelStats,
    getVideoStats,
    getVideoComments,
    CHANNEL_ID
} from './api.js';

// ==================== CONSTANTES ====================
const CHANNEL_NAME = '@goncas_pro650';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos

// ==================== ESTADO GLOBAL ====================
let currentChannelId = localStorage.getItem('channelId') || '';
let videosCache = [];
let allVideos = [];

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', async () => {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'COLE_SUA_CHAVE_DE_API_AQUI') {
        showError('⚠️ Adicione sua chave de API do Google no arquivo api.js');
        return;
    }

    // Tenta usar o ID do canal armazenado ou busca um novo
    if (!currentChannelId) {
        currentChannelId = await getChannelId(CHANNEL_NAME);
        if (!currentChannelId) {
            showError('Erro ao buscar o canal. Verifique a chave de API.');
            return;
        }
    }

    // Carrega dados iniciais
    await loadChannelData();
    await loadVideos();

    // Atualiza dados periodicamente
    setInterval(async () => {
        console.log('Atualizando dados...');
        await loadChannelData();
        await loadVideos();
    }, REFRESH_INTERVAL);
});

// ==================== CARREGAR DADOS DO CANAL ====================
async function loadChannelData() {
    try {
        showLoading(true);
        const stats = await getChannelStats(currentChannelId);
        
        if (stats) {
            document.getElementById('channelName').textContent = stats.title;
            document.getElementById('channelImage').src = stats.profileImage;
            document.getElementById('subscribersCount').textContent = formatNumber(stats.subscribers);
            document.getElementById('viewsCount').textContent = formatNumber(stats.views);
            document.getElementById('videoCount').textContent = stats.videoCount;

            // Atualiza o título da página
            document.title = `${stats.title} - Canal YouTube`;
        }

        showLoading(false);
    } catch (error) {
        console.error('Erro ao carregar dados do canal:', error);
        showError('Erro ao carregar dados do canal');
    }
}

// ==================== CARREGAR VÍDEOS ====================
async function loadVideos() {
    try {
        showLoading(true);
        const videos = await getChannelShorts(currentChannelId);
        
        if (!videos) {
            showError('Nenhum vídeo encontrado');
            showLoading(false);
            return;
        }

        allVideos = videos;
        await renderVideos(videos);
        showLoading(false);
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
        showError('Erro ao carregar vídeos');
    }
}

// ==================== RENDERIZAR VÍDEOS ====================
async function renderVideos(videos) {
    const grid = document.getElementById('videosGrid');
    grid.innerHTML = '';

    if (videos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Nenhum vídeo disponível</p>';
        return;
    }

    for (const video of videos) {
        const videoId = video.id.videoId;
        const card = await createVideoCard(video, videoId);
        grid.appendChild(card);
    }
}

// ==================== CRIAR CARD DE VÍDEO ====================
async function createVideoCard(video, videoId) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const stats = await getVideoStats(videoId);
    const thumbnail = video.snippet.thumbnails.high.url;
    const title = video.snippet.title;
    const views = stats?.views || '0';

    card.innerHTML = `
        <div style="position: relative;">
            <img src="${thumbnail}" alt="${title}" class="video-thumbnail">
            <div class="play-icon">▶️</div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${title}</h3>
            <div class="video-channel">${video.snippet.channelTitle}</div>
            <div class="video-card-stats">
                <span>👁️ ${formatNumber(views)}</span>
                <span>👍 ${stats?.likes || '0'}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openVideoModal(video, videoId, stats));

    return card;
}

// ==================== ABRIR MODAL DE VÍDEO ====================
async function openVideoModal(video, videoId, stats) {
    const modal = document.getElementById('videoModal');
    
    // Define o vídeo no iframe
    document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    
    // Preenche informações
    document.getElementById('videoTitle').textContent = video.snippet.title;
    document.getElementById('videoDescription').textContent = video.snippet.description;
    document.getElementById('modalViews').textContent = formatNumber(stats?.views || 0);
    document.getElementById('modalLikes').textContent = stats?.likes || 'N/A';
    document.getElementById('modalComments').textContent = formatNumber(stats?.commentCount || 0);

    // Carrega comentários
    await loadComments(videoId);

    // Mostra o modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// ==================== CARREGAR COMENTÁRIOS ====================
async function loadComments(videoId) {
    try {
        const comments = await getVideoComments(videoId, 10);
        const commentsList = document.getElementById('commentsList');
        
        commentsList.innerHTML = '';

        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color: var(--text-secondary);">Nenhum comentário disponível</p>';
            return;
        }

        for (const comment of comments) {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment';
            commentEl.innerHTML = `
                <div class="comment-author-info">
                    <img src="${comment.authorProfileImage}" alt="${comment.author}" class="comment-author-image">
                    <span class="comment-author">${comment.author}</span>
                </div>
                <p class="comment-text">${escapeHtml(comment.text)}</p>
                <div class="comment-likes">👍 ${comment.likes} | 💬 ${comment.replyCount} respostas</div>
            `;
            commentsList.appendChild(commentEl);
        }
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        document.getElementById('commentsList').innerHTML = '<p style="color: var(--text-secondary);">Erro ao carregar comentários</p>';
    }
}

// ==================== FECHAR MODAL ====================
function closeModal() {
    const modal = document.getElementById('videoModal');
    modal.classList.add('hidden');
    document.getElementById('videoFrame').src = '';
    document.body.style.overflow = 'auto';
}

// ==================== FUNÇÕES AUXILIARES ====================
function formatNumber(num) {
    if (!num) return '0';
    
    const number = parseInt(num);
    
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    
    return number.toString();
}

function showLoading(show) {
    const indicator = document.getElementById('loadingIndicator');
    if (show) {
        indicator.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
    }
}

function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorEl.classList.remove('hidden');
    
    setTimeout(() => {
        errorEl.classList.add('hidden');
    }, 5000);
}

function closeError() {
    document.getElementById('errorMessage').classList.add('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== REFRESH MANUAL ====================
async function refreshData() {
    const btn = document.querySelector('.refresh-btn');
    btn.style.animation = 'spin 1s linear';
    
    await loadChannelData();
    await loadVideos();
    
    setTimeout(() => {
        btn.style.animation = '';
    }, 1000);
}

// ==================== FECHAR MODAL COM ESC ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==================== FECHAR MODAL AO CLICAR FORA ====================
document.addEventListener('click', (e) => {
    const modal = document.getElementById('videoModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (e.target === modal && !modalContent.contains(e.target)) {
        closeModal();
    }
});