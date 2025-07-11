// app/api/github/route.ts

import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';



export const runtime = 'edge';

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GitHub token not found' }, { status: 500 });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        bio
        login
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(first: 100, privacy: PUBLIC) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
      repositories: search(query: "user:aryanpathak989 sort:stars", type: REPOSITORY, first: 6) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            url
          }
        }
      }
    }
  `;

  try {
    const githubRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: 'aryanpathak989' },
      }),
    });

    const data = await githubRes.json();

    if (data.errors) {
      console.error('GitHub API errors:', data.errors);
      return NextResponse.json({ error: 'GitHub API error', details: data.errors }, { status: 500 });
    }

    return NextResponse.json({
      user: data.data.user,
      repositories: data.data.repositories.nodes,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Server error', details: error }, { status: 500 });
  }
}
