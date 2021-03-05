<template>
    <b-container fluid>
        <div id="profile" class="profile">
            <b-row>
                <b-col>
                    <div class="slika">
                        <img id="pfp" alt="Profile Picture" class="profilepic"/>
                        <h1><span id="name"></span></h1>
                        <p>Email: <span id="email"></span></p>
                        <p>Dob: <span id="dob"></span></p>
                        <p>Spol: <span id="spol"></span></p>
                        <p>Prebivalište: <span id="prebivaliste"></span></p>
                        <router-link v-if="canEdit" class="al" :to="`/projekti/fsre_rwa/2020/g11/editProfile/${this.info[0].id}`" ><button class="button" type="button">Edit</button></router-link>

                        <span v-if="userIsAdmin">
                            <button v-if="!profileIsBanned && !profileIsSuperAdmin" @click.prevent="banUser" class="admbutton" type="button"><a class="al" href="#">Ban</a></button>
                            <button v-if="profileIsBanned && !profileIsSuperAdmin" @click.prevent="unbanUser" class="admbutton" type="button"><a class="al" href="#">Unban</a></button>
                            <button v-if="!profileIsAdmin && !profileIsSuperAdmin" @click.prevent="adminUser" class="admbutton" type="button"><a class="al" href="#">Make Admin</a></button>
                            <button v-if="profileIsAdmin && !profileIsSuperAdmin" @click.prevent="unadminUser" class="admbutton" type="button"><a class="al" href="#">Unmake Admin</a></button>
                        </span>
                    </div>
                </b-col>

                <b-col>
                    <br />
                    <br />
                    <div class="subs">
                        <h3>Pretplaćeni artikli</h3>

                        <div class="display">
                            <p v-for="article in subscribedArticles" :key="article.id">
                                <a :id="'article_' + article.id" href="#" target="_blank">{{article.title}}</a><b-icon-x-circle v-if="canEdit" @click="unsubscribe(article.id)" class="ikona"></b-icon-x-circle>
                            </p>

                            <p id="notSubscribed" v-if="!subscribedArticles"><b>Niste pretplaćeni ni na jedan artikal</b></p>

                        </div>
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <div class="opis">
                    <h1 class="maca">O meni</h1>
                    <div class="textbox">
                        <pre id="message">
                            
                        </pre>
                    </div>
                </div>
            </b-row>
        </div>
    </b-container>
</template>

<script>

