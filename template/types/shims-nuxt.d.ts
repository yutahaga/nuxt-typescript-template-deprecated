import Vue from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { IncomingMessage, ServerResponse } from 'http';

export interface Dictionary<T> {
  [key: string]: T;
}

export type NuxtEnv = Dictionary<any>;

export interface NuxtError {
  statusCode: number;
  message: string;
}

export type NuxtState = Dictionary<any>;

export interface NuxtContext<V extends Vue> {
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: boolean;
  isHMR: boolean;
  route: Route;
  store: Store<any>;
  env: NuxtEnv;
  params: Dictionary<string>;
  query: Dictionary<string>;
  req: IncomingMessage;
  res: ServerResponse;
  redirect:
    | ((status: number, path: string, query?: Dictionary<string>) => void)
    | ((path: string, query?: Dictionary<string>) => void);
  error: (params: NuxtError) => void;
  nuxtState: NuxtState;
  beforeNuxtRender: (
    { Components, nuxtState }: { Components: Vue[]; nuxtState: NuxtState }
  ) => void | Promise<void>;
}

export interface NuxtTransitionOptions {
  name?: string;
  mode?: string;
  css?: boolean;
  duration?: number;
  type?: string;
  enterClass?: string;
  enterToClass?: string;
  enterActiveClass?: string;
  leaveClass?: string;
  leaveToClass?: string;
  leaveActiveClass?: string;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: (context: NuxtContext<V>) => Promise<object> | object;
    fetch?: (context: NuxtContext<V>) => Promise<object> | object;
    head?: Dictionary<any> | ((context: NuxtContext<V>) => Dictionary<any>);
    layout?: string | ((context: NuxtContext<V>) => string);
    middleware?: string | string[];
    scrollToTop?: boolean;
    transition?:
      | string
      | NuxtTransitionOptions
      | ((context: NuxtContext<V>) => string | NuxtTransitionOptions);
    validate?: (context: NuxtContext<V>) => boolean;
  }
}
