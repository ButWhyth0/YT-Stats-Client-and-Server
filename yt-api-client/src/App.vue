<template>
  <nav class="h-12 bg-red-600 drop-shadow-lg flex flex-row p-3 items-center">
    <a href="/"><img src="./assets/yt_logo_mono_dark.png" alt="yt_logo_mono_dark.png" class="inline h-6"></a>
    <span class="text-white text-xl font-Poppins font-medium ml-2 mt-2">Data API v3</span>
  </nav>

<!-- title and input for user -->
<div class="bg-gray-100 shadow-inner w-full items-center pt-6 pb-3 mx-0">   
    <h1 class="text-6xl font-black font-Poppins text-black text-center my-4" >CHANNEL STATS RETRIEVER</h1>
    <hr class="mx-auto w-1/2 border-someGray border-opacity-50 border-transparent">

    <div class="max-w-screen-sm flex flex-col justify-center px-6 py-4 mx-auto my-4 ">

        <!-- Sub-heading, telling user what to input into the form -->
        <h4 class="text-black text-opacity-50 text-xl font-normal font-Poppins mx-auto mb-6">Please enter channel name or ID: </h4>

        <!-- Form where user inputs name of channel, and presses button to submit search -->
        <form @submit="getStats" class="flex flex-row mx-auto">
            <input type="text" v-model="enteredName" name="enteredName" class="rounded-l-full border-gray-400 text-lg font-Poppins h-12 titleWidth:w-108 w-72 border-solid border-l border-t border-b px-5" placeholder="Enter channel name or ID">
            <button type="submit" class="h-12 bg-red-600 text-white hover:bg-red-500 active:bg-red-700 rounded-r-full border-gray-400 pl-6 pr-7" id="post_button"><i class="fas fa-search fa-lg"></i></button>
        </form>
        
        <ErrorBox :errorMessage="errorMessage" v-if="showError"/>

    </div>
</div>

  <ChannelData v-if="showBoxes" :subs="subs" :views="views" :totalVideos="totalVideos" :data="boxData" :longName="longName" :urlExists="urlExists"/>

</template>

<script>
import axios from 'axios';
import ErrorBox from './components/errorBox.vue';
import ChannelData from './components/channelData.vue';



export default {
  name: 'App',
  components: {
    ErrorBox,
    ChannelData,
  },
  data() {
    return {
      errorMessage: '',
      enteredName: '',
      subs: {},
      views: {},
      totalVideos: {},
      showBoxes: false,
      showError: false,
      longName: false,
      urlExists: true,
      boxData: {},
    }
  },
  methods: { 
    async getStats(event) {

      //Prevents the form from submitting a post request
      event.preventDefault();

      try {
        const {data} = await axios(`http://localhost:5500/api/getStats/${this.enteredName}`)
        const {channelSubs,channelViews,channelNumOfVids,channelURL,hiddenSubs,channelAbout} = data;

        this.boxData = data;

        this.enteredName = '';

        // If name of channel is longer than 15 chars, will add breakpoints between every character, instead of just every word
        if(channelURL.length>15) {
          this.longName = true;
        } else {
          this.longName = false;
        }

        // Data boxes will be shown, and error boxes will be removed from page
        this.showBoxes = true;
        this.showError = false;

        // If the sub count is hidden
        if(hiddenSubs) {
          this.subs.letter = 'Hidden';
        // If the sub count is not hidden
        } else {
          // Inserting the sub number and letter
          this.subs.number = channelSubs.replace(/M|K|B/i, letter => '');
          this.subs.letter = channelSubs.split('').some(char => char === 'M' || char === 'K' || char === 'B') ? 
            channelSubs.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '';
        }

        // Inserting the views number and letter
        this.views.number = channelViews.replace(/M|K|B/i, letter => '');
        this.views.letter = channelViews.split('').some(char => char === 'M' || char === 'K' || char === 'B') ? 
          channelViews.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '';

        // Inserting the totalVideos number and letter
        this.totalVideos.number = channelNumOfVids.replace(/M|K/i, letter => '');
        this.totalVideos.letter = channelNumOfVids.split('').some(char => char === 'M' || char === 'K' || char === 'B') ?
          channelNumOfVids.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '';
        
        if(channelURL==='N/A') {
          this.urlExists = false;
        } else {
          this.urlExists = true;
        }
        
      } catch (err) {
        // Error box will be shown, and data boxes will be removed from page
        this.showError = true;
        this.showBoxes = false;

        // If the channel name field is empty
        if(this.enteredName==='') {
          this.errorMessage = `Channel name cannot be empty`;
          
        // If matchable name is entered
        } else {
          this.errorMessage = err.response.data.msg;
          this.enteredName = '';
        }
      }
    }
  },
}
</script>