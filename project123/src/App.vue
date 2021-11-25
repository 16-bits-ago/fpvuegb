<template>
  <div id="app">
    <div class="wrapper">
      <header>my personal cost</header>
      Total: {{getSumValue}}
      <main v-show="visible">
        <add-payment-form @addNewPayment="addNewPayment"/>
        <payments-display :items="paymentsList" />
        <payments-display :cur="page" :n="3" :length="6" :paginate="onChangePage"/>
      </main>
       <button v-on:click="visible=!visible">{{visible?'Скрыть':'Отобразить'}}</button>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from './components/AddPaymentForm.vue';
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import {mapMutations, mapGetters, mapActions} from 'Vuex'

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
  },
  data() {
    return {
      page:1,
      n:3,
      paymentsList: [],
      visible: true
    };
  },
  computed: {
    ...mapGetters({
      getSumValue: 'getFullPaymentsValue',
      paymentsList: 'getPaymentsList'
    }),
    currentElements(){
      const {n,page } =this;
      return this.paymentsList.slice(n*(page-1), n*(page-1) + n)
    }
    /* getSumValue(){
      return this.$store.getters.getFullPaymentsValue
    },
    paymentsList() {
      return this.$store.getters.getPaymentsList
    } */
  },
  methods: {
    ...mapMutations({
      setData: 'setPaymentsListData',
      addData: 'addDtatToPaymentsList'
    }),
    /* fetchData() {
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
    }, */
    addNewPayment (data) {
      this.paymentsList = [this.paymentsList, data]
    },
    ...mapActions ([
      'fetchData'
    ]),
    onChangePage(p){
      this.page = p,
      this.fetchData(p)
    }

  },
  created() {
    /* this.paymentsList = this.fetchData(); */
    /* this.$store.commit('setPaymentsListData', this.fetchData()) */
   /*  this.$store.dispatch ('fetchData') */
   this.fetchData(1)
    this.setPaymentsListData(this.fetchData())
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
