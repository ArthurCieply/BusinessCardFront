import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { Amplify, Auth, Storage } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import React from 'react';

const CardDetails = () => {
    const { id } = useParams();
    const { sort } = useParams(); 
    const { data: card, error, isPending } = useFetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort);
    const history = useHistory();
    const cardIdSort = id + sort;


    
    //const [imageUrl, setImageUrl] = useState(null);
    /*const [loading, setLoading] = useState(false);
    
    const downloadUrl = async () => {
        // Creates download url that expires in 5 minutes/ 300 seconds
        const response = await fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort);
        const json = await response.json();
        console.log(json);
        console.log(json.pictureName);
        //const downloadUrl = await Storage.get({key:`${card.pictureName}`});
        const downloadUrl = await Storage.get(`${card.pictureName}`);
        console.log(downloadUrl);
    };*/
      //console.log('files: ', files);
      //console.log(downloadUrl);
      //window.location.href = downloadUrl;

    //console.log(card.cardName);
    //console.log(card.pictureName);
    

    /*React.state = { fileUrl: '' }

    useEffect( async () => {
        const getImage = async () => {
            await Storage.get(`${card.pictureName}`)
                .then(data => {
                    this.setState({
                        fileUrl:data
                    })
                })
                .catch(err => {
                    console.log('error fetching image')
                })
        };
        getImage();
    }, []);*/

    
    /*useEffect( async () => {
        const getImage = async () => {
            //await Storage.get(`${card.pictureName}`)
            await Storage.get(`${card.pictureName}`)
        };
        getImage();
    }, []);*/

    /*const [image, setImage] = useState();

    useEffect(() => {
        onPageRendered();
    }, []);
    
    const onPageRendered = async () => {
        getProfilePicture();
    };
    
    const getProfilePicture = async () => {
        await Storage.get(`${card.pictureName}`)
            .then(url => {
                console.log(card.pictureName)
                var myRequest = new Request(url);
                fetch(myRequest).then(function(response) {
                    if (response.status === 200) {
                    setImage(url);
                }
            });
        })
        .catch(err => console.log(err));
    };*/
    
    const handleDelete = async (e) => {
        e.preventDefault();
        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token
            }
        }).then(() => {
            history.push('/');
        }).catch(err => console.error(err))
    }

    return (
        <div className="card-details" key={cardIdSort}>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { card && (
                card.map((card)=>
                    <article key={1}>
                        <h2>{ card.cardName }</h2>
                        <h3>Profession: { card.jobTitle }</h3>
                        <div>Employer: { card.employer }</div>
                        <div>Age: { card.age } years old</div>
                        <div>Date of Birth: { card.dob }</div>
                        <div>City, State: { card.cityState }</div>
                        <div>Email: { card.email }</div>
                        <div>Phone Number: { card.phoneNumber }</div>
                        <div>{ card.pictureName }</div> 



                        {/* Renders, but little control, seems very depricated
                        <AmplifyS3Image imgKey="thanatopsis.jpg"/>
                        */}

                        {/*<div>
                            <h2>Download URL?</h2>
                            <button onClick={() => downloadUrl()}>Click Here!</button>
                        </div>*/}

                        {/*<div>
                            <AmplifyS3Image style={{"--height": "150px"}} path={card.pictureName} />
                        </div>*/}

                        <div className="buttons-div">
                            <button className="delete-btn" onClick={handleDelete}>Delete</button>                    
                        <Link to={"/update/"+id+"/"+sort}><button className="edit-btn">Edit</button></Link>
                        </div>
                    </article>
                )
                /*<article>
                    <h2>{ card.name }</h2>
                    <h3>Profession: { card.profession }</h3>
                    <div>{ card.favoriteColor }</div>
                    <div>{ card.age }</div>
                </article>*/
                /*console.log({card})*/
            )}
        </div>
    );
}
 
export default CardDetails;