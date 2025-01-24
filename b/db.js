import { Client } from "https://deno.land/x/mysql/mod.ts";
export const client = new Client()

const connectionInfo = {
    hostname: "localhost",
    username: "root",
    db: "t2",
    password: "rootLove25$gray",
}


/////           USER DATA                //////////////////////////////////
export async function getUser(username) {
    try {
        await client.connect(connectionInfo);

        const sql = "SELECT userId, username, passwordHash, mode FROM user where username = ?"

        const result = await client.query(sql, [username]);
        console.log(result)
        if (result.length == 0) return null;
        return result;
    } catch (error) {
        console.log("E", error);
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

export async function switchMode (username) {
    let color = {mode: ""}
    let colorMode;

    const sql1 = 'select mode from user where username = ?'
    const sql2 = 'update user set mode = ? where username = ?'

    try {
        await client.connect(connectionInfo);
        colorMode = await client.query(sql1, [username])
        color = colorMode[0]
        color.mode === "light" ? colorMode = "dark" : colorMode = "light"
        const result = await client.query(sql2, [colorMode, username])
        return result

    } catch (error) {
        console.log(error)
    } 
    finally {
        await client.close();
    } 
}

export async function deleteUser(userId){
    const sql1 = "DELETE FROM task WHERE userId =?"
    const sql2 = "DELETE FROM user WHERE userId =?"
    try {
        await client.connect(connectionInfo);

        const result1 = await client.query(sql1, [userId])
        if(result1.error) return result1.error
        const result2 = await client.query(sql2, [userId]);

        console.log('Result1: ', result1)
        console.log('Result2: ', result2)

        return result2;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}




/////////////TASKS //   //  //  /////////////
export async function addTask(userId, description){
    const sql = "INSERT INTO task (userId, description) VALUES (?,?)"
    try {
        await client.connect(connectionInfo);
        const result = await client.query(sql, [userId, description]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}
export async function getTasks(userId){
    const sql = "SELECT * FROM task WHERE userId =?"
    try {
        await client.connect(connectionInfo);
        const result = await client.query(sql, [userId]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}
export async function updateTask(taskId, description){
    const sql = "UPDATE task SET description =? WHERE taskId =?"
    try {
        await client.connect(connectionInfo);
        const result = await client.query(sql, [description, taskId]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}
export async function deleteTask(taskId) {
    const sql = "DELETE FROM task WHERE taskId =?"
    try {
        await client.connect(connectionInfo);
        const result = await client.query(sql, [taskId]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}






/////////////     PASSWORD RESET  /////////////////
export async function resetPassword(email, newPassword) {
    try {
        await client.connect(connectionInfo)
       
        const sql = "UPDATE user SET passwordHash = ? WHERE email = ?";

        const result = await client.query(sql, [newPassword, email]);
        return result;
    } catch (error) {
        console.log("Error", error);
    }
    finally {
        await client.close();
    }
}
