import { BadRequest, GeneralError, NotFound } from "../const/error.const.js";
import { Post } from "../models/post.model.js";

export class PostsService {
  static async getAllPosts() {
    try {
      const posts = Post.find({}).populate("author", "username").sort({
        createdAt: "desc",
      });

      return posts;
    } catch (error) {
      throw new GeneralError(`Couldn't fetch posts, ERROR: ${error}`);
    }
  }

  static async getPostById(postId) {
    try {
      const foundPost = await Post.findById(postId)
        .populate({
          path: "author",
          select: "username email",
        })
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username",
          },
        });

      if (!foundPost) throw "Post not found";

      return foundPost;
    } catch (error) {
      throw new NotFound(`Couldn't find post, ERROR: ${error}`);
    }
  }

  static async createPost(user, postData) {
    try {
      const {
        title,
        location,
        date,
        time,
        cost,
        description,
        organizer,
        artists,
        category,
      } = postData;

      const post = new Post({
        title,
        location,
        date,
        time,
        cost,
        description,
        organizer,
        artists,
        category,
        author: user._id,
      });

      const createdPost = await post.save();

      user.posts.push(createdPost._id);

      await user.save();

      return createdPost;
    } catch (error) {
      throw new BadRequest(`Couldn't create post, ERROR: ${error}`);
    }
  }

  static async updatePost(user, postId, updateData) {
    try {
      const post = await Post.findOne({ _id: postId, author: user._id });

      if (!post) throw "Post not found";

      Object.assign(post, updateData);

      await post.save();
    } catch (error) {
      throw new BadRequest(`Couldn't update post, ERROR: ${error}`);
    }
  }

  static async deletePost(user, postId) {
    try {
      const foundPost = await Post.findOneAndDelete({
        _id: postId,
        author: user._id,
      });

      if (!foundPost) throw "Post not found";
    } catch (error) {
      throw new NotFound(`Post not found, ERROR: ${error}`);
    }
  }

  static async likePost(postId) {
    try {
      const post = await this.getPostById(postId);

      post.likes += 1;

      const updatedPost = await post.save();

      return { likes: updatedPost.likes };
    } catch (error) {
      throw new BadRequest(`Couldn't like post, ERROR: ${error}`);
    }
  }
  static async dislikePost(postId) {
    try {
      const post = await this.getPostById(postId);

      post.dislikes += 1;

      const updatedPost = await post.save();

      return { dislikes: updatedPost.dislikes };
    } catch (error) {
      throw new BadRequest(`Couldn't dislike post, ERROR: ${error}`);
    }
  }
}
