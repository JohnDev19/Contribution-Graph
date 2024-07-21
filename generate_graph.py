import os
import requests
from datetime import datetime, timedelta

def fetch_contributions(username, token, days=365):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    
    query = """
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
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
    """
    
    variables = {
        "username": username,
        "from": start_date.isoformat(),
        "to": end_date.isoformat()
    }
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    
    response = requests.post("https://api.github.com/graphql", json={"query": query, "variables": variables}, headers=headers)
    
    if response.status_code == 200:
        return response.json()["data"]["user"]["contributionsCollection"]["contributionCalendar"]
    else:
        raise Exception(f"Query failed with status code {response.status_code}: {response.text}")

def generate_svg(contributions):
    svg = f'''
    <svg width="720" height="112" viewBox="0 0 720 112" xmlns="http://www.w3.org/2000/svg">
    <style>
        .contribution {{ fill: #ebedf0; }}
        .contribution-1 {{ fill: #9be9a8; }}
        .contribution-2 {{ fill: #40c463; }}
        .contribution-3 {{ fill: #30a14e; }}
        .contribution-4 {{ fill: #216e39; }}
    </style>
    '''
    
    x, y = 0, 0
    for week in contributions['weeks']:
        for day in week['contributionDays']:
            count = day['contributionCount']
            color_class = ''
            if count == 0:
                color_class = 'contribution'
            elif count < 10:
                color_class = 'contribution-1'
            elif count < 20:
                color_class = 'contribution-2'
            elif count < 30:
                color_class = 'contribution-3'
            else:
                color_class = 'contribution-4'
            
            svg += f'<rect x="{x}" y="{y}" width="10" height="10" class="{color_class}" />'
            y += 13
        
        y = 0
        x += 13
    
    svg += '</svg>'
    return svg

def main():
    username = os.environ['GITHUB_REPOSITORY'].split('/')[0]
    token = os.environ['GITHUB_TOKEN']
    
    contributions = fetch_contributions(username, token)
    svg = generate_svg(contributions)
    
    with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
        f.write(f"svg={svg}")

if __name__ == "__main__":
    main()
