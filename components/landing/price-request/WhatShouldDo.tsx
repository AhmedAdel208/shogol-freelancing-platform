import Image from "next/image";
import whatShouldDo from "@/public/images/what-should-do.png";

export default function WhatShouldDo() {
  return (
    <section className=" bg-white">
      <div className="max-w-8xl mx-auto">
        <Image
          src={whatShouldDo}
          alt="What should do"
          className="w-full h-auto object-cover "
        />
      </div>
    </section>
  );
}
