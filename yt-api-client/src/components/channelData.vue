<template>
    <!-- shows the logo and name of the found channel -->
    <div id="channel_box" class="bg-gray-100 flex flex-row justify-center items-center p-3 mb-4 mx-auto">
        <img :src="data.channelPicURL" alt="channel thumbnail" class="h-16 rounded-full">
        <h1 class="text-4xl text-black font-Poppins pb-1 ml-5">{{data.channelName}}</h1>
    </div> 

      <!-- List that contains all the boxes that display info -->
    <div id="box_container" class="grid auto-row grid-cols-1x600px lg:grid-cols-3x600px 3xl:grid-cols-4x600px 4xl:grid-cols-5x600px gap-8 justify-around px-8">
    
        <FirstThreeBoxes id="sub_box" title="SUBSCRIBERS" :number="subs.number" :letter="subs.letter"/>

        <FirstThreeBoxes id="view_box" title="TOTAL VIEWS" :number="views.number" :letter="views.letter"/>
        
        <FirstThreeBoxes id="video_box" title="TOTAL VIDEOS" :number="totalVideos.number" :letter="totalVideos.letter"/>

        <DateBox :date="data.channelCreationDate" :time="data.channelCreationTime"/>

        <UrlBox :id="data.channelID" :url="data.channelURL" :longName="longName" :urlExists="urlExists"/>

        <CountryBox :country="data.channelCountry"/>

        <AboutBox :about="data.channelAbout"/>

    </div>

</template>

<script>
import FirstThreeBoxes from './firstThreeBoxTemplate.vue';
import DateBox from './dateBox.vue';
import UrlBox from './urlBox.vue';
import CountryBox from './countryBox.vue';
import AboutBox from './descriptionBox.vue';

export default {
    name: "ChannelData",
    data() {
        return {
            
        }
    },
    components: {
        FirstThreeBoxes,
        DateBox,
        UrlBox,
        CountryBox,
        AboutBox,
    },
    props: {
        subs: Object,
        views: Object,
        totalVideos: Object,
        data: Object,
        longName: Boolean,
        urlExists: Boolean,
    },
    methods: {
       
    }
}
</script>