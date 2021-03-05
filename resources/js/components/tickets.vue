<template>
    <div id="ticket" class="ticket" >
        <div class="tabs">

            <!-- I have no clue why but it won't work without this... -->
            <ul style="display: none">
                <li v-for="ticket in tickets" :key="ticket.id"></li>
            </ul>

            <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">Nove poruke</a>
            <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Stare poruke</a>
            
        </div>
        <div class="form">
            <div v-if="activetab === 1" class="tabcontent">
                <div v-for="unprocessedTicket in unprocessedTickets" :key="unprocessedTicket.id">
                    <p>
                        <router-link :to="`/projekti/fsre_rwa/2020/g11/ticket/${unprocessedTicket.id}`" target="_blank"><span class="pointer">{{ unprocessedTicket.title }}</span></router-link>
                        <b-icon-check-circle @click="processTicket(unprocessedTicket)" class="ikona"></b-icon-check-circle>
                    </p>
                </div>
            </div>
            <div v-if="activetab === 2" class="tabcontent">
                <div v-for="processedTicket in processedTickets" :key="processedTicket.id">
                    <p>
                        <router-link :to="`/projekti/fsre_rwa/2020/g11/ticket/${processedTicket.id}`" target="_blank"><span class="pointer">{{ processedTicket.title }}</span></router-link>
                        <b-icon-trash  @click="trashTicket(processedTicket)" class="ikona"></b-icon-trash>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                activetab: 1,
                tickets: {   
                },
                processedTickets: {
                },
                unprocessedTickets: {
                }
            }
        },
        methods:{
            processTicket(ticketData) {
                let id = ticketData.id;
                axios.post(`/projekti/fsre_rwa/2020/g11/api/tickets/${id}/process`, ticketData).then(()=>{
                    this.$router.go()
                })
            },
            trashTicket(ticketData) {
                let id = ticketData.id;
                axios.post(`/projekti/fsre_rwa/2020/g11/api/tickets/${id}/trash`, ticketData).then(()=>{
                    this.$router.go()
                })
            }


        },
        mounted() {
            let k = 0;
            let z = 0;
            axios.get('/projekti/fsre_rwa/2020/g11/api/tickets').then((res)=>{
                this.tickets = res.data
                for(let i = 0; i < res.data.length; i++) {
                    if (res.data[i].trashed == 0) {
                        if (res.data[i].processed == 0) {
                        this.unprocessedTickets[k++] = res.data[i]
                        } else {
                            this.processedTickets[z++] = res.data[i]
                        }
                    }
                }
            });
        }
    }

</script>

<style scoped>
.ikona{
    float:right;
    cursor: pointer;
    margin:5px;
}
.ticket {
    position: relative;
    max-width: 1000px;
    padding: 8% 0 0;
    margin: auto;
}
.tabs {
    overflow: hidden;
    margin-left: 20px;
    margin-bottom: -2px; 
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}
.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
    text-decoration: none;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}
.tabs a.active {
    background-color: #4CAF50;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}
.form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 1000px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form p {
    text-align:left;
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #c4c4be;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px; 
}
.pointer{
    cursor: pointer;
}
.error-message {
    display: block;
    padding-bottom: 10px;
    color: red;
}
</style>