import { SignData } from "@/types";
import Image from "next/image";

export default function Sign({ data }: { data: SignData }) {
  const imgLink = data.img_key;
  return (
    <div>
      <h2> {data.title || ""}</h2>
      <Image
        src={imgLink}
        fill
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
        alt={data.img_alt}
      ></Image>
    </div>
  );
}
