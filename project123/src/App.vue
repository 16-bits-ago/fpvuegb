<template>
  <div id="app">
    <div class="wrapper">
      <header>my personal cost</header>
      <main v-show="visible">
        <add-payment-form @addNewPayment="addNewPayment"/>
        <payments-display :items="paymentsList" />
      </main>
       <button v-on:click="visible=!visible">{{visible?'Скрыть':'Отобразить'}}</button>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from './components/AddPaymentForm.vue';
import PaymentsDisplay from "./components/PaymentsDisplay.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
  },
  data() {
    return {
      paymentsList: [],
      visible: true
    };
  },
  methods: {
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
    addNewPayment (data) {
      this.paymentsList = [this.paymentsList, data]
    }

  },
  created() {
    this.paymentsList = this.fetchData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
