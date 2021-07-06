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
        <form action="/" method="post" class="flex flex-row mx-auto">
            <input type="text" name="channelName" class="rounded-l-full border-gray-400 text-lg font-Poppins h-12 titleWidth:w-108 w-72 border-solid border-l border-t border-b px-5" placeholder="Enter channel name or ID">
            <button type="submit" class="h-12 bg-red-600 text-white hover:bg-red-500 active:bg-red-700 rounded-r-full border-gray-400 pl-6 pr-7" id="post_button"><i class="fas fa-search fa-lg"></i></button>
        </form>

    </div>
</div> 
</template>

<script setup>

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>