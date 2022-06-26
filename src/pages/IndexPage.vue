<template>
  <q-page class="q-pa-md doc-container">
    <div class="row q-pb-sm">
      <header-button
        @addUser="addUser()"
        :icon="'add_circle'"
        :function="'add'"
        :label="'Cadastrar'"
      />
      <header-button
        @deleteAll="deleteAll()"
        :icon="'delete'"
        :function="'deleteAll'"
        :label="'Deletar Todos'"
      />
    </div>
    <users-table />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsersTable from 'src/components/UsersTable.vue';
import HeaderButton from 'src/components/HeaderButton.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { UsersTable, HeaderButton },
  setup() {
    function addUser() {
      console.log('emit add user');
    }

    function deleteAll() {
      console.log('emit delete all');
    }

    return { addUser, deleteAll };
  },
});
</script>
