import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [svgData, setSvgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContributions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSvgData(null);

    try {
      const response = await fetch(`/api/graph?username=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contribution data');
      }
      const data = await response.json();
      if (data.svg) {
        setSvgData(data.svg);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
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
          <button type="submit" className={`${styles.button} ${loading ? styles.loading : ''}`} disabled={loading}>
            {loading ? 'Loading...' : 'Generate Graph'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {svgData && (
          <div className={styles.graphContainer}>
            <div dangerouslySetInnerHTML={{ __html: svgData }} />
          </div>
        )}
      </main>
    </div>
  );
}
