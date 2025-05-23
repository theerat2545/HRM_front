<template>
  <v-container
    fluid
    class="bg-grey-lighten-4 py-6"
  >
    <v-row dense>
      <v-col
        style="padding-left: 12.5px; padding-right: 25px;"
        cols="12"
        sm="6"
        md="3"
      >
        <StatsCard 
          metric-name="แผนกทั้งหมด"
          metric-value="6 แผนก"
          metric-description=""
        />
      </v-col>
      <v-col
        style="padding-right: 25px;"
        cols="12"
        sm="6"
        md="3"
      >
        <StatsCard 
          metric-name="พนักงานทั้งหมด"
          metric-value="10 คน"
          metric-description=""
        />
      </v-col>
      <v-col
        style="padding-right: 25px;"
        cols="12"
        sm="6"
        md="3"
      >
        <StatsCard 
          metric-name="พนักงานที่มา"
          metric-value="8 คน"
          metric-description="วันนี้"
        />
      </v-col>
      <v-col
        style="padding-right: 12.5px;"
        cols="12"
        sm="6"
        md="3"
      >
        <StatsCard 
          metric-name="วันที่และเวลา"
          metric-value="22/05/2568 12:52:49"
          metric-description="วันนี้"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="8"
      >
        <v-card
          title="จำนวนพนักงานแต่ละแผนก"
          subtitle="แสดงข้อมูลแผนกทั้งหมดในระบบ"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          title="พนักงงานล่าสุด"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import StatsCard from '@/components/dashboard/StatsCard.vue'
</script>