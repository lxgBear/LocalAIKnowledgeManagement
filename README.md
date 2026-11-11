# LocalAIKnowledgeManagement

本地 Markdown + Git 个人知识库。人负责提供原料和提问，确定性的归档、检索、体检和迁移由命令执行。

## 功能

- 用纯 Markdown 保存卡片、索引和操作日志。
- 每次写入同时更新索引、追加日志并创建 Git 提交。
- 按触发词精确检索。
- 检查重复、积压、超长、错位和索引失真等问题，但不自动改文件。
- 可选通过 Hermes 连接飞书。

## 目录

| 路径 | 用途 |
|---|---|
| `00-收件箱/` | 待处理原料 |
| `10-记忆/` | 知识卡片 |
| `12-词典/` | 词条 |
| `20-手册/` | 操作手册 |
| `90-敏感/` | 本地凭据，不进入版本库 |
| `99-archive/` | 已归档原料 |
| `bin/` | 命令行工具 |
| `skills/智库/` | Hermes 规则判断 |

卡片格式和归档规则见 [AGENTS.md](AGENTS.md)。

## 环境要求

- Python 3.11 或更新版本
- Git
- 可选：Hermes Agent
- 可选：Tesseract OCR 与英文语言包

```bash
git clone https://github.com/lxgBear/LocalAIKnowledgeManagement.git
cd LocalAIKnowledgeManagement
```

## 使用

追加卡片：

```bash
bin/zhiku add --type "标题" --file "10-记忆/杂项.md" <<'EOF'
- 触发词：知识库、Git
- 出处：https://example.com
- 日期：2026-11-11
EOF
```

常用命令：

```bash
bin/zhiku find --trigger "知识库"
bin/zhiku lint
bin/zhiku archive --src "00-收件箱/原料.md"
bin/zhiku migrate --from "/path/to/old-library"
```

命令成功时向 stdout 输出一个 JSON 对象。退出码 `0` 表示成功，`1` 表示执行失败，`2` 表示参数错误。

## 飞书

配置步骤见 [docs/飞书配置.md](docs/飞书配置.md)。App Secret、webhook、签名密钥和用户 ID 只放在本机环境变量中，不要提交到仓库。

## 安全

`90-敏感/` 的内容不会写入命令输出。密钥、私钥、token 和用户标识不属于本仓库。

## 许可证

尚未指定开源许可证。在添加许可证文件前，保留所有权利。
