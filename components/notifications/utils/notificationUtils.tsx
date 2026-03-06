import { Notification } from '../types';
import { Briefcase, MessageSquare, Star, Calendar, Check, Bell } from 'lucide-react';
import { NOTIFICATION_TYPES } from '../constants';

export const getNotificationIcon = (type: string) => {
  switch (type) {
    case NOTIFICATION_TYPES.PROJECT:
      return <Briefcase className="w-5 h-5 text-blue-400" />;
    case NOTIFICATION_TYPES.MESSAGE:
      return <MessageSquare className="w-5 h-5 text-green-400" />;
    case NOTIFICATION_TYPES.REVIEW:
      return <Star className="w-5 h-5 text-yellow-400" />;
    case NOTIFICATION_TYPES.PAYMENT:
      return <Calendar className="w-5 h-5 text-purple-400" />;
    case NOTIFICATION_TYPES.JOB_COMPLETED:
      return <Check className="w-5 h-5 text-green-400" />;
    case NOTIFICATION_TYPES.PROPOSAL_RECEIVED:
      return <Briefcase className="w-5 h-5 text-orange-400" />;
    case NOTIFICATION_TYPES.JOB_REQUEST_CREATED:
      return <Briefcase className="w-5 h-5 text-blue-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-400" />;
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'الآن';
  } else if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  }
};
