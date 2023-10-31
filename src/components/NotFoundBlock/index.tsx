import styles from './NotFoundBlock.module.scss';


export const NotFoundBlock: React.FC = () => {
    return (
        <>
            <h1 className={styles.root}>
                <span>😕</span>
                <br />
                Nothing found
            </h1>
        </>
    );
};
