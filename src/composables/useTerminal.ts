import { computed, ref } from "vue";
import { useReducedMotion } from "./useReducedMotion";
import { useTheme } from "./useTheme";
import {
  bootBanner,
  createCommands,
  escapeHtml,
  PROMPT_HTML,
  type CommandContext,
} from "../terminal/commands";

export interface OutputLine {
  id: number;
  html: string;
  cls?: string;
}

let nextId = 0;

export function useTerminal(options: { onExit: () => void }) {
  const reducedMotion = useReducedMotion();
  const { currentTheme, applyTheme } = useTheme();

  const output = ref<OutputLine[]>([]);
  const history = ref<string[]>([]);
  const historyIndex = ref(0);
  const inputValue = ref("");
  const matrixActive = ref(false);
  const shakeActive = ref(false);
  const booted = ref(false);

  function print(html: string, cls?: string) {
    output.value.push({ id: nextId++, html, cls });
  }

  function clear() {
    output.value = [];
  }

  function printLines(lines: string[], done?: () => void) {
    if (reducedMotion) {
      lines.forEach((l) => print(l));
      done?.();
      return;
    }
    let i = 0;
    const next = () => {
      if (i >= lines.length) {
        done?.();
        return;
      }
      print(lines[i++]);
      setTimeout(next, 60);
    };
    next();
  }

  function shake() {
    shakeActive.value = true;
    setTimeout(() => {
      shakeActive.value = false;
    }, 550);
  }

  function startMatrix() {
    if (reducedMotion) {
      printLines([
        '<span class="green">Wake up, Neo…</span>',
        '<span class="dim">The Matrix has you. Наберите exit, чтобы вернуться.</span>',
      ]);
      return;
    }
    if (matrixActive.value) return;
    matrixActive.value = true;
  }

  function finishMatrix() {
    printLines([
      '<span class="green">Wake up, Neo…</span>',
      '<span class="dim">The Matrix has you. Наберите exit, чтобы вернуться в реальность.</span>',
    ]);
  }

  const ctx: CommandContext = {
    print,
    printLines,
    clear,
    getHistory: () => history.value,
    getCurrentTheme: () => currentTheme.value,
    applyTheme,
    exit: options.onExit,
    shake,
    startMatrix,
  };

  const commands = createCommands(ctx);
  const commandNames = computed(() => Object.keys(commands));

  function run(raw: string) {
    const line = raw.trim();
    print(PROMPT_HTML + escapeHtml(line));
    if (!line) return;
    history.value.push(line);
    historyIndex.value = history.value.length;
    const parts = line.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const def = commands[cmd];
    if (def) {
      def.run(parts[1], line);
    } else {
      print(
        `<span class="dim">${escapeHtml(cmd)}: command not found — наберите</span> <span class="green">help</span>`,
      );
    }
  }

  function boot() {
    if (booted.value) return;
    booted.value = true;
    printLines(bootBanner());
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      run(inputValue.value);
      inputValue.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex.value > 0) {
        historyIndex.value--;
        inputValue.value = history.value[historyIndex.value];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex.value < history.value.length - 1) {
        historyIndex.value++;
        inputValue.value = history.value[historyIndex.value];
      } else {
        historyIndex.value = history.value.length;
        inputValue.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = inputValue.value.toLowerCase();
      if (!v) return;
      const matches = commandNames.value.filter((c) => c.indexOf(v) === 0);
      if (matches.length === 1) {
        inputValue.value = `${matches[0]} `;
      } else if (matches.length > 1) {
        print(`<span class="dim">${matches.join("  ")}</span>`);
      }
    }
  }

  function runChip(name: string) {
    run(name);
  }

  return {
    output,
    inputValue,
    currentTheme,
    matrixActive,
    shakeActive,
    boot,
    run,
    runChip,
    handleKeydown,
    finishMatrix,
  };
}
