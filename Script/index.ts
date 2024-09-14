import { v4 as randomUUID } from "uuid";
import { faker, th } from "@faker-js/faker";
class Post {
  private _id: string;
  private _avatarUrl: string;
  private _isLiked: boolean = false;
  private _isSaved: boolean = false;
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
    this._isSaved;
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

    if(!postContainer) return;

    this.updateLikeCount(postContainer);
    this.updateLikeIcon(postContainer); 

    this._isLiked = !this._isLiked;
  }

  updateLikeIcon(postHtml: HTMLElement){
    const postLikeButton = postHtml.querySelector("#btn-like");
    const postLikeIcon = postLikeButton?.children[0];

    if (!postLikeIcon) return;

    postLikeIcon.classList.toggle("fa-heart")
    postLikeIcon.classList.toggle("liked")
    postLikeIcon.classList.toggle("heartbeat")
    postLikeIcon.classList.toggle("fa-heart-o")
    postLikeButton.classList.toggle("scale-in-center")
  }

  updateLikeCount(postHtml: HTMLElement){
    const postLikes = postHtml.querySelector(".like-count");
    const span = postLikes?.querySelector("span");

    if (!span) return;

    if(this._isLiked){
      this._numberOfLikes -= 1;
      }else{
        this._numberOfLikes += 1;
      }

      span.textContent = this._numberOfLikes.toString();
  }

  savePost(){
    const postContainer = document.getElementById(this._id);

    if(!postContainer) return;

    this.updateBookmarkIcon(postContainer);

    this._isSaved = !this._isSaved;
  }

  updateBookmarkIcon(postHtml: HTMLElement){
   const bookmarkButton = postHtml.querySelector("#btn-save");
   const bookmarkIcon = bookmarkButton?.children[0]

   if (!bookmarkIcon) return;

    bookmarkIcon.classList.toggle("fa-bookmark-o");
    bookmarkIcon.classList.toggle("swing-in-top-fwd");
    bookmarkIcon.classList.toggle("fa-bookmark");
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
          <div id="btn-save" onclick="savePost()">
            <i class="fa fa-bookmark-o"></i>
          </div>
        </div>`

        const postText = ` <div class="informations"> 
          <div class="like-count">
            <span>${this._numberOfLikes}</span> likes </div>
          <div> 
            <span>${this._description}</span>
          </div>
          </div>`

    postContainer.innerHTML = postHeader;
    postContainer.innerHTML += postImg;
    postContainer.innerHTML += postIcons;
    postContainer.innerHTML += postText;

   

    const btnLike = postContainer.querySelector("#btn-like");
    btnLike?.addEventListener("click", () => this.like());
    const btnSave = postContainer.querySelector("#btn-save");
    btnSave?.addEventListener("click", () => this.savePost())

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

