<template>
    <div id="errorbanned" class="errorbanned">
          <div class="ban">

            <img src="/projekti/fsre_rwa/2020/g11/storage/images/banned.jpg" class="banic">
            <h1>Vi ste bannani sa stranice</h1>
            <p>
                Ako ste se pokušali logirati i preusmjereni ste na ovu stranicu, onda vam je trajno zabranjen pristum uslugama stranice.  
            </p>
            
          </div>
    </div>
</template>

<script>


export default {
  
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
.errorbanned {
  position: relative;
  padding: 8% 0 0;
  margin: auto;
}
.ban {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 800px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  
}


.banic{
  text-align: center;
 display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 800px;
  font-family: arial;
  max-width:100%;
  max-height:100%;
  overflow: hidden;
  
}

</style>