// src/hooks/useGetAllEquipment.js
import { setAllEquipment } from "@/redux/slices/equipmentSlice";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllEquipment = () => {
  const dispatch = useDispatch();
  // console.log("hellp");

  useEffect(() => {
    const fetchAllEquipments = async () => {
      try {
        const res = await axios.get(
          `${EQUIPMENT_API_END_POINT}/get-all-equipment`,
          {
            withCredentials: true,
          }
        );

        // console.log("Response from get-all-equipment:", res.data);
        

        if (res.data.success) {
          dispatch(setAllEquipment(res.data.equipmentList));
        }
      } catch (error) {
        console.log("Error in useGetAllEquipment: ", error);
      }
    };

    fetchAllEquipments();
  }, [dispatch]);
};

export default useGetAllEquipment;
