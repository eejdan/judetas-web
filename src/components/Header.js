import React from 'react'

import Select from 'react-select';

import LogoutButton from './auth/LogoutButton';

import styles from './Header.module.css'

const selectStyles = {
    menuPortal: base => ({ ...base, zIndex: 200 }),
    option: (provided, state) => ({
        ...provided,
        fontWeight: '300',
        textAlig: 'left',
        fontSize: '1.2em',
        fontFamily: "'Open Sans', sans-serif",
        zIndex: '200',
        padding: '5px 10px',
        minWidth: 'fit-content !important'
    }),
    control: () => ({
        border: '1px solid salmon',
        borderRadius: '12px',
        margin: '0',
        fontWeight:'400'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontWeight: '300',
        textAlig: 'left',
        fontSize: '.7em',
        fontFamily: "'Open Sans', sans-serif",
    }),
    dropdownIndicator: defaultStyles => ({
        ...defaultStyles,
        '& svg': { display: 'none' }
    }),
    indicatorsContainer: () => ({
        display: 'none'
    })
}


export default function Header(props) {
    // ${#}-${localInstance.displayName}
    // # 0 = judet, 1 = comuna, 2 = localitate, 3-5 = lower
    // fiecare diviziune mai mica va avea un punct de culoare mov 
    // cu atat mai mica cu atat mai albicioasca va fi nuanta de mov
    // const options = [
    //     { value: 'general', label: 'Admin General' },
    //     { value: '0-galati', label: 'Judetul Galati' },
    //     { value: '1-comanesti', label: 'Comuna Comanesti' },
    //     { value: '2-comani', label: 'Localitatea Comani' },
    //     { value: '2-mihail-kogalniceanu', label: 'Localitatea Mihail Kogalniceanu Tudor'}
    // ]

    const handleViewChange = (option) => {
        props.setTabIndex(option.value);
    }
    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles['action-select-wrapper']}>
                    <div className={styles['action-select']}>
                        { props.authorized && (
                        <Select
                            isSearchable={false}
                            menuPortalTarget={document.body} 
                            styles={selectStyles}
                            options={props.tabOptions}
                            defaultValue={{ value: '0', label: 'Contul Meu'}}
                            onChange={handleViewChange}
                        />
                        )}
                    </div>
                </div>
                <div className={styles['title-wrapper']}>
                    <div className={styles.title}>
                        <div>JudetAs</div>
                        <div className={styles['title-small']}><div className={styles['hide-1000']}>&nbsp;-</div><div>&nbsp;Administrare</div></div>
                    </div>
                </div>
                <div className={styles['user-actions']}>
                    {props.userActions.logout && (
                        <LogoutButton />
                    )}
                </div>
            </div>
            <div className={styles.underbar}>
                <div className={styles.first} />
                <div className={styles.second} />
                <div className={styles.third} />
                <div className={styles.fourth} />
                <div className={styles.fifth} />
            </div>
        </div>
    );
}