<template>
  <div class="attachments">
    <div
      v-for="attachment in attachments"
      :key="attachment.photo?.id || attachment.video?.id"
    >
      <PostAttachmentVideo
        v-if="attachment.type === 'video'"
        :attachment-item="attachment"
      />
    </div>
    <PostImageList v-if="imageList.length > 1 && imageList" :image-list="imageList" />
  </div>
</template>

<script lang="ts">
import type { IPostAttachment } from "@/types/IPost";
import type { PropType } from "vue";
import PostAttachmentVideo from "@/components/post/PostAttachmentVideo.vue";
import usePosts from "@/hooks/usePosts";
import { computed, defineComponent } from "vue";
import PostImageList from "@/components/post/PostImageList.vue";

interface PostAttachmentListProps {
  attachments: IPostAttachment[];
}

export default defineComponent({
  components: { PostImageList, PostAttachmentVideo },
  props: {
    attachments: { type: Array as PropType<IPostAttachment[]>, required: true },
  },
  setup(props: PostAttachmentListProps) {
    const { watchImageAttachments } = usePosts();
    const imageList = computed(() => watchImageAttachments(props.attachments));
    return {
      imageList,
    };
  },
});
</script>

<style scoped lang="scss">
.attachments {
  font-style: italic;
}
</style>
