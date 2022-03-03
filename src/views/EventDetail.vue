<template>
    <div class="content-details">
        <a class="back-btn" @click="$router.go(-1)"> Back</a>
        <div class="container">
            <div v-for="item in items" :key="item.id">
                <div class="row" v-if="$route.params.id === item.id">
                    <h1>Details</h1>
                    <div class="col-lg-4 col-sm-12">
                        <div class="title">{{item.name}}</div>
                        <div><img :src="item.images[0].url"></div>
                    </div>
                    <div class="col-lg-8 col-sm-12 event-detail">
                        <div><b>Start Ticket Sale :</b> {{ format_date(item.sales.public.startDateTime) }}</div>
                        <div><b>Event Start Date :</b> {{item.dates.start.localDate}} / {{ item.dates.start.localTime}}</div>
                        <div><b>Place :</b> {{item.dates.timezone}}</div>
                        <div>
                            <b>Info : </b> 
                                <span v-if="item.info !== null && item.pleaseNote !== null">{{item.info}}</span>
                                <span v-if="item.info == null">{{item.pleaseNote}}</span>
                                <span v-if="item.info == null && item.pleaseNote == null">There is no infos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
</template>
<script> 
import axios from 'axios'
import moment from 'moment'

export default {
    name:"EventDetail",
    data(){
        return{
            items:[]
        }
    },
    computed:{
        eventId(){
            return parseInt(this.$route.params.id)
        },
        event(){
            return items.item.find(item => item.id === this.eventId)
        }
    },
    methods:{
        loadEventItems (){
            let apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
            let apiKey = 'NmSFfEUc9Lj1It3W99Oxoz55UOfvOaNG'
            axios
            .get(`${apiUrl}?apikey=${apiKey}`)
            .then(response => {
                this.items = response.data._embedded.events
            })
            .catch(error => console.log(error))
        },
        format_date(value){
         if (value) {
           return moment(String(value)).format('MM-DD-YYYY hh:hh')
          }
        }
    },
    created(){
        this.loadEventItems();
    }
}
</script>
<style lang="scss" scoped>
    .content-details{
        width: 90%;
        margin: 20px auto 20px;
        .title{
            font-size:22px;
            font-weight: 700;
            margin-bottom:10px;
        }
        img{
            width: 100%;
            border-radius: 4px;
        }
        .col-4,.col-sm-12{
            padding-left: 0;
        }
        .event-detail{
            padding-top: 41px;
            div{
                background: rgb(240, 240, 240);
                padding: 10px;
                margin-bottom: 5px;
                 border-radius: 4px;
            }
        }
    }
    .back-btn{
        border:1px solid rgb(116, 116, 116);
        color:#2d4156;
        border-radius:4px;
        padding:5px 10px;
        text-decoration: none;
        cursor:pointer;
        &:hover{
            background: rgb(116, 116, 116);
            color: #fff;
        }
    }
</style>