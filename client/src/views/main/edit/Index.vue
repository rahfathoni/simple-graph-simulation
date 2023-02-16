<template>
  <div class="q-pa-md">edit page</div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "EditPage",
  setup() {
    const store = useStore();

    // MOUNTED
    onBeforeMount(async () => {
      await store.dispatch("inquiryAllFoodReport");
    });
  },
};
</script>
