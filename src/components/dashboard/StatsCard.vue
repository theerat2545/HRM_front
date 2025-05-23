<template>
  <v-card
    class="mx-auto"
    elevation="2"
    rounded="lg"
  >
    <v-card-text class="pa-4">
      <div class="d-flex flex-column">
        <span class="text-grey-darken-2 text-caption">{{ metricName }}</span>
        <span class="text-h5 font-weight-bold my-2">{{ metricValue }}</span>
        <span class="text-grey text-caption">{{ metricDescription }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    metricName: {
      type: String,
      default: 'เมตริก'
    },
    metricValue: {
      type: String,
      default: '0'
    },
    metricDescription: {
      type: String,
      default: 'คำอธิบาย'
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
  height: 100%;
}
.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>