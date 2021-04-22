<template>
  <div class="top">
    <h1>TwinC</h1>
    <main>
        <div class="localNavigation">
        <ul>
          <li><router-link to="/Top">Top</router-link></li>
          <li><router-link to="/Help">Help</router-link></li>
        </ul>
        </div>
        <div class="content">
            <p>コンテンツ</p>
        </div>
    </main>
  </div>
</template>

<style scoped>

h1 {
  color: white;
  background-color: green;
}

.top{
    display: flex;
    flex-direction: column;
}

main{
    min-height: 100vh;
    display: flex;
    margin-top: 10px;
}

.content{
    flex: 1;
    background-color: white;
    text-align: center;
    margin-left: 10px;
}

.localNavigation{
    width: 150px;
    text-align: center;
    background-color: white;
    color: black;
}

</style>
