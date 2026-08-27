"use client"


import { LinkSection as SectionData } from "@/types";


interface SectionPickerProps {
  sections?: SectionData[]
  onChange: (section: SectionData)=> void
  selectedSectionId: string
  isPending: boolean
}
export default  function SectionPicker ({ sections, onChange, selectedSectionId, isPending}: SectionPickerProps){

    if (isPending && (!sections || sections.length === 0)) {
    return <div className="p-4 text-center text-gray-500">Loading sections...</div>
  }
    if((!sections || sections?.length === 0) ){
        return <div>There are sections to select</div>
    }
    


    return (
        <div>
           {sections.map((section) => {
        const isSelected = section.id === selectedSectionId;
        
        return (
          <div
            key={section.id}
            className={`relative rounded-lg border p-2 transition-all ${
              isSelected ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            
           

            <button
              type="button"
              onClick={() => onChange(section)}
              className="w-full text-left"
            >
               {/* <span className="absolute top-2 right-2 rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
              {section.id}
            </span> */}
            <div className="bg-white text-blue-600">
                {section.name}
            </div>

            </button>
          </div>
        );
      })}

      </div>
    )
}
   

