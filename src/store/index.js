import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { auth } from '@/store/modules/auth.module.js'
import records from '@/store/modules/records.module.js'

export default new Vuex.Store({
  modules: {
    auth,
    records
  }
})
