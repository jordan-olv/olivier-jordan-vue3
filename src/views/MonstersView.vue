<script setup>
import { onBeforeMount, ref, watch, computed } from 'vue'
import { useMonsterStore } from '@/stores/monsters.js'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import MonsterItem from '@/components/MonsterCard.vue'

const router = useRouter()
const route = useRoute()

const monsterStore = useMonsterStore()
const { fetchAllMonsters } = monsterStore
const { monsters } = storeToRefs(monsterStore)

const page = ref(1)
const limitMonster = ref(10) // LIMITE DE MONSTRE PAR PAGE
const loading = ref(true)

const nextPage = async () => {
    loading.value = true;
    const nextPageData = await fetchAllMonsters(page.value + 1, limitMonster.value)
    if (nextPageData.length > 0) {
        page.value++
        await updateRouteAndFetch()
    }
}

const prevPage = async () => {
    loading.value = true;
    if (page.value > 1) {
        page.value--
        await updateRouteAndFetch()
    }
}

const updateRouteAndFetch = async () => {
    loading.value = true
    router.push({
        query: {
            page: page.value
        }
    })
    await fetchAllMonsters(page.value, limitMonster.value)
    loading.value = false
}

const noMoreMonsters = computed(() => {
    return monsters.value.length < limitMonster.value
})

watch(route, async (newValue, oldValue) => {
    initPage()
    await fetchAllMonsters(page.value, limitMonster.value)
    loading.value = false
})

const initPage = () => {
    const { query } = route
    const { page: currentPage = 1 } = query
    page.value = +currentPage
}

onBeforeMount(async () => {
    initPage()
    try {
        await fetchAllMonsters(page.value, limitMonster.value)
        loading.value = false
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <!-- Blog Start -->
    <div class="container py-5">
        <div class="row">
            <!-- Monster list Start -->
            <div class="col">
                <div class="mb-5">
                    <h3 class="text-uppercase border-start border-5 border-primary ps-3">Every Monsters</h3>
                    <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Page {{ page }}</h5>
                    <transition name="fade" mode="out-in">
                        <div v-if="loading" key="loading">
                            <div v-for="n in limitMonster" :key="n" class="d-flex overflow-hidden mb-3 bg-light skeleton-loader">
                                <div class="skeleton-img"></div>
                                <div class="h5 d-flex align-items-center bg-light px-3 mb-0 skeleton-text">Loading...</div>
                            </div>
                        </div>
                        <div v-else key="content">
                            <MonsterItem v-for="monster in monsters" :key="monster._id" :monster="monster" />
                            <div v-if="monsters.length === 0" class="text-center">
                                <p>No more monsters available.</p>
                            </div>
                        </div>
                    </transition>
                </div>
                <button @click="prevPage" :disabled="page <= 1" type="button" class="btn btn-outline-success">Prev</button>
                <button @click="nextPage" :disabled="noMoreMonsters" type="button" class="btn btn-outline-success">Next</button>
            </div>
            <!-- Monster list End -->
        </div>
    </div>
    <!-- Blog End -->
</template>

<style scoped>
.skeleton-loader {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    background: #e0e0e0;
}

.skeleton-img {
    width: 100px;
    height: 100px;
    background: #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.skeleton-text {
    flex: 1;
    height: 20px;
    background: #ccc;
    border-radius: 5px;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
