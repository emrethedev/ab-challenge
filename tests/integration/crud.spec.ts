import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.use(
    {
        extraHTTPHeaders: {
            'Accept': 'application/json',
            'Authorization': `token ${process.env.API_TOKEN}`,
          },
    }
)

const PETSTOREURL = `https://petstore.swagger.io/v2/pet`;
const PETID = 942003;
const PETNAME = `chookitya`;
const UPDATEDPETNAME = `changedcookity`;

// CREATE
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
  });

  // READ
  test('Should find a newly created test', async ({ request }) => {
    const pets = await request.get(`${PETSTOREURL}/${PETID}`);
    expect(pets.ok()).toBeTruthy();
    expect(await pets.json()).toContainEqual(expect.objectContaining({
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
      }));
  })

  // UPDATE
  test('Update the freshly created pet name record.', async ({ request }) => {
    const updatedPet = await request.put(`${PETSTOREURL}/`, {
      data: {
        "id": PETID,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": UPDATEDPETNAME,
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
    expect(updatedPet.ok()).toBeTruthy();
  });

  // DELETE
  test('Should retrieve the updated pet name', async ({ request }) => {
    const deletePet = await request.delete(`${PETSTOREURL}/${PETID}`);
    expect(deletePet.ok()).toBeTruthy();
    expect(await deletePet.json()).toContainEqual(expect.objectContaining({
    //  TODO: Implement the expected response/result from Pet Store Swagger API
      }));
  })