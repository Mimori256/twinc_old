<template>
  <transition appear>
    <div class="about">
      <div class="content" align="center">
        <h1>About</h1>
        <p>
          このWebアプリは筑波大学の学生が作っています。また、フレームワークにはvue.jsを使っています。
        </p>
        <p>
          プログラミング初心者なため、バグなどがある可能性があります。温かい目で見守ってください。
        </p>
        <p>
          もし何か問題を発見した場合は、<a
            href="https://twitter.com/OkppGbFhZoJQRgL"
            target="_blank"
            rel="noopener"
            >Twitter</a
          >または<a
            href="https://github.com/Mimori256"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >で連絡していただけると、とてもありがたいです。
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
  margin: 0 5% 0 13%;
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

@media screen and (max-width: 1100px) {
  .content {
    height: 80%;
    font-size: 1rem;
    margin-left: 13%;
  }
}
</style>
