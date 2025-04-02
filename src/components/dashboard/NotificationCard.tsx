
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type NotificationStatus = "success" | "info" | "warning" | "danger";

type NotificationItem = {
  title: string;
  date: string;
  status: NotificationStatus;
  link?: string;
};

type NotificationCardProps = {
  title: string;
  icon: ReactNode;
  notifications: NotificationItem[];
  viewAllLink: string;
  onClick?: (link?: string) => void;
};

export const NotificationCard = ({
  title,
  icon,
  notifications,
  viewAllLink,
  onClick,
}: NotificationCardProps) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: NotificationStatus) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-orange-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    if (onClick && notification.link) {
      onClick(notification.link);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div 
              key={index} 
              className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => handleNotificationClick(notification)}
            >
              <div
                className={`mt-1 h-2 w-2 rounded-full ${getStatusColor(
                  notification.status
                )}`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.date}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
        <button
          className="mt-4 text-sm text-compliblue hover:underline w-full text-right"
          onClick={() => navigate(viewAllLink)}
        >
          Bekijk alles
        </button>
      </CardContent>
    </Card>
  );
};
