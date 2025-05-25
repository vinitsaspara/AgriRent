import { setAllUsers } from "@/redux/slices/userSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsers = () => {
  const dispetch = useDispatch();
  useEffect(() => {
    const fetchAllUsres = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/get-all-user`, {
          withCredentials: true,
        });
        // console.log(res.data);

        if (res.data.success) {
          dispetch(setAllUsers(res.data));
        }
      } catch (error) {
        console.log("Error In GetAllUsres : ", error);
      }
    };
    fetchAllUsres();
  }, []);
};

export default useGetAllUsers;
