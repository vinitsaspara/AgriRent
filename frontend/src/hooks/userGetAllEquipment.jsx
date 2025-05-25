import { setAllEquipment } from "@/redux/slices/equipmentSlice";
import { EQUIPMENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const userGetAllEquipment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllEquipments = async () => {
      try {
        const res = await axios.get(
          `${EQUIPMENT_API_END_POINT}/get-all-equipment`,
          {
            withCredentials: true,
          }
        );

        // console.log(res.data);

        if (res.data.success) {
          dispatch(setAllEquipment(res.data));
        }
      } catch (error) {
        console.log("Error in the useGetAllEquipment : ", error);
      }
    };
    fetchAllEquipments();
  }, []);
};

export default userGetAllEquipment;
