<template>
  <q-page class="q-pa-md doc-container">
    <users-table />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsersTable from 'src/components/UsersTable.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { UsersTable },
  setup() {
    return {};
  },
});
</script>
