<template>
    <v-card elevation="2">
        <v-card-title>
            <img :src="joke.icon_url" :alt="joke.value">
        </v-card-title>
        <v-card-text>
            {{joke.value}}
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Joke",
        props: ['joke']
    }
</script>
