<template>
  <div class="q-pa-sm">
    <InputComp />
    <TableComp class="q-pt-md" />
  </div>
</template>

<script>
import { onBeforeMount, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

export default {
  name: "EditPage",
  components: {
    InputComp: defineAsyncComponent(() => import("./Input")),
    TableComp: defineAsyncComponent(() => import("./Table")),
  },
  setup() {
    const store = useStore();

    // MOUNTED
    onBeforeMount(async () => {
      await store.dispatch("inquiryAllFoodReport");
    });
  },
};
</script>
