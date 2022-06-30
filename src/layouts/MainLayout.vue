<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-header color="secondary" elevated>
        <q-toolbar>
          <q-btn
            flat
            @click="state.drawer = !state.drawer"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title style="font-family: monospace">
            CRUD App - nestplusvue
          </q-toolbar-title>

          <div style="font-family: monospace">by Fauze Cubas</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="state.drawer"
        show-if-above
        mini
        mini-to-overlay
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-black"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section @click="setRouter('/')" avatar>
                <q-icon color="white" name="manage_accounts" />
              </q-item-section>
              <q-tooltip
                anchor="center end"
                self="center start"
                :offset="[10, 10]"
              >
                <strong>Manage Users</strong>
              </q-tooltip>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section @click="setRouter('usersRepositories')" avatar>
                <q-icon color="white" name="folder" />
              </q-item-section>
              <q-tooltip
                anchor="center end"
                self="center start"
                :offset="[10, 10]"
              >
                <strong>Repositories</strong>
              </q-tooltip>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const state = reactive({
      drawer: false,
    });
    const router = useRouter();
    const $q = useQuasar();

    onMounted(() => {
      state.drawer = false;
    });

    function setRouter(path: string) {
      $q.loading.show();
      router.push({ path: `${path}` });
      $q.loading.hide();
    }

    return { state, setRouter };
  },
});
</script>
