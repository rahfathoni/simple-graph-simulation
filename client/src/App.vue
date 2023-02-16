<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-3">
    <HeaderLayout />
    <q-page-container>
      <router-view class="bg-grey-3" />
    </q-page-container>
    <FooterLayout />
  </q-layout>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "LayoutDefault",
  components: {
    HeaderLayout: defineAsyncComponent(() => import("./views/Header")),
    FooterLayout: defineAsyncComponent(() => import("./views/Footer")),
  },
  setup() {
    return {};
  },
};
</script>
