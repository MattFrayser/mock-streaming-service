import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components.module.css';
import ProfileIcon from './ProfileIcon';


const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>Anime Streaming</h1>
            <ProfileIcon />
        </header>
    );
};

export default Header;
