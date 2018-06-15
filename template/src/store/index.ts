import { ActionTree, MutationTree } from 'vuex';
import Vue from 'vue';

export interface Person {
  first_name: string;
  last_name: string;
}

export type People = Person[];

export interface RootState {
  people: People;
}

export const state: () => RootState = () => ({
  people: [],
});

export const mutations: MutationTree<RootState> = {
  setPeople(state, people: People) {
    state.people = people;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { app }) {
    const people = await app.$axios.$get('./random-data.json');
    commit('setPeople', people.slice(0, 10));
  },
};
