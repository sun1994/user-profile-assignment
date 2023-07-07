import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState<{
    email: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
  }>({
    name: { title: "", first: "", last: "" },
    email: "",
  });
  const { email, name } = user;
  const { title, first, last } = name;

  const fetchDetails = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const userDetails = response.data.results[0];
      setUser(userDetails);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUser(JSON.parse(storedUserDetails));
    } else {
      fetchDetails();
    }
  }, []);

  const refreshUserDetails = () => {
    fetchDetails();
  };

  return (
    <div>
      {user ? (
        <div>
          <p><strong>Name:</strong>{`${title} ${first} ${last}`}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      ) : (
        <p>Loading Details...</p>
      )}
      <button onClick={refreshUserDetails}>Refresh</button>
    </div>
  );
};

export default UserDetails;
