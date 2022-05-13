

import styles from './ViewError.module.css';

export default function ViewError(props) {

    return (
        <div className={styles['viewerror-wrapper']}>
            <div className={styles['viewerror-box']}>
                <div className={styles['viewerror-face']}>
                    Eroare Interna
                </div>
                <div className={styles['viewerror-desc']}>
                    { props.description 
                        ? (props.description)
                        : ("Eroare de redare. Contactati un tehnician.")
                    } 
                </div>
            </div>
            <div className={styles['viewerror-spacer']}>&nbsp;</div>
        </div>
    )
}//tbd tehnic contact form mailer TODO