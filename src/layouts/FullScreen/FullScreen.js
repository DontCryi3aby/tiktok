import Header from '~/layouts/components/Header';
import styles from './FullScreen.module.scss';

function FullScreen({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}

export default FullScreen;
