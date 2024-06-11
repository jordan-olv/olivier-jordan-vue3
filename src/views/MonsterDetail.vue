<script setup>
import { onMounted, ref } from "vue";
import { useMonsterStore } from "@/stores/monsters.js";
import { useRoute } from "vue-router";

const route = useRoute();
const monsterStore = useMonsterStore();
const { fetchOneMonster } = monsterStore;

const monster = ref(null);
const loading = ref(true);
const error = ref(null);
const monsterId = route.params.monsterId;

const getMonsterDetails = async () => {
  try {
    const data = await fetchOneMonster(monsterId);
    if (data) {
      monster.value = data;
    } else {
      throw new Error("Monster not found");
    }
  } catch (err) {
    error.value = "Error fetching monster details";
    console.error("Error fetching monster details:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getMonsterDetails();
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="loading" key="loading" class="text-center py-5">
      <p>Loading...</p>
    </div>
    <div v-else-if="error" key="error" class="text-center py-5">
      <p>{{ error }}</p>
    </div>
    <div v-else key="content" class="container-fluid py-5">
      <div class="container">
        <div class="row gx-5">
          <div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 500px;">
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100 rounded"
                :src="monster.image"
                style="object-fit: cover"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="border-start border-5 border-primary ps-5 mb-5">
              <h6 class="text-primary text-uppercase">
                {{ monster.category }}
              </h6>
              <h1 class="name-monster display-5 text-uppercase mb-0">{{ monster.name }}</h1>
            </div>
            <h4 class="text-body mb-4">{{ monster.description }}</h4>

            <div
              v-if="monster.drops && monster.drops.length"
              class="border-start border-5 border-primary ps-5 mb-5"
            >
              <h6 class="text-primary text-uppercase">DROPS</h6>
              <ul>
                <li v-for="drop in monster.drops" :key="drop">{{ drop }}</li>
              </ul>
            </div>
            <div v-else class="border-start border-5 border-primary ps-5 mb-5">
              <h6 class="text-primary text-uppercase">DROPS</h6>
              <p>No drops available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.name-monster:hover {
    color: #629226;
}
</style>
