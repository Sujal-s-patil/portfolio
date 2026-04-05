import { writeFile } from "node:fs/promises";

const username = process.env.LEETCODE_USERNAME || "sujalpatil3867";
const outputPath = "stats.json";

const query = `
  query userProblemsSolved($username: String!) {
    matchedUser(username: $username) {
      profile {
        userAvatar
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      userCalendar {
        streak
      }
    }
  }
`;

async function fetchLeetCodeStats() {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API failed with status ${response.status}`);
  }

  const body = await response.json();

  if (body.errors?.length) {
    throw new Error(`LeetCode API error: ${body.errors[0].message}`);
  }

  const user = body?.data?.matchedUser;
  if (!user) {
    throw new Error(`No LeetCode user found for username: ${username}`);
  }

  const acSubmissionNum = user.submitStats?.acSubmissionNum || [];
  const totalSolved = acSubmissionNum.find((item) => item.difficulty === "All")?.count || 0;
  const streak = Number(user.userCalendar?.streak || 0);

  return {
    leetcode: {
      username,
      totalSolved,
      streak,
      fetchedAt: new Date().toISOString(),
    },
  };
}

async function main() {
  const stats = await fetchLeetCodeStats();
  await writeFile(outputPath, JSON.stringify(stats, null, 2) + "\n", "utf8");
  console.log(`Updated ${outputPath} for ${stats.leetcode.username}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
