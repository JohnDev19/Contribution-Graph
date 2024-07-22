# GitHub Contribution Graph Generator

![GitHub Contribution Graph](https://contribution-graph-ohi6.onrender.com/api/graph?username=JohnDev19)

![GitHub Contribution Graph](https://68f79ac6-86b8-40d4-8b4e-14c925c5defa-00-2bb80b48sjqce.picard.replit.dev/api/graph?username=JohnDev19)

This project provides a service to generate and display GitHub-style contribution graphs for any GitHub user. It's perfect for adding a visual representation of your GitHub activity to your profile README or any other markdown file.

## Features

- Generate contribution graphs similar to those on GitHub profiles
- Customizable for any GitHub username
- Responsive SVG output that scales well on different devices
- Includes month and day labels for better context
- Displays a color legend for contribution intensity

## Usage

To use this in your GitHub README or any markdown file, simply add the following line:

```markdown
![GitHub Contribution Graph](https://contribution-graph-ohi6.onrender.com/api/graph?username=YourGitHubUsername)
```

Replace `YourGitHubUsername` with the GitHub username for which you want to generate the graph.

### Usage

1. **Customizing Size**

   You can adjust the size of the graph by using HTML in your markdown:

   ```html
   <img src="https://contribution-graph-ohi6.onrender.com/api/graph?username=YourGitHubUsername" width="720" height="112" alt="GitHub Contribution Graph" />
   ```

2. **Linking to Profile**

   Make the graph clickable and link to the GitHub profile:

   ```markdown
   [![GitHub Contribution Graph](https://contribution-graph-ohi6.onrender.com/api/graph?username=YourGitHubUsername)](https://github.com/YourGitHubUsername)
   ```

3. **Refreshing the Graph**

   To ensure your graph is up-to-date, add a query parameter that changes:

   ```markdown
   ![GitHub Contribution Graph](https://contribution-graph-ohi6.onrender.com/api/graph?username=YourGitHubUsername&v=1)
   ```

   Increment the `v` value when you want to refresh the image.

## API

The API endpoint is:

```
https://contribution-graph-ohi6.onrender.com/api/graph
```

Query Parameters:
- `username`: The GitHub username (required)

## Local Development

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env.local` file and add your GitHub token:
   ```
   GITHUB_TOKEN=your_personal_access_token
   ```
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is designed to be easily deployed on platforms like Render or Vercel. Make sure to set the `GITHUB_TOKEN` environment variable in your deployment settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the GitHub contribution graph
- Built with Next.js and React
