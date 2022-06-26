<template>
  <q-layout view="lHh Lpr lFf">
    <q-header color="secondary" elevated>
      <q-toolbar>
        <q-toolbar-title style="font-family: monospace">
          CRUD App - nestplusvue
        </q-toolbar-title>

        <div style="font-family: monospace">by Fauze Cubas</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>
