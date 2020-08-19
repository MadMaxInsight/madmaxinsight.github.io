console.log("vue here");

var app = new Vue({
  el: "#test",
  data: {
    message: "Привет, Vue.js!",
    show: false
  },
  methods: {
    showModal: function() {
      alert(1);
      this.show = this.show ? false : true;
    }
  }
});
