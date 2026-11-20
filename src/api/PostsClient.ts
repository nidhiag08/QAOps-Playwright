import { APIRequestContext, APIResponse } from '@playwright/test';

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

export class PostsClient {
  constructor(private readonly request: APIRequestContext) {}

  getAll(): Promise<APIResponse> {
    return this.request.get('/posts');
  }

  getById(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  create(post: Post): Promise<APIResponse> {
    return this.request.post('/posts', { data: post });
  }

  update(id: number, post: Partial<Post>): Promise<APIResponse> {
    return this.request.patch(`/posts/${id}`, { data: post });
  }

  delete(id: number): Promise<APIResponse> {
    return this.request.delete(`/posts/${id}`);
  }
}
