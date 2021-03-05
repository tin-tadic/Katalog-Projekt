<template>
    <div id="onama">
        <div class="main">
            <h2 class="t t1">Stjepan Jonjić</h2>
            <img class="mi" src="/projekti/fsre_rwa/2020/g11/storage/images/Stjepan.jpg"  width="400" height="400">
            <p class="text">Ja sam Stjepan Jonjić, imam 22 godine i student sam računarstva na FSRE(Fakultet strojarstva,računarstva i elektrotehnike) u Mostaru.
                Osnovnu skolu (desetu) i srednju(gimnaziju) također sam pohađao u Mostaru. Na ovaj fakultet sam se odlučio prvenstveno iz razloga što mi je se činilo jedino zanimljivo od svih opcija koje sam gledao. Čitav svoj život sam radio nešto sa kompjuterima i uvijek sam se pitao kako je to sve napravljeno i na koji način funkcionira.
            </p>
            <br>
            <h2 class="t">Tin Tadić</h2>
            <img class="mi" src="/projekti/fsre_rwa/2020/g11/storage/images/Tin.jpg"  width="400" height="400">
            <p class="text">Ja sam Tin Tadić i imam 21 godinu (za sad) i student sam računarstva na Fakultetu Strojarstva, Računarstva, i Elektronike na SUM-u Mostar. Rođen i živim u Mostaru gdje sam pohađao svo školovanje do sada.
                Vannastavno sam išao u Centar za Tehničku Kulturu Mostar gdje sam naučio osnove programiranja i počeo se zanimati za svijet programiranja i izrade web stranica. Danas predajem na istim radionicama koje sam i ja pohađao prije par godina.
                U slobodno vrijeme slušam muziku, igram videoigre, i probam naučiti nešto više o velikom svijetu programiranja i programskih jezika.
                Ovaj sam projekt odabrao isključivo radi izazova stvaranja programa koji ispunjava sve elemente moje vizije i nadam se da ću uspjeti naučiti što više iz njega.
            </p>
            <h2 class="t">Marin Azinović</h2>
            <img class="mi" src="/projekti/fsre_rwa/2020/g11/storage/images/marin.jpg"  width="400" height="400">
            <p class="text">Ja sam Marin Azinović, imam 21 godinu i student sam računarstva. Studiran u Mostaru, gdje sam i rođen,idem na Fakultet Strojarstva Računarstva i Elektrotehnike.
                Osnovnu i srednju školu (Gimnaziju) sam također pohađao u Mostaru. Glavni hobiji su mi: gaming,treniranje,povijest i omiljeni sport mi je MMA. 
                Odlučio sam ići na ovaj fakultet jer mi se sviđa rad sa tehnologijom i volio bi na njem steći neko osnovno znaje (i diplomu naravno ;) ) što će mi tad neki temelj za učenje programerskih vještina. 
            </p>
            <br>
            <br>
        </div>

        <div class="tehnologije">
            <h1>Korištene tehnologije</h1>
            <div class="logos">
                <b-row>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/HTML5.png" >
                <p>HTML</p>
                </b-col>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/css3.png" >
                <p>CSS</p>
                </b-col>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/VueB.png" >
                <p>Bootstrap-Vue</p>
                </b-col>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/Vue.png" >
                <p>Vue JS</p>
                </b-col>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/Laravel.png" >
                <p>Laravel</p>
                </b-col>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/sql.png" >
                <p>MySQL</p>
                </b-col>
                <b-col><img src="/projekti/fsre_rwa/2020/g11/storage/images/axios.png" >
                <p>Axios</p>
                </b-col>
                </b-row>
            </div>
      </div>

      <div id="vizija">
          <p>Link za download vizije je <a href="https://mega.nz/file/R9Y2DTzT#FhlWtHla4YNO_0zXIVMOBbfJ502PZy50QvrBUcxSwtE" target="_blank">ovdje</a></p>
      </div>

        <div class="footer">
                    
        </div>
    </div>
</template>

<script>
    export default {
        components:{
        
        },
        data () {
            return {
            
            }
        }
    }
</script>

<style scoped>
    /* Separates top one from the nav a bit */
    .t1 {
        margin-top: 30px;
    }
    #vizija {
        text-align: center;
    }

    .tehnologije{
        text-align: center;
        position: relative;
        margin: auto;
        padding: 10px;
        width:100%;
        max-width: 950px;
    }
.logos{
  border: 8px solid #4CAF50;
  padding: 15px 15px 0px 15px;
}
.logos img{
  margin:auto;
  display: block;
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
}
    .main {
        text-align: center;
        position: relative;
        background-color: rgba(255,255,255,0.5);
        overflow:auto;
    }
    .mi {
        border: 8px solid #4CAF50;
        overflow: hidden;
        word-wrap: break-word;
        max-width:100%;
        max-height:100%;
    }
    .text{
       overflow:auto;
       box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); 
       position: center;
       font-family: "Times New Roman", Times, serif;
       font-size: large;
       max-width:800px;
       max-height:100%;
       margin: auto;
       margin-top: 15px;
       margin-bottom: 30px;
    }
    .t {
        font-family: "Times New Roman", Times, serif;
    }
    .t3 { 
        border: 2px outset #4CAF50;
        font-family: "Times New Roman", Times, serif;
        font-size: large;
    }
    .main {
        background-color: #f8fafc;
    }
</style>
