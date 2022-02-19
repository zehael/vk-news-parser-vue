<template>
  <div class="v-if">
    <iframe
      class="frame"
      :src="attachmentItem.video?.playerUrl"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts">
import type { IPostAttachment } from "@/types/IPost";
import type { PropType } from "vue";
import { defineComponent } from "vue";

interface PostAttachmentVideoProps {
  attachmentItem: IPostAttachment;
}

export default defineComponent({
  props: {
    attachmentItem: {
      type: Object as PropType<IPostAttachment>,
      required: true,
    },
  },
  setup(props: PostAttachmentVideoProps) {
    return {
      mediaUrl: props.attachmentItem?.video?.playerUrl || "",
    };
  },
});
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";
@import "src/assets/styles/mixins";
.frame {
  width: 100%;
  height: 720px;

  @include breakpoint($small-desktop-bp) {
    height: 480px;
  }

  @include breakpoint($mobile-bp) {
    height: 240px;
  }
}
</style>
