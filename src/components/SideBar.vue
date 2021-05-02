<template>
  <div>
    <main>
      <div class="sidebar">
        <div class="link-area">
          <p><router-link to="/" class="sidebar-link">Top</router-link></p>
          <br />
          <p><router-link to="/Help" class="sidebar-link">Help</router-link></p>
          <br />
          <p>
            <router-link to="/About" class="sidebar-link">About</router-link>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
<style>
div {
  flex-direction: column;
  position: left;
  background-color: white;
  height: 100%;
  position: fixed;
  width: 1%;
  box-sizing: border-box;
  padding-left: 0.5%;
}

.link-area {
  padding-top: 0%;
  padding-right: 5%;
}

.sidebar-link {
  color: #808782;
  font-size: 2.1rem;
  margin-bottom: 5%;
  text-decoration: none;
}

.sidebar-link:hover {
  color: #5ecfd1;
}

@media screen and (max-width: 1100px) {
  .link-area {
    padding-right: 3%;
  }
  .sidebar-link {
    font-size: 1.2rem;
  }
}
</style>
