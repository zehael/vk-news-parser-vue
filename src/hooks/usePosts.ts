import { jsonp } from "vue-jsonp";
import { createRequestData } from "@/helpers/http-helper";
import { computed, ref } from "vue";
import type { IPost, IPostAttachment } from "@/types/IPost";
import { IPostAttachmentPhoto, IPostAttachmentVideo } from "@/types/IPost";
import { API_METHOD } from "@/types/http";

export default function usePosts() {
  const postsIsLoading = ref<boolean>(true);
  const posts = ref<IPost[]>([]);

  const fetchPosts = async (offset = 0): Promise<void> => {
    postsIsLoading.value = true;
    try {
      const ownerId = -32410679;
      const requestParams = { owner_id: ownerId, offset };
      const { requestUrl, queryParams } = createRequestData(
        API_METHOD.WALL_GET,
        requestParams
      );
      const vkData = await jsonp(requestUrl, { ...queryParams });
      const preparedPosts = await preparePosts(vkData.response.items);
      if (offset) {
        posts.value = [...posts.value, ...preparedPosts];
      } else {
        posts.value = preparedPosts;
      }
    } catch (e) {
      console.log("error of get posts vk", e);
    } finally {
      postsIsLoading.value = false;
    }
  };

  const preparePosts = async (postList: any[]): Promise<IPost[]> => {
    const preparedPosts: IPost[] = [];
    for (let i = 0; i < postList.length; i++) {
      const vkPostItem = postList[i];
      const attachments = await prepareAttachments(vkPostItem.attachments);
      const post: IPost = {
        ...vkPostItem,
        postType: vkPostItem.post_type,
        attachments,
        likes: vkPostItem.likes.count,
        reposts: vkPostItem.reposts.count,
        comments: vkPostItem.comments.count,
      };
      preparedPosts.push(post);
    }

    return preparedPosts;
  };

  const prepareAttachments = async (
    attachments: any[] = []
  ): Promise<IPostAttachment[]> => {
    const preparedAttachments: IPostAttachment[] = [];
    for (const item of attachments) {
      const attachment: IPostAttachment = {
        type: item.type,
      };
      if (attachment.type === "video") {
        const { id, owner_id: ownerId } = item.video;
        const playerUrl = await getVideoLink(ownerId, `${ownerId}_${id}`);
        attachment.video = new IPostAttachmentVideo(id, ownerId, playerUrl);
      }
      if (attachment.type === "photo") {
        const { id } = item.photo;
        const lastImgSizeUrl =
          item.photo.sizes[item.photo.sizes.length - 1]?.url || "n/a";
        attachment.photo = new IPostAttachmentPhoto(id, lastImgSizeUrl);
      }
      preparedAttachments.push(attachment);
    }
    return preparedAttachments;
  };

  const getVideoLink = async (
    ownerId: number,
    video: string
  ): Promise<string> => {
    try {
      const { requestUrl, queryParams } = createRequestData(
        API_METHOD.VIDEO_GET,
        { owner_id: ownerId, videos: video }
      );
      const resp = await jsonp(requestUrl, { ...queryParams });
      return resp.response.items[0].player;
    } catch (e) {
      console.log(e);
      return "error";
    }
  };

  const watchImageAttachments = (allPostAttachments: IPostAttachment[]) => {
    return computed(() => {
      const filtered = allPostAttachments.filter(
        (item) => item.type === "photo"
      );
      return filtered.map((item) => {
        if (item.photo) {
          return item.photo;
        }
      });
    }).value;
  };

  return { fetchPosts, postsIsLoading, posts, watchImageAttachments };
}
