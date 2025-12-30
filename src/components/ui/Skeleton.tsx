import styles from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
}

export default function Skeleton({ className = '', width, height, style }: SkeletonProps) {
    const combinedStyle: React.CSSProperties = {
        width: width,
        height: height,
        ...style,
    };

    return <div className={`${styles.skeleton} ${className}`} style={combinedStyle} />;
}
