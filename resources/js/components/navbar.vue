<template >
    <nav>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="topnav">
                        <b-nav-item ><a><router-link class="active" to="/projekti/fsre_rwa/2020/g11/" exact>Naslovna</router-link></a></b-nav-item>
                        <b-nav-item ><a><router-link class="active" to="/projekti/fsre_rwa/2020/g11/about" exact>O nama</router-link></a></b-nav-item>
                        <b-nav-item ><a><router-link class="active" to="/projekti/fsre_rwa/2020/g11/contact" exact>Kontakt</router-link></a></b-nav-item>
                        <b-nav-item ><a v-if=" loggedin && isAdmin"><router-link to='/projekti/fsre_rwa/2020/g11/tickets' exact>Tickets</router-link></a></b-nav-item>
                        <b-nav-item ><a v-if=" loggedin && isAdmin"><router-link to='/projekti/fsre_rwa/2020/g11/addArticle' exact>Add an Article</router-link></a></b-nav-item>
                    </b-navbar-nav>
                
                    <b-navbar-nav class="ml-auto" >
                        <b-nav-form right v-if="!loggedin">
                            <a><router-link to="/projekti/fsre_rwa/2020/g11/login" exact>Prijava</router-link></a>
                            <a><router-link to="/projekti/fsre_rwa/2020/g11/register" exact>Registracija</router-link></a>
                        </b-nav-form>

                        <b-nav-form v-else>
                            <a @click="mojProfil();"><router-link :to="`/projekti/fsre_rwa/2020/g11/profile/${this.user.id}`">Profil</router-link></a>
                            <a @click.prevent="logout"><router-link to="/projekti/fsre_rwa/2020/g11/home">Log out</router-link></a>
                        </b-nav-form>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </nav>
</template>

<script>
    export default{
        data(){
            return{
                loggedin: 0,
                isAdmin: 0,
                user: null,
            }
        
        },
        methods: {
            logout(){
                axios.post('/projekti/fsre_rwa/2020/g11/api/logout').then(()=>{
                })
                this.$router.push('/')
                this.$router.go()
            },
            mojProfil() {
                window.location.href = "/projekti/fsre_rwa/2020/g11/profile/" + this.user.id
            },
        },
        mounted() {
            axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                this.user = res.data

                //If the currently logged in user is banned, then log them out and redirect to a site.
                if(this.user.isBanned == 1) {
                    axios.post('/projekti/fsre_rwa/2020/g11/api/logout').then(()=>{
                        alert('Zabranjen vam je pristup uslugama stranice. Za više informacija, kontaktirajte nas.');
                        this.$router.push('banned');
                        this.$router.go(); 
                    })
                }
                //If the current session has a logged in user, display the logout button. Also check if the user is an admin.
                if (this.user.name != null) {
                    this.loggedin = 1
                    if (this.user.role > 0) {
                        this.isAdmin = 1
                    }
                }
                //If the user is not logged in then the request will return an error
            }).catch(error=>{
                this.loggedin = 0
            });
        },
    }

</script>

<style scoped>
.navbar.navbar-dark.bg-dark{
    background-color: #4CAF50!important;
}
.ml-auto{
  background-color: #4CAF50;
    overflow: hidden;
}
.ml-auto a{
  float: left;
  background-color: #4CAF50;
  color: #f2f2f2;
  text-align: center;
  padding: 10px 12px;
  text-decoration: none;
  font-size: 25px;
}
.ml-auto a:hover{
  background-color: #ddd;
  color: black;
}
.ml-auto a:active{
  color: white;
}
.topnav {
    background-color: #4CAF50;
    overflow: hidden;
}
.topnav a {
  float: left;
  background-color: #4CAF50;
  color: #f2f2f2;
  text-align: center;
  padding: 7px 6px;
  text-decoration: none;
  font-size: 25px;
}
.topnav a:hover {
  background-color: #ddd;
  color: black !important;
}
.topnav a.active {
  
  color: white;
}
.topnav-right {
  float: right;
  
}
</style>