import LinkSearch from "@/components/links/LinkSearch";
import { getAllLinks } from "@/lib/actions";

export default async function SearchPage(){
const {data: links}= await getAllLinks() as {success: boolean, data: any[], error?: string};
    return (
        <>
        <LinkSearch links={links} sectionId="all"/>
        </>
    )
}