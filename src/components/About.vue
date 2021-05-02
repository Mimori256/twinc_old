<template>
  <transition appear>
    <div class="about">
      <div class="content" align="center">
        <h1>About</h1>
        <p>
          このWebアプリは筑波大学の生徒が作っています。また、フレームワークにはvue.jsを使っています。
        </p>
        <p>
          プログラミングは初心者なため、バグなどがある可能性があります。温かい目で見守ってください。
        </p>
        <p>
          もし何か問題を発見した場合は、TwitterまたはGitHubで連絡していただけると、とてもありがたいです。
        </p>
        <h2>SNS一覧(クリックで開きます)</h2>
        <p>
          <a
            href="https://twitter.com/OkppGbFhZoJQRgL"
            target="_blank"
            rel="noopener"
            ><img
              src="@/assets/img/twitter.png"
              alt="Twitter"
              width="64"
              height="64"
              hspace="15"
          /></a>
          <a href="https://github.com/Mimori256" target="_blank" rel="noopener"
            ><img src="@/assets/img/github.png" alt="GitHub" hspace="15"
          /></a>
        </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.sidebar-area {
  float: left;
}

.content {
  color: gray;
  font-size: 1.2rem;
  display: flex;
  align-content: center;
  background-color: white;
  flex-direction: column;
  height: 90vh;
  width: 85%;
  margin: 0 5% 0 15%;
  -webkit-overflow-scrolling: auto;
  overflow-x: hidden;
  overflow-y: scroll;
}

p {
  margin: 3%;
}

a {
  color: #3fa5a7;
}

#warn {
  color: deeppink;
}

.v-enter {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 500ms;
}
</style>
