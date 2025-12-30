import Skeleton from '@/components/ui/Skeleton';
import styles from '../loading.module.scss';
import pageStyles from './page.module.scss';

export default function Loading() {
    return (
        <div className={pageStyles['dashboard']}>
            <div className={styles['loading__dashboard']}>
                <div className={styles['loading__dashboard-header']}>
                    <Skeleton width={150} height={32} />
                    <Skeleton width={100} height={40} />
                </div>
                <div className={styles['loading__grid']}>
                    <Skeleton width="100%" height={200} />
                    <Skeleton width="100%" height={200} />
                </div>
            </div>
        </div>
    );
}
