import Skeleton from '@/components/ui/Skeleton';
import styles from '../loading.module.scss';
import pageStyles from './page.module.scss';

export default function Loading() {
    return (
        <div className={pageStyles['events']}>
            <Skeleton width={200} height={40} className={styles['loading__title']} />
            <div className={styles['loading__list']}>
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} width="100%" height={180} />
                ))}
            </div>
        </div>
    );
}
