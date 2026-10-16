import { useEffect, useState } from "react";
import { getUserActivity } from "../../services/utils";

interface ActivityItem {
  id: string;
  action: string;
  entity: string;
  timestamp: string;
}

const timeAgo = (isoDate: string) => {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
};

const RecentActivity = () => {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await getUserActivity();
      if (response?.ok) {
        setActivity(response.data || []);
      }
    } catch (err: any) {
      console.log("error fetching activity: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-[1px] border-[#EAECF0] shadow-md rounded-xl h-[250px] w-[100%] lg:w-[100%] p-4">
      <div>
        <p className="text-[#212529] text-[18px] font-bold">Recent Activity</p>
        <p className="text-[12px] text-[#757575] mt-2">Your latest account activities</p>
      </div>

      <div className="mt-5 flex flex-col gap-y-[15px] overflow-y-auto max-h-[160px]">
        {!loading && activity.length === 0 && (
          <p className="text-[12px] text-[#757575]">No recent activity yet.</p>
        )}
        {activity.map((item) => (
          <div key={item.id} className="flex justify-between items-center h-[35px]">
            <p className="text-[#212529] text-[14px] font-bold">
              {item.action} {item.entity}
            </p>
            <p className="text-[12px] text-[#757575] font-semibold">{timeAgo(item.timestamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
