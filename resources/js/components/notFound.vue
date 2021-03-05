<template>
  <div id="errorpage" class="errorpage">

      <div class="error">

         <img src="/projekti/fsre_rwa/2020/g11/storage/images/notFound.jpg" class="err">
         <h1>Error: Stranica ne postoji</h1>
         <h3>Kako bi ste se vratili na naslovnu stranicu kliknite <a href="/projekti/fsre_rwa/2020/g11/">ovdje</a></h3>

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
.errorpage {
  position: relative;
  padding: 8% 0 0;
  margin: auto;
}
.error {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 400px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

h3 {
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
.err{
  text-align: center;
  display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  font-family: arial;
  max-width:100%;
  max-height:100%;
  
}
a{
    text-decoration: none;
}

</style>