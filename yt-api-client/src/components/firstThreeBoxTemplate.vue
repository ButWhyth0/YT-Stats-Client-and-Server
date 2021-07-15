<template>
    <div :id="divID" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">{{title}}</h4>
        <p class="text-6xl body"><b class="font-normal">{{number}}</b>{{letter}}</p>
    </div>

</template>

<script>
export default {
    name: 'FirstThreeBoxes',
    props: {
        title: String,
        divID: String,
        number: String,
        letter: String,
    }
}
</script>