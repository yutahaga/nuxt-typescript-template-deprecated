<template>
  <section>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
      <Card
        v-for="person in people"
        :key="person.id"
        :person="person"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as store from '~/store';
import Card from '~/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class extends Vue {
  @State people?: store.People;
}
</script>
<style scoped>
.header {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
