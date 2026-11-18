#!/usr/bin/env python3
"""Render the static source offer from operator-approved release settings.

Does not contact GitHub, publish source, approve a URL, or deploy the application.
Flags record operator confirmation, not automated verification.
"""

import html
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

FRONTEND = Path(__file__).resolve().parents[1]
START = "<!-- QANDA_SOURCE_OFFER_START -->"
END = "<!-- QANDA_SOURCE_OFFER_END -->"


def render_offer(config):
    if not (
        config.get("urlApproved") is True
        and config.get("sourcePublished") is True
    ):
        return """        <p><strong>Source publication pending.</strong> The planned company
          repository is named <code>qanda-social-manager</code>. An approved URL
          and publication of the complete modified source have not yet both been
          confirmed. No modified-source download is offered here.</p>
        <p>The source-access requirement remains incomplete. This development
          version must not be published until its complete Corresponding Source
          is publicly available at the approved destination.</p>"""

    url = config.get("repositoryUrl", "")
    revision = config.get("releaseCommit", "")
    if not isinstance(url, str) or not isinstance(revision, str):
        raise ValueError("Repository URL and release commit must be strings.")
    parsed = urlsplit(url)
    # Use only the planned company repository, never the upstream repository.
    if (
        parsed.scheme != "https"
        or parsed.netloc != "github.com"
        or parsed.query
        or parsed.fragment
        or not re.fullmatch(r"/[A-Za-z0-9][A-Za-z0-9-]{0,38}/qanda-social-manager/?", parsed.path)
    ):
        raise ValueError("Use the approved https://github.com/OWNER/qanda-social-manager URL.")
    owner = parsed.path.split("/")[1]
    if owner.lower() in {"owner", "your-company", "your-org", "placeholder", "gitroomhq"}:
        raise ValueError("Replace the placeholder with the approved company owner, not upstream.")
    if not re.fullmatch(r"[0-9a-f]{40}", revision):
        raise ValueError("Set the full lowercase 40-character published release commit.")
    if revision == "a5affe62c74e39c1e7ac960d50d8418b807d532c":
        raise ValueError("The unmodified upstream commit cannot represent the branded release.")
    base = html.escape(url.rstrip("/"), quote=True)
    return f"""        <p>The complete Corresponding Source for this modified version is
          available at no charge from the company repository.</p>
        <p><a href="{base}/archive/{revision}.tar.gz">Download this version's source code</a></p>
        <p><a href="{base}/tree/{revision}">Browse this version's source and build instructions</a></p>
        <p>Source revision: <code>{revision}</code>.</p>"""


def main():
    config = json.loads((FRONTEND / "source-code-config.json").read_text())
    page = FRONTEND / "public/legal.html"
    text = page.read_text()
    if text.count(START) != 1 or text.count(END) != 1:
        raise ValueError("The legal page must contain exactly one source-offer marker pair.")
    head, rest = text.split(START, 1)
    _, tail = rest.split(END, 1)
    offer = render_offer(config)
    page.write_text(head + START + "\n" + offer + "\n        " + END + tail)
    print("Source section prepared; remote availability has not been verified.")


if __name__ == "__main__":
    main()
