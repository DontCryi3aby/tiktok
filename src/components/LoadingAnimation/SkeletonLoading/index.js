import styles from './SkeletonLoading.module.scss';

const SkeletonLoading = () => {
    return (
        <div>
            <span className={styles.loader}></span>
        </div>
    );
};

export default SkeletonLoading;
