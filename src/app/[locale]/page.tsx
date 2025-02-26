import Image from "next/image";
import styles from "../page.module.css";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {wrapper} from "@/store/store";
import Counter from "@/components/Counter";
function Home() {
  const t = useTranslations('HomePage');

  return (
      <div className={styles.page}>
        <h1>{t('title')}</h1>
        <Link href="/about">{t('about')}</Link>
          <Counter />
      </div>
  );
}
export default Home;
