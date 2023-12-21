"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUserDetails, logOut } from "@/redux/slices/authSlice";

function useAuth() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const fetchCurrentUser = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.NEXT_PUBLIC_KITTY_CHAN_API}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (status === 200) {
        // Setting to redux auth state
        Cookies.set("userDetails", JSON.stringify(data));
        dispatch(setUserDetails(data));
      } else {
        dispatch(logOut());
      }
    } catch (error) {
      dispatch(logOut());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { loading };
}

export default useAuth;
