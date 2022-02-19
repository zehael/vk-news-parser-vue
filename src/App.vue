<template>
  <div class="posts">
    <div v-if="posts.length > 0" class="posts_list">
      <div v-for="post in posts" :key="post.id">
        <PostItem :post-item="post" />
      </div>
    </div>
    <AppLoader v-if="postsIsLoading" />
    <div class="posts__action">
      <a-button
        @click="loadMorePosts"
        :loading="postsIsLoading"
        size="large"
        type="dashed"
        danger
      >
        Загрузить еще
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import usePosts from "@/hooks/usePosts";
import PostItem from "@/components/post/PostItem.vue";
import AppLoader from "@/components/AppLoader.vue";

const { fetchPosts, postsIsLoading, posts } = usePosts();

const loadMorePosts = async () => {
  await fetchPosts(20);
};

onMounted(async () => {
  await fetchPosts();
});
</script>

<style lang="scss">
@import "ant-design-vue/dist/antd.css";
@import "src/assets/styles/style.scss";

#app {
  .posts {
    background-color: #fff;

    &__action {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 2rem 4rem;
    }
  }
}
</style>
