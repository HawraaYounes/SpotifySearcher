// CallbackPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");
    const state = urlParams.get("state");

    if (localStorage.getItem("spotify_auth_state") !== state) {
      console.error("Invalid state");
      return;
    }

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      navigate("/search"); // Redirect to Artist Search page upon successful authentication
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default CallbackPage;
