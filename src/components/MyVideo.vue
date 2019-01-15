<template>
    <div class="video" ref="vcontainer">
        <video class="video__player" ref="v" @timeupdate="handleTimeUpdate" @ended="handleEnd">
            <source :src="videoSrc"/>
        </video>
        <div class="controller">
            <div class="controller__btn-wrapper">
                <div class="controller__btn" @click="togglePlaying">
                    <font-awesome-icon :icon="['fas', 'play']" v-if="isPaused"></font-awesome-icon>
                    <font-awesome-icon :icon="['fas', 'pause']" v-else></font-awesome-icon>
                </div>
                <div class="controller__btn" @click="stopPlaying">
                    <font-awesome-icon :icon="['fas', 'stop']"></font-awesome-icon>
                </div>
                <div class="controller__btn" @click="toggleMute">
                    <font-awesome-icon :icon="['fas', 'volume-up']"
                                       v-if="isMuted"></font-awesome-icon>
                    <font-awesome-icon :icon="['fas', 'volume-mute']" v-else></font-awesome-icon>
                </div>
                <div class="controller__timer">
                    {{videoTime}}
                </div>
                <div class="controller__btn controller__btn--fullscreen" @click="toggleFullscreen">
                    <font-awesome-icon :icon="['fas', 'expand']"></font-awesome-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    function secToTimer(originalSec) {
        const min = Math.floor(originalSec / 60);
        const sec = Math.floor(originalSec % 60);
        const minStr = min < 10 ? `0${min}` : String(min);
        const secStr = sec < 10 ? `0${sec}` : String(sec);
        return `${minStr}:${secStr}`;
    }

    export default {
        name: "MyVideo",
        props: [
            'videoSrc',
        ],
        data() {
            return {
                video: null,
                isPaused: true,
                isMuted: false,
                videoTime: '00:00 / 00:00',
            };
        },
        methods: {
            toggleFullscreen() {
                const isFullscreen = document.webkitIsFullScreen || document.fullscreen;
                if (isFullscreen) {
                    const exitFunc = document.exitFullscreen || document.webkitExitFullscreen;
                    exitFunc.call(document);
                } else {
                    const element = this.$refs.vcontainer;
                    const fullscreenFunc = element.requestFullscreen || element.webkitRequestFullScreen;
                    fullscreenFunc.call(element);
                }
            },
            handleTimeUpdate() {
                this.videoTime = this.refreshTime();
            },
            refreshTime() {
                if (!this.video) {
                    return `${secToTimer(0)} / ${secToTimer(0)}`;
                }
                const currTime = this.video.currentTime || 0;
                const duration = this.video.duration || 0;
                return `${secToTimer(currTime)} / ${secToTimer(duration)}`;
            },
            togglePlaying() {
                if (this.video.paused) {
                    this.playVideo();
                } else {
                    this.pauseVideo();
                }
            },
            stopPlaying() {
                this.video.currentTime = 0;
                this.pauseVideo();
            },
            toggleMute() {
                this.video.muted = !this.video.muted;
                this.isMuted = this.video.muted;
            },
            handleEnd() {
                this.pauseVideo();
            },
            playVideo() {
                this.isPaused = false;
                this.video.play();
            },
            pauseVideo() {
                this.isPaused = true;
                this.video.pause();
            },
        },
        mounted() {
            this.video = this.$refs.v;
        },
    };
</script>

<style scoped>
    .video {
        position: relative;
    }

    .video__player {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .controller {
        flex-direction: column;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    .controller__btn-wrapper {
        position: relative;
        height: calc(100% - 5px);
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0 18px;
    }

    .controller__btn {
        cursor: pointer;
        transition: 0.5s;
        margin: 0 20px;
    }

    .controller__btn:hover {
         color: #409eff;
    }

    .controller__timer {
        margin-left: 15px;
    }

    .controller__btn--fullscreen {
        position: absolute;
        right: 15px;
    }
</style>
