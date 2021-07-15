<template>

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
</template>

<script>
export default {
    name: 'UrlBox',
    props: {
        id: String,
        url: String,
        longName: Boolean,
        urlExists: Boolean,
    }
}
</script>