<template>
  <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :navigation="true"
    :spaceBetween="30"
    :pagination="{ dynamicBullets: true, clickable: true }"
    :modules="modules"
    class="image-list"
  >
    <swiper-slide v-for="image in imageList" :key="image?.id">
      <div class="cover">
        <a-image :src="image?.imgUrl" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { IPostAttachmentPhoto } from "@/types/IPost";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { defineComponent } from "vue";

interface PostImageListProps {
  imageList: (IPostAttachmentPhoto | undefined)[];
}

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    imageList: {
      type: Array as PropType<(IPostAttachmentPhoto | undefined)[]>,
      required: true,
    },
  },
  setup(props: PostImageListProps) {
    return {
      modules: [Navigation, Pagination],
    };
  },
});
</script>

<style scoped lang="scss">
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-prev {
  display: none;
}
</style>
