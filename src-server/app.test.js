process.env.NODE_ENV = 'test';

const request = require('supertest');
const assert = require('assert');
const App = require('./app');

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiIxMjNAYWJjLmNvbSIsImlhdCI6MTY0ODgyNzQyNX0.kHYFSS5tMesZfodpVxW8YnbZ4soKz6tphOYusMX5KW8';
const firstPostBody = { id: 1001, title: 'abc', content: 'first_post' };
const secondPostBody = { id: 1002, title: 'abc', content: 'second_post' };

describe('Run basic server tests', () => {
  let app = {};
  beforeAll(async () => {
    app = await App();
    const db = app.get('db');
    db.query('SET search_path TO test');
    db.query('DELETE FROM test.posts');
  }, 30000);

  it('When I create first post with title abc, I got http status code 200', () => request(app).post('/api/posts').set('Authorization', token).send(firstPostBody)
    .expect(200)
    .expect((res) => {
      console.log(res.body);
    }));
  it('When I checked the post summaries, Then I should see post title abc with one content', () => request(app).get('/api/posts/post-summaries').set('Authorization', token)
    .expect(200)
    .then((res) => {
      assert.equal(res.body[0].postcount, '1');
    }));
  it('When I create second post with title abc, then I got http status code 200', () => request(app).post('/api/posts').set('Authorization', token).send(secondPostBody)
    .expect(200)
    .expect((res) => {
      console.log(res.body);
    }));
  it('When I checked the post summaries, Then I should see post title abc with two content', () => request(app).get('/api/posts/post-summaries').set('Authorization', token)
    .expect(200)
    .then((res) => {
      assert.equal(res.body[0].postcount, '2');
    }));
});
