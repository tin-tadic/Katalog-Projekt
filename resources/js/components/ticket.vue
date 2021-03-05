<template>
    <div id="ticket-open" class="open">

        <div class="form"> 

            <h4 id="title">Naslov</h4>

            <p>Ime: <span id="firstname">Nije određeno</span></p>
            
            <p>Prezime: <span id="lastname">Nije određeno</span></p>


            <p>Email: <span id="email">Nije određeno</span></p>

            <p>Broj Telefona: <span id="phone">Nije određeno</span></p>
            
            
            <div class="textbox">
                <pre id="message">
                    Ako vidite ovaj ekran, osvježite stranicu.
                </pre>
            </div>

            <button v-if="!processed" @click.prevent="processTicket" class="button" type="button">Postavi kao odgovoreno</button>



        </div>

    </div>
</template>

<script>

export default {
  
    data () {
        return {
            ticket: null,
            processed: 0,
        }
    },
    methods: {
        processTicket() {
            //Get the currently viewed profile ID and store it in a variable to send to this.axios request
            let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
            let ticketId = parseInt(allNumbers[allNumbers.length - 1], 10);
            axios.post(`/projekti/fsre_rwa/2020/g11/api/tickets/${ticketId}/process`, ticketId).then(()=>{
                this.$router.push('/projekti/fsre_rwa/2020/g11/')
                this.$router.go()
            }).catch((error)=>{
                console.log(error)
            })
        },
    },
    mounted() {
        let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
        let ticketId = parseInt(allNumbers[allNumbers.length - 1], 10);
        axios.get(`/projekti/fsre_rwa/2020/g11/api/ticket/${ticketId}`).then((res)=>{
            this.ticket = res.data
            document.getElementById("title").innerText = this.ticket[0].title
            document.getElementById("firstname").innerText = this.ticket[0].name
            document.getElementById("lastname").innerText = this.ticket[0].lastname
            document.getElementById("email").innerText = this.ticket[0].email
            document.getElementById("message").innerText = this.ticket[0].message
            if (this.ticket[0].processed == 1) {
                this.processed = 1
            }
        }).catch((error) => {
            this.$router.push('/projekti/fsre_rwa/2020/g11/notFound')
        })
    },
}
</script>

<style scoped>
.open {
  max-width: 1000px;
  padding: 8% 0 0;
  margin: 0 auto 100px;
  position: relative;
}
.box{
    height: 200px;
    width: 900px;
    max-width:100%;
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
.textbox{
    font-family: arial;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 910px ;
    max-width:100%;
    height: 500px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    overflow:auto;
}
.form pre{
    word-wrap: break-word;
    text-align: left;
    overflow: auto;
}
.button {
    margin-top: 30px;
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #4CAF50;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
}
</style>