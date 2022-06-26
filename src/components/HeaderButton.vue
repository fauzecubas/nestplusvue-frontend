<template>
  <div class="row">
    <div class="row row q-pt-xs">
      <q-btn
        stack
        flat
        size="10px"
        @click="handleClick(props)"
        :icon="props.icon"
        class="q-pa-sm"
      >
        <div>{{ props.label }}</div>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
    function: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const state = {};

    function addUser() {
      emit('addUser');
    }

    function deleteAll() {
      emit('deleteAll');
    }

    function handleClick(properties: any): void {
      if (properties.function === 'add') {
        addUser();
      } else if (properties.function === 'deleteAll') {
        deleteAll();
      }
    }

    return { state, handleClick, props };
  },
});
</script>
