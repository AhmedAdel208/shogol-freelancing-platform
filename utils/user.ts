export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const getUserName = (profile?: UserProfile): string => {
  if (!profile) return "مستخدم";
  
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName} ${profile.lastName}`;
  }
  return profile.firstName || profile.email?.split("@")[0] || "مستخدم";
};

export const getUserInitials = (profile?: UserProfile): string => {
  if (!profile) return "م";
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  }
  const userName = getUserName(profile);
  return userName.charAt(0).toUpperCase() || "م";
};
