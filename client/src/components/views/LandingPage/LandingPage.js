import React, { useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
    useEffect(() => {
        axios.get("http://localhost:3000/api/hello")
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>Landing</div>
    )
}

export default LandingPage;