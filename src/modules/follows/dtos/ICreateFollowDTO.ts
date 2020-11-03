export default interface ICreateFollowDTO {
  followed_user_id: string;
  follower_user_id: string;
  is_following?: boolean;
}
