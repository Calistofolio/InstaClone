import { v4 as randomUUID } from "uuid";
import { faker, th } from "@faker-js/faker";
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
    const postContainer = document.getElementById(this._id);
    const button = postContainer?.querySelector("#btn-like");
    const iconLike = button?.children[0];
    const likes = postContainer?.querySelector(".like-count")


    if(!iconLike) return;

    if (this._isLiked) {
      iconLike?.classList.remove("fa-heart");
      iconLike?.classList.remove("liked");
      iconLike?.classList.add("fa-heart-o");

      this._numberOfLikes -=1;
    } else {
      iconLike?.classList.remove("fa-heart-o");
      iconLike?.classList.add("fa-heart");
      iconLike?.classList.add("liked");

      this._numberOfLikes +=1;
    }

    if(this._numberOfLikes == 1){
      likes!.innerHTML = String(`${this._numberOfLikes} like`)
      }else{
        likes!.innerHTML = String(`${this._numberOfLikes} likes`)
      }

    this._isLiked = !this._isLiked;
  }

  toHtml() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.id = this._id;

    const postHeader = `<div class="post-header">
        <div class="avatar">
          <img title="Avatar image"
            src=${this._avatarUrl}>
        </div>
        <span>${this._userName}</span>
        </div>`

    const postImg = `<div class="post-img">
           <img title="Post image"
          src=${this._imgUrl}>
        </div>`

    const postIcons = `<div class="post-icons">
        <div>
          <div id="btn-like" onclick="like()">
            <i class="fa fa-heart-o"></i>
          </div>
         
          <div>
            <i class="fa fa-comment-o"></i>
          </div>

          <div>
            <i class="fa fa-paper-plane-o"></i>
          </div>
        </div>
          <div>
            <i class="fa fa-bookmark-o"></i>
          </div>
        </div>`

        const postText = ` <div class="informations"> 
          <div class="like-count">
            <span>${this._numberOfLikes}</span> likes </div>
          <div> 
            <p class="description"> oii</p>
          </div>
          </div>`

    postContainer.innerHTML = postHeader;
    postContainer.innerHTML += postImg;
    postContainer.innerHTML += postIcons;
    postContainer.innerHTML += postText;

   

    const btnLike = postContainer.querySelector("#btn-like");
    btnLike?.addEventListener("click", () => this.like());

    document.body.appendChild(postContainer);
  }

}

const posts: Post[] = [];

for (let i = 0; i < 15; i++) {
  const userName = faker.person.firstName();
  const avatarUrl = faker.image.avatar();
  const imgUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.paragraph();

  const post = new Post(userName, avatarUrl, imgUrl, description);

  post.toHtml();
  posts.push(post)
}

