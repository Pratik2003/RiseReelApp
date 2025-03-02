const videoPlayer = document.getElementById("videoPlayer");
const videoContainer = document.getElementById("videoContainer");
const videoInput = document.getElementById("videoInput");
let videoList = [];
let lastVideo = null;

videoInput.addEventListener("change", function(event) {
    const files = event.target.files;
    if (files.length > 0) {
        videoList = [];
        for (let i = 0; i < files.length; i++) {
            videoList.push(URL.createObjectURL(files[i]));
        }
        playNextVideo();
    }
});

function getRandomVideo() {
    return videoList[Math.floor(Math.random() * videoList.length)];
}

function playNextVideo() {
    if (videoList.length > 0) {
        lastVideo = videoPlayer.src;
        videoPlayer.src = getRandomVideo();
        videoPlayer.play();
    }
}

function replayLastVideo() {
    if (lastVideo) {
        videoPlayer.src = lastVideo;
        videoPlayer.play();
    }
}

videoPlayer.addEventListener("ended", playNextVideo);

document.addEventListener("wheel", event => {
    if (event.deltaY > 0) {
        playNextVideo();
    } else {
        replayLastVideo();
    }
});

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let yUp = evt.touches[0].clientY;
    let yDiff = yDown - yUp;

    if (yDiff > 50) {
        playNextVideo();
    } else if (yDiff < -50) {
        replayLastVideo();
    }

    xDown = null;
    yDown = null;
}