<template>
    <!-- shows the logo and name of the found channel -->
    <div id="channel_box" class="bg-gray-100 flex flex-row justify-center items-center p-3 mb-4 mx-auto">
        <img :src="pic" alt="channel thumbnail" class="h-16 rounded-full">
        <h1 class="text-4xl text-black font-Poppins pb-1 ml-5">{{name}}</h1>
    </div> 

      <!-- List that contains all the boxes that display info -->
    <div id="box_container" class="grid auto-row grid-cols-1x600px lg:grid-cols-3x600px 3xl:grid-cols-4x600px 4xl:grid-cols-5x600px gap-8 justify-around px-8">
    
        <div id="sub_box" class="box box-padding max-h-47">
            <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">SUBSCRIBERS</h4>
            <p class="text-6xl body"><b class="font-normal">{{subsNumber}}</b>{{subsLetter}}</p>
        </div>
        
        <div id="view_box" class="box box-padding max-h-47">
            <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">TOTAL VIEWS</h4>
            <p class="text-6xl body"><b class="font-normal">{{viewsNumber}}</b>{{viewsLetter}}</p>
        </div>
        
        <div id="video_box" class="box box-padding max-h-47">
            <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">TOTAL VIDEOS</h4>
            <p class="text-6xl body"><b class="font-normal">{{totalVideosNumber}}</b>{{totalVideosLetter}}</p>
        </div>
    
        <div id="date_box" class="box box-padding max-h-47">
            <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">CREATION DATE & TIME</h4>
            <p class="text-3xl body font-normal whitespace-nowrap mx-auto">{{date}}<br>{{time}}</p>
        </div>

        <div id="url_box" class="box box-padding flex flex-col max-h-47">
            <div class="flex flex-row items-center mx-auto mb-2">
                <h4 class="inline-block title text-xl text-opacity-50 ml-8">CUSTOM URL</h4>
                <a :href="'https://youtube.com/channel/'+id" target="_blank" class="block h-6 w-6 text-gray-400 opacity-60 hover:opacity-100 items-center rounded-md ml-4">
                    <img id="web_link" class="h-4 ml-1 mt-1" src="/src/assets/web_link_icon.svg">
                </a>
            </div>
            
            <p v-if="longName===false && urlExists=== true" class="body font-normal text-3xl text-center break-words mx-auto" >youtube.com/<wbr>{{url}}</p>
            <p v-if="longName===false && urlExists=== false" class="body font-light text-6xl text-center mx-auto" >N/A</p>
            <p v-if="longName===true && urlExists=== true" class="body font-normal text-3xl text-center break-all mx-auto" >youtube.com/<wbr>{{url}}</p>
        </div>

        <div id="country_box" class="box box-padding max-h-47">
            <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">COUNTRY</h4>
            <p class="text-6xl body">{{country}}</p>
        </div>

        <div id="description_box" class="box box-padding lg:col-span-3 3xl:col-span-2 4xl:col-span-3 overflow-y-auto">
            <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">DESCRIPTION</h4>
            <p class="text-2xl body font-normal text-left">{{about}}</p>
        </div>

    </div>

</template>

<script>
export default {
    name: "ChannelData",
    props: {
        name: String,
        pic: String,
        subsNumber: Number,
        subsLetter: String,
        viewsNumber: Number,
        viewsLetter: String,
        totalVideosNumber: Number,
        totalVideosLetter: String,
        date: String,
        time: String,
        id: String,
        longName: Boolean,
        urlExists: Boolean,
        url: String,
        country: String,
        about: String,
    },
}
</script>