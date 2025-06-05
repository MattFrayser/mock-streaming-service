import { useState } from "react";
import styles from '@/styles/components.module.css'
import {useRouter} from 'next/router'

export default function ProfileIcon() {
  const router = useRouter();

  return (
    <div>
      <div onClick={() => router.push('/Profile')} className={styles.icon}>
        <img
          src="/register.png"
          alt="Profile"
          className={styles.img}
        />
      </div>
    </div>
  );
}
