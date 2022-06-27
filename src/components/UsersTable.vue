<template>
  <div class="row q-pb-sm">
    <header-button
      @addUser="addUser()"
      :icon="'add_circle'"
      :function="'add'"
      :label="'Create User'"
    />
    <header-button
      @deleteAll="deleteAll()"
      :icon="'delete'"
      :function="'deleteAll'"
      :label="'Delete All'"
    />
  </div>
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
  <q-dialog v-model="state.dialogNewUser" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Create User</div>
      </q-card-section>

      <q-card-section class="q-py-none">
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.newUser.name"
            label="Name"
            class="q-pr-xs q-py-xs col-9"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.age"
            label="Age"
            class="q-pl-xs q-py-xs col-3"
          />
        </div>
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.newUser.zipCode"
            label="Zip Code"
            class="q-py-xs q-pr-xs col-4"
            @keyup.enter="handleZipCodeSearch()"
          >
            <template v-slot:append>
              <q-btn icon="search" flat @click="handleZipCodeSearch()" />
            </template>
          </q-input>
          <q-input
            dense
            outlined
            v-model="state.newUser.address"
            label="Address"
            class="q-pl-xs q-py-xs col-8"
          />
        </div>
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.newUser.addressNumber"
            label="Address Number"
            ref="addressNumberRef"
            class="q-py-xs q-pr-xs col-4"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.district"
            label="District"
            class="q-pa-xs col-4"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.city"
            label="City"
            class="q-pl-xs q-py-xs col-4"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          flat
          color="negative"
          label="CANCEL"
          @click="handleCloseDialog()"
          v-close-popup
        />
        <q-btn flat label="CREATE" @click="handleCreateUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { User } from 'src/types/User';
import { getAll, createUser, deleteUser } from 'src/services/CrudService';
import { getAddressByZipCode } from 'src/services/ZipCodeService';
import { useQuasar } from 'quasar';
import HeaderButton from './HeaderButton.vue';
import { Address } from 'src/types/Address';

export default defineComponent({
  name: 'UsersTable',
  components: { HeaderButton },

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
      dialogNewUser: false,
      newUser: {} as User,
    });
    const $q = useQuasar();
    const addressNumberRef = ref();

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

    async function handleCreateUser() {
      await createUser(state.newUser);
    }

    function handleCloseDialog(user: User) {
      console.log('closeDialog');
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

    async function handleZipCodeSearch() {
      let address = {} as Address;
      if (state.newUser.zipCode) {
        try {
          address = await getAddressByZipCode(state.newUser.zipCode);
        } catch (e) {
          $q.notify({
            message: 'Address not found!',
            icon: 'error',
            position: 'top',
            color: 'negative',
            timeout: 2500,
          });
        } finally {
          if (Object.keys(address)) {
            assignAddressFields(address);
          }
        }
      } else {
        $q.notify({
          message: 'You must type a zip code!',
          icon: 'warning',
          position: 'top',
          color: 'warning',
          timeout: 2500,
        });
      }
    }

    function assignAddressFields(address: Address) {
      state.newUser.city = address.localidade;
      state.newUser.address = address.logradouro;
      state.newUser.district = address.bairro;

      addressNumberRef.value.focus();
    }

    function addUser() {
      state.dialogNewUser = true;
      console.log('emit add user');
    }

    function deleteAll() {
      console.log('emit delete all');
    }

    return {
      state,
      addressNumberRef,
      addUser,
      deleteAll,
      handleCloseDialog,
      handleCreateUser,
      handleDelete,
      handleEdit,
      handleZipCodeSearch,
    };
  },
});
</script>
