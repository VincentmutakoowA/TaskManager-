import { Client } from "https://deno.land/x/mysql/mod.ts";
export const client = new Client()

const connectionInfo = {
    hostname: "localhost",
    username: "root",
    db: "t2",
    password: "rootLove25$gray",
  }


export async function getUser() {
    try {
        await client.connect(connectionInfo);
        //await client.query("use tasks");
        const result = await client.query("SELECT * FROM user");
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}