<template>
    <div id="artikl" class="artikl">
        <div class="form">
            <form class="contact-form" >

                <p id="choosePic">Izaberite sliku artikla ovdje.</p>
                <input type="file" name="file" id="slika" @change="uploadImage"/>
                <span v-if="imageMissing" class="error-message">Slika artikla je obavezna.</span>

                <input type="text" placeholder="Naziv artikla" v-model="form.title" />
                <span v-if="errors.title" class="error-message">{{errors.title[0]}}</span>

                <input type="text" placeholder="Kratki opis" v-model="form.description" />
                <span v-if="errors.description" class="error-message">{{errors.description[0]}}</span>

                <input type="number" placeholder="Cijena (u KM)" v-model="form.price" />
                <span v-if="errors.price" class="error-message">{{errors.price[0]}}</span>

                <textarea class="box" placeholder="Detaljni opis artikla i dodatne informacije" v-model="form.more_info"></textarea>
                <span v-if="errors.more_info" class="error-message">{{errors.more_info[0]}}</span>

                <div>
                    <button @click.prevent="submitArticle" type="submit">Postavi artikal</button>
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
                photo: null,
                imageMissing: null,

                form:{
                    title: '',
                    description: '',
                    more_info: '',
                    price: '',
                },
                errors: []
            }
        },
        methods:{
            //This function saves the image so that we can send it properly with the rest of the form
            uploadImage(event) {
                this.photo = event.target.files[0];
            },

            submitArticle() {
                //This checks if there is an image to be sent. If not, the backend will automatically have a seizure so we just have to let the user know what they did wrong
                if(this.photo == null) {
                    this.imageMissing = 1;
                }

                //This block of code reads the data the user wants to submit, and then groups it with the image
                let articleInfo = new FormData();
                articleInfo.append('title', this.form.title);
                articleInfo.append('description', this.form.description);
                articleInfo.append('more_info', this.form.more_info);
                articleInfo.append('price', this.form.price);
                articleInfo.append('created_by', this.user.id); //This line binds the article to an admin that created it
                articleInfo.append('photo', this.photo);

                axios.post('/projekti/fsre_rwa/2020/g11/api/addArticle', articleInfo).then(() =>{
                    this.$router.push({ name: "home"});
                }).catch((error) =>{
                    this.errors = error.response.data.errors;
                });
            },
        },
        mounted() {
            axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                this.user = res.data;
            });
        },
    }
</script>

<style scoped>
    #choosePic {
        margin-top: 50px;
        font-size: 18px;
    }
    /* The following block removes the arrows from the input type="number" for this page */
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
    .artikl {
        width: 1000px;
        padding: 8% 0 0;
        margin: auto;
    }
    .box{
        height: 200px;
        width: 900px;
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