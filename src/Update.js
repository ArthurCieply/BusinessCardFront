import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { Amplify, Auth, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from "uuid";

const Update = () => {

    return ( 
        <div className="create" /*key={cardIdSort}*/>
            <h2>Update Card:</h2>
        </div>
    )
}
export default Update;