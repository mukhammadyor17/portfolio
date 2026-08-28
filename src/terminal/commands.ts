import { profile } from "../data/profile";
import { skills } from "../data/skills";
import { findProject, projects, type Project } from "../data/projects";
import {
  isThemeName,
  themeNames,
  themes,
  type ThemeName,
} from "../data/themes";
import { mtLogoPaddedLines } from "./ascii";
import { CWD, HIDDEN_ENTRY_PREFIX, ROOT_LISTING } from "./filesystem";

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const PROMPT_HTML = `<span class="green">${profile.handle}@portfolio</span><span class="dim">:~$</span> `;

export interface CommandContext {
  print(html: string, cls?: string): void;
  printLines(lines: string[], done?: () => void): void;
  clear(): void;
  getHistory(): string[];
  getCurrentTheme(): ThemeName;
  applyTheme(name: ThemeName): void;
  exit(): void;
  shake(): void;
  startMatrix(): void;
}

export interface CommandDef {
  run(arg: string | undefined, raw: string): void;
  /** Not printed by `help` — still resolvable and tab-completable, matching the reference terminal. */
  hidden?: boolean;
}

function aboutLines(): string[] {
  return [
    `<span class="green">${profile.fullName}</span> — фронтенд-разработчик, ${profile.experienceYears}+ лет опыта.`,
    `Стек: ${profile.stack.join(", ")}.`,
    "Сейчас: осваиваю NestJS, иду в фулстэк.",
    `Открыт к предложениям: <span class="amber">openToWork = ${profile.openToWork}</span>`,
  ];
}