export default {
    data () {
        return {
            user: null,
            info: null,
            subscribedArticles: null,
            canEdit: 0,
            profileIsBanned: 0,
            profileIsAdmin: 0,
            userIsAdmin: 0,
            profileIsSuperAdmin: 0,
        }
    },
    methods: {
        //Unsubscribes the user from an article
        unsubscribe(articleId) {
            axios.post(`/projekti/fsre_rwa/2020/g11/api/unsubscribe/${articleId}`, null, { params: {userId: this.user.id} }).then( () => {
                location.reload();
            })
        },

        //Admin action functions
        banUser() {
            axios.post(`/projekti/fsre_rwa/2020/g11/api/banUser/${this.info[0].id}`).then( (res) => {
                alert('Korisniku je zabranjen pristup stranici.');
                this.$router.go();
            });
        },
        unbanUser() {
            axios.post(`/projekti/fsre_rwa/2020/g11/api/unbanUser/${this.info[0].id}`).then( (res) => {
                alert('Korisniku je ponovno dozvoljen pristup stranici.');
                this.$router.go();
            });
        },
        adminUser() {
            axios.post(`/projekti/fsre_rwa/2020/g11/api/adminUser/${this.info[0].id}`).then( (res) => {
                alert('Korisnik je sada administrator stranice.');
                this.$router.go();
            });
        },
        unadminUser() {
            axios.post(`/projekti/fsre_rwa/2020/g11/api/unadminUser/${this.info[0].id}`).then( (res) => {
                alert('Korisnik više nije administrator stranice.');
                this.$router.go();
            });
        },
    },

    mounted() {
        //Get the currently viewed profile ID and store it in a variable to send to this.axios request
        let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
        let profileId = parseInt(allNumbers[allNumbers.length - 1], 10);

        //Gets the data for the user
        axios.get('/projekti/fsre_rwa/2020/g11/api/user').then( (res) => {
            this.user = res.data;

            //Check if the user is an admin
            if (this.user.role > 0) {
                this.userIsAdmin = 1;
            }
            
            //Get the info of the currently viewed profile
            axios.get(`/projekti/fsre_rwa/2020/g11/api/profile/${profileId}`).then( (res) => {
                this.info = res.data;

                //Gets the details of which articles the user has subscribed themselves to
                axios.get(`/projekti/fsre_rwa/2020/g11/api/subscribedArticles/${profileId}`).then( (result) => {
                    this.subscribedArticles = result.data;

                    //Each article redirects to its main page
                    if (this.subscribedArticles != 0) {
                        this.subscribedArticles.forEach( article => {
                            //Needs to wait a negligible amount of time before trying to access the associated "<href>" tags because the v-for needs time to create them
                            setTimeout(() => {
                                document.getElementById("article_" + article.id).href=`/projekti/fsre_rwa/2020/g11/viewArticle/${article.id}`;
                            }, 0);
                        })
                    }
                });

                //Check if the user profile is banned or is an admin
                if (this.info[0].isBanned == 0) {
                    this.profileIsBanned = 0;
                } else {
                    this.profileIsBanned = 1;
                }
                if (this.info[0].role > 0) {
                    this.profileIsAdmin = 1;
                    //If the user is a superadmin (site owner) do not let anyone ban or unadmin them
                    if (this.info[0].role == 2) {
                        this.profileIsSuperAdmin = 1;
                    }
                } else {
                    this.profileIsAdmin = 0;
                }

                //If the user profile exists (page is a valid number)
                if(this.info != 0) {
                    //Gets the avatar for the current user profile from storage
                    if (this.info[0].avatar != null) {
                        document.getElementById('pfp').src=`/projekti/fsre_rwa/2020/g11/storage/images/${this.info[0].avatar}`;
                    } else {
                        //If there is none then display the default picture
                        document.getElementById('pfp').src=`/projekti/fsre_rwa/2020/g11/storage/images/default_image.jpg`;
                    }

                    //If the currently logged in user is on their own profile or is an admin, show the edit profile button
                    if(this.info[0].id == this.user.id || this.user.role > 0) {
                        this.canEdit = 1;
                    }
                    
                    //Fills up the page with the user's details
                    document.getElementById("email").innerText = this.info[0].email;
                    document.getElementById("name").innerText = this.info[0].name;
                    if (this.info[0].age == undefined) {
                        document.getElementById("dob").innerText = "Nije navedeno";
                    } else {
                        document.getElementById("dob").innerText = this.info[0].age;
                    }
                    if (this.info[0].gender == undefined) {
                        document.getElementById("spol").innerText = "Nije navedeno";
                    } else {
                        document.getElementById("spol").innerText = this.info[0].gender;
                    }
                    if (this.info[0].location == undefined) {
                        document.getElementById("prebivaliste").innerText = "Nije navedeno";
                    } else {
                        document.getElementById("prebivaliste").innerText = this.info[0].location;
                    }
                    if (this.info[0].message == undefined) {
                        document.getElementById("message").innerText = "Korisnik nema dodatnih informacija.";
                    } else {
                        document.getElementById("message").innerText = this.info[0].message;
                    }
                } else {
                    //^ If the user page doesn't exist
                    this.$router.push('/projekti/fsre_rwa/2020/g11/notFound')
                }

            });
        });
    },
}
</script>
<style scoped>
.maca{
    margin-left: 60px;
}
.omeni{
  margin-left: 50px;
}
#notSubscribed {
    text-align: center;
}
.ikona{
  float:right;
  cursor: pointer;
  margin:5px;
}
.profile{
  position: relative;
  display: block;
  margin-top: 30px;
}
.profilepic{
  max-width: 250px;
  max-height: 250px;
  margin: auto;
}
.slika {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 280px;
  min-height: 280px;
  text-align: center;
  font-family: arial;
  padding: 15px;
  margin:auto ;
  
}
.textbox{
font-family: arial;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
width:100%;
max-width: 1600px;
max-height: 600px;
height: 500px;
padding: 12px 20px;
box-sizing: border-box;
border: 2px solid #ccc;
border-radius: 4px;
overflow:auto;
word-wrap: break-word;
display:block;
margin-left: 40px;
margin-right: 40px;
margin-bottom: 30px;
white-space: pre-wrap;
word-wrap: break-word;
text-align: justify;
}
.pre{
  width:100%;
  font-family: Arial, Helvetica, sans-serif;
}

.opis{
    width: 1600px;
    max-width: 100%;
    margin: auto;
    display:block;
    position:relative;
}
.subs{
  max-width:100%;
  max-height: 100%;
  display:block;
  margin: auto;
  z-index: 1;
  background: #FFFFFF;
  max-width: 900px;
  margin: 50px auto 150px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  overflow:auto;
  margin-right: 120px;
  margin-top: 40px;
  
}
.subs p{
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
  overflow: hidden;
}
.subs a{
  color: black;
  text-decoration: none;
}

button {
  border: solid ;
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

.admbutton {
  border: solid ;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #1270ec;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.al {
     color: white;
     text-decoration: none;
     }
</style>