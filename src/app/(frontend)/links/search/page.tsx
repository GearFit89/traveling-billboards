
import { getAllLinks } from "@/lib/actions";

export default async function SearchPage(){
const links = await getAllLinks();
if (!links.success) {
  return null;
}
    return (
        <>
        
        </>
    )
}