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
    key: "About",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "About",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "Contact",
    href: "#",
    icon: "solar:checklist-minimalistic-outline",
    title: "Contact",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "Settings",
    href: "#",
    icon: "solar:users-group-two-rounded-outline",
    title: "Settings",
  },
  {
    key: "analytics",
    href: "#",
    icon: "solar:chart-outline",
    title: "Analytics",
  }
];

export const sectionItems: SidebarItem[] = [
  {
    key: "Menu",
    title: "Menu",
    items: [
      {
        key: "home",
        href: "/",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "About",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "About",
      },
      {
        key: "Contact",
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Contact",
      },
      {
        key: "Settings",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
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
        href: "#",
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
        href: "/perks",
        icon: "solar:gift-linear",
        title: "Perks",
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
        icon: "solar:settings-outline",
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
        key: "heroui",
        href: "#",
        title: "HeroUI",
        startContent: <TeamAvatar name="Hero UI" />,
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: <TeamAvatar name="Tailwind Variants" />,
      },
      {
        key: "heroui-pro",
        href: "#",
        title: "HeroUI Pro",
        startContent: <TeamAvatar name="HeroUI Pro" />,
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
        href: "#",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        icon: "solar:widget-2-outline",
        title: "Projects",
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
        href: "#",
        icon: "solar:checklist-minimalistic-outline",
        title: "Tasks",
        endContent: (
          <Icon
            className="text-primary-foreground/60"
            icon="solar:add-circle-line-duotone"
            width={24}
          />
        ),
      },
      {
        key: "team",
        href: "#",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        icon: "solar:sort-by-time-linear",
        title: "Tracker",
        endContent: (
          <Chip className="bg-primary-foreground font-medium text-primary" size="sm" variant="flat">
            New
          </Chip>
        ),
      },
    ],
  },
  {
    key: "your-teams",
    title: "Games",
    items: [
      {
        key: "heroui",
        href: "#",
        title: "HeroUI",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Hero UI"
          />
        ),
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Tailwind Variants"
          />
        ),
      },
      {
        key: "heroui-pro",
        href: "#",
        title: "HeroUI Pro",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="HeroUI Pro"
          />
        ),
      },
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
        key: "heroui",
        href: "#",
        title: "HeroUI",
        startContent: <TeamAvatar name="Hero UI" />,
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: <TeamAvatar name="Tailwind Variants" />,
      },
      {
        key: "heroui-pro",
        href: "#",
        title: "HeroUI Pro",
        startContent: <TeamAvatar name="HeroUI Pro" />,
      },
    ],
  },
];

export const sectionNestedItems: SidebarItem[] = [
  {
    key: "home",
    href: "#",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "#",
    icon: "solar:widget-2-outline",
    title: "Projects",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "tasks",
    href: "#",
    icon: "solar:checklist-minimalistic-outline",
    title: "Tasks",
    endContent: (
      <Icon className="text-default-400" icon="solar:add-circle-line-duotone" width={24} />
    ),
  },
  {
    key: "team",
    href: "#",
    icon: "solar:users-group-two-rounded-outline",
    title: "Team",
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