function skillBarLine(name: string, percent: number, learning = false): string {
  const filled = Math.round(percent / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  const cls = learning ? "amber" : "green";
  return `  ${name.padEnd(15)}<span class="${cls}">${bar}</span> ${percent}%`;
}

function skillsLines(): string[] {
  return skills.map((s) => {
    const line = skillBarLine(s.name, s.percent, s.learning);
    return s.learning
      ? `${line} <span class="dim">← прокачивается</span>`
      : line;
  });
}

function contactLines(): string[] {
  return [
    `<span class="dim">email:</span>    <a href="mailto:${profile.email}">${profile.email}</a>`,
    `<span class="dim">github:</span>   <a href="${profile.githubUrl}" target="_blank" rel="noopener">${profile.githubHandle}</a>`,
    `<span class="dim">telegram:</span> <a href="${profile.telegramUrl}" target="_blank" rel="noopener">${profile.telegramHandle}</a>`,
  ];
}

function projectDetailLines(p: Project): string[] {
  const lines = [
    `<span class="green">${p.title}</span>  ${p.statusTag}`,
    ...p.terminalLines,
    `  <span class="dim">stack:</span> ${p.stack.join(" · ")}`,
  ];
  if (p.repoUrl) {
    lines.push(
      `  <span class="dim">code:</span>  <a href="${p.repoUrl}" target="_blank" rel="noopener">${p.repoLabel}</a>`,
    );
  }
  return lines;
}

function projectsListLines(): string[] {
  const titleWidth = Math.max(...projects.map((p) => p.title.length)) + 3;
  return [
    `<span class="dim">total ${projects.length}</span>`,
    ...projects.map(
      (p) =>
        `drwxr-xr-x  <span class="green">${p.slug}/</span>   ${p.title.padEnd(titleWidth)}${p.statusTag}`,
    ),
    `<span class="dim">детали: ${projects.map((p) => `projects ${p.slug}`).join(" | ")}</span>`,
  ];
}

function coffeeLines(): string[] {
  return [
    '<span class="amber">Error 418: I\'m a teapot</span>',
    '<span class="dim">Сервер отказывается варить кофе, потому что он чайник.</span>',
    '<span class="dim">RFC 2324, если не верите.</span>',
  ];
}

export function bootBanner(): string[] {
  return [
    `<span class="green">${escapeHtml(mtLogoPaddedLines[0])}</span>`,
    `<span class="green">${escapeHtml(mtLogoPaddedLines[1])}</span>  ${profile.domain} · terminal v1.0`,
    `<span class="green">${escapeHtml(mtLogoPaddedLines[2])}</span>  <span class="dim">${new Date().toLocaleDateString("ru-RU")}</span>`,
    `<span class="green">${escapeHtml(mtLogoPaddedLines[3])}</span>`,
    `<span class="green">${escapeHtml(mtLogoPaddedLines[4])}</span>`,
    `<span class="green">${escapeHtml(mtLogoPaddedLines[5])}</span>`,
    "",
    'Добро пожаловать! Наберите <span class="green">help</span> для списка команд.',
  ];
}

export function createCommands(
  ctx: CommandContext,
): Record<string, CommandDef> {
  const commands: Record<string, CommandDef> = {
    help: {
      run() {
        ctx.printLines([
          '<span class="dim">Доступные команды:</span>',
          '  <span class="green">about</span>       — обо мне',
          `  <span class="green">projects</span>    — список проектов (${projects.map((p) => `projects ${p.slug}`).join(" | ")})`,
          '  <span class="green">skills</span>      — навыки',
          '  <span class="green">contact</span>     — контакты',
          '  <span class="green">ls</span>          — файлы (работает и cat, и pwd)',
          '  <span class="green">neofetch</span>    — сводка о системе',
          '  <span class="green">theme</span>       — сменить тему терминала (theme dracula)',
          '  <span class="green">clear</span>       — очистить экран',
          '  <span class="green">exit</span>        — вернуться в обычный режим',
          '  <span class="dim">…и пара пасхалок, попробуйте угадать</span>',
        ]);
      },
    },
    about: {
      run() {
        ctx.printLines(aboutLines());
      },
    },
    projects: {
      run(arg) {
        if (arg) {
          const p = findProject(arg);
          if (p) {
            ctx.printLines(projectDetailLines(p));
            return;
          }
        }
        ctx.printLines(projectsListLines());
      },
    },
    skills: {
      run() {
        ctx.printLines(skillsLines());
      },
    },
    contact: {
      run() {
        ctx.printLines(contactLines());
      },
    },
    clear: {
      run() {
        ctx.clear();
      },
    },
    exit: {
      run() {
        ctx.exit();
      },
    },
    whoami: {
      hidden: true,
      run() {
        ctx.print(`${profile.handle} — тот, кого вы ищете в команду`);
      },
    },
    sudo: {
      hidden: true,
      run(arg) {
        if (arg === "hire-me") {
          ctx.printLines([
            '<span class="amber">[sudo] пароль не требуется — вы уже нравитесь</span>',
            "Permission granted.",
            'Отправляю резюме… <span class="green">✓</span>',
            `→ <a href="${profile.resumeHref}" download>скачать resume.pdf</a>`,
          ]);
        } else {
          ctx.print('<span class="dim">sudo: попробуйте sudo hire-me</span>');
        }
      },
    },
    rm: {
      hidden: true,
      run(_arg, raw) {
        if (raw.includes("-rf")) {
          ctx.shake();
          ctx.printLines([
            '<span class="amber">rm: отказано.</span> Nice try :)',
            '<span class="dim">Это портфолио пережило уже 47 таких попыток.</span>',
          ]);
        } else {
          ctx.print(
            '<span class="dim">rm: здесь нечего удалять, всё нужное</span>',
          );
        }
      },
    },
    ls: {
      run(arg, raw) {
        if (arg === "projects" || arg === "projects/") {
          ctx.printLines([
            projects.map((p) => `<span class="green">${p.slug}.md</span>`).join("   "),
          ]);
          return;
        }
        const line = raw.includes("-a")
          ? `${HIDDEN_ENTRY_PREFIX}${ROOT_LISTING}`
          : ROOT_LISTING;
        ctx.printLines([line]);
      },
    },
    cat: {
      hidden: true,
      run(arg) {
        if (!arg) {
          ctx.print(
            '<span class="dim">cat: укажите файл, например cat about.txt</span>',
          );
          return;
        }
        const f = arg.replace(/^projects\//, "");
        if (f === "about.txt") return ctx.printLines(aboutLines());
        if (f === "skills.txt") return ctx.printLines(skillsLines());
        if (f === "contact.txt") return ctx.printLines(contactLines());
        const project = projects.find((p) => `${p.slug}.md` === f);
        if (project) return ctx.printLines(projectDetailLines(project));
        if (f === "resume.pdf") {
          return ctx.print(
            `cat: это бинарный файл → <a href="${profile.resumeHref}" download>скачать resume.pdf</a>`,
          );
        }
        if (f === ".secret") {
          return ctx.printLines([
            '<span class="amber">Вы нашли скрытый файл. Уровень любопытства: senior.</span>',
            `<span class="dim">Такие кандидаты нам нужны → напишите: ${profile.email}</span>`,
          ]);
        }
        ctx.print(
          `<span class="dim">cat: ${escapeHtml(arg)}: нет такого файла — наберите ls</span>`,
        );
      },
    },
    pwd: {
      hidden: true,
      run() {
        ctx.print(CWD);
      },
    },
    date: {
      hidden: true,
      run() {
        ctx.print(new Date().toLocaleString("ru-RU"));
      },
    },
    echo: {
      hidden: true,
      run(_arg, raw) {
        ctx.print(escapeHtml(raw.slice(5)) || "");
      },
    },
    history: {
      hidden: true,
      run() {
        const h = ctx.getHistory();
        if (!h.length) {
          ctx.print('<span class="dim">history: пока пусто</span>');
          return;
        }
        ctx.printLines(
          h.map(
            (line, i) =>
              `  <span class="dim">${i + 1}</span>  ${escapeHtml(line)}`,
          ),
        );
      },
    },
    neofetch: {
      run() {
        const theme = ctx.getCurrentTheme();
        ctx.printLines([
          `<span class="green">${escapeHtml(mtLogoPaddedLines[0])}</span>  <span class="green">${profile.handle}</span>@<span class="green">portfolio</span>`,
          `<span class="green">${escapeHtml(mtLogoPaddedLines[1])}</span>  ${escapeHtml("─────────────────────")}`,
          `<span class="green">${escapeHtml(mtLogoPaddedLines[2])}</span>  <span class="dim">Role:</span> ${profile.role}`,
          `<span class="green">${escapeHtml(mtLogoPaddedLines[3])}</span>  <span class="dim">Stack:</span> ${profile.stackShort.join(" · ")}`,
          `<span class="green">${escapeHtml(mtLogoPaddedLines[4])}</span>  <span class="dim">Learning:</span> ${profile.learningStack.join(" · ")}`,
          `<span class="green">${escapeHtml(mtLogoPaddedLines[5])}</span>  <span class="dim">Uptime:</span> ${profile.experienceYears}+ лет в разработке`,
          `                      <span class="dim">Theme:</span> ${theme}`,
          `                      <span class="dim">Status:</span> <span class="amber">${profile.statusShort}</span>`,
        ]);
      },
    },
    git: {
      hidden: true,
      run(arg) {
        if (arg !== "log") {
          ctx.print('<span class="dim">git: попробуйте git log</span>');
          return;
        }
        ctx.printLines([
          '<span class="amber">commit a1b2c3d</span> <span class="dim">(HEAD -> career, origin/fullstack)</span>',
          "  2026 · feat: осваиваю NestJS, курс по Angular",
          "",
          '<span class="amber">commit 8e7f6a5</span>',
          "  2024 · feat: TypeScript в проде, сложные SPA на Vue",
          "",
          '<span class="amber">commit 3c4d5e6</span>',
          "  2022 · feat: первый крупный проект, добавил React в стек",
          "",
          '<span class="amber">commit f0e1d2c</span> <span class="dim">(tag: v1.0)</span>',
          "  2021 · init: первый коммит в карьере, привет Vue",
          "",
          '<span class="dim">следующий коммит пишется прямо сейчас…</span>',
        ]);
      },
    },
    coffee: {
      hidden: true,
      run() {
        ctx.printLines(coffeeLines());
      },
    },
    make: {
      hidden: true,
      run(arg) {
        if (arg === "coffee") {
          ctx.printLines(coffeeLines());
          return;
        }
        ctx.print(
          '<span class="dim">make: *** Нет правила для сборки цели. Попробуйте make coffee.</span>',
        );
      },
    },
    matrix: {
      hidden: true,
      run() {
        ctx.startMatrix();
      },
    },
    theme: {
      run(arg) {
        if (!arg) {
          ctx.printLines([
            ...themeNames.map((n) => {
              const mark =
                n === ctx.getCurrentTheme()
                  ? ' <span class="green">← активна</span>'
                  : "";
              return `  <span style="color:${themes[n].green}">●</span> ${n}${mark}`;
            }),
            '<span class="dim">применить: theme dracula</span>',
          ]);
        } else if (isThemeName(arg)) {
          ctx.applyTheme(arg);
          ctx.print(`Тема <span class="green">${arg}</span> применена ✓`);
        } else {
          ctx.print(
            '<span class="dim">theme: нет такой темы — наберите theme для списка</span>',
          );
        }
      },
    },
  };
  return commands;
}
