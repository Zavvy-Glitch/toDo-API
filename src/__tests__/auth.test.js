'use strict';

const bearer = require('../auth/middleware/bearer.js');
const acl = require('../auth/middleware/acl.js');

describe('Testing auth middleware', () => {
  test('Bearer middleware authenticates our token on the request', () => {
    let token = null; // will need to create valid token with usermodel or jwt library  
  
    const req = { token };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();
  
    bearer(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  
  test('Access control should allow request to go through with a valid token', () => {
    let token = null; // will need to create valid token with usermodel or jwt library 
  
    const req = { token };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();
  
    acl('create')(req, res, next);
    expect(next).toHaveBeenCalled();
  });
})