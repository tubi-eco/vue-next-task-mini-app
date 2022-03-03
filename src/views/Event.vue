<template>
    <EventTable :currentPage="page"></EventTable>
</template>
<script>
import EventTable from '../components/EventTable.vue'
export default {
    name: 'EventList',
    components: {
        EventTable
    },
    data () {
     return {
        page: 1,
        filter: '',
        filterOn: [],
     }
    },
    computed:{
      replace(st, rep, repWith) {
        const result = st.split(rep).join(repWith)
        return result;
      },
    }
}
</script>

