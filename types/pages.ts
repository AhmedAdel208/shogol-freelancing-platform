export interface AnnouncementDetailPageProps {
  params: {
    id: string;
  };
}

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
