import Skeleton from '@/components/ui/Skeleton';
import styles from '../loading.module.scss';
import pageStyles from './page.module.scss';

export default function Loading() {
    return (
        <div className={pageStyles['contact']}>
            <Skeleton width={180} height={40} className={styles['loading__title']} />
            <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div>
                    <Skeleton width={100} height={30} style={{ marginBottom: '1rem' }} />
                    <Skeleton width={200} height={20} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton width={150} height={20} />
                </div>
                <div>
                    <Skeleton width={100} height={30} style={{ marginBottom: '1rem' }} />
                    <Skeleton width={200} height={20} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton width={200} height={20} />
                </div>
                <div>
                    <Skeleton width={100} height={30} style={{ marginBottom: '1rem' }} />
                    <Skeleton width={150} height={20} />
                </div>
            </div>
        </div>
    );
}
