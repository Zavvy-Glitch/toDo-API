'use strict';

const authRouter = require('../auth/authRoutes.js')
const supertest = require('supertest');
const request = supertest(authRouter);

const { usersdb } = require('../auth/userModels/index.js')

beforeAll( async () => {
  await usersdb.sync();
});

afterAll(async() => {
  await usersdb.drop();
});

describe('Testing the Express app', () => {
  test('Should register a user', async () => {
    const response = await request.post('/signup').send({
      username: "test",
      password: "test"
    });
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual('test');
    expect(response.body.role).toEqual('user');
    expect(response.body.token).toBeTruthy();
  });

  test('Should sign in a user with basic auth credentials', async () => {
    const response = await request.post('/signin').auth('test', 'test');

    expect(response.status).toBe(200);
    expect(response.body.username).toEqual('test');
    expect(response.body.role).toEqual('user');
    expect(response.body.token).toBeTruthy();
  })

  test('Should CREATE a todo, on POST to /todo', async () => {
    const response = await request.post('/todo').send({
      description: 'todo',
      assignee: 'someone',
      difficulty: 4,
    })

    expect(response.status).toBe(201);
    expect(response.body.description).toBe('todo')
    expect(response.body.assignee).toBe('someone')
    expect(response.body.difficulty).toBe(4)
  })

  test('Should READ all todo\'s, on GET to /todo', async () => {
    const response = await request.get('/todo');

    expect(response.status).toBe(201);
    expect(response.body.description).toBe('todo')
    expect(response.body.assignee).toBe('someone')
    expect(response.body.difficulty).toBe(4)
  })

  test('Should READ a todo, on GET to /todo/id', async () => {
    const response = await request.get('/todo/1');

    expect(response.status).toBe(201);
    expect(response.body[0].description).toBe('todo')
    expect(response.body.length).toBeTruthy();
  
  })

  test('Should UPDATE a todo, on PUT to /todo/id', async () => {
    const response = await request.post('/todo/1').send({
      assignee: 'someone_else',
    })

    expect(response.status).toBe(201);
    expect(response.body[0].description).toBe('todo')
    expect(response.body.assignee).toBe('someone_else')
  })

  test('Should REMOVE a todo, on DELETE to /todo/id', async () => {
    const response = await request.delete('/todo/1')

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(1)
  })
})