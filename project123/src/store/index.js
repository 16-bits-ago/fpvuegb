import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const localDB = {
    page1: [
        { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 },
        { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 },
        { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 }
      ],
      page2: [
        { "id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969 },
        { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 },
        { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 }
      ],
},
export default new Vuex.Store ({
    state: {
        paymentsList: [],
        paumentsListIDS: [],
        categoryList: []
    },
    mutations: {
        setPaymentsListData(state, payload){
            /* state.paymentsList = payload */
            const newUniqIdObj = payload.filter((item)=>{
                return state.paymentsListIDS.indexOf(item.id) < 0
            })
            const uniqIds = newUniqIdObj.map(obj => obj.id)
            state.paymentsList.push(...newUniqIdObj)
            state.paymentsListIds.push(...uniqIds)
        },
        setPaymentsCategoryList(state, payload){
            state.categoryList = payload
        },
        addDataToPaymentsList(store,data){
            store.paymentsList.push(data)
        }
    },
    actions: {
        fetchData ({commit,page}) {
            return new Promise((resolve)=> {
                setTimeout (()=> {
                    const items = localDB['page${page}']
                    /* const items = [] */
                    /* for (let i=1; i< 101; i++){
                        items.push ({
                            date: '13.05.2021',
                            categoty: 'education',
                            value: i
                        })
                    } */
                    resolve(items)
                },1000)
            }).then(res=>{
                /* dispatch('fetchCategory') */
                commit('setPaymentsListData', res)
            })
        },
        fetchCategory ({commit}) {
            return new Promise((resolve)=> {
                setTimeout (()=> {
                    const items = ['sport', 'education', 'food', 'internet']
                    resolve(items)
                },2000)
            }).then(res=> commit('setPaymentsListData', res))
        }
    },
    getters: {
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((res,cur)=> res + cur.value, 0)
        },
        getPaymentsList: state => state.paymentsList,
        getCategoryList: state => state.categoryList
        
    },

})