import { useState } from "react";
import Search from "./search";
import UserList from "./userList";

function Sidebar() {
    const [serachKey, setSearchKey] = useState('');
    return (<div className="app-sidebar">
        <Search searchkey={serachKey} setsearchkey={setSearchKey}/>
        <UserList searchKey={serachKey}/>
    </div>)
}

export default Sidebar;