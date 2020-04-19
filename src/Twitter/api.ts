// @ts-nocheck
import { TwitterPostApiResponse } from "./typings";
import { generateFetchRequestHeaders } from "./generateTwitterHeaders";

const consumerKey = "buP2g6cWcnZmKJg6hrkZIXZf2";
const consumerSecret = "ANLseYMYDcNoLB5Le3MhoJeUlXgCJwYBEJoyUTadAuRIlpQlpQ";

export const getPostData = async (postId: string) => {
  const url = `https://api.twitter.com/1.1/statuses/show/${postId}.json`;
  const requestOptions = generateFetchRequestHeaders(
    url,
    consumerKey,
    consumerSecret
  );

  const result = await fetch(url + "?tweet_mode=extended", requestOptions)
    .then((response) => response.json())
    .then((value) => adapter(value))
    .catch((error) => console.log("error", error));
  return result;
};

console.disableYellowBox = true;

export const adapter = (data: TwitterPostApiResponse) => {
  console.log(data);
  return {
    createdAt: data.created_at,
    id: data.id,
    posterImageUrl: data.user.profile_image_url,
    posterDisplayName: data.user.name,
    posterUniqueName: data.user.screen_name,
    isPosterVerified: data.user.verified,
    retweetNumber: data.retweet_count,
    likeNumber: data.favorite_count,
    textContent: data.full_text,
    media: data.extended_entities?.media?.map((element) => {
      if (element?.type === "video") {
        return {
          type: element?.type,
          aspectRatio:
            element?.video_info?.aspect_ratio?.[0] /
            element?.video_info?.aspect_ratio?.[1],
          url: element?.video_info?.variants?.[0]?.url,
        };
      }
      if (element?.type === "photo") {
        return {
          type: element?.type,
          aspectRatio: element.sizes.medium.w / element.sizes.medium.h,
          url: element.media_url,
        };
      }
    }),
  };
};
