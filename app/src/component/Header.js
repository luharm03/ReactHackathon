
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getType } from '../store';

const isActive = (str, loc) => {
    let location = loc.pathname.split('/');
    return location[1] === str ? true : (str === location[2] ? true : false);
}

const Header = () => {
    let location = useLocation();
    const [typeObj, setTypeObj] = useState({});

    useEffect(() => {
        if (Object.keys(getType()).length != Object.keys(typeObj).length) {
            setTypeObj(getType());
        }
    });

    return (
        <header className="App-header px-2 bg-light text-dark align-middle">
            <div className="text-sm-start">
                <span className="px-4">Machine Management </span>
                <Link to="/" className={"text-decoration-none px-2 " + (isActive('', location) ? "primary" : "text-secondary")}>All </Link>
                {Object.keys(typeObj).map(key => {
                    return typeObj[key].type != '' ? (<Link key={key} to={"type/" + key} className={"text-decoration-none px-2 " + (isActive(key, location) ? "primary" : "text-secondary")}>{typeObj[key].type}</Link>) : null;
                })
                }
                <Link to="types" className={"text-decoration-none px-2 " + (isActive('types', location) ? "primary" : "text-secondary")}>Manage Types</Link>
            </div>
        </header>
    );
}
export default Header;