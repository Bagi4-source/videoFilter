export interface IFeedData {
  result: Result;
}

export interface Result {
  list: List[];
  next: Next;
}

export interface List {
  media_container_id:            number;
  media_container_name:          string;
  media_container_description:   null;
  media_container_type:          MediaContainerType;
  media_container_status:        MediaStatus;
  media_container_online_status: MediaContainerOnlineStatus;
  user_id:                       number;
  channel_id:                    number;
  created_at:                    Date;
  is_mature_content:             boolean;
  published_at:                  Date;
  vod:                           VOD;
  context:                       Context;
  game:                          Game;
  media_container_streams:       MediaContainerStream[];
  tags:                          any[];
  media_container_user:          MediaContainerUser;
  media_container_channel:       MediaContainerChannel;
  track_id?:                     string;
}

export interface Context {
  productGrade?: number;
}

export interface Game {
  game_id:        number;
  game_name:      string;
  game_icon:      GameIcon;
  game_color_hex: GameColorHex | null;
}

export enum GameColorHex {
  The0951A0 = "0951a0",
  The434Cc2 = "434CC2",
}

export interface GameIcon {
  large?:  string;
  medium?: string;
  small?:  string;
}

export interface MediaContainerChannel {
  created_at:                  Date;
  deleted_at:                  null;
  updated_at:                  Date;
  channel_id:                  number;
  channel_name:                string;
  user_id:                     number;
  followers_count:             number;
  channel_is_live:             boolean;
  channel_description:         string;
  channel_description_enabled: boolean;
  channel_donation_url:        null;
  channel_image:               GameIcon;
  background:                  GameIcon;
  channel_status:              ChannelStatus;
  channel_clips_count:         number;
  channel_alias:               null;
  channel_priority:            number;
  last_activity_date:          Date | null;
  meta:                        Meta;
  is_verified:                 boolean;
}

export enum ChannelStatus {
  Active = "ACTIVE",
}

export interface Meta {
}

export enum MediaContainerOnlineStatus {
  Public = "PUBLIC",
}

export enum MediaStatus {
  Stopped = "STOPPED",
}

export interface MediaContainerStream {
  stream_id:                     number;
  stream_total_viewers:          number;
  stream_current_viewers:        number;
  stream_current_active_viewers: number;
  stream_media:                  StreamMedia[];
}

export interface StreamMedia {
  media_id:       number;
  media_type:     MediaType;
  media_meta:     MediaMeta;
  media_duration: number;
  media_status:   MediaStatus;
}

export interface MediaMeta {
  media_url:                                null;
  media_archive_url:                        string;
  media_preview_url:                        null;
  media_preview_images:                     null;
  media_preview_archive_url:                string;
  media_preview_archive_images:             GameIcon;
  media_preview_first_frame_archive_images: GameIcon;
}

export enum MediaType {
  HLS = "HLS",
}

export enum MediaContainerType {
  ReviewVideo = "REVIEW_VIDEO",
  ShortVideo = "SHORT_VIDEO",
}

export interface MediaContainerUser {
  created_at:          Date;
  deleted_at:          null;
  updated_at:          Date;
  user_id:             number;
  user_login:          string;
  profile_description: string;
  profile_image:       GameIcon;
  profile_background:  GameIcon;
  channel_id:          number;
  profile_is_live:     boolean;
}

export interface VOD {
  ready:    boolean;
  recordId: string;
}

export interface Next {
  category: string;
  key:      string;
  limit:    number;
  offset:   number;
}
