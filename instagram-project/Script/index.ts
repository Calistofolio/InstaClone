import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
class Post {
  private _id: string;
  private _avatarUrl: string;
  private _isLiked: boolean = false;
  private _description: string;
  private _userName: string;
  private _createdAt: Date;
  private _numberOfLikes: number;
  private _imgUrl: string;

  constructor(
    userName: string,
    avatarUrl: string,
    imgUrl: string,
    description: string
  ) {
    this._description = description;
    this._userName = userName;
    this._imgUrl = imgUrl;
    this._isLiked;
    this._createdAt = new Date();
    this._numberOfLikes = 0;
    this._avatarUrl = avatarUrl;
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }

  get caption() {
    return this._description;
  }

  set caption(description: string) {
    this._description = description;
  }

  get userName() {
    return this._userName;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get imgUrl() {
    return this._imgUrl;
  }

  set imgUrl(imgUrl: string) {
    this._imgUrl = imgUrl;
  }

  get createdAt() {
    return this._createdAt;
  }

  get numberOfLikes() {
    return this._numberOfLikes;
  }

  like() {
    this._isLiked = !this._isLiked;

    if (this._isLiked) {
      this._numberOfLikes += 1;
    } else {
      this._numberOfLikes -= 1;
    }
    console.log(this._isLiked);

    const postContainer = document.getElementById(this._id);
    const btnLike = postContainer?.querySelector("#btnLike");
  }

  toHtml(){}
}

const posts: Post[] = [];

for (let i = 0; i < 15; i++) {
  const userName = faker.person.firstName();
  const avatarUrl = faker.image.avatar();
  const imgUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.word();

  const post = new Post(userName, avatarUrl, imgUrl, description);

  posts.push(post);
}

posts[0].like();

console.log(posts[0]);