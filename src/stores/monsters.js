import { ref } from 'vue'
import { defineStore } from 'pinia'
import ky from 'ky'

const API_ENDPOINT = 'https://metallo.ew.r.appspot.com'

export const useMonsterStore = defineStore('monsters', () => {
  
  const monsters = ref([])

  const fetchAllMonsters = async (currentPage=1, limit=10)=>{
    const rawRet   = await ky.get(`${API_ENDPOINT}/monsters/?page=${currentPage}&limit=${limit}`)
    const respJson = await rawRet.json()

    monsters.value = respJson
    return respJson
  }

  const fetchOneMonster = async (monsterId)=>{
    const rawRet   = await ky.get(`${API_ENDPOINT}/monsters/${monsterId}`) 
    const respJson = await rawRet.json()

    return respJson
  }

  return { 
    fetchAllMonsters,
    fetchOneMonster,
    monsters,
  }

})