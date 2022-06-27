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
    bordered
    flat
    :rows="state.users"
    :columns="state.columns"
    row-key="id"
    :pagination="{
      rowsPerPage: 10,
    }"
    table-header-class="text-italic"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="age" :props="props">{{ props.row.age }}</q-td>
        <q-td key="githubUser" :props="props">{{ props.row.githubUser }}</q-td>
        <q-td key="address" :props="props"
          >{{ props.row.address }}, {{ props.row.addressNumber }} -
          {{ props.row.city }}/{{ props.row.state }}</q-td
        >
        <q-td key="actions" :props="props">
          <q-btn
            dense
            round
            flat
            color="warning"
            @click="handleEditUser(props.row)"
            icon="edit"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>Edit</strong>
            </q-tooltip></q-btn
          >
          <q-btn
            dense
            round
            flat
            color="negative"
            @click="handleDelete(props.row)"
            icon="delete"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>Delete</strong>
            </q-tooltip>
          </q-btn>
          <q-btn
            dense
            round
            flat
            color="blue"
            @click="handleViewUser(props.row)"
            icon="visibility"
            ><q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>View</strong>
            </q-tooltip></q-btn
          >
        </q-td>
      </q-tr>
    </template>

    <template v-slot:no-data="">
      <div class="full-width text-warning row flex-center q-pa-md">
        <q-icon size="2em" name="sentiment_dissatisfied" class="q-pr-xs" />
        <span> I'm sorry... No user found</span>
        <q-icon size="2em" name="warning" class="q-pl-xs" />
      </div>
    </template>
  </q-table>

  <!-- ------------------------CREATE USER DIALOG------------------------ -->
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
            :rules="[(val) => !!state.newUser.name || 'This field is required']"
            hide-bottom-space
            ref="nameRefCreate"
            maxlength="30"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.age"
            label="Age"
            class="q-pl-xs q-py-xs col-3"
            :rules="[(val) => !!state.newUser.age || 'This field is required']"
            hide-bottom-space
            ref="ageRefCreate"
            maxlength="3"
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
            :rules="[
              (val) => !!state.newUser.zipCode || 'This field is required',
            ]"
            hide-bottom-space
            ref="zipCodeRefCreate"
            maxlength="12"
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
            :rules="[
              (val) => !!state.newUser.address || 'This field is required',
            ]"
            hide-bottom-space
            ref="addressRefCreate"
          />
        </div>
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.newUser.addressNumber"
            label="Address Number"
            class="q-py-xs q-pr-xs col-3"
            :rules="[
              (val) =>
                !!state.newUser.addressNumber || 'This field is required',
            ]"
            hide-bottom-space
            ref="addressNumberRefCreate"
            maxlength="6"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.district"
            label="District"
            class="q-pa-xs col-3"
            :rules="[
              (val) => !!state.newUser.district || 'This field is required',
            ]"
            hide-bottom-space
            ref="districtRefCreate"
            maxlength="15"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.city"
            label="City"
            class="q-pa-xs col-3"
            :rules="[(val) => !!state.newUser.city || 'This field is required']"
            hide-bottom-space
            ref="cityRefCreate"
            maxlength="15"
          />
          <q-input
            dense
            outlined
            v-model="state.newUser.state"
            label="State"
            class="q-pl-xs q-py-xs col-3"
            :rules="[
              (val) => !!state.newUser.state || 'This field is required',
            ]"
            hide-bottom-space
            ref="stateRefCreate"
            maxlength="15"
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
        <q-btn flat label="CREATE" @click="confirmCreateUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- ------------------------CREATE USER DIALOG------------------------ -->

  <!-- ------------------------EDIT USER DIALOG------------------------ -->
  <q-dialog v-model="state.dialogEditUser" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div v-if="state.allowEdit" class="text-h6">Edit User</div>
        <div v-else class="text-h6">View User</div>
      </q-card-section>

      <q-card-section class="q-py-none">
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.editedUser.id"
            label="ID"
            class="q-pr-xs q-py-xs col-2"
            readonly
          />
        </div>
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.editedUser.name"
            label="Name"
            class="q-pr-xs q-py-xs col-9"
            :rules="[
              (val) => !!state.editedUser.name || 'This field is required',
            ]"
            hide-bottom-space
            ref="nameRefEdit"
            maxlength="30"
            :readonly="!state.allowEdit"
          />
          <q-input
            dense
            outlined
            v-model="state.editedUser.age"
            label="Age"
            class="q-pl-xs q-py-xs col-3"
            :rules="[
              (val) => !!state.editedUser.age || 'This field is required',
            ]"
            hide-bottom-space
            ref="ageRefEdit"
            maxlength="3"
            :readonly="!state.allowEdit"
          />
        </div>
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.editedUser.zipCode"
            label="Zip Code"
            class="q-py-xs q-pr-xs col-4"
            @keyup.enter="handleZipCodeSearch()"
            :rules="[
              (val) => !!state.editedUser.zipCode || 'This field is required',
            ]"
            hide-bottom-space
            ref="zipCodeRefEdit"
            maxlength="12"
            :readonly="!state.allowEdit"
          >
            <template v-slot:append>
              <q-btn
                :readonly="!state.allowEdit"
                icon="search"
                flat
                @click="handleZipCodeSearch()"
              />
            </template>
          </q-input>
          <q-input
            dense
            outlined
            v-model="state.editedUser.address"
            label="Address"
            class="q-pl-xs q-py-xs col-8"
            :rules="[
              (val) => !!state.editedUser.address || 'This field is required',
            ]"
            hide-bottom-space
            ref="addressRefEdit"
            :readonly="!state.allowEdit"
          />
        </div>
        <div class="row col-12">
          <q-input
            dense
            outlined
            v-model="state.editedUser.addressNumber"
            label="Address Number"
            class="q-py-xs q-pr-xs col-3"
            :rules="[
              (val) =>
                !!state.editedUser.addressNumber || 'This field is required',
            ]"
            hide-bottom-space
            ref="addressNumberRefEdit"
            maxlength="6"
            :readonly="!state.allowEdit"
          />
          <q-input
            dense
            outlined
            v-model="state.editedUser.district"
            label="District"
            class="q-pa-xs col-3"
            :rules="[
              (val) => !!state.editedUser.district || 'This field is required',
            ]"
            hide-bottom-space
            ref="districtRefEdit"
            maxlength="15"
            :readonly="!state.allowEdit"
          />
          <q-input
            dense
            outlined
            v-model="state.editedUser.city"
            label="City"
            class="q-pa-xs col-3"
            :rules="[
              (val) => !!state.editedUser.city || 'This field is required',
            ]"
            hide-bottom-space
            ref="cityRefEdit"
            maxlength="15"
            :readonly="!state.allowEdit"
          />
          <q-input
            dense
            outlined
            v-model="state.editedUser.state"
            label="State"
            class="q-pl-xs q-py-xs col-3"
            :rules="[
              (val) => !!state.editedUser.state || 'This field is required',
            ]"
            hide-bottom-space
            ref="stateRefEdit"
            maxlength="15"
            :readonly="!state.allowEdit"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <div v-if="state.allowEdit">
          <q-btn
            flat
            color="negative"
            label="CANCEL"
            @click="handleCloseDialog()"
            v-close-popup
          />
          <q-btn flat label="CONFIRM" @click="confirmEditUser()" />
        </div>
        <div v-else>
          <q-btn flat label="OK" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- ------------------------EDIT USER DIALOG------------------------ -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { User } from 'src/types/User';
