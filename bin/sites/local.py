"""本地夹具适配：目录页每行是 `标题<TAB>绝对路径`。"""

from pathlib import Path


def chapters(url):
    rows = []
    for index, line in enumerate(Path(url).read_text(encoding="utf-8").splitlines(), 1):
        title, target = line.split("\t", 1)
        rows.append((index, title, Path(target).as_uri()))
    return rows