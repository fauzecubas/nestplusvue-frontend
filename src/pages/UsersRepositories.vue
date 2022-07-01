<template>
  <div class="q-pa-md">
    <q-table
      title="Repositories"
      bordered
      flat
      :rows="state.users"
      :columns="state.columns"
      row-key="id"
      :pagination="{
        rowsPerPage: 10,
      }"
      table-header-class="text-italic"
      card-class="bg-grey-1"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="black"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="githubUser" :props="props">{{
            props.row.githubUsername
          }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <div class="q-pa-md">
                <q-table
                  grid
                  :title="
                    props.row.repositories.length
                      ? `@` + props.row.githubUsername + ` repositories.`
                      : ''
                  "
                  :rows="props.row.repositories"
                  :columns="state.reposColumns"
                  row-key="repositoryName"
                  hide-header
                  card-class="bg-black text-white"
                >
                  <template v-slot:no-data="">
                    <div
                      class="full-width text-warning row flex-center q-pa-md"
                    >
                      <q-icon
                        size="2em"
                        name="sentiment_dissatisfied"
                        class="q-pr-xs"
                      />
                      <span> This user has no repositories. </span>
                      <q-icon size="2em" name="error" class="q-pl-xs" />
                    </div>
                  </template>
                </q-table>
              </div>
            </div>
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
  </div>
</template>

<script lang="ts">
import { User } from 'src/types/User';
import { defineComponent, onMounted, reactive } from 'vue';
import { getAll } from 'src/services/CrudService';
import { getRepositories } from 'src/services/GithubService';
import { formatDate } from 'src/util/index';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'UsersRepositories',
  components: {},
  setup() {
    const state = reactive({
      columns: [
        {
          name: 'expand',
          required: true,
          label: 'Expand',
          align: 'left',
          field: '',
          sortable: true,
        },
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
          name: 'githubUser',
          required: false,
          label: 'Github User',
          align: 'left',
          field: 'githubUser',
        },
      ],
      reposColumns: [
        {
          name: 'repositoryName',
          required: true,
          label: 'Repository Name',
          align: 'left',
          field: (row: any) => row.name,
          format: (val: string) => `${val}`,
        },
        {
          name: 'language',
          required: true,
          label: 'Language',
          align: 'left',
          field: (row: any) => (row.language ? row.language : '---'),
          format: (val: string) => `${val}`,
        },
        {
          name: 'private',
          required: true,
          label: 'Private',
          align: 'left',
          field: (row: any) => row.private,
          format: (val: boolean) => `${val}`,
        },
        {
          name: 'createdAt',
          required: true,
          label: 'Created At',
          align: 'left',
          field: (row: any) => row.created_at,
          format: (val: string) => `${formatDate(val)}`,
        },
        {
          name: 'lastUpdate',
          required: true,
          label: 'Last Update',
          align: 'left',
          field: (row: any) => row.updated_at,
          format: (val: string) => `${formatDate(val)}`,
        },
      ],
      users: [] as User[],
    });
    const $q = useQuasar();

    onMounted(async () => {
      state.users = await getUsers();
    });

    async function findRepositories(users: User[]): Promise<void> {
      for (let index = 0; index < users.length; index++) {
        const user = users[index];

        user.repositories = await getRepositories(user.reposUrl);
      }
    }

    async function getUsers(): Promise<User[]> {
      $q.loading.show();

      const users = await getAll();
      await findRepositories(users);

      $q.loading.hide();
      return users;
    }

    return { state };
  },
});
</script>
