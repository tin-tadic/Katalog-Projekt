<template>
    <div id="kontakt" class="kontakt">
        <div class="form"> 
            <form class="contact-form" >
                <input type="text" placeholder="Ime" v-model="form.name" />
                <span v-if="errors.name" class="error-message">{{errors.name[0]}}</span>

                <input type="text" placeholder="Prezime" v-model="form.lastname" />
                <span v-if="errors.lastname" class="error-message">{{errors.lastname[0]}}</span>

                <input type="email" placeholder="Email adresa" v-model="form.email" />
                <span v-if="errors.email" class="error-message">{{errors.email[0]}}</span>

                <input type="text" placeholder="Broj Telefona (optional)" v-model="form.phone"/>
                <span v-if="errors.phone" class="error-message">{{errors.phone[0]}}</span>

                <input type="text" placeholder="Naslov" v-model="form.title"/>
                <span v-if="errors.title" class="error-message">{{errors.title[0]}}</span>
                <br />

                <textarea class="box" placeholder="Napišite poruku" v-model="form.message"></textarea>
                <span v-if="errors.message" class="error-message">{{errors.message[0]}}</span>

                <div>
                    <button @click.prevent="sendMessage" type="submit">Pošaljite poruku</button>
                </div>
                
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                user: null,

                form:{
                    name: '',
                    lastname: '',
                    phone: '',
                    email: '',
                    message: '',
                    title: '',
                },
                errors: []
            }
        },
        methods:{
            sendMessage(){
                axios.post('/projekti/fsre_rwa/2020/g11/api/contact', this.form).then(() =>{
                    alert("Poruka uspješno poslana!");
                    this.$router.push({ name: "home"}); 
                }).catch((error) =>{
                    this.errors = error.response.data.errors;
                    })
            },
        },
        mounted() {
            axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                this.user = res.data;
                this.form.email = this.user.email;
            });
        },
    }
</script>

<style scoped>
    .kontakt {
        max-width: 1000px;
        padding: 8% 0 0;
        margin: 0 auto 100px;
        position: relative
    }
    .box{
    max-width: 100%;
    max-height: 100%;
    height: 200px;
    width: 920px;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 1000px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #4CAF50;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
        background: #43A047;
    }
    .form .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
    }
    .form .message a {
        color: #4CAF50;
        text-decoration: none;
    }
    .form .register-form {
        display: none;
    }
    
    .error-message {
        display: block;
        padding-bottom: 10px;
        color: red;
    }
</style>