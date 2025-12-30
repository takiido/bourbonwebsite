import Skeleton from '@/components/ui/Skeleton';
import styles from '../loading.module.scss';
import pageStyles from './page.module.scss';

export default function Loading() {
    return (
        <div className={pageStyles['gallery']}>
            <Skeleton width={150} height={40} className={styles['loading__title']} />
            <div className={styles['loading__grid--gallery']}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} width="100%" height={300} />
                ))}
            </div>
        </div>
    );
}
