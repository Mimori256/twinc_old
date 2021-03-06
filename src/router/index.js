import Vue from "vue";
import Router from "vue-router";
import Top from "@/components/Top";
import Help from "@/components/Help";
import About from "@/components/About";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Top",
      component: Top,
      meta: { title: "TwinC", desc: "TWINSのデータをics方式に変換する" }
    },
    {
      path: "/Help",
      name: "Help",
      component: Help
    },
    {
      path: "/About",
      name: "About",
      component: About
    }
  ]
});
