import { faker } from '@faker-js/faker'
import fs from 'fs'
import path from "path";

export async function apiCreateListings(apiClient, apiToken, baseUrl, baseListingApi) {
  const listingFullUrl = new URL(baseListingApi, baseUrl).toString()
  const imagePath = path.resolve(__dirname, "../data/house.jpg");

  const data = {
    images: fs.createReadStream(imagePath),
    lotSize: faker.number.int({ min: 1000, max: 10000 }),
    sqft: faker.number.int({ min: 1000, max: 10000 }),
    garage: faker.number.int(10),
    bathrooms: faker.number.int(10),
    bedrooms: faker.number.int({ min: 2, max: 9 }),
    price: faker.number.int({ min: 600000, max: 9000000 }),
    zipCode: faker.location.zipCode('#####'),
    state: faker.location.state(),
    city: `St ${faker.location.city()}`,
    address: faker.location.streetAddress(),
    description: faker.food.description(),
    title: `Stelios Automation ${faker.number.int({ min: 1000, max: 100000 })}`,
    isPublished: true
  };

  const apiListingResponse = await apiClient.post(listingFullUrl, {
    multipart: data,
    Authorization: `Bearer ${apiToken}`
  });

  const apiListingResponseJson = await apiListingResponse.json();

  return apiListingResponseJson;
}