import {
  getAll,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from 'src/services/CrudService';
import { getAddressByZipCode } from 'src/services/ZipCodeService';
import { useQuasar } from 'quasar';
import HeaderButton from './HeaderButton.vue';
import { Address } from 'src/types/Address';
import { validateNewUser } from 'src/util/validator';

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
      users: [] as User[],
      newUser: {} as User,
      editedUser: {} as User,
      dialogNewUser: false,
      dialogEditUser: false,
      allowEdit: true,
    });
    const $q = useQuasar();

    const nameRefCreate = ref();
    const ageRefCreate = ref();
    const zipCodeRefCreate = ref();
    const addressRefCreate = ref();
    const districtRefCreate = ref();
    const cityRefCreate = ref();
    const stateRefCreate = ref();
    const addressNumberRefCreate = ref();

    const nameRefEdit = ref();
    const ageRefEdit = ref();
    const zipCodeRefEdit = ref();
    const addressRefEdit = ref();
    const districtRefEdit = ref();
    const cityRefEdit = ref();
    const stateRefEdit = ref();
    const addressNumberRefEdit = ref();

    onMounted(async () => {
      state.users = await getUsers();
    });

    async function getUsers(): Promise<User[]> {
      const users = await getAll();

      return users;
    }

    async function confirmCreateUser(): Promise<void> {
      if (validateNewUser(state.newUser)) {
        try {
          await createUser(state.newUser);
        } catch (error) {
          console.log(error);
        } finally {
          let id: number;
          if (state.users.length) {
            id = state.users[state.users.length - 1].id + 1;
          } else {
            id = 1;
          }
          state.newUser.id = id;

          state.users.push(state.newUser);

          state.newUser = {} as User;
          state.dialogNewUser = false;
        }
      } else {
        $q.notify({
          message: 'Fill all required fields!',
          icon: 'warning',
          position: 'top',
          color: 'warning',
          timeout: 2500,
        });
      }
    }

    async function confirmEditUser(): Promise<void> {
      if (validateNewUser(state.editedUser)) {
        try {
          await updateUser(state.editedUser, state.editedUser.id);
        } catch (error) {
          console.log(error);
        } finally {
          const index = state.users.findIndex(
            (u) => u.id === state.editedUser.id
          );
          if (index !== -1) {
            state.users[index] = { ...state.editedUser };
          }

          state.dialogEditUser = false;
        }
      } else {
        $q.notify({
          message: 'Fill all required fields!',
          icon: 'warning',
          position: 'top',
          color: 'warning',
          timeout: 2500,
        });
      }
    }

    function handleDelete(user: User): void {
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
        state.users.splice(index, 1);
      });
    }

    function assignAddressFields(address: Address): void {
      state.newUser.city = address.localidade;
      state.newUser.address = address.logradouro;
      state.newUser.district = address.bairro;
      state.newUser.state = address.uf;

      addressNumberRefCreate.value.focus();
    }

    function handleEditUser(user: User): void {
      state.dialogEditUser = true;
      state.allowEdit = true;
      setTimeout(() => {
        nameRefEdit.value.focus();
        state.editedUser = { ...user };
      }, 300);
    }

    function handleViewUser(user: User): void {
      state.dialogEditUser = true;
      state.allowEdit = false;
      setTimeout(() => {
        nameRefEdit.value.focus();
        state.editedUser = { ...user };
      }, 300);
    }

    function handleCloseDialog(): void {
      state.newUser = {} as User;
    }

    function addUser(): void {
      state.dialogNewUser = true;
      state.allowEdit = true;
      setTimeout(() => {
        nameRefCreate.value.focus();
      }, 300);
    }

    function deleteAll(): void {
      $q.dialog({
        title: 'Confirm',
        persistent: true,
        message: 'This action will delete all users. Continue?',
        cancel: {
          push: true,
          color: 'negative',
        },
        ok: {
          push: true,
          label: 'YES',
        },
      }).onOk(async () => {
        await deleteAllUsers();
        state.users = [] as User[];
      });
    }

    async function handleZipCodeSearch(): Promise<void> {
      let address = {} as Address;
      if (state.newUser.zipCode) {
        try {
          $q.loading.show({
            message: 'Searching...',
          });
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
          $q.loading.hide();
        }
      } else if (state.allowEdit) {
        $q.notify({
          message: 'You must type a zip code!',
          icon: 'warning',
          position: 'top',
          color: 'warning',
          timeout: 2500,
        });
      }
    }

    return {
      state,
      addressNumberRefCreate,
      nameRefCreate,
      ageRefCreate,
      zipCodeRefCreate,
      addressRefCreate,
      districtRefCreate,
      cityRefCreate,
      stateRefCreate,
      addressNumberRefEdit,
      nameRefEdit,
      ageRefEdit,
      zipCodeRefEdit,
      addressRefEdit,
      districtRefEdit,
      cityRefEdit,
      stateRefEdit,
      addUser,
      deleteAll,
      handleCloseDialog,
      confirmCreateUser,
      confirmEditUser,
      handleDelete,
      handleEditUser,
      handleViewUser,
      handleZipCodeSearch,
    };
  },
});
</script>
