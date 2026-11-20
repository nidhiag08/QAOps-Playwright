import { test, expect } from '../../src/fixtures/baseFixture';

test.describe('Posts API', { tag: '@regression' }, () => {
  test('GET /posts returns a list @api', async ({ postsClient }) => {
    const res = await postsClient.getAll();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 returns the expected schema @api', async ({ postsClient }) => {
    const res = await postsClient.getById(1);
    expect(res.ok()).toBeTruthy();
    expect(await res.json()).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('POST /posts creates a post @api', async ({ postsClient }) => {
    const payload = { userId: 1, title: 'Interview prep', body: 'Playwright API test' };
    const res = await postsClient.create(payload);
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject(payload);
  });

  test('DELETE /posts/1 succeeds @api', async ({ postsClient }) => {
    const res = await postsClient.delete(1);
    expect(res.status()).toBe(200);
  });
});
