// import supertest from 'supertest';
// import app from '../../index'; 
// import mongoose from 'mongoose';

// const request = supertest(app);

// beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URL!, );
// });

// afterAll(async () => {
//     await mongoose.disconnect();
// });

// describe('User Registration', () => {
//     test('new user registration', async () => {
//         const response = await request.post('/user/register/api').send({
//             name: 'Simple User',
//             email: 'simpleuser@example1.com',
//             password: 'simplepassword',
//             mobileNumber: 9025254281,
//         });

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('_id'); 
//         expect(response.body).toHaveProperty('name', 'Simple User');
//         expect(response.body).toHaveProperty('email', 'simpleuser@example1.com');
//         expect(response.body).toHaveProperty('mobileNumber', 9025254281);
//     });
// });

// describe('User Registration - Duplicate Email', () => {
//   test('should not allow registration with an email that already exists', async () => {
//       await request.post('/user/register/api').send({
//           name: 'First User',
//           email: 'duplicate@example.com',
//           password: 'password123',
//           mobileNumber: 9876543210,
//       });

//       const response = await request.post('/user/register/api').send({
//           name: 'Second User',
//           email: 'duplicate@example.com',
//           password: 'password123',
//           mobileNumber: 9876543211,
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('message', 'User Already Registered');
//   });
// });


// describe('User Login - Successful Login', () => {
//   test('should log in successfully with correct credentials', async () => {
//       await request.post('/user/register/api').send({
//           name: 'Login User',
//           email: 'loginuser@example.com',
//           password: 'securepassword',
//           mobileNumber: 9876543210,
//       });

//       const response = await request.post('/user/login/api').send({
//           email: 'loginuser@example.com',
//           password: 'securepassword',
//       });

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('message', 'Login successful');
//       expect(response.body).toHaveProperty('token');
//   });
// });


// describe('User Login - Incorrect Password', () => {
//   test('should not log in with incorrect password', async () => {
//       await request.post('/user/register/api').send({
//           name: 'Incorrect Password User',
//           email: 'incorrectpass@example.com',
//           password: 'securepassword',
//           mobileNumber: 9876543210,
//       });

//       const response = await request.post('/user/login/api').send({
//           email: 'incorrectpass@example.com',
//           password: 'wrongpassword',
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('message', "Invalid email or password");
//   });
// });





// describe('User Login - Unregistered Email', () => {
//   test('should return an error for unregistered email', async () => {
//       const response = await request.post('/user/login/api').send({
//           email: 'notregistered@example.com',
//           password: 'anyPassword',
//       });

//       expect(response.status).toBe(404); 
//       expect(response.body).toHaveProperty('message', 'Create your account to Login');
//   });
// });






