import Skeleton from '@/components/ui/Skeleton';
import styles from '../loading.module.scss';
import pageStyles from './page.module.scss';

export default function Loading() {
    return (
        <div className={pageStyles['menu']}>
            <Skeleton width={200} height={40} className={styles['loading__title']} />
            <div className={styles['loading__list']}>
                {[1, 2].map((section) => (
                    <div key={section}>
                        <Skeleton width={150} height={30} style={{ marginBottom: '1.5rem' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[1, 2, 3].map((item) => (
                                <Skeleton key={item} width="100%" height={80} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
