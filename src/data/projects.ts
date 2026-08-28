export interface Project {
  slug: "core" | "cashier";
  title: string;
  kicker: string;
  statusTag: string;
  siteDescription: string;
  terminalLines: string[];
  stack: string[];
  repoUrl?: string;
  repoLabel?: string;
}

export const projects: Project[] = [
  {
    slug: "core",
    title: "CoreService",
    kicker: "In progress",
    statusTag: "[in progress]",
    siteDescription:
      "Модульная ERP-система: склад, финансы, HR и производство в одном интерфейсе. Фронтенд на Vue 3, TypeScript и Quasar UI.",
    terminalLines: [
      "  Модульная ERP-платформа из 4 модулей: склад, финансы,",
      "  HR, производство. Vue 3, TypeScript, Quasar UI.",
    ],
    stack: ["Vue", "TypeScript", "Quasar UI"],
  },
  {
    slug: "cashier",
    title: "Сервис для кассиров",
    kicker: "Completed",
    statusTag: "[completed]",
    siteDescription:
      "Десктоп-приложение для кассиров: создание, отмена и удаление заказов, перемещения денег между кассами, широкая отчётность. Vue 3, TypeScript, Ant Design.",
    terminalLines: [
      "  Десктоп-приложение: заказы (создание, отмена,",
      "  удаление), перемещения денег, отчёты. Ant Design.",
    ],
    stack: ["Vue", "TypeScript", "Ant Design"],
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
