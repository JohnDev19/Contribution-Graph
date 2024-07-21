import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ContributionGraph from '../components/ContributionGraph';

export default function Home() {
  const [username, setUsername] = useState('');
  const [graphUrl, setGraphUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setGraphUrl(`/api/graph?username=${username}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Contribution Graph</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GitHub Contribution Graph</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Generate Graph</button>
        </form>

        {graphUrl && <ContributionGraph url={graphUrl} />}
      </main>
    </div>
  );
}
