import { test, expect } from '@playwright/test';
import fs from 'fs';

// Ambil token dari file JSON
const tokenFile = JSON.parse(fs.readFileSync('data/token.json', 'utf-8'));
const token = tokenFile.token;

// Base URL API
const baseURL = 'https://gorest.co.in/public/v2';

test.describe('API Testing menggunakan token dari file JSON', () => {

  // ✅ 1. GET Request
  test('GET - Ambil daftar user', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log('Data Users:', data);
    expect(Array.isArray(data)).toBeTruthy();
  });

  // ✅ 2. POST Request (buat user baru)
  test('POST - Buat user baru', async ({ request }) => {
    const newUser = {
      name: 'Endro QA JSON',
      gender: 'male',
      email: `endro_${Date.now()}@mail.com`,
      status: 'active'
    };

    const response = await request.post(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: newUser,
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log('User baru:', body);
    expect(body).toHaveProperty('id');

    // Simpan ID user ke file sementara (agar bisa dipakai PUT & DELETE)
    fs.writeFileSync('data/lastUser.json', JSON.stringify({ id: body.id }, null, 2));
  });

  // ✅ 3. PUT Request (update user)
  test('PUT - Update user terakhir', async ({ request }) => {
    const lastUser = JSON.parse(fs.readFileSync('data/lastUser.json', 'utf-8'));
    const userId = lastUser.id;

    const response = await request.put(`${baseURL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Endro QA Updated',
        status: 'inactive',
      },
    });

    expect([200, 404]).toContain(response.status());
    const body = await response.json();
    console.log('Update:', body);
  });

  // ✅ 4. DELETE Request (hapus user)
  test('DELETE - Hapus user terakhir', async ({ request }) => {
    const lastUser = JSON.parse(fs.readFileSync('data/lastUser.json', 'utf-8'));
    const userId = lastUser.id;

    const response = await request.delete(`${baseURL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect([204, 404]).toContain(response.status());
    console.log(`User dengan ID ${userId} dihapus.`);
  });
});
