import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const srcDir = path.join(root, 'packages', 'theme-chalk', 'src')
const outDir = path.join(root, 'dist', 'library', 'theme-chalk')

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true })
}

async function copyCss() {
    await ensureDir(outDir)
    const files = await fs.readdir(srcDir)
    for (const f of files) {
        if (!f.endsWith('.css')) continue
        const src = path.join(srcDir, f)
        const dest = path.join(outDir, f)
        await fs.copyFile(src, dest)
    }
}

copyCss().catch((err) => {
    console.error(err)
    process.exit(1)
})
