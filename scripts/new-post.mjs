import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)

const getArg = (name) => {
  const prefix = `--${name}=`
  const withEquals = args.find((arg) => arg.startsWith(prefix))
  if (withEquals) return withEquals.slice(prefix.length)
  const index = args.indexOf(`--${name}`)
  if (index !== -1 && args[index + 1] && !args[index + 1].startsWith('--')) {
    return args[index + 1]
  }
  return undefined
}

const hasFlag = (name) => args.includes(`--${name}`)

const title = getArg('title')
if (!title) {
  console.error('Usage: npm run new:post -- --title "Post title" [--slug path/to/post] [--tags "a,b"] [--summary "text"] [--draft]')
  process.exit(1)
}

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')

const rawSlug = getArg('slug') || slugify(title)
const dir = getArg('dir')
const slugPath = dir ? path.join(dir, rawSlug) : rawSlug
const normalizedSlug = slugPath.replace(/^\/+|\/+$/g, '')
const summary = getArg('summary') ?? ''
const tags = (getArg('tags') || '')
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean)

const draftArg = getArg('draft')
const draft = draftArg ? draftArg !== 'false' : hasFlag('draft') ? true : false

const yamlString = (value) => JSON.stringify(value)
const tagsLine = `tags: [${tags.map(yamlString).join(', ')}]`

const frontmatter = [
  '---',
  `title: ${yamlString(title)}`,
  `date: ${yamlString(new Date().toISOString())}`,
  tagsLine,
  `summary: ${yamlString(summary)}`,
  `draft: ${draft}`,
  '---',
  '',
].join('\n')

const outputDir = path.join(process.cwd(), 'data', 'blog', path.dirname(normalizedSlug))
const fileName = `${path.basename(normalizedSlug)}.mdx`
const filePath = path.join(outputDir, fileName)

if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`)
  process.exit(1)
}

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(filePath, frontmatter)

console.log(`Created ${path.relative(process.cwd(), filePath)}`)
