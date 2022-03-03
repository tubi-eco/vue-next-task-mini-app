<template>
    <div>
         <input v-model="searchQuery" autocomplete="off" />
    </div>
</template>
<script>
export default {
name:"SearchBar",
    data(){
        return{
            searchQuery: null,
            items: []
        }
    },
    computed: {
        resultQuery() {
        if (this.searchQuery) {
            return this.items.filter(item => {
            return this.searchQuery
                .toLowerCase()
                .split(" ")
                .every(v => item.title.toLowerCase().includes(v));
            });
            } else {
                return this.items;
            }
        }
    }
}
</script>
