import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Image src={logo} alt="the logo of the app" priority />
      </Link>
    </>
  );
}
