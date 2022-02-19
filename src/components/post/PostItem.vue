<template>
  <a-card class="post">
    <template v-if="imageList && imageList.length === 1" #cover>
      <div class="post__header">
        <a-image
          class="post__preview"
          alt="Боевое самбо и самбо в Челябинске"
          :src="imageList[0]?.imgUrl || ''"
        />
      </div>
    </template>
    <div class="post__content">
      <PostAttachmentList
        v-if="postItem?.attachments?.length > 0"
        :attachments="postItem?.attachments || []"
      />
      <p v-if="postItem?.text" class="post__text">
        {{ postItem.text }}
      </p>
    </div>
    <post-empty
      v-if="!postItem?.text && !postItem?.attachments?.length"
      :post-id="postItem?.id || 999"
      :external-link="externalLink"
    />
    <p v-if="iNeedDescription" class="post__description">
      Кликните на превью или кнопку "Подробнее" для просмотра в полном размере.
    </p>
    <div class="post__actions">
      <div
        v-if="postItem?.date && typeof postItem?.date === 'number'"
        @click="onActionClick"
        class="action"
      >
        <clock-circle-outlined key="date" />
        <time class="post__time" :datetime="postItem.date.toString()">
          {{ getPostDate(postItem?.date) }}
        </time>
      </div>
      <div @click="onActionClick" class="action">
        <like-outlined key="likes" />
        <span>{{ postItem?.likes }}</span>
      </div>
      <div @click="onActionClick" class="action">
        <comment-outlined key="comments" />
        <span>{{ postItem?.comments }}</span>
      </div>
      <div @click="onActionClick" class="action">
        <span class="action__link">Подробнее</span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { IPost, IPostAttachment } from "@/types/IPost";
import { computed, defineComponent } from "vue";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import usePosts from "@/hooks/usePosts";
import {
  ClockCircleOutlined,
  CommentOutlined,
  LikeOutlined,
} from "@ant-design/icons-vue";
import PostEmpty from "@/components/post/PostEmpty.vue";
import PostAttachmentList from "@/components/post/PostAttachmentList.vue";

interface PostItemProps {
  postItem: IPost;
}

export default defineComponent({
  components: {
    PostEmpty,
    PostAttachmentList,
    ClockCircleOutlined,
    CommentOutlined,
    LikeOutlined,
  },
  props: {
    postItem: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
  setup(props: PostItemProps) {
    const { watchImageAttachments } = usePosts();
    const imageList = computed(() => {
      return watchImageAttachments(
        props.postItem?.attachments || ([] as IPostAttachment[])
      );
    });
    const ownerId = -32410679;
    const externalLink = `https://vk.com/wall${ownerId}_${props.postItem?.id}`;

    const getPostDate = (dateNum: number) => {
      const postDate = new Date(dateNum * 1000);
      return formatDistance(postDate, new Date(), {
        addSuffix: true,
        locale: ru,
      });
    };

    const iNeedDescription = computed(() => {
      return (
        !props.postItem.text &&
        props.postItem?.attachments?.length === 1 &&
        imageList.value.length === 1
      );
    });

    function openExternal() {
      window.open(externalLink, "_blank");
    }

    return {
      getPostDate,
      imageList,
      iNeedDescription,
      externalLink,
      onActionClick: openExternal,
      post: props.postItem,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/vars";
@import "../../assets/styles/mixins";

.post {
  margin-bottom: 4rem;
  border-radius: 1rem;
  border: 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;

  @include breakpoint($mobile-bp) {
    margin-bottom: 5rem;
  }

  &__header {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }

  &__preview {
    border-radius: 1rem;
  }

  &__text {
    margin-top: 1rem;
    font-size: 1.6rem;
  }

  &__description {
    font-size: 1.2rem;
    font-style: italic;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 1rem;
    border-top: 1px solid #dedede;
    margin: 2rem -2.4rem -2.4rem;

    @include breakpoint($mobile-bp) {
      flex-direction: column;
      margin: 2rem -0.5rem -2.4rem;
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 1.4rem;

    @include breakpoint($mobile-bp) {
      width: 100%;
    }

    span[role="img"] {
      margin-right: 1rem;
    }

    cursor: pointer;
    &:hover {
      color: $blue;
    }

    &:not(:last-child) {
      border-right: 1px solid #dedede;

      @include breakpoint($mobile-bp) {
        border-right: none;
        margin-bottom: 1rem;
      }
    }

    &__link {
      color: $blue;
      font-size: 1.6rem;
      font-weight: 600;
      transition: all 0.3s linear;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
