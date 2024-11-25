import { useState } from "react";
import Search from "./search";

function Sidebar() {
    const [serachKey, setSearchKey] = useState('');
    return (<div className="app-sidebar">
        <Search searchkey={serachKey} setsearchkey={setSearchKey}/>
        {/*<!--USER LIST--> */}
    </div>)
}

export default Sidebar;