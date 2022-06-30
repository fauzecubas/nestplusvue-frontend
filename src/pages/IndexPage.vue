<template>
  <q-page class="q-pa-md doc-container">
    <users-management />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsersManagement from 'src/components/UsersManagement.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { UsersManagement },
  setup() {
    return {};
  },
});
</script>
