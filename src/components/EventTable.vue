<template>
    <Loader :loading="showLoader" />
    <input v-model="searchQuery" autocomplete="off" class="searchInput" placeholder="Search events by name..."/>
    <div :current-page="page" @filtered="onFiltered" class="table-responsive">
            <table  v-if="items.length" class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Cover</th>
                        <th scope="col">Name</th>
                        <th scope="col">Info</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredEvents" :key="item.id">
                        <td>
                            <img :src="item.images[0].url">
                        </td>
                        <td class="col-md-2">{{item.name}}</td>
                        <td>
                            <span v-if="item.info !== null && item.pleaseNote !== null">{{item.info}}</span>
                            <span v-if="item.info == null">{{item.pleaseNote}}</span>
                            <span v-if="item.info == null && item.pleaseNote == null">There is no infos</span>
                        </td>
                        <td class="col-md-2">
                            <span v-for="(value, key) in item.priceRanges" :key="key.id">
                                    <b>Min : </b> {{value.currency.replace('USD', '$')}}{{value.min.toFixed(2)}} <br>
                                    <b>Max : </b>{{value.currency.replace('USD', '$')}}{{value.max.toFixed(2)}} 
                            </span>
                            <span v-if="item.priceRanges == null">
                                    Price range not defined yet.
                            </span>
                        </td>
                        <td>
                            <router-link class="detail-btn" :to="{name:'event.detail', params:{id: item.id}}">Details</router-link>

                            <a @click="$router.push({name: 'events', params: {id: item.id} })" ></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="items === 0">No event found!</div>
    </div>
    <Pagination v-if="items" :total-pages="totalPages" :per-page="recordsPerPage" :current-page="page" @pagechanged="onPageChange" />
</template>
<script>
import axios from 'axios'
import Loader from './Loader.vue'
import Pagination from './Pagination.vue'
export default {
    name: 'EventTable',
    props: ['filter', 'currentPage'],
    components:{
        Pagination,
        Loader
    },
    data () {
     return {
        items:[],
        showLoader: false,
        page: 1,
        totalPages: 0,
        totalRecords: 0,
        recordsPerPage: 5,
        enterpage: '',
        searchQuery:'',
     }
    },
    created () {
        this.loadEventItems();
      
    },
    computed:{
      replace(st, rep, repWith) {
        const result = st.split(rep).join(repWith)
        return result;
      },
      
      filteredEvents (){
        if(this.searchQuery){
        return this.items.filter((item)=>{
            return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        })
        }else{
            return this.items;
        }
       }
    },
    methods:{
        loadEventItems (){
            this.showLoader = true;
            let apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
            let apiKey = 'NmSFfEUc9Lj1It3W99Oxoz55UOfvOaNG'
            axios
            .get(`${apiUrl}?apikey=${apiKey}&page=${this.page}&size=${this.recordsPerPage}`)
            .then(response => {
                this.showLoader = false
                this.items = response.data._embedded.events
                this.totalPages = Math.floor(response.data.page.totalPages / this.recordsPerPage) // Calculate total records
                this.totalRecords = response.data._embedded
            })
            .catch(error => console.log(error))
        },
        onPageChange (page) {
            this.page = page
            this.loadEventItems()
        },
        onChangeRecordsPerPage () {
            this.loadEventItems()
        },
        gotoPage () {
            if (!isNaN(parseInt(this.enterpage))) {
                this.page = parseInt(this.enterpage)
                this.loadEventItems()
            }
        },
        onFiltered(filteredItems) {
          this.totalRecords = filteredItems.length
      }
    }
}
</script>

<style lang="scss" scoped>
.table{
    width: 90%;
    margin: 20px auto 20px;
    th{
        --bs-table-accent-bg: rgb(249 249 249);
    }
    tr{
        &:hover{
            --bs-table-hover-bg: rgb(189 189 189 / 8%);
        }
    }
    td{
        border-color: #e6f1e8;
        img{
            width: 100px;
            border-radius: 3px;
        }
        .detail-btn{
            background: #32a84b;
            padding:8px 10px;
            color:#fff;
            text-decoration: none;
            font-size:14px;
            border-radius: 0.25rem;
            font-weight: 700;
            cursor: pointer;
            &:hover{
                background: #1a8030;
            }
        }
    }
}
.searchInput{
    width: 90%;
    margin: 20px auto 0;
    display: inherit;
    padding:10px;
    font-size: 14px;
    border:1px solid #ccc;
    border-radius: 3px;
}
</style>