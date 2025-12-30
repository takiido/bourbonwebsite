import Skeleton from '@/components/ui/Skeleton';
import styles from '../loading.module.scss';
import pageStyles from './page.module.scss';

export default function Loading() {
    return (
        <div className={pageStyles['league']}>
            <Skeleton width={250} height={40} className={styles['loading__title']} />
            <div className={styles['loading__table']}>
                <Skeleton width="100%" height={50} style={{ marginBottom: '1rem' }} />
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} width="100%" height={40} className={styles['loading__table-row']} />
                ))}
            </div>
        </div>
    );
}
