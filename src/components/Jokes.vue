<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center mt-5">Jokes</h1>
            </v-col>
            <v-col cols="12" v-for="joke of jokes" :key="joke.id">
                <Joke :joke="joke"/>
            </v-col>
        </v-row>
        <v-row class="mt-5 mb-5">
            <v-col cols="12">
                <h1 class="text-center">Search</h1>
            </v-col>
            <v-col cols="12">
                <v-text-field
                        v-model="search"
                        @keyup="searchJoke"
                        placeholder="Type..."
                        :loading="loading"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-if="searchResult.length" cols="12">
                <h4>{{searchResult.length}} Results</h4>
            </v-col>
            <v-col cols="12" lg="3" sm="4" v-for="joke of paginated" :key="joke.id">
                <Joke :joke="joke"/>
            </v-col>
        </v-row>
        <v-row v-if="searchResult.length" class="mb-5 mt-5">
            <v-col cols="12">
                <div class="text-center">
                    <v-pagination
                            v-model="pagination.page"
                            :length="pagination.count"
                            circle
                    ></v-pagination>
                </div>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Joke from "./parts/Joke"

    export default {
        name: 'Jokes',
        components: {
            Joke
        },
        data: () => ({
            pagination: {
                limit: 12,
                page: 1,
                count: 0
            },
            baseUrl: 'https://api.chucknorris.io/',
            jokes: [],
            loading: false,
            search: '',
            searchResult: [],
        }),
        mounted() {
            for (let i = 0; i < 3; i++) {
                this.$http.get(`${this.baseUrl}jokes/random`)
                    .then(response => {
                        if (response.data) {
                            this.jokes.push(response.data)
                        }
                    })
            }
        },
        methods: {
            searchJoke() {
                if (!this.search.length) {
                    this.searchResult = [];
                    return
                }
                if (this.search.length >= 3 && this.search.length < 120) {
                    this.loading = true;
                    this.pagination.page = 1;
                    this.$http.get(`${this.baseUrl}jokes/search?query=${this.search}`)
                        .then(response => {
                            if (response.data && response.data.result) {
                                this.searchResult = response.data.result;
                                this.pagination.count = Math.ceil(this.searchResult.length / this.pagination.limit);
                            }
                            this.loading = false;
                        })
                }
            }
        },
        computed: {
            paginated() {
                const offset = (this.pagination.page * this.pagination.limit) - this.pagination.limit;
                return this.searchResult.filter((item, index) => index >= offset && index < offset + this.pagination.limit);
            }
        }
    }
</script>
