"""zhiku 三个命令共用的输出、退出码和敏感区过滤。"""

import json
import sys

OK = 0
FAIL = 1
USAGE = 2
SENSITIVE = "90-敏感/"


class CLIError(Exception):
    def __init__(self, message, code=FAIL):
        super().__init__(message)
        self.code = code


def emit(payload):
    json.dump(payload, sys.stdout, ensure_ascii=False, separators=(",", ":"))
    sys.stdout.write("\n")


def fail(message, code=FAIL):
    emit({"error": message})
    raise SystemExit(code)


def guard(path):
    """敏感区只允许返回定位，不允许返回正文。"""
    if SENSITIVE in path.replace("\\", "/"):
        raise CLIError("敏感区只返回定位，不返回内容")
