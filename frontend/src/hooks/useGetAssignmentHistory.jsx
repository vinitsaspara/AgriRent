import { useState, useEffect } from "react";
import axios from "axios";
import { ASSIGNMENT_API_END_POINT } from "../utils/constant";
import { toast } from "react-hot-toast";
import { setEquipmentHistory } from "@/redux/slices/equipmentSlice";
import { useDispatch } from "react-redux";

const useGetAssignmentHistory = (equipmentId) => {
  //   const [assignmentId, setAssignmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAssignmentHistory = async () => {
      if (!equipmentId) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${ASSIGNMENT_API_END_POINT}/history-equipment/${equipmentId}`,
          { withCredentials: true }
        );

        // console.log("Assignment History Response:", res.data.history);

        if (res.data.success) {
          dispatch(setEquipmentHistory(res.data.history));
        }
      } catch (error) {
        console.error("Error fetching assignment history:", error);
        toast.error("Error fetching assignment history");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentHistory();
  }, [equipmentId]);
};

export default useGetAssignmentHistory;
