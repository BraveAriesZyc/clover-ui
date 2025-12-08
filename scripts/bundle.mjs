import { execSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distSite = path.join(root, 'dist-site')

async function writeDeployReadme(dir) {
  const content = `# 部署说明\n\n- 站点静态资源位于此目录，直接部署到静态服务器即可（如 Nginx）。\n- 若需设置子路径部署，请在 \`vite.app.config.ts\` 中配置 \`base\`。\n`
  await fs.writeFile(path.join(dir, 'README.deploy.md'), content, 'utf8')
}

async function writeMeta(dir) {
  const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'))
  const meta = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    buildTime: new Date().toISOString(),
    output: 'dist-site'
  }
  await fs.writeFile(path.join(dir, 'site.meta.json'), JSON.stringify(meta, null, 2), 'utf8')
}

async function main() {
  // 仅构建站点
  execSync('node ./node_modules/vite/bin/vite.js build --config vite.app.config.ts', { stdio: 'inherit' })

  // 写入部署说明与元信息到 dist-site
  await writeDeployReadme(distSite)
  await writeMeta(distSite)
  console.log(`\n✔ 站点已生成：${distSite}\n`)
}

main().catch(err => { console.error(err); process.exit(1) })
