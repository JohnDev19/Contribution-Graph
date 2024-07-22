import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [contributionData, setContributionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContributions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/graph?username=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contribution data');
      }
      const data = await response.json();
      setContributionData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Contribution Graph</title>
        <meta name="description" content="View GitHub contribution graphs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GitHub Contribution Graph</h1>

        <form onSubmit={fetchContributions} className={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Loading...' : 'Generate Graph'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {contributionData && (
          <div className={styles.graphContainer}>
            <h2>Contributions: {contributionData.totalContributions}</h2>
            <div dangerouslySetInnerHTML={{ __html: contributionData.svg }} />
          </div>
        )}
      </main>
    </div>
  );
}
