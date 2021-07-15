<template>
    <div id="description_box" class="box box-padding lg:col-span-3 3xl:col-span-2 4xl:col-span-3 overflow-y-auto">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">DESCRIPTION</h4>
        <p class="text-2xl body font-normal text-left" v-html="about.replace(/\n+/g, lineBreak => '__' ).split('__').join('<br>')"></p>
    </div>

</template>

<script>
export default {
    name: 'AboutBox',
    props: {
        about: String,
    }
}
</script>