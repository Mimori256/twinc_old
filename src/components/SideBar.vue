<template>
  <div>
    <main>
        <div class="sidebar">
          <div class="link-area">
            <p><router-link to="/" class="sidebar-link">Top</router-link></p><br>
            <p><router-link to="/Help" class="sidebar-link">Help</router-link></p>
          </div>
        </div>
    </main>
  </div>
</template>
<style>
div{
    flex-direction: column;
    position: left;
    background-color: white;
    height: 100%;
    width: 1%; 
    position: fixed; 
    box-sizing: border-box;
    padding-left: 0.8%; 
}

.link-area {
  padding-top: 10px;
  padding-right: 100px;
}

.sidebar-link {
  color: #808782;
  font-size: 30px;
  padding-bottom: 50px;
  text-decoration: none;
}

.sidebar-link:hover {
  color: #5ecfd1;
}


</style>
