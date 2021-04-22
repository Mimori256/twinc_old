import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help
    }

  ]
})
