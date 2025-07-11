// // Add this type definition if not using a types package
// interface KVNamespace {
//   get(key: string): Promise<string | null>;
//   put(key: string, value: string, options?: { expiration?: number; expirationTtl?: number }): Promise<void>;
//   delete(key: string): Promise<void>;
// }

// export interface Env {
//   GITHUB_TOKEN: string
//   GITHUB_CACHE: KVNamespace
//   TELEGRAM_BOT_TOKEN: string
//   TELEGRAM_CHAT_ID: string
// }

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// }

// async function sendTelegramMessage(env: Env, message: string): Promise<boolean> {
//   try {
//     const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`

//     const response = await fetch(telegramUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chat_id: env.TELEGRAM_CHAT_ID,
//         text: message,
//         parse_mode: "HTML",
//       }),
//     })

//     return response.ok
//   } catch (error) {
//     console.error("Failed to send Telegram message:", error)
//     return false
//   }
// }

// // async function handleContactForm(request: Request, env: Env): Promise<Response> {
// //   try {
// //     const formData = await request.formData()
// //     const name = formData.get("name")?.toString() || ""
// //     const email = formData.get("email")?.toString() || ""
// //     const budget = formData.get("budget")?.toString() || ""
// //     const project = formData.get("project")?.toString() || ""

// //     // Create Telegram message
// //     const message = `
// // 🚀 <b>New Project Inquiry</b>

// // 👤 <b>Name:</b> ${name}
// // 📧 <b>Email:</b> ${email}
// // 💰 <b>Budget:</b> ${budget}

// // 📝 <b>Project Details:</b>
// // ${project}

// // ⏰ <b>Received:</b> ${new Date().toLocaleString()}
// //     `.trim()

// //     const success = await sendTelegramMessage(env, message)

// //     if (success) {
// //       return new Response(
// //         JSON.stringify({
// //           success: true,
// //           message: "Thank you for your inquiry! Aryan will reach out to you soon.",
// //         }),
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             ...corsHeaders,
// //           },
// //         },
// //       )
// //     } else {
// //       throw new Error("Failed to send message")
// //     }
// //   } catch (err) {
// //     console.log(err)
// //     return new Response(
// //       JSON.stringify({
// //         success: false,
// //         message: "Sorry, there was an error sending your message. Please try again.",
// //       }),
// //       {
// //         status: 500,
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...corsHeaders,
// //         },
// //       },
// //     )
// //   }
// // }

// // async function fetchGitHubData(env: Env): Promise<any> {
// //   const cacheKey = "github-data-aryanpathak989"

// //   // Try to get cached data first
// //   const cached = await env.GITHUB_CACHE.get(cacheKey)
// //   if (cached) {
// //     const parsedCache = JSON.parse(cached)
// //     // Cache for 1 hour
// //     if (Date.now() - parsedCache.timestamp < 3600000) {
// //       return parsedCache.data
// //     }
// //   }

// //   const query = `
// //     query($username: String!) {
// //       user(login: $username) {
// //         name
// //         bio
// //         login
// //         avatarUrl
// //         followers {
// //           totalCount
// //         }
// //         following {
// //           totalCount
// //         }
// //         repositories(first: 100, privacy: PUBLIC) {
// //           totalCount
// //         }
// //         contributionsCollection {
// //           totalCommitContributions
// //           totalPullRequestContributions
// //           totalIssueContributions
// //           totalRepositoryContributions
// //           contributionCalendar {
// //             totalContributions
// //             weeks {
// //               contributionDays {
// //                 contributionCount
// //                 date
// //                 weekday
// //               }
// //             }
// //           }
// //         }
// //       }
// //       repositories: search(query: "user:aryanpathak989 sort:stars", type: REPOSITORY, first: 6) {
// //         nodes {
// //           ... on Repository {
// //             name
// //             description
// //             stargazerCount
// //             forkCount
// //             primaryLanguage {
// //               name
// //               color
// //             }
// //             url
// //           }
// //         }
// //       }
// //     }
// //   `

// //   try {
// //     const response = await fetch("https://api.github.com/graphql", {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${env.GITHUB_TOKEN}`,
// //         "Content-Type": "application/json",
// //         "User-Agent": "Aryan-Portfolio-Worker",
// //       },
// //       body: JSON.stringify({
// //         query,
// //         variables: { username: "aryanpathak989" },
// //       }),
// //     })

// //     if (!response.ok) {
// //       throw new Error(`GitHub API error: ${response.status}`)
// //     }

// //     const data = await response.json()

// //     if (data.errors) {
// //       throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
// //     }

// //     const result = {
// //       user: data.data.user,
// //       repositories: data.data.repositories.nodes,
// //     }

// //     // Cache the result
// //     await env.GITHUB_CACHE.put(
// //       cacheKey,
// //       JSON.stringify({
// //         data: result,
// //         timestamp: Date.now(),
// //       }),
// //       { expirationTtl: 3600 },
// //     ) // 1 hour TTL

// //     return result
// //   } catch (error) {
// //     console.error("Failed to fetch GitHub data:", error)
// //     throw error
// //   }
// // }
