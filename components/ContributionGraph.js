import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function ContributionGraph({ url }) {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setSvg(data.svg))
      .catch(error => console.error('Error fetching graph:', error));
  }, [url]);

  return (
    <div className={styles.graph} dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
