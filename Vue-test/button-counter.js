// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    props:['title'],
    template: '<div><button v-on:click="count++">You clicked me {{ count }} times. {{title}}</button></div>'
  });