const request = require('supertest');
const app = require('./src/routes');

describe('GET /tasks/list', () => {
    it('should return an array of tasks', async () => {
        const res = await request(app).get('/tasks/list/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('POST /tasks/register', () => {
    it('should create a new task', async () => {
        const task = {
            name: 'Test task',
            description: 'This is a test task',
            dueDate: '2024-12-31',
            status: 'Not started'
        };
        const res = await request(app).post('/tasks').send(task);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', 'Test task');
        expect(res.body).toHaveProperty('description', 'This is a test task');
        expect(res.body).toHaveProperty('dueDate', '2024-12-31');
        expect(res.body).toHaveProperty('status', 'Not started');
    });
});

describe('PUT /tasks/update/:id', () => {
    it('should update a task', async () => {
        const task = {
            name: 'Updated task',
            description: 'This is an updated test task',
            dueDate: '2024-12-31',
            status: 'In progress'
        };
        const res = await request(app).put('/tasks/1').send(task);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated task');
        expect(res.body).toHaveProperty('description', 'This is an updated test task');
        expect(res.body).toHaveProperty('dueDate', '2024-12-31');
        expect(res.body).toHaveProperty('status', 'In progress');
    });
});

describe('DELETE /tasks/delete/:id', () => {
    it('should delete a task', async () => {
        const res = await request(app).delete('/tasks/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });
});
