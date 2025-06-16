import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/slices/userSlice";

const useGetCurrentUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //   console.log("dfd");

  // Get user from Redux store
  const user = useSelector((state) => state.user.user);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${USER_API_END_POINT}/current-user`, {
        withCredentials: true,
      });

      //   console.log("Current user response:", response.data);

      if (response.data.success) {
        // Dispatch action to update Redux store
        dispatch(setUser(response.data.user));
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, []);
};

export default useGetCurrentUser;
