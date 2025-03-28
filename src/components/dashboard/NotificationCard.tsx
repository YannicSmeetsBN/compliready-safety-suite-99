
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type NotificationItemProps = {
  title: string;
  date: string;
  status: "warning" | "danger" | "success" | "info";
};

const NotificationItem = ({ title, date, status }: NotificationItemProps) => {
  const statusBadge = {
    warning: <span className="badge-warning">Binnenkort</span>,
    danger: <span className="badge-danger">Verlopen</span>,
    success: <span className="badge-success">Actueel</span>,
    info: <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Info</span>,
  };

  return (
    <div className="list-item">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div>{statusBadge[status]}</div>
      </div>
    </div>
  );
};

type NotificationCardProps = {
  title: string;
  icon?: ReactNode;
  notifications: NotificationItemProps[];
  viewAllLink: string;
};

export const NotificationCard = ({ 
  title, 
  icon, 
  notifications, 
  viewAllLink 
}: NotificationCardProps) => {
  return (
    <div className="dashboard-card dashboard-notification-card">
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-compliblue">{icon}</div>}
        <h3 className="card-header">{title}</h3>
      </div>
      
      <div className="card-content">
        {notifications.length > 0 ? (
          <div className="space-y-1">
            {notifications.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Geen notificaties gevonden.</p>
        )}
      </div>
      
      <div className="card-footer">
        <Button asChild variant="outline" size="sm">
          <a href={viewAllLink}>Bekijk alles</a>
        </Button>
      </div>
    </div>
  );
};
