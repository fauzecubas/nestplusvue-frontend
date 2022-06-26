<template>
  <q-table
    title="Users"
    :rows="state.users"
    :columns="state.columns"
    row-key="id"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="age" :props="props">{{ props.row.age }}</q-td>
        <q-td key="githubUser" :props="props">{{ props.row.githubUser }}</q-td>
        <q-td key="address" :props="props">{{ props.row.address }}</q-td>
        <q-td key="actions" :props="props">
          <q-btn
            dense
            round
            flat
            color="warning"
            @click="handleEdit(props.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="negative"
            @click="handleDelete(props.row)"
            icon="delete"
          ></q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { User } from 'src/types/User';
import { getAll, deleteUser } from 'src/services/CrudService';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'UsersTable',

  setup() {
    const state = reactive({
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'age',
          required: true,
          label: 'Age',
          align: 'left',
          field: 'age',
          sortable: true,
        },
        {
          name: 'githubUser',
          required: false,
          label: 'Github User',
          align: 'left',
          field: 'githubUser',
        },
        {
          name: 'address',
          required: false,
          label: 'Address',
          align: 'left',
          field: 'address',
        },
        {
          name: 'actions',
          label: 'Actions',
          field: 'actions',
        },
      ],
      users: [{ name: 'fauze' }] as User[],
    });
    const $q = useQuasar();

    onMounted(async () => {
      state.users = await getUsers();
    });

    async function getUsers(): Promise<User[]> {
      const users = await getAll();

      console.log(users);

      return users;
    }

    function handleEdit(user: User) {
      console.log(user);
    }

    function handleDelete(user: User) {
      $q.dialog({
        title: 'Confirm',
        persistent: true,
        message: 'This action will delete this user. Continue?',
        cancel: {
          push: true,
          color: 'negative',
        },
        ok: {
          push: true,
          label: 'YES',
        },
      }).onOk(async () => {
        await deleteUser(user.id);
        const index = state.users.findIndex((u) => u.id === user.id);
        state.users.splice(index);
      });
      console.log(user);
    }

    return { state, handleEdit, handleDelete };
  },
});
</script>
