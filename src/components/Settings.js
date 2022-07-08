import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Accounts";
import ChangePassword from "./ChangePassword";


export default () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(() => {
                setLoggedIn(true);
            });
    }, []);

    return (
        <div>
            {loggedIn && (
            <>
                <h2>Settings</h2>

                <ChangePassword />
            </>
            )}
        </div>
    );
};