<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-icon :icon="personCircle" size="large" slot="start" />
      <ion-title>uchi</ion-title>
      <ion-icon :icon="chatbubbles" size="large" slot="end" />
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { IonHeader, IonToolbar, IonIcon } from '@ionic/vue'
  import { happy, personCircle, chatbubbles } from 'ionicons/icons'

  export default defineComponent({
    name: 'ExploreContainer',
    components: { IonHeader, IonToolbar, IonIcon },
    props: {
      name: String,
    },

    setup() {
      return {
        happy,
        personCircle,
        chatbubbles,
      }
    },
  })
</script>

<style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
  }

  ion-toolbar {
    background-color: #7b2cbf;
    display: flex;
    min-height: 10vh;
    align-content: space-around;
  }
</style>
