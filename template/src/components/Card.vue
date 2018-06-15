<template>
  <div class="card">
    <h2/>
    <img :src="`https://robohash.org/${person.first_name}_${person.last_name}`">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as store from '~/store';

@Component({})
export default class Card extends Vue {
  @Prop({ required: true })
  person?: store.Person;
}
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
  margin: 0.25rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 0.25rem solid gainsboro;
}
</style>
