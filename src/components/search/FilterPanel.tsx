"use client"

import { useState } from "react";
import styles from "@/styles/Search.module.css";
import { Icon } from "@/lib/icons";
import { LinkData } from "@/types";
import { getLinkSearchResults } from "@/lib/server-actions";
import { LinkFilters } from "@/types";
import { useContext } from "react";
import Button from "@/client/Button";
import { Filter, SearchIcon } from "lucide-react";
import { useSearchContext } from "@/context/search-context";


type FilterItemType = "everySelect" | "range"|"oneSelect"
interface FilterItem {
    label?:string;
    keyName: string;
    type: FilterItemType;
    min?:number;
    max?:number;
    options: string[]


}

interface FilterItemComponentProps { 
    item: FilterItem;
    formState: Record<string,  any>;
     onFilterChange: (key: string, value: string | number | null) => void;
    onFilterArrayChange: (key: string, value: string | number | null) => void;

    }
function FilterItemComponent({item, onFilterArrayChange, onFilterChange, formState}: FilterItemComponentProps) {



    switch(item.type) {

        case "oneSelect":

            return (
        <label className={styles.filterLabel}>

          {item.label && <span>{item.label}</span>}

          <select 
            className={styles.filterSelect} 
            onChange={(e) => onFilterArrayChange(item.keyName, e.target.value)}
            value={formState[item.keyName]}
          >
            {item.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
                

            );

        case "range":

            return (

                <div className={styles.filterRangeGroup}>

                    <input className={styles.filterRangeInput} type="number" placeholder={`Min (${item.min|| "0"})`} onChange={(e) => onFilterChange(item.keyName , parseFloat(e.target.value))} />

                    <input  className={styles.filterRangeInput} type="number" placeholder={`Max (${item.max|| "100"})`} onChange={(e) => onFilterChange(item.keyName , parseFloat(e.target.value))} />

                </div>

            );

        default:

            return null;

    }

}
export default function FilterLinksSelecter({isOpen, onClose , filterItems}: {isOpen: boolean, onClose: () => void, 
     filterItems: FilterItem[]
   }) {
    
    const [formState, setFormState] = useState<LinkFilters >({sections: []});
    const { searcher, title } = useSearchContext();
    

    if(!isOpen) {
        return null;
    }

    

    const handleApplyFilters = () => {
        
       searcher?.filter(formState );
        onClose();
    };

    return (
        <div className={styles.filterModal}>
            <div className={styles.filterContent}>
                <h3>Filter {title} </h3>
              
                    {filterItems.map((item) => (
                      <FilterItemComponent key={item.label} item={item}
                      formState={formState}
                       onFilterChange={(key, value) => {
                        setFormState(prev => ({ ...prev, [key]: value }));
                    
                      }}
                      onFilterArrayChange={(key, value) => {
  // Guard clause against null values
    if (value === null) return;

    setFormState((prev) => {
    const typedKey = key as keyof LinkFilters;
    
    // Safely get the existing array, or fall back to an empty one if it doesn't exist yet
    const existingArray = (prev[typedKey] as (string | number)[]) || [];

    return {
      ...prev,
      [typedKey]: [...existingArray, value],
    };
  });
}} />
                    ))}
                
                <div className={styles.filterButtons}>
                    <Button onClick={handleApplyFilters}>Apply</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );


}