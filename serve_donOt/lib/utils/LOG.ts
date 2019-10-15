export enum Color {
	RESET = "\x1b[0m",
	BRIGHT = "\x1b[1m",
	DIM = "\x1b[2m",
	UNDERSCORE = "\x1b[4m",
	BLINK = "\x1b[5m",
	REVERSE = "\x1b[7m",
	HIDDEN = "\x1b[8m",

	// Normal colors
	FG_DEFAULT = "\x1b[39m",
	FG_BLACK = "\x1b[30m",
	FG_RED = "\x1b[31m",
	FG_GREEN = "\x1b[32m",
	FG_YELLOW = "\x1b[33m",
	FG_BLUE = "\x1b[34m",
	FG_MAGENTA = "\x1b[35m",
	FG_CYAN = "\x1b[36m",
	FG_WHITE = "\x1b[97m",
	FG_GRAY = "\x1b[90m",

	// Light colors
	FG_GRAY_LIGHT = "\x1b[37m",
	FG_RED_LIGHT = "\x1b[91m",
	FG_GREEN_LIGHT = "\x1b[92m",
	FG_YELLOW_LIGHT = "\x1b[93m",
	FG_BLUE_LIGHT = "\x1b[94m",
	FG_MAGENTA_LIGHT = "\x1b[95m",
	FG_CYAN_LIGHT = "\x1b[96m",

	// Normal
	BG_DEFAULT = "\x1b[49m",
	BG_BLACK = "\x1b[40m",
	BG_RED = "\x1b[41m",
	BG_GREEN = "\x1b[42m",
	BG_YELLOW = "\x1b[43m",
	BG_BLUE = "\x1b[44m",
	BG_MAGENTA = "\x1b[45m",
	BG_CYAN = "\x1b[46m",
	BG_WHITE = "\x1b[107m",
	BG_GRAY = "\x1b[100m",

	// Light
	BG_GRAY_LIGHT = "\x1b[47m",
	BG_RED_LIGHT = "\x1b[101m",
	BG_GREEN_LIGHT = "\x1b[102m",
	BG_YELLOW_LIGHT = "\x1b[103m",
	BG_BLUE_LIGHT = "\x1b[104m",
	BG_MAGENTA_LIGHT = "\x1b[105m",
	BG_CYAN_LIGHT = "\x1b[106m"

}

export class LOG {

	public static log(level, msg) {
		LOG.print(level, msg)
	}

	public static print(level, msg) {
		console.log(`${level}%s${Color.RESET}`, msg)
	}

}