# Implementation Plan: Open Source Path Sanitization

## Goal

- 清理 `kitty-specs` 文档中的本机绝对路径。

## Non-goal

- 不修改业务实现。
- 不做设计或功能调整。

## Approach

### 1. Path category cleanup

- 仓库内部绝对路径：改为相对仓库路径
- 本地下载参考文件：改为通用描述
- 本地外部 repo：改为通用来源描述

### 2. Scope control

- 只改 `kitty-specs/**`
- 通过批量替换 + 定点修正完成

### 3. Verification

- 运行 `rg -n "/Users/${USER}/" kitty-specs`
- 确认文档仍可读

## Risks

- 纯批量替换会把少量自然语言句子改坏，所以需要二次 spot check

## Rollback

- 回退 mission 014 的文档提交即可
