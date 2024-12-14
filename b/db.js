import { Client } from "https://deno.land/x/mysql/mod.ts";
export const client = new Client()

const connectionInfo = {
    hostname: "localhost",
    username: "root",
    db: "t2",
    password: "rootLove25$gray",
}


export async function getUser(username) {
    try {
        await client.connect(connectionInfo);

        const sql = "SELECT username, passwordHash FROM user where username = ?"

        const result = await client.query(sql, [username]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}

export async function addUser(username, email, passwordHash) {
    const sql1 = 'select * from user where username = ?'
    const sql2 = "insert into user (username, email, passwordHash) values (?, ?, ?)"
    try {
        await client.connect(connectionInfo);
        const userCheck = await client.query(sql1, [username])
        if( userCheck[0] != null ){ return 'Username in use, please try another'}

        const result = await client.query( sql2, [username, email, passwordHash]);
        return 'Successfully made account'; 
    } 
    catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}

















export async function dbPost(task) {
    try {
        await client.connect({
            database: "tasks",
            username: "root",
            hostname: "localhost",
            password: "rootLove25$gray"
        });

        const sql = "insert into tasks ( description, completed ) values (?, ?)";

        await client.query("use tasks");
        const result = await client.query(sql, [task, 0]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}

export async function dbPut(taskObj) {

    try {
        await client.connect({
            database: "tasks",
            username: "root",
            hostname: "localhost",
            password: "rootLove25$gray"
        })
        const sql = "update tasks set description = ? where id = ?"

        await client.query("use tasks");
        const result = await (client.query(sql, [taskObj.description, taskObj.id]))
        return result;
    }
    catch (error) {
        return console.error("Error executing query:", error);
    }
    finally {
        await client.close()
    }
}

export async function dbDelete(params) {

    try {
        await client.connect({
            database: "tasks",
            username: "root",
            hostname: "localhost",
            password: "rootLove25$gray"
        })

        const sql = "DELETE FROM tasks WHERE id = ?;"
        await client.query("use tasks")
        const result = await client.execute(sql, [params])
        return result;

    }
    catch (error) {
        return error;
    }
    finally {
        await client.close();
        console.log(params)
    }
}
