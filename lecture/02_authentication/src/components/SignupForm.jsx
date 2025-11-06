import React, { useState } from "react";
import { signUp } from "../services/authService";
import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

function SignupForm() {
  const [loading, setLoading] = useState(false);
  // 이메일, 비밀번호, 이름, 주소, 성별
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    gender: "M",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    // 회원가입 진행
    try {
      // (이메일/비밀번호 => authentication 사용자 정보 등록) => 사용자 UID
      const user = await signUp(formData.email, formData.password);
      const uid = user.uid;
      // (이메일/이름/주소/성별 => fireStore 사용자 프로필 정보 저장)
      await setDoc(doc(db, "users", uid), {
        email: formData.email,
        name: formData.name,
        address: formData.address,
        gender: formData.gender,
        role: "USER",
      });
      console.log("회원가입 성공");
    } catch (error) {
      let errorMsg = "회원가입 중 에러가 발생";
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "올바른 이메일 형식이 아닙니다.";
          break;
        case "auth/email-already-in-use":
          errorMsg = "이미 사용중인 이메일 입니다.";
          break;
        case "auth/weak-password":
          errorMsg = "비밀번호가 너무 쉽습니다.";
          break;
      }
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="이메일"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="이름"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="주소"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <br />
      <input
        type="radio"
        value="M"
        checked={formData.gender === "M"}
        onChange={(e) => setFormData({ ...formData, genter: e.target.value })}
      />
      <label>남자</label>
      <input
        type="radio"
        value="F"
        checked={formData.gender === "F"}
        onChange={(e) => setFormData({ ...formData, genter: e.target.value })}
      />
      <label>여자</label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "가입중..." : "회원가입"}
      </button>
    </form>
  );
}

export default SignupForm;
