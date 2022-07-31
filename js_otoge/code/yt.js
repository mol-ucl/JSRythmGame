var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//videoIdはYoutubeリンクの末尾のID
function onYouTubeIframeAPIReady() {
    isSP = window.innerWidth < VIDEO_SIZE.width;
    player = new YT.Player('player', {
    height: isSP ? VIDEO_SIZE.height / 2 : VIDEO_SIZE.height,
    width: isSP ? VIDEO_SIZE.width / 2 : VIDEO_SIZE.width,
    videoId: 'Qd01-6xVSHk',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
    setFirst();
    setStandby();
}

function onPlayerStateChange(event) {}