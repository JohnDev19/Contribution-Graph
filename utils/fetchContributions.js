import axios from 'axios';

export async function fetchContributions(username) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const variables = { username };

  try {
    const response = await axios.post('https://api.github.com/graphql', {
      query,
      variables
    }, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });

    const contributions = response.data.data.user.contributionsCollection.contributionCalendar;
    return generateSVG(contributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
}

function generateSVG(contributions) {
  const width = 720;
  const height = 112;
  const cellSize = 10;
  const cellPadding = 2;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .contribution { fill: #ebedf0; }
      .contribution-1 { fill: #9be9a8; }
      .contribution-2 { fill: #40c463; }
      .contribution-3 { fill: #30a14e; }
      .contribution-4 { fill: #216e39; }
    </style>`;

  let x = 0;
  let y = 0;

  contributions.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      const count = day.contributionCount;
      let colorClass = 'contribution';

      if (count > 0) colorClass = 'contribution-1';
      if (count > 5) colorClass = 'contribution-2';
      if (count > 10) colorClass = 'contribution-3';
      if (count > 20) colorClass = 'contribution-4';

      svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" class="${colorClass}" />`;

      y += cellSize + cellPadding;
    });

    y = 0;
    x += cellSize + cellPadding;
  });

  svg += '</svg>';

  return { 
    svg,
    totalContributions: contributions.totalContributions
  };
}
