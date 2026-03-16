#!/usr/bin/env node
// errorfyi — look up error codes from the command line
// Usage: errorfyi <code> [--json] [--namespace <ns>]

const DATA_URL = 'https://errors.fyi/data/codes.json';

// ANSI helpers
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  white:  '\x1b[37m',
};

function die(msg) {
  process.stderr.write(`${c.red}error:${c.reset} ${msg}\n`);
  process.exit(1);
}

function usage() {
  process.stdout.write([
    `${c.bold}errorfyi${c.reset} — error code lookup`,
    '',
    `  ${c.cyan}errorfyi <code>${c.reset}              look up a code in all namespaces`,
    `  ${c.cyan}errorfyi <code> --json${c.reset}        output raw JSON`,
    `  ${c.cyan}errorfyi <code> -n <namespace>${c.reset} filter to one namespace`,
    '',
    'Examples:',
    `  errorfyi ENOENT`,
    `  errorfyi 11000`,
    `  errorfyi 404 -n http`,
    '',
  ].join('\n'));
  process.exit(0);
}

// Parse args
const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') usage();

let code = null;
let jsonOutput = false;
let nsFilter = null;

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--json' || a === '-j') {
    jsonOutput = true;
  } else if (a === '--namespace' || a === '-n') {
    nsFilter = args[++i];
    if (!nsFilter) die('--namespace requires a value');
  } else if (!code) {
    code = a;
  } else {
    die(`unexpected argument: ${a}`);
  }
}

if (!code) die('a code argument is required');

// Fetch data
let data;
try {
  const res = await fetch(DATA_URL);
  if (!res.ok) die(`server returned ${res.status}`);
  data = await res.json();
} catch (err) {
  die(`could not fetch data: ${err.message}`);
}

// Match: exact code string, or numeric alias
const codeStr = code;
const codeNum = parseInt(codeStr, 10);
const isNumeric = !isNaN(codeNum) && String(codeNum) === codeStr;

let matches = data.codes.filter((entry) => {
  const directMatch = entry.code === codeStr;
  const numericAliasMatch = isNumeric && entry.numeric === codeNum;
  return directMatch || numericAliasMatch;
});

if (nsFilter) {
  matches = matches.filter((e) => e.namespace === nsFilter);
}

if (matches.length === 0) {
  process.stderr.write(`${c.yellow}no results for ${c.bold}${codeStr}${c.reset}`);
  if (nsFilter) process.stderr.write(` in namespace ${nsFilter}`);
  process.stderr.write('\n');
  process.exit(1);
}

if (jsonOutput) {
  process.stdout.write(JSON.stringify(matches, null, 2) + '\n');
  process.exit(0);
}

// Pretty-print
for (const entry of matches) {
  const label = entry.code === codeStr ? entry.code : `${entry.code} ${c.dim}(numeric ${codeStr})${c.reset}`;
  process.stdout.write([
    '',
    `${c.bold}${c.white}${label}${c.reset}  ${c.dim}${entry.namespace}${c.reset}`,
    `${c.bold}${entry.name}${c.reset}`,
    entry.description,
    ...(entry.references?.length
      ? [`${c.dim}refs: ${entry.references.slice(0, 2).join('  ')}${c.reset}`]
      : []),
  ].join('\n') + '\n');
}

process.stdout.write('\n');
