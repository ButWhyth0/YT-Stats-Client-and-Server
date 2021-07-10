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
            <input type="text" v-model="chanName" name="chanName" class="rounded-l-full border-gray-400 text-lg font-Poppins h-12 titleWidth:w-108 w-72 border-solid border-l border-t border-b px-5" placeholder="Enter channel name or ID">
            <button type="submit" class="h-12 bg-red-600 text-white hover:bg-red-500 active:bg-red-700 rounded-r-full border-gray-400 pl-6 pr-7" id="post_button"><i class="fas fa-search fa-lg"></i></button>
        </form>

        <span v-if="showError" id="error_message" class="w-120 bg-red-200 bg-opacity-100 text-center font-Poppins font-light text-xl text-red-700 rounded-lg border border-red-400 p-4 mt-8 mx-auto" >{{errMsg}}</span>
    </div>
</div>
<!-- shows the logo and name of the found channel -->
<div id="channel_box" v-if="showBoxes" class="bg-gray-100 flex flex-row justify-center items-center p-3 mb-4 mx-auto">
        <img :src="pic" alt="channel thumbnail" class="h-16 rounded-full">
        <h1 class="text-4xl text-black font-Poppins pb-1 ml-5">{{name}}</h1>
</div> 

  <!-- List that contains all the boxes that display info -->
<div id="box_container" v-if="showBoxes" class="grid auto-row grid-cols-1x600px lg:grid-cols-3x600px 3xl:grid-cols-4x600px 4xl:grid-cols-5x600px gap-8 justify-around px-8">

    <div id="sub_box" v-if="showBoxes" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">SUBSCRIBERS</h4>
        <p class="text-6xl body"><b class="font-normal">{{subs.number}}</b>{{subs.letter}}</p>
    </div>

    <div id="view_box" v-if="showBoxes" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">TOTAL VIEWS</h4>
        <p class="text-6xl body"><b class="font-normal">{{views.number}}</b>{{views.letter}}</p>
    </div>

    <div id="video_box" v-if="showBoxes" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">TOTAL VIDEOS</h4>
        <p class="text-6xl body"><b class="font-normal">{{vidNum.number}}</b>{{vidNum.letter}}</p>
    </div>

    <div id="date_box" v-if="showBoxes" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">CREATION DATE & TIME</h4>
        <p class="text-3xl body font-normal whitespace-nowrap mx-auto">{{date}}<br>{{time}}</p>
    </div>

    <div id="url_box" v-if="showBoxes" class="box box-padding flex flex-col max-h-47">
        <div class="flex flex-row items-center mx-auto mb-2">
            <h4 class="inline-block title text-xl text-opacity-50 ml-8">CUSTOM URL</h4>
            <a :href="'https://youtube.com/channel/'+id" target="_blank" class="block h-6 w-6 text-gray-400 opacity-60 hover:opacity-100 items-center rounded-md ml-4">
                <img id="web_link" class="h-4 ml-1 mt-1" src="/src/assets/web_link_icon.svg">
            </a>
        </div>

        <p v-if="longName===false" class="body font-normal text-3xl text-center break-words mx-auto" >youtube.com/<wbr>{{url}}</p>
        <p v-else-if="longName===true" class="body font-normal text-3xl text-center break-all mx-auto" >youtube.com/<wbr>{{url}}</p>
    </div>
    
    <div id="country_box" v-if="showBoxes" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">COUNTRY</h4>
        <p class="text-6xl body">{{country}}</p>
    </div>
    
    <div id="description_box" v-if="showBoxes" class="box box-padding lg:col-span-3 3xl:col-span-2 4xl:col-span-3 overflow-y-auto">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">DESCRIPTION</h4>
        <p class="text-2xl body font-normal text-left">{{about}}</p>
    </div>
    
</div>
</template>

<script>
import axios from 'axios';



export default {
  name: 'App',
  data() {
    return {
      errMsg: '',
      chanName: '',
      pic: '',
      name: '',
      id: '',
      subs: {
        number: '',
        letter: '',
      },
      views: {
        number: '',
        letter: '',
      },
      vidNum: {
        number: '',
        letter: '',
      },
      date: '',
      time: '',
      url: '',
      country: '',
      about: '',
      showBoxes: false,
      showError: false,
      longName: false,
    }
  },
  methods: { 
    async getStats(event) {

      //Prevents the form from submitting a post request
      event.preventDefault();
      try {
        const {data} = await axios(`http://localhost:5500/api/getStats/${this.chanName}`)
        const {channelSubs,channelViews,channelNumOfVids,channelName,channelCreationDate,channelCreationTime,channelURL,channelCountry,channelAbout,channelID,hiddenSubs,channelPicURL} = data;

        // console.log(channelName,channelSubs,channelViews,channelNumOfVids,channelName,channelCreationDate,channelCreationTime,channelURL,channelCountry,channelAbout,channelID,hiddenSubs,channelPicURL);

        // If name of channel is longer than 15 chars, will add breakpoints between every character, instead of just every word
        if(channelURL.length>15) {
          this.longName = true;
        } else {
          this.longName = false;
        }

        // Data boxes will be shown, and error boxes will be removed from page
        this.showBoxes = true;
        this.showError = false;

        this.pic = channelPicURL;
        this.name = channelName;
        this.id = channelID;

        // Inserting the sub number and letter
        this.subs.number = channelSubs.replace(/M|K|B/i, letter => '');
        this.subs.letter = channelSubs.split('').some(char => char === 'M' || char === 'K' || char === 'B') ? 
          channelSubs.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '';

        // Inserting the views number and letter
        this.views.number = channelViews.replace(/M|K|B/i, letter => '');
        this.views.letter = channelViews.split('').some(char => char === 'M' || char === 'K' || char === 'B') ? 
          channelViews.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '';

        // Inserting the vidNum number and letter
        this.vidNum.number = channelNumOfVids.replace(/M|K/i, letter => '');
        this.vidNum.letter = channelNumOfVids.split('').some(char => char === 'M' || char === 'K' || char === 'B') ?
          channelNumOfVids.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '';
        
        // Inserting the rest of the data
        this.date = channelCreationDate;
        this.time = channelCreationTime;
        this.url = channelURL;
        this.country = channelCountry;
        this.about = channelAbout;

        
        
      } catch (err) {
        
        // Error box will be shown, and data boxes will be removed from page
        this.showError = true;
        this.showBoxes = false;
        // console.log(`There was an error!\n`,err);

        // If the channel name field is empty
        if(this.chanName==='') {
          console.log('No inserted channel name',err.response);
          this.errMsg = `Channel name cannot be empty`;

        // If matchable name is entered
        } else {
          console.log('Not real channel name',err);
          this.errMsg = err.response.data.msg;
          this.chanName = '';
        }
      }
    }
  },
   
}



</script>