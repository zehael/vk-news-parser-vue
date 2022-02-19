export interface IPost {
  id: number;
  postType: string;
  date: number;
  text?: string;
  attachments: IPostAttachment[];
  likes: number;
  reposts: number;
  comments: number;
}

export interface IPostAttachment {
  type: string;
  video?: IPostAttachmentVideo;
  photo?: IPostAttachmentPhoto;
}

export class IPostAttachmentVideo {
  id: number;
  ownerId: number;
  playerUrl: string;

  constructor(id: number, owner_id: number, playerUrl: string) {
    this.id = id;
    this.ownerId = owner_id;
    this.playerUrl = playerUrl;
  }
}

export class IPostAttachmentPhoto {
  id: number;
  imgUrl: string;

  constructor(_id: number, _imgUrl: string) {
    this.id = _id;
    this.imgUrl = _imgUrl;
  }
}
