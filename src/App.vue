<template>
    <div id="app">
        <my-video :video-src="exampleVideo"></my-video>
    </div>
</template>

<script>
    import MyVideo from "./components/MyVideo";
    export default {
        name: 'app',
        components: {MyVideo},
        data() {
            return {
                exampleVideo: require('./assets/video/example.mp4'),
            }
        }
    };
</script>

<style>

</style>
