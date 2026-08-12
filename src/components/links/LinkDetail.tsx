'use client';

import Link from 'next/link';
import { Icon, IconKey } from '@/lib/icons';
import { useToast } from '@/hooks/use-toast';
import { copyToClipBoard, shareText } from '@/client/utils';
import styles from '@/styles/Links.module.css';
import { CopyIcon, Share2, ShareIcon } from 'lucide-react';
import Button from '@/client/Button';
interface LinkDetailProps {
  title: string;
  description: string;
  url: string;
  sectionId: string;
  sectionName: string;
  visitSiteText: string;
  backToAllText: string;
  pageTitle: string;
  sectionIcon: string;
}

export function LinkDetail({
  title,
  description,
  url,
  sectionId,
  sectionName,
  visitSiteText,
  sectionIcon,
  backToAllText,
  pageTitle,
}: LinkDetailProps) {
  const toast = useToast();

  const handleCopyUrl = async () => {
    await copyToClipBoard(url, toast.toast);
  };

  const handleShareLink = async () => {
    await shareText({ title, text: description, url }, toast.toast);
  };

  return (
    <>
     

         <div className="flex items-center justify-between mb-4">
  
        <Link href={`/links?section=${sectionId}`} className={styles.backLink}>
          <Icon name="arrowLeft" size={16} className={styles.backIcon} />
          {backToAllText}
        </Link>
  {/* FIXME: make it so that the link data has icons  */}
         <Link href={`/links` } className={styles.backLink}>
  <span className={styles.sectionIcon}>
    <Icon name={sectionIcon as IconKey} size={32}  />
  </span>
  </Link>
 
</div>
       
     

      <header className={styles.header}>
        {/* <nav className={styles.breadcrumb}>
          <Link href="/links" className={styles.breadcrumbLink}>
            {pageTitle}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link
            href={`/links?section=${sectionId}`}
            className={styles.breadcrumbLink}
          >
            {sectionName}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </nav> */}
      </header>

      <div className={styles.linkDetail}>
        <div className={styles.linkDetailCard}>
          {/* <div className={styles.linkDetailIcon}>
            <Icon name="externalLink" size={28} className={styles.linkDetailIconSvg} />
          </div> */}
          <h1 className={styles.linkDetailTitle}>{title}</h1>
          <p className={styles.linkDetailDescription}>{description}</p>
         
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkDetailBtn}
          >
            {visitSiteText}
            <Icon name="externalLink" size={16} />
          </a>
            <div className={styles.linkDetailMeta}>

              <span className={styles.linkDetailUrl}>{url}</span>

             </div>

        
           <div className={styles.linkDetailActions}>
            <Button type="Button" className={styles.linkDetailSecondaryBtn} onClick={handleCopyUrl}>
              <CopyIcon size={16} className={styles.linkDetailCopyIcon} />
            </Button>
            <Button type="Button" className={styles.linkDetailSecondaryBtn} onClick={handleShareLink}>
               <Share2 size={16} className={styles.linkDetailShareIcon} />
            </Button>
          </div>
          
        
        </div>
      </div>
    </>
  );
}
