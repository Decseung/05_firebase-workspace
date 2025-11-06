import React from "react";
import { logout } from "../services/authService";
import { auth, db } from "../firebase/config";
import { useEffect } from "react";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";

function UserProfile() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const docSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUserProfile(docSnapshot.data());
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  //auth.currenUser === Firebase Authentication의 User 객체 (uid, emial, displayName, photoURL)
  return (
    <div>
      <h2>사용자 프로필</h2>
      <p>이메일 : {auth.currentUser.email}</p>
      <p>UID : {auth.currentUser.uid}</p>
      <p>
        생성일 :{" "}
        {new Date(auth.currentUser.metadata.creationTime).toLocaleString()}
      </p>
      <p>
        마지막 접속일 :{" "}
        {new Date(auth.currentUser.metadata.lastSignInTime).toLocaleString()}
      </p>

      {/* 이름, 주소, 성별, 권한 => fireStore 저장 */}

      <>
        <p>이름 : {userProfile.name}</p>
        <p>주소 : {userProfile.address}</p>
        <p>성별 : {userProfile.gender}</p>
        <p>권한 : {userProfile.role}</p>
      </>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default UserProfile;
