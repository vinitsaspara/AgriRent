import { useSelector } from "react-redux";
import useGetAssignmentHistory from "@/hooks/useGetAssignmentHistory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const EquipmentHistory = () => {
  useGetAssignmentHistory();
  const { equipmentHistory } = useSelector((state) => state.equipment);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Equipment Assignment History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {equipmentHistory.map((item) => (
          <Card key={item._id} className="shadow-md border border-emerald-100">
            <CardHeader>
              <CardTitle className="text-base">
                Equipment Assigned To:{" "}
                <span className="font-semibold text-emerald-600">
                  {item.assignedTo?.fullName || "Unknown"}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-500">
                Assigned By: {item.assignedBy?.fullName || "Unknown"}
              </p>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <strong>Assigned At:</strong>{" "}
                {format(new Date(item.assignedAt), "dd MMM yyyy, hh:mm a")}
              </div>
              <div>
                <strong>Returned At:</strong>{" "}
                {item.returnedAt ? (
                  <span className="text-green-700">
                    {format(new Date(item.returnedAt), "dd MMM yyyy, hh:mm a")}
                  </span>
                ) : (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                    Not Returned
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentHistory;
