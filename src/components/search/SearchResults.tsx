import { useSearchContext } from "@/context/search-context";

function Result<T>({result} : {result: T}){
 return (<div>


 </div>)
}

export default function SearchReuslts (){

    const {title, results} = useSearchContext();


    return (<div>

        {title} Search Results
        {results?.map(result=>(

            <Result result={result} />
            

        ))}
    </div>)
}