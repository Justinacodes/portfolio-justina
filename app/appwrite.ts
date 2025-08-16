import { Client, Account, Databases, Query } from 'appwrite';

export const client = new Client();

client
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite endpoint
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

export const databases = new Databases(client)
export const account = new Account(client);
export const query = new Account(client);
export { ID, Databases, Query } from 'appwrite';
