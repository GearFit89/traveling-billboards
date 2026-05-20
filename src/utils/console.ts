type LogLevel = "debug" | "info" | "warn" | "error" | "trace" | "log";

interface ConsoleOptions {
  debug?: boolean;
  color?: boolean;
  levels?: number; // 0-8 scale
  ingoreBtn?: boolean;
  isDebugMode?: boolean; // Custom flag for your UI logic
}

export class Console {
  private prefix: string;
  private options: ConsoleOptions;

  // Map levels to numeric values for filtering
  private levelMap: Record<LogLevel, number> = {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    log: 6,
  };

  constructor(prefix: string, options: ConsoleOptions = {}) {
    this.prefix = prefix;
    this.options = {
      debug: true,
      color: true,
      levels: 8,
      ingoreBtn: true,

      isDebugMode: true,
      ...options,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.options.debug) return false;
    return (this.levelMap[level] || 0) <= (this.options.levels || 8);
  }

  private getStyle(level: LogLevel): string {
    if (!this.options.color) return "";

    // ANSI Color codes
    const colors = {
      debug: "\x1b[35m", // Magenta
      info: "\x1b[34m", // Blue (Primary)
      warn: "\x1b[33m", // Amber (Warm)
      error: "\x1b[31m", // Red
      reset: "\x1b[0m",
      log: "\x1b[0m",
    };
    return colors[level as keyof typeof colors] || colors.reset;
  }
  l(msg: any) {
    console.log(`  └─ ${msg}`);
  }

  llog(message: any, level: LogLevel = "info", ...args: any[]) {
    function f() {
      console.log("write in to file");
      //file logic here
    } //writes to a debug file
    if (!this.shouldLog(level)) return this;

    const color = this.getStyle(level);
    const reset = this.options.color ? "\x1b[0m" : "";
    const timestamp = new Date().toLocaleTimeString();

    console.log(
      `${color}${this.prefix}${reset} [${timestamp}] [${level.toUpperCase()}]:`,
      message,
      ...args,
    );

    return this;
  }

  // Helper methods for convenience
  query(sql: string, params?: any[]) {
    return this.llog(sql, "info", params ? { params } : "");
  }
  log(msg: any, ...args: any[]) {
    return this.llog(msg, "log", ...args);
  }
  info(msg: string, ...args: any[]) {
    return this.llog(msg, "info", ...args);
  }
  warn(msg: string, ...args: any[]) {
    return this.llog(msg, "warn", ...args);
  }
  trace(msg: string, ...args: any[]) {
    return this.llog(msg, "trace", ...args);
  }
  debug(msg: string, ...args: any[]) {
    return this.llog(msg, "debug", ...args);
  }
  error(msg: string, ...errs: any[]) {
    return this.llog(msg, "error", ...errs);
  }
  stack(): this {
    console.trace(`${this.prefix} STACK TRACE`);
    return this;
  }
}

// Implementation as requested

export default Console;
