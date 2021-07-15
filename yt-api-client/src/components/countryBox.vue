<template>
    <div id="country_box" class="box box-padding max-h-47">
        <h4 class="title text-xl text-opacity-50 mb-2 mx-auto">COUNTRY</h4>
        <p class="text-6xl body">{{country}}</p>
    </div>
</template>

<script>
export default {
    name: 'CountryBox',
    props: {
        country: String,
    }
}
</script>