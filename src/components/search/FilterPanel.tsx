"use client"

import { useState } from "react";
import styles from "@/styles/Links.module.css";
import { Icon } from "@/lib/icons";
import { LinkData } from "@/types";
import { getLinkSearchResults } from "@/lib/server-actions";
import { LinkFilters } from "@/types";
import { useContext } from "react";
import Button from "@/client/Button";
import { SearchIcon } from "lucide-react";



export default function FilterLinksSelecter({isOpen, onClose , onFilterChange}: {isOpen: boolean, onClose: () => void, 
     onFilterChange: (newFilters: LinkFilters) => void, 
    allSectionNames: string[]}) {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const 
    if(!isOpen) {
        return null;
    }

    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSection(event.target.value);
    };

    const handleApplyFilters = () => {
        onFilterChange({ sections: selectedSection ? [selectedSection] : [] });
        onClose();
    };

    return (
        <div className={styles.filterModal}>
            <div className={styles.filterContent}>
                <h3>Filter Links</h3>
                <label>
                    Section:
                    <select value={selectedSection || ""} onChange={handleSectionChange}>
                        <option value="">All Sections</option>
                        {allSectionNames.map((section) => (
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </label>
                <div className={styles.filterButtons}>
                    <Button onClick={handleApplyFilters}>Apply</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );


}