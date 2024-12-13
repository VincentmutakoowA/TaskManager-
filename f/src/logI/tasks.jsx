import React, { useState } from "react";
import './tasks.css'
import NewTask from "./newTask";
import OneTask from "./oneTask";

export default function Tasks() {
    return (
        <>
            <div className="container1">
                <NewTask />
                <OneTask />
            </div>
        </>
    )
}
