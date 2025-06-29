// src/hooks/useGeetAllAssignment.js
import { setAllAssignment } from "@/redux/slices/assignmentSlice";
import { setAllEquipment } from "@/redux/slices/equipmentSlice";
import { ASSIGNMENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGeetAllAssignment = () => {
  const dispatch = useDispatch();
  // console.log("hellp");

  useEffect(() => {
    const fetchAllAssignment = async () => {
      try {
        const res = await axios.get(
          `${ASSIGNMENT_API_END_POINT}/all-assigned-equipment`,
          {
            withCredentials: true,
          }
        );

        console.log("Response from get-all-equipment:", res.data);

        if (res.data.success) {
          dispatch(setAllAssignment(res.data.assignedEquipmentList));
        }
      } catch (error) {
        console.log("Error in useGeetAllAssignment: ", error);
      }
    };

    fetchAllAssignment();
  }, [dispatch]);
};

export default useGeetAllAssignment;
