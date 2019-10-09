'use strict'

const Color = {
	RESET: "\x1b[0m",
	BRIGHT: "\x1b[1m",
	DIM: "\x1b[2m",
	UNDERSCORE: "\x1b[4m",
	BLINK: "\x1b[5m",
	REVERSE: "\x1b[7m",
	HIDDEN: "\x1b[8m",

	// Normal colors
	FG_DEFAULT: "\x1b[39m",
	FG_BLACK: "\x1b[30m",
	FG_RED: "\x1b[31m",
	FG_GREEN: "\x1b[32m",
	FG_YELLOW: "\x1b[33m",
	FG_BLUE: "\x1b[34m",
	FG_MAGENTA: "\x1b[35m",
	FG_CYAN: "\x1b[36m",
	FG_WHITE: "\x1b[97m",
	FG_GRAY: "\x1b[90m",

	// Light colors
	FG_GRAY_LIGHT: "\x1b[37m",
	FG_RED_LIGHT: "\x1b[91m",
	FG_GREEN_LIGHT: "\x1b[92m",
	FG_YELLOW_LIGHT: "\x1b[93m",
	FG_BLUE_LIGHT: "\x1b[94m",
	FG_MAGENTA_LIGHT: "\x1b[95m",
	FG_CYAN_LIGHT: "\x1b[96m",

	// Normal
	BG_DEFAULT: "\x1b[49m",
	BG_BLACK: "\x1b[40m",
	BG_RED: "\x1b[41m",
	BG_GREEN: "\x1b[42m",
	BG_YELLOW: "\x1b[43m",
	BG_BLUE: "\x1b[44m",
	BG_MAGENTA: "\x1b[45m",
	BG_CYAN: "\x1b[46m",
	BG_WHITE: "\x1b[107m",
	BG_GRAY: "\x1b[100m",

	// Light
	BG_GRAY_LIGHT: "\x1b[47m",
	BG_RED_LIGHT: "\x1b[101m",
	BG_GREEN_LIGHT: "\x1b[102m",
	BG_YELLOW_LIGHT: "\x1b[103m",
	BG_BLUE_LIGHT: "\x1b[104m",
	BG_MAGENTA_LIGHT: "\x1b[105m",
	BG_CYAN_LIGHT: "\x1b[106m"

}

const LEVEL = {
	NORMAL: Color.FG_DEFAULT, // 0
	INFO: Color.FG_BLUE, // 1
	SUCCESS: Color.FG_GREEN, // 1
	IMPORTANT: Color.FG_YELLOW, // 2
	WARNING: Color.FG_RED, // 3
	HARD: Color.BG_RED, // 4 

	valueOf: mode => {
		let m = this.NORMAL
		for(let k in LEVEL) {
			if(k === mode.toUpperCase()) m = LEVEL[k]
		}
		return m
	}
}

const LogMode = {
	WARNING:1, // > 1
	MUTE:2, // > 3
	DEBUG:3, // all

	valueOf: mode => {
		let m = this.MUTE
		for(let k in LogMode) {
			if(k === mode.toUpperCase()) m = LogMode[k]
		}
		return m
	}
}

// class LOG {
// 	constructor(mode) {
// 		this.mode = LogMode.valueOf(mode)
// 	}

// 	log(msg, name, level, clazz) {
// 		if(this.isEmpty(level)) level = LEVEL.NORMAL

// 		switch(this.mode) {
// 			case LogMode.DEBUG:
// 				this.print(msg, name, level, clazz)
// 				break
// 			case LogMode.WARNING: 
// 				if(LEVEL.IMPORTANT === level || LEVEL.WARNING === level || LEVEL.HARD === level) 
// 					this.print(msg, name, level, clazz)
// 				break
// 			case LogMode.MUTE: 
// 				if(LEVEL.HARD === level) 
// 					this.print(msg, name, level, clazz)
// 		}
// 	}

// 	print(msg, name, level, clazz) {
// 		name = this.isEmpty(name) ? name = "" : `[${name}]: `
// 		clazz = this.isEmpty(clazz) ? clazz = "" : `(${this.getObjectClass(clazz)}.js) `
// 		console.log(`${level}%s%s${Color.RESET}%s`, clazz, name, msg)
// 	}

// 	isEmpty(obj) {
// 		return obj === undefined || obj === null
// 	}

// 	getObjectClass(obj) {
// 		let objToStr = obj.toString()

// 		let isClazzObject = /class ([a-zA-Z]*) {.*/gi.exec(objToStr)
// 		if(isClazzObject !== null && [1] !== null) return isClazzObject[1]

// 		let isInstanceOf = /class ([a-zA-Z]*)/gi.exec(obj.constructor.toString())
// 		if(isInstanceOf !== null && [1] !== null) return isInstanceOf[1]

//     return undefined;
// 	}

// }

module.exports = {
	// LOG,
	LEVEL
}
