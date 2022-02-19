<template>
  <a-empty>
    <template #description>
      <span>
        Данный контент содержит важную информацию / рекламу / репост.
        Рекомендуем смотреть напрямую
        <a :href="externalLink" target="_blank">в источнике </a>.
      </span>
    </template>
    <a-button type="primary" @click="openExternal">Смотреть</a-button>
  </a-empty>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

interface PostEmptyProps {
  postId: number;
  externalLink: string;
}

export default defineComponent({
  name: "PostEmpty",
  props: {
    postId: {
      type: Number as PropType<number>,
      required: true,
    },
    externalLink: {
      type: String,
      required: true,
    },
  },
  setup(props: PostEmptyProps) {
    function openExternal() {
      window.open(props.externalLink, "_blank");
    }
    return {
      openExternal,
    };
  },
});
</script>

<style scoped></style>
