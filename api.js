// ⚠️ IMPORTANTE: Adicione aqui a sua chave de API do Google
// 1. Vá para: https://console.cloud.google.com/
// 2. Crie uma chave de API
// 3. Cole a chave abaixo entre as aspas

export const YOUTUBE_API_KEY = 'AIzaSyBJr-XbSuoON_bBsRDf_FpQynWNIYOoees';

// ID do seu canal (será preenchido automaticamente na primeira execução)
export let CHANNEL_ID = '';

/**
 * Busca o ID do canal baseado no nome
 */
export async function getChannelId(channelName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelName}&key=${YOUTUBE_API_KEY}&maxResults=1`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      CHANNEL_ID = data.items[0].snippet.channelId;
      localStorage.setItem('channelId', CHANNEL_ID);
      return CHANNEL_ID;
    }
  } catch (error) {
    console.error('Erro ao buscar ID do canal:', error);
  }
}

/**
 * Busca vídeos shorts do canal
 */
export async function getChannelShorts(channelId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&key=${YOUTUBE_API_KEY}&maxResults=50`
    );
    const data = await response.json();
    
    if (data.items) {
      return data.items;
    }
  } catch (error) {
    console.error('Erro ao buscar shorts:', error);
  }
}

/**
 * Busca estatísticas do canal (inscritos, visualizações)
 */
export async function getChannelStats(channelId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return {
        subscribers: data.items[0].statistics.subscriberCount,
        views: data.items[0].statistics.viewCount,
        videoCount: data.items[0].statistics.videoCount,
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        profileImage: data.items[0].snippet.thumbnails.high.url
      };
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas do canal:', error);
  }
}

/**
 * Busca estatísticas de um vídeo específico (views, likes, comentários)
 */
export async function getVideoStats(videoId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return {
        views: data.items[0].statistics.viewCount,
        likes: data.items[0].statistics.likeCount || 'N/A',
        commentCount: data.items[0].statistics.commentCount || 0
      };
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas do vídeo:', error);
  }
}

/**
 * Busca comentários de um vídeo
 */
export async function getVideoComments(videoId, maxResults = 10) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}&maxResults=${maxResults}&order=relevance`
    );
    const data = await response.json();
    
    if (data.items) {
      return data.items.map(item => ({
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        authorProfileImage: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        text: item.snippet.topLevelComment.snippet.textDisplay,
        likes: item.snippet.topLevelComment.snippet.likeCount,
        replyCount: item.snippet.replyCount
      }));
    }
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return [];
  }
}
