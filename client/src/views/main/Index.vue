<template>
  <div class="q-pa-md">
    <GraphPage v-if="tab === 'grafik'" />
    <EditPage v-else />
  </div>
</template>

<script>
import { defineAsyncComponent, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "MainPage",
  components: {
    GraphPage: defineAsyncComponent(() => import("./graph/Index")),
    EditPage: defineAsyncComponent(() => import("./edit/Index.vue")),
  },
  setup() {
    const store = useStore();

    // COMPUTED
    const tab = computed(() => store.getters["getMenuTab"]);

    return {
      tab,
    };
  },
};
</script>
