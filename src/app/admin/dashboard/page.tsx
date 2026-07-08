"use client"

import { useState, useEffect } from "react"
import { Collection, collections, FnMap, Ids } from "./content"
import { CollectionManager } from "./collection-manager"
import { SitePreview } from "./site-preview"
import { cn } from "@/lib/utils"
import { Database, Lock, Unlock } from "lucide-react"
import LoginModal from "./Modal"
import { getToken, setToken } from "@/lib/admin-actions";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "sonner";
import { getAllThoughts } from "@/lib/admin-actions";

export default   function AdminPanel() {
    const { toast } = useToast()
    const [ cachedData, setCacheData] = useState<Partial<Record<Ids, any>>>({});
  const [activeId, setActiveId] = useState<Ids>(collections[0].id);
  console.log(JSON.stringify(collections));
  const [active, setActive] = useState<Collection>();
  
  // Auth state management
  const [adminToken, setAdminToken] = useState<string>("")
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(()=>{
    const fetchData = async () =>{
      const collection = collections.find(c=> c.id === activeId) as Collection;
      try{
      const dataInCache = cachedData[activeId];

      if(!dataInCache){
      
        //on a cache miss get the fetch from the db.
       const { data } =  await FnMap[activeId]();

       
       console.log("oppp", JSON.stringify(data))

       // with the collection add the data to the sample rows
       setActive({
        ...collection,
        sampleRows:data
       });

       setCacheData(prev=>({
        ...prev,
        [activeId] : data
       }))
       return;

      }
      
      setActive({
       ...collection,

        sampleRows: dataInCache,


      })
    }catch(e: any){
      console.error(e, " Message \n", e.message)
    }

    }
    fetchData();

  }, [activeId])

  //check to see if cookie has the admin login
useEffect(() => {
  const checkExistingToken = async () => {

   try {
        const { data: token } = await  getToken();

    //prompt login
        if(!token){
          setShowLoginModal(true)
          return;
        }

         setAdminToken(token)
      } catch (e: any) {
        console.error("Data layer retrieval error:", e?.message || e);
      }
  };
  const test = async ()=>{
   const { data } =  await getAllThoughts();
   console.warn("datagot good?" , data)
  }

  test();

  checkExistingToken();
}, []);
  // Auto-prompt login if no token exists in the session
  

  const handleSaveToken = async(token: string) => {
  const { success }  =  await setToken(token);

  toast({
    // description:`Cookie success ${success ? "yes!" : "no!"}`,
    title: `${success ? "Saved Admin Token Success" : "Failed to save admin token"}`,
    color: `${success ? "balck" : "red"}`,
    
    style:{
      color:` ${success ? "black" : "red"}`

    }
    
    
    
  })
    setAdminToken(token)
    setShowLoginModal(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30 text-foreground lg:h-screen lg:flex-row lg:overflow-hidden">
      
      {/* Dynamic Authentication Shield Overlay */}
      {showLoginModal && (
        <LoginModal 
          adminToken={adminToken} 
          onSaveToken={handleSaveToken}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="flex flex-col gap-6 border-b bg-card p-5 lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Database className="size-4" />
            </span>
            <div className="leading-tight">
              <h1 className="text-base font-semibold tracking-tight">Content Manager</h1>
              <p className="text-xs text-muted-foreground">Edit your site&apos;s content</p>
            </div>
          </div>
        </div>

        <nav aria-label="Content sections" className="flex flex-row flex-wrap gap-1 lg:flex-col">
          {collections.map((c) => {
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-1 items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors lg:flex-none",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                <c.icon className="size-4 shrink-0" />
                <span className="truncate">{c.label}</span>
              </button>
            )
          })}
        </nav>
          <Toaster />
        {/* Dynamic Token Session Panel Status Indicator */}
        <div className="mt-auto hidden rounded-xl border bg-muted/50 p-4 lg:block">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Auth Matrix Status
            </span>
            {adminToken ? (
              <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <Unlock className="size-3" /> Validated
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                <Lock className="size-3" /> Locked
              </span>
            )}
          </div>
          
          {adminToken ? (
            <div className="flex items-center justify-between">
              <code className="text-xs font-mono text-muted-foreground/80">
                ••••{adminToken.slice(-4)}
              </code>
              <button 
                onClick={() => setAdminToken("")} 
                className="text-xs font-medium text-destructive hover:underline"
              >
                Clear Key
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full text-center text-xs py-1.5 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary font-medium rounded-md transition"
            >
              Enter Runtime Code
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-4xl">
          {/* Linked the administrative runtime action security key token down into the worker here */}
          <CollectionManager 
            key={active?.id || "key"} 
            collection={active } 
            adminToken={adminToken} 
          />
        </div>
      </main>

      {/* Live site preview */}
      <aside className="h-[70vh] shrink-0 border-t bg-card lg:h-auto lg:w-[30rem] lg:border-l lg:border-t-0 xl:w-[34rem]">
        <SitePreview />
      </aside>
    </div>
  )
}