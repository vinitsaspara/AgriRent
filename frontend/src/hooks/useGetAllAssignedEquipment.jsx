import { setAllAssignedEquipment } from "@/redux/slices/equipmentSlice.js";
import { ASSIGNMENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAssignedEquipment = () => {

    // console.log("Sdfsdf");
    
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAssignedEquipments = async () => {
      try {
          const res = await axios.get(
              `${ASSIGNMENT_API_END_POINT}/all-assigned-equipment`,
              {
                  withCredentials: true,
                }
            );
            console.log(res.data);

        

        if (res.data.success) {
          dispatch(setAllAssignedEquipment(res.data));
        }
      } catch (error) {
        console.log("Error in useGetAllEquipment: ", error);
      }
    };

    fetchAllAssignedEquipments();
  }, [dispatch]);
};

export default useGetAllAssignedEquipment;
