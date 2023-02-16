<template>
  <q-footer
    class="footer row wrap justify-center items-start content-start q-pa-md"
  >
    <div class="text-grey-2" style="font-size: 13px">
      © Copyright 2023. Monitoring Penjualan Makanan All rights reserved
    </div>
  </q-footer>
</template>

<script>
export default {
  name: "LayoutFooter",
};
</script>

<style>
.footer {
  position: absolute;
  font-size: 12px;
  padding: 8px;
  bottom: 0;
  width: 100%;
  min-height: 35px;
  background-color: black;
  border-top: 0.1px solid black;
}
</style>
