function generateSVG(contributions) {
  const width = 720;
  const height = 112;
  const cellSize = 10;
  const cellPadding = 2;

  let svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .contribution { fill: #ebedf0; }
      .contribution-1 { fill: #9be9a8; }
      .contribution-2 { fill: #40c463; }
      .contribution-3 { fill: #30a14e; }
      .contribution-4 { fill: #216e39; }
      text { font: 9px Arial; fill: #767676; }
    </style>
    <g transform="translate(20, 5)">
      ${generateMonths(contributions)}
      ${generateDays()}
      ${generateCells(contributions, cellSize, cellPadding)}
    </g>
    <g transform="translate(20, ${height - 10})">
      <text>Less</text>
      <rect x="35" y="-9" width="10" height="10" class="contribution"/>
      <rect x="50" y="-9" width="10" height="10" class="contribution-1"/>
      <rect x="65" y="-9" width="10" height="10" class="contribution-2"/>
      <rect x="80" y="-9" width="10" height="10" class="contribution-3"/>
      <rect x="95" y="-9" width="10" height="10" class="contribution-4"/>
      <text x="110" y="0">More</text>
    </g>
  </svg>`;

  return {
    svg,
    totalContributions: contributions.totalContributions
  };
}

function generateMonths(contributions) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let monthsSvg = '';
  let currentMonth = '';
  let x = 0;

  contributions.weeks.forEach((week, i) => {
    const date = new Date(week.contributionDays[0].date);
    const month = months[date.getMonth()];
    if (month !== currentMonth) {
      monthsSvg += `<text x="${x}" y="-7">${month}</text>`;
      currentMonth = month;
    }
    x += 14;
  });

  return monthsSvg;
}

function generateDays() {
  const days = ['Sun', 'Mon', 'Wed', 'Fri'];
  return days.map((day, i) => `<text y="${14 * i + 21}" x="-10">${day}</text>`).join('');
}

function generateCells(contributions, cellSize, cellPadding) {
  let cellsSvg = '';
  let x = 0;

  contributions.weeks.forEach(week => {
    let y = 0;
    week.contributionDays.forEach(day => {
      const count = day.contributionCount;
      let colorClass = 'contribution';

      if (count > 0) colorClass = 'contribution-1';
      if (count > 5) colorClass = 'contribution-2';
      if (count > 10) colorClass = 'contribution-3';
      if (count > 20) colorClass = 'contribution-4';

      cellsSvg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" class="${colorClass}">
        <title>${count} contributions on ${day.date}</title>
      </rect>`;

      y += cellSize + cellPadding;
    });

    x += cellSize + cellPadding;
  });

  return cellsSvg;
}
