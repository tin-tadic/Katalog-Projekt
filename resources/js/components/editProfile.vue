<template>
    <div id="profile-edit" class="profile">
        <div class="slika">
            <img id="pfp" alt="Profile Picture" class="profilepic" />

            <input type="file" @change="uploadAvatar" class="inpoot" />

            
            <h1 id="name"></h1>
            <span>Email: <input v-model="form.email" type="email" placeholder="Vaš email..." /></span>
            <span v-if="errors.email" class="error-message">{{errors.email[0]}}</span>
            <br />
            <span>Dob: <input v-model="form.age" type="number" id="dob" placeholder="Vaša dob..."/></span>
            <span v-if="errors.age" class="error-message">{{errors.age[0]}}</span>
            <br />
            <span>Spol: <input  v-model="form.gender" type="text" id="spol" placeholder="Vaš spol..."/></span>
            <span v-if="errors.gender" class="error-message">{{errors.gender[0]}}</span>
            <br />
            <span>Prebivalište: <input  v-model="form.location" type="text" id="drzava" placeholder="Vaše prebivalište..."/></span>
            <span v-if="errors.location" class="error-message">{{errors.location[0]}}</span>
            <br />
            <br />
            <button @click.prevent="editProfile" class="button" type="button">Spremi promjene</button>
        </div>

        <div class="opis">
            <h1>O meni</h1>
                <textarea v-model="form.message" class="textbox" placeholder="Napišite nešto o sebi" ></textarea>
        
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            photo:null,

            user: null,
            info: null,
            canEdit: 0,
            form: {
                email: '',
                age: '',
                gender : '',
                location: '',
                message: '',
            },
            errors: [],
        }
    },
    methods:{
           editProfile(){
                //Get the currently editing profile
                let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
                let profileId = parseInt(allNumbers[allNumbers.length - 1], 10);
                axios.post(`/projekti/fsre_rwa/2020/g11/api/profile/${profileId}`, this.form).then(() =>{
                    this.$router.go(); 
                }).catch((error) =>{
                    this.errors = error.response.data.errors;
                    })
            },
            uploadAvatar(event) {
                this.photo = event.target.files[0]
                let data = new FormData()
                //Get the currently viewed profile ID and store it in a variable to send to this.axios request
                let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
                let profileId = parseInt(allNumbers[allNumbers.length - 1], 10);

                data.append('photo', this.photo)
                axios.post(`/projekti/fsre_rwa/2020/g11/api/uploadAvatar/${profileId}`, data).then(()=> {
                    this.$router.go();
                })
            }
            
        },

    mounted() {
        this.avatarImageUrl = this.avatarUrl

        //Here we first load the user data for the profile we are looking at, so that we may change it
        //Get the currently viewed profile ID and store it in a variable to send to this.axios request
        let allNumbers = window.location.href.replace(/[^0-9]/g, ' ').trim().split(/\s+/);
        let profileId = parseInt(allNumbers[allNumbers.length - 1], 10);

            axios.get('/projekti/fsre_rwa/2020/g11/api/user').then((res)=>{
                this.user = res.data;

                //Checks if the user is an admin or the current user!
                //If not redirec them back so one user can't edit another's settings!
                if(this.user.id == profileId || this.user.role > 0) {
                    console.log(this.user)
                } else {
                    this.$router.push('/notFound');
                    this.$router.go();
                }

                axios.get(`/projekti/fsre_rwa/2020/g11/api/profile/${profileId}`).then((res)=>{
                    this.info = res.data;
                    //Gets the avatar for the current user profile from storage
                    if (this.info[0].avatar != null) {
                        document.getElementById('pfp').src=`/projekti/fsre_rwa/2020/g11/storage/images/${this.info[0].avatar}`
                    } else {
                        //If there is none then display the default picture
                        document.getElementById('pfp').src=`/projekti/fsre_rwa/2020/g11/storage/images/default_image.jpg`
                    }

                    this.form.email = this.info[0].email;
                    document.getElementById("name").innerText = this.info[0].name;

                    //If the user profile exists (page is a valid number)
                    if(this.info != 0) {
                        if (this.info[0].age == undefined) {
                            this.form.age = "";
                        } else {
                            this.form.age = this.info[0].age;
                        }
                        if (this.info[0].gender == undefined) {
                            this.form.gender = "";
                        } else {
                            this.form.gender = this.info[0].gender;
                        }
                        if (this.info[0].location == undefined) {
                            this.form.location = "";

                        } else {
                            this.form.location = this.info[0].location;
                        }
                        if (this.info[0].message == undefined) {
                            this.form.message = "";
                        } else {
                            this.form.message = this.info[0].message;
                        }
                    }
                }).catch((error) => {
                    //If there is no user with the given ID attribute then redirect to not found
                    this.$router.push('/projekti/fsre_rwa/2020/g11/notFound');
                    this.$router.go();
                });
            });
        },
}
</script>

<style scoped>
.profile{
  position: relative;
  display: block;
  margin-top: 30px;
}
.inpoot{
    max-width: 200px;
}
.slika {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: auto;
    text-align: center;
    font-family: arial;
    float:left;
    margin-left:15px;
}
.profilepic{
  max-width: 250px;
  max-height: 250px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.textbox{
   font-family: arial;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
   width:1000px;
   max-width:100%;
   max-height: 600px;
   height: 600px;
   padding: 12px 20px;
   box-sizing: border-box;
   border: 2px solid #ccc;
   border-radius: 4px;
   overflow:auto;
   word-wrap: break-word;
   display:block;
}
.opis{
    max-width:100%;
    float: right;
    display:block;
    position:relative;
}
button {
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
</style>