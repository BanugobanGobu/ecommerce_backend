import supertest from 'supertest';
import app from '../../index';
import mongoose from 'mongoose';
import userModel from '../models/UserModel'; 

jest.mock('../models/UserModel'); 

const request = supertest(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL!);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('User Registration', () => {
    test('new user registration', async () => {
        const mockUser = {
            _id: '12345',
            name: 'Simple User',
            email: 'simpleuser@example1.com',
            mobileNumber: 9025254281,
        };
        userModel.create = jest.fn().mockResolvedValue(mockUser);

        const response = await request.post('/user/register/api').send({
            name: 'Simple User',
            email: 'simpleuser@example1.com',
            password: 'simplepassword',
            mobileNumber: 9025254281,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', 'Simple User');
        expect(response.body).toHaveProperty('email', 'simpleuser@example1.com');
        expect(response.body).toHaveProperty('mobileNumber', 9025254281);
    });
});



describe('User Registration - Duplicate Email', () => {
    test('should not allow registration with an email that already exists', async () => {
        const mockExistingUser = {
            _id: '12345',
            name: 'Existing User',
            email: 'duplicate@example.com',
            mobileNumber: 9025254281,
        };

        userModel.findOne = jest.fn().mockResolvedValue(mockExistingUser);  

        const response = await request.post('/user/register/api').send({
            name: 'New User',
            email: 'duplicate@example.com',  
            password: 'newpassword123',
            mobileNumber: 9025254282,
        });

        expect(response.status).toBe(400);  
        expect(response.body).toHaveProperty('message', 'User Already Registered');
    });
});

describe('User Login - Successful Login', () => {
    test('should log in successfully with correct credentials', async () => {
        const mockUser = {
            _id: '12345',
            email: 'loginuser@example.com',
            password: '$2a$10$somehashedpassword',  
        };

        userModel.findOne = jest.fn().mockResolvedValue(mockUser);
        jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);  
         const response = await request.post('/user/login/api').send({
            email: 'loginuser@example.com',
            password: 'correctpassword',
        });

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body).toHaveProperty('token'); 
    });
});



describe('User Login - Incorrect Password', () => {
    test('should not log in with incorrect password', async () => {
        const mockUser = {
            _id: '12345',
            email: 'incorrectpass@example.com',
            password: '$2a$10$somehashedpassword',  
        };

        userModel.findOne = jest.fn().mockResolvedValue(mockUser);
        jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(false); 
        const response = await request.post('/user/login/api').send({
            email: 'incorrectpass@example.com',
            password: 'wrongpassword',
        });

        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty('message', 'Invalid email or password');
    });
});



describe('User Login - Unregistered Email', () => {
    test('should return an error for unregistered email', async () => {
        userModel.findOne = jest.fn().mockResolvedValue(null); 

        const response = await request.post('/user/login/api').send({
            email: 'unregistered@example.com',
            password: 'anyPassword',
        });

        expect(response.status).toBe(404);  
        expect(response.body).toHaveProperty('message', 'Create your account to Login');
    });
});





