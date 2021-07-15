<template>
    <div id="date_box" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">CREATION DATE & TIME</h4>
        <p class="text-3xl body font-normal whitespace-nowrap mx-auto">{{date}}<br>{{time}}</p>
    </div>
</template>

<script>
export default {
    name: 'DateBox',
    props: {
        date: String,
        time: String,
    }
}
</script>