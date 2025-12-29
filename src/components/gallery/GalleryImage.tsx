'use client';

import { useState } from 'react';
import Image from 'next/image';
import Skeleton from '@/components/ui/Skeleton';
import styles from './GalleryImage.module.scss';

interface GalleryImageProps {
    src: string;
    alt: string;
}

export default function GalleryImage({ src, alt }: GalleryImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={styles.wrapper}>
            {isLoading && <Skeleton className={styles.skeleton} />}
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
