import "server-only";

export interface ChangelogItem {
  title: string;
  description: string;
}

export interface ChangelogSection {
  date: string;
  title: string;
  items: ChangelogItem[];
}

export const changelogData: ChangelogSection[] = [
  {
    date: "Mar 10, 2025",
    title: "Agent is ready and UI refresh",
    items: [
      {
        title: "Agent is ready:",
        description:
          "Agent is now the default mode, bringing a more powerful and unified AI experience. No more confusion between Chat, Composer, and Agent - just one smart interface that adapts to your needs.",
      },
      {
        title: "UI refresh:",
        description:
          "Phase one of a fresh coat of paint with new default Cursor themes designed for focus. We&apos;ve also simplified the @-context menu to make Agent more precise.",
      },
      {
        title: "Web search:",
        description:
          "Agent can now automatically search the web for up-to-date information without requiring explicit @Web commands.",
      },
      {
        title: "Ignore files:",
        description:
          ".cursorignore now blocks files from being added in chat or sent up for tab completions, in addition to ignoring them from indexing. We&apos;ve introduced .cursorindexingignore for specifically controlling file indexing.",
      },
      {
        title: "Performance boost:",
        description:
          "We&apos;ve optimized the core engine to deliver up to 40% faster response times and reduced memory usage by 25%. Large projects now load significantly faster, and code indexing has been streamlined for better efficiency.",
      },
      {
        title: "Keyboard shortcuts:",
        description:
          "Added new keyboard shortcuts for power users. Press Ctrl+Shift+A to quickly activate Agent, Ctrl+Shift+F for global search, and Ctrl+. to access the command palette. View all shortcuts in Settings → Keyboard.",
      },
    ],
  },
  {
    date: "Feb 15, 2025",
    title: "Code intelligence and integrations",
    items: [
      {
        title: "Smarter code completion:",
        description:
          "Our code completion engine now understands your project&apos;s architecture better than ever. It learns from your coding patterns and suggests completions that match your style. Function signatures, import statements, and variable names are now predicted with significantly higher accuracy.",
      },
      {
        title: "New integrations:",
        description:
          "We&apos;ve added native integrations with GitHub, GitLab, and Bitbucket. Pull requests, code reviews, and issue tracking can now be managed directly from the editor. Connect your accounts in Settings → Integrations to get started.",
      },
      {
        title: "Bug fixes:",
        description:
          "Fixed an issue where the editor would occasionally freeze when working with large JSON files. Resolved memory leaks in the terminal integration. Fixed syntax highlighting inconsistencies in TypeScript files with JSX. Improved stability when working with monorepos and workspaces containing multiple package managers.",
      },
    ],
  },
];
