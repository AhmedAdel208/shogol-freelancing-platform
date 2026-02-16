import Link from "next/link";
import Image from "next/image";
import chat from "@/public/images/chat.png";
import notification from "@/public/images/notification.png";

export default function Navicons() {
  return (
    <>
      <div className="flex items-center gap-10">
        <Link href="/chat">
          <Image
            src={chat}
            alt="chat icon"
            priority
            className="cursor-pointer"
          />
        </Link>
        <Link href="/notifications">
          <Image
            src={notification}
            alt="notification icon"
            priority
            className="cursor-pointer"
          />
        </Link>
      </div>
    </>
  );
}
