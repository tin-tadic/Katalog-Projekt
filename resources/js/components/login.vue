<template>

    <div id="login" class="login-page">
        <div class="form">
            <div class="login-form">
                <input placeholder="Email" type="email" v-model="form.email">
                <span v-if="errors.email" class="error-message">{{errors.email[0]}}</span>
            </div>
            <div>
                <input placeholder="Password" type="password" v-model="form.password" name="password">
                <span  v-if="errors.password" class="error-message">{{errors.password[0]}}</span>
            </div>
            <div>
                <a @click.prevent="loginUser" href="/projekti/fsre_rwa/2020/g11/"><button @click.prevent="loginUser" type="submit">Log in</button></a>
            </div>
            <p class="message">Niste registrirani? <a><router-link to="/projekti/fsre_rwa/2020/g11/register" exact>Napravite račun</router-link></a></p>
        </div> 
    </div>

</template>

<script>

    export default {
        data(){
            return{
                form:{
                    email: '',
                    password: ''
                },
                errors: []
            }
        },
        methods:{
            loginUser(){
                axios.post('/projekti/fsre_rwa/2020/g11/api/login', this.form).then(() =>{
                    this.$router.push('/')
                    this.$router.go()
                }).catch((error) =>{
                    this.errors = error.response.data.errors;
                })
            }
        }
    }

</script>

<style scoped>
    .login-page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
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
    .container {
        position: relative;
        z-index: 1;
        max-width: 300px;
        margin: 0 auto;
    }
    .container:before, .container:after {
        content: "";
        display: block;
        clear: both;
    }
    .container .info {
        margin: 50px auto;
        text-align: center;
    }
    .container .info h1 {
        margin: 0 0 15px;
        padding: 0;
        font-size: 36px;
        font-weight: 300;
        color: #1a1a1a;
    }
    .container .info span {
        color: #4d4d4d;
        font-size: 12px;
    }
    .container .info span a {
        color: #000000;
        text-decoration: none;
    }
    .container .info span .fa {
        color: #EF3B3A;
    }
    body {
        background: #76b852; 
        background: -webkit-linear-gradient(right, #76b852, #8DC26F);
        background: -moz-linear-gradient(right, #76b852, #8DC26F);
        background: -o-linear-gradient(right, #76b852, #8DC26F);
        background: linear-gradient(to left, #76b852, #8DC26F);
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;      
    }
    .error-message {
        display: block;
        padding-bottom: 10px;
        color: red;
    }
</style>