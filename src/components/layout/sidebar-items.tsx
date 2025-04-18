import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

import { type SidebarItem, SidebarItemType } from "./sidebar";
import TeamAvatar from "./team-avatar";

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  {
    key: "home",
    href: "/",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "tools",
    href: "/tools",
    icon: "vscode-icons:folder-type-tools",
    title: "Tools",
  },
  {
    key: "games",
    href: "/games",
    icon: "fluent-emoji:video-game",
    title: "Games",
  },
  {
    key: "About",
    href: "/about",
    icon: "flat-color-icons:about",
    title: "About",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "changelog",
    href: "/changelog",
    icon: "fluent-color:history-16",
    title: "Changelog",
  },
  {
    key: "Settings",
    href: "/settings",
    icon: "solar:settings-outline",
    title: "Settings",
  },
];

export const sectionItems: SidebarItem[] = [
  {
    key: "Menu",
    title: "Menu",
    items: [
      {
        key: "home",
        href: "/",
        icon: "fluent-color:home-24",
        title: "Home",
      },
      {
        key: "tools",
        href: "/tools",
        icon: "vscode-icons:folder-type-tools",
        title: "Tools",
      },
      {
        key: "games",
        href: "/games",
        icon: "fluent-emoji:video-game",
        title: "Games",
      },
      {
        key: "About",
        href: "/about",
        icon: "flat-color-icons:about",
        title: "About",
      },
      {
        key: "changelog",
        href: "/changelog",
        icon: "fluent-color:history-16",
        title: "Changelog",
      },
      {
        key: "Settings",
        href: "/settings",
        icon: "fluent-color:settings-28",
        title: "Settings",
      },
    ],
  },
  {
    key: "industries",
    title: "Industries",
    items: [
      {
        key: "Marketing",
        href: "/marketing",
        title: "Marketing",
        icon: "solar:pie-chart-2-outline",
        endContent: (
          <Chip size="sm" variant="flat">
            1
          </Chip>
        ),
      },
      {
        key: "Legal",
        href: "/legal",
        icon: "solar:chart-outline",
        title: "Legal",
        endContent: (
          <Chip size="sm" variant="flat">
            1
          </Chip>
        ),
      },
      {
        key: "E-commerce",
        href: "/e-commerce",
        icon: "solar:gift-linear",
        title: "E-commerce",
        endContent: (
          <Chip size="sm" variant="flat">
            3
          </Chip>
        ),
      },
      {
        key: "Healthcare",
        href: "/healthcare",
        icon: "solar:bill-list-outline",
        title: "Healthcare",
        endContent: (
          <Chip size="sm" variant="flat">
            2
          </Chip>
        ),
      },
      {
        key: "Finance",
        href: "/finance",
        icon: "ep:tools",
        title: "Finance",
        endContent: (
          <Chip size="sm" variant="flat">
            1
          </Chip>
        ),
      },
    ],
  },
];

export const sectionItemsWithTeams: SidebarItem[] = [
  ...sectionItems,
  {
    key: "your-teams",
    title: "Games",
    items: [
      {
        key: "snake",
        href: "/games/snake",
        title: "Snake",
        startContent: <TeamAvatar name="Snake" />,
      },
      {
        key: "tetris",
        href: "/games/tetris",
        title: "Tetris",
        startContent: <TeamAvatar name="Tetris" />,
      },
    ],
  },
];

export const brandItems: SidebarItem[] = [
  {
    key: "Menu",
    title: "Menu",
    items: [
      {
        key: "home",
        href: "/",
        icon: "fluent-color:home-24",
        title: "Home",
      },
      {
        key: "projects",
        href: "/about",
        icon: "solar:widget-2-outline",
        title: "About",
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "tasks",
        href: "/settings",
        icon: "fluent-color:settings-28",
        title: "Settings",
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
    ],
  },
  {
    key: "games",
    title: "Games",
    items: [
      {
        key: "snake",
        href: "/games/snake",
        title: "Snake",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Snake"
          />
        ),
      },
      {
        key: "tetris",
        href: "/games/tetris",
        title: "Tetris",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Tetris"
          />
        ),
      }
    ],
  },
];

export const sectionLongList: SidebarItem[] = [
  ...sectionItems,
  {
    key: "payments",
    title: "Payments",
    items: [
      {
        key: "payroll",
        href: "#",
        title: "Payroll",
        icon: "solar:dollar-minimalistic-linear",
      },
      {
        key: "invoices",
        href: "#",
        title: "Invoices",
        icon: "solar:file-text-linear",
      },
      {
        key: "billing",
        href: "#",
        title: "Billing",
        icon: "solar:card-outline",
      },
      {
        key: "payment-methods",
        href: "#",
        title: "Payment Methods",
        icon: "solar:wallet-money-outline",
      },
      {
        key: "payouts",
        href: "#",
        title: "Payouts",
        icon: "solar:card-transfer-outline",
      },
    ],
  },
  {
    key: "your-teams",
    title: "Games",
    items: [
      {
        key: "snake",
        href: "/games/snake",
        title: "Snake",
        startContent: <TeamAvatar name="Snake" />,
      },
      {
        key: "tetris",
        href: "/games/tetris",
        title: "Tetris",
        startContent: <TeamAvatar name="Tetris" />,
      }
    ],
  },
];

export const sectionNestedItems: SidebarItem[] = [
  {
    key: "home",
    href: "/",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "/about",
    icon: "solar:widget-2-outline",
    title: "About",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "tasks",
    href: "/settings",
    icon: "fluent-color:settings-28",
    title: "Settings",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "team",
    href: "/",
    icon: "solar:users-group-two-rounded-outline",
    title: "Home",
  },
  {
    key: "tracker",
    href: "#",
    icon: "solar:sort-by-time-linear",
    title: "Tracker",
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: "analytics",
    href: "#",
    icon: "solar:chart-outline",
    title: "Analytics",
  },
  {
    key: "perks",
    href: "#",
    icon: "solar:gift-linear",
    title: "Perks",
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
  {
    key: "cap_table",
    title: "Cap Table",
    icon: "solar:pie-chart-2-outline",
    type: SidebarItemType.Nest,
    items: [
      {
        key: "shareholders",
        icon: "solar:users-group-rounded-linear",
        href: "#",
        title: "Shareholders",
      },
      {
        key: "note_holders",
        icon: "solar:notes-outline",
        href: "#",
        title: "Note Holders",
      },
      {
        key: "transactions_log",
        icon: "solar:clipboard-list-linear",
        href: "#",
        title: "Transactions Log",
      },
    ],
  },
  {
    key: "expenses",
    href: "#",
    icon: "solar:bill-list-outline",
    title: "Expenses",
  },
];
