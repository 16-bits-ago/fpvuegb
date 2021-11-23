<template>
  <div class="payment-content">
    <input placeholder="Category" v-model="category" />
    <input placeholder="Date" v-model="date" />
    <input placeholder="Value" v-model.number="value" type="number"/>
    <button @click="onSaveClick">Save</button>
  </div>
</template>
 
<script>
export default {
    name: "AddPaymentForm",
  data () {
    return {
      category: '',
      date: '',
      value: 0,
    }
  },
  computed: {
    getCurrentDate () {
      const today = new Date();
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    }
  },
  methods: {
    onSaveClick () {
      const data = {
        category: this.category,
        value: this.value,
        date: this.date || this.getCurrentDate,
      }
      this.$emit('addNewPayment', data)
    }
  }

}
</script>

<style>
</style>