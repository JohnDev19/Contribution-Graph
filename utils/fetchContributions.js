import axios from 'axios';
import { createCanvas } from 'canvas';

export async function fetchContributions(username, token) {
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
        Authorization: `Bearer ${token}`
      }
    });

    const contributions = response.data.data.user.contributionsCollection.contributionCalendar;
    return generatePNG(contributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
}

function generatePNG(contributions) {
  const width = 720;
  const height = 112;
  const cellSize = 10;
  const cellPadding = 2;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  let x = 0;
  let y = 0;

  contributions.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      const count = day.contributionCount;
      let color = '#ebedf0';

      if (count > 0) color = '#9be9a8';
      if (count > 5) color = '#40c463';
      if (count > 10) color = '#30a14e';
      if (count > 20) color = '#216e39';

      ctx.fillStyle = color;
      ctx.fillRect(x, y, cellSize, cellSize);

      y += cellSize + cellPadding;
    });

    y = 0;
    x += cellSize + cellPadding;
  });

  return canvas.toBuffer();
}
