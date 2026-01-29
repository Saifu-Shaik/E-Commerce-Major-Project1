import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userProfile);
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.userProfileUpdate,
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const isAdmin = userInfo?.isAdmin === true;

 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [savedAddress, setSavedAddress] = useState("");

  
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

 
  useEffect(() => {
    if (!user) return;

    setUsername(user.username || "");
    setEmail(user.email || "");


    if (!isAdmin && user.profile) {
      setFirstName(user.profile.first_name || "");
      setLastName(user.profile.last_name || "");
      setDob(user.profile.dob || "");
      setPhone(user.profile.phone || "");
      setSavedAddress(user.profile.saved_address || "");
    }
  }, [user, isAdmin]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (isAdmin) {
      alert("⚠️ Admin cannot update profile from here.");
      return;
    }

    dispatch(
      updateUserProfile({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        dob,
        phone,
        saved_address: savedAddress,
      }),
    );
  };


  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2 className="mb-3">
        <i className="bi bi-person-circle me-2"></i>
        {isAdmin ? "Admin Profile (View Only)" : "Your Profile"}
      </h2>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {updateError && <Message variant="danger">{updateError}</Message>}
      {updateSuccess && (
        <Message variant="success">Profile Updated Successfully</Message>
      )}

      {!loading && (
        <form onSubmit={submitHandler}>
         
          <div className="mb-3">
            <label>Username : </label>
            <input
              className="form-control mt-2"
              disabled={isAdmin}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          
          <div className="mb-3">
            <label>Email :</label>
            <input
              type="email"
              className="form-control mt-2"
              disabled={isAdmin}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

         
          <div className="mb-3">
            <label>New Password :</label>
            <input
              type="password"
              className="form-control mt-2"
              disabled={isAdmin}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

         
          {!isAdmin && (
            <>
              <div className="mb-3">
                <label>First Name</label>
                <input
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Last Name</label>
                <input
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Saved Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={savedAddress}
                  onChange={(e) => setSavedAddress(e.target.value)}
                ></textarea>
              </div>
            </>
          )}

          
          <button className="btn btn-primary w-100 mt-3" disabled={isAdmin}>
            {isAdmin ? "Admin Cannot Update" : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileScreen;
