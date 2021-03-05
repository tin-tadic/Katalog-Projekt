<template>
    <div>
        <div class="form"> 
            <form class="login-form" >
                <img class="slika" id="picture" />
                <br />
                <p id="title">Naziv</p>
                <p class="opis" id="desc">Kratki opis</p>
                <p>Cijena: <span id="price"></span></p>
                <p class="box">Detaljni opis: <br /><br /> <span id="more_info"></span></p>
                <div class="mar">
                  <a class="but" v-if="loggedIn && !isSubscribed" @click="subscribeMe()">Pretplati se na artikl</a>
                  <a class="but" v-if="loggedIn && isSubscribed" @click="unsubscribeMe()">Ukini pretplatu</a>
                  <a id="editIt" v-if="userIsAdmin"><span>Edit article</span></a>
                  <a id="deleteIt" v-if="userIsAdmin" @click="deleteArticle()"><span>Delete article</span></a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
  
    data () {
        return {
            info: null,
            user: null,
            loggedIn: 0, /*Controls the visibility of the subscribe/unsubscribe buttons*/
            isSubscribed: 0, /*Controls the visibility of the subscribe/unsubscribe buttons*/
            userIsAdmin: 0,
        }
    },
    methods: {
      subscribeMe(){
        axios.post(`/projekti/fsre_rwa/2020/g11/api/subscribe/${this.info[0].id}`, null, { params: { userId: this.user.id } }).then( (res) => {
          alert("Uspješno ste se pretplatili na artikal.");
          location.reload();
        })
      },
      unsubscribeMe(){
        axios.post(`/projekti/fsre_rwa/2020/g11/api/unsubscribe/${this.info[0].id}`, null, { params: { userId: this.user.id } }).then( (res) => {
          alert("Više niste pretplaćeni na artikal.");
          location.reload();
        })
      },
      deleteArticle(){
        axios.post(`/projekti/fsre_rwa/2020/g11/api/deleteArticle/${this.info[0].id}`).then( (res) => {
          alert("Artikal uspješno obrisan!");
          this.$router.push('/projekti/fsre_rwa/2020/g11/notFound');
        });
      }
    },
    mounted() {
        //Get the ID of the currently viewed article
        let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
        let articleId = parseInt(allNumbers[allNumbers.length - 1], 10);

        //Checks if the user is an admin
        axios.get(`/projekti/fsre_rwa/2020/g11/api/user`).then( (res) => {
            this.loggedIn = 1;
            this.user = res.data;
            if (this.user.role > 0) {
                //Controls the visibility of the "Edit Article" button
                this.userIsAdmin = 1;
                setTimeout( () => {
                  document.getElementById("editIt").href=`/projekti/fsre_rwa/2020/g11/editArticle/${articleId}`;
                }, 0);
            }

            //Checks if the user is already subscribed to the article
            axios.get(`/projekti/fsre_rwa/2020/g11/api/isSubscribed/${articleId}`, { params: { userId: this.user.id } }).then( (res) => {
              console.log(res.data);
              if (res.data == 0) {
                this.isSubscribed = 0;
              } else {
                this.isSubscribed = 1;
              }
            });

        });
    
        //Fetches the appropriate details of the currently viewed article
        axios.get(`/projekti/fsre_rwa/2020/g11/api/viewArticle/${articleId}`).then((res)=>{
            this.info = res.data;
            //Check if the article page exists
            if (this.info != 0) {
                document.getElementById("title").innerText = this.info[0].title;
                document.getElementById("desc").innerText = this.info[0].description;
                document.getElementById("price").innerText = this.info[0].price;
                document.getElementById("more_info").innerText = this.info[0].more_info;
                document.getElementById('picture').src=`/projekti/fsre_rwa/2020/g11/storage/articles/${this.info[0].picture}`;
            } else {
                //^ If the article page doesn't exist
                this.$router.push('/projekti/fsre_rwa/2020/g11/notFound');
            }
        }).catch( (error) => {
            this.$router.push('/projekti/fsre_rwa/2020/g11/notFound');
        });

    },//endmounted
}
</script>

<style scoped>
.mar{
  margin-top: 25px;
}
.but{
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #4CAF50;
  width:100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  text-decoration: none;
  color:white;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  text-transform: uppercase;
}
.opis{
    height: 100px;
}
.slika{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  text-align: center;
  font-family: arial;
  overflow: hidden;
  margin-bottom: 30px;
  
}

.open {
  width: 9000px;
  padding: 8% 0 0;
  margin: auto;
}
.box{
    height: 200px;
    max-width: 1000px;
    text-align: left;
}
.form {
  position: relative;
  margin: 40px auto 40px;
  z-index: 1;
  background: #FFFFFF;
  max-width: 1000px;
  padding: 35px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form p {
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
#editIt {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #1270ec;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  text-decoration: none;
}
#deleteIt {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: red;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  text-decoration: none;
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
</style>
