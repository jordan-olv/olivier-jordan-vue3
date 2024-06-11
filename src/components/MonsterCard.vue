<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  monster: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToDetail = (monsterId) => {
  router.push({
    name: 'monster-details',
    params: {
      monsterId
    }
  })
}
</script>

<template>
  <div class="d-flex overflow-hidden mb-3 bg-light">
    <img
      class="img-fluid"
      :src="monster.image"
      style="width: 100px; height: 100px; object-fit: cover"
      alt=""
    />
    <div
      @click="goToDetail(monster._id)"
      class="name-monster h5 d-flex align-items-center bg-light px-3 mb-0"
    >
      {{ monster.name }}
    </div>
  </div>
</template>

<style scoped>
.name-monster {
  cursor: pointer;
}

.name-monster:hover {
    color: #629226;
}

</style>
