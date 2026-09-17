'use strict';
const speed = document.getElementById('speed');
const status = document.getElementById('playback-status');
let player;
let applyOnFirstPlay = true;
const loadingTimeout = setTimeout(() => {
  status.textContent = 'Chưa kết nối được điều khiển tốc độ. Bạn có thể chọn 2× trong cài đặt YouTube.';
}, 12000);
function showRate(rate) {
  speed.value = String(rate);
  status.textContent = `Tốc độ hiện tại: ${rate}×`;
}
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('adoption-player', {
    events: {
      onReady(event) {
        clearTimeout(loadingTimeout);
        const rates = event.target.getAvailablePlaybackRates();
        speed.replaceChildren(...rates.map(rate => new Option(`${rate}×`, String(rate))));
        speed.disabled = false;
        showRate(event.target.getPlaybackRate());
        event.target.setPlaybackRate(2);
      },
      onStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING && applyOnFirstPlay) {
          applyOnFirstPlay = false;
          event.target.setPlaybackRate(2);
        }
      },
      onPlaybackRateChange(event) {
        applyOnFirstPlay = false;
        showRate(event.data);
      },
      onError() {
        clearTimeout(loadingTimeout);
        speed.disabled = true;
        status.textContent = 'Không phát được video tại đây. Hãy dùng liên kết mở trên YouTube bên dưới.';
      }
    }
  });
};
speed.addEventListener('change', () => {
  applyOnFirstPlay = false;
  player.setPlaybackRate(Number(speed.value));
});
const youtubeAPI = document.createElement('script');
youtubeAPI.src = 'https://www.youtube.com/iframe_api';
youtubeAPI.onerror = () => {
  clearTimeout(loadingTimeout);
  status.textContent = 'Chọn tốc độ 2× trong cài đặt YouTube, hoặc mở video bằng liên kết bên dưới.';
};
document.head.append(youtubeAPI);
