import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const PETSTOREURL = `https://petstore.swagger.io/v2/pet`;
const PETID = 942003;
const PETNAME = `chookitya`;

test('Should create a new pet.', async ({ request }) => {
    const newPet = await request.post(`${PETSTOREURL}/`, {
      data: {
        "id": PETID,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": PETNAME,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
    });
    expect(newPet.ok()).toBeTruthy();
  
    const pets = await request.get(`${PETSTOREURL}/pets`);
    expect(pets.ok()).toBeTruthy();
    expect(await pets.json()).toContainEqual(expect.objectContaining({
        "id": 942003,
        "category": {
          "id": PETID,
          "name": "string"
        },
        "name": PETNAME,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }));
  });