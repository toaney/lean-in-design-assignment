from fastapi import APIRouter, Query
from typing import Optional
from ..data.articles import ARTICLES

router = APIRouter(prefix="/api/articles", tags=["articles"])


@router.get("")
def get_articles(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    topics: Optional[str] = Query(None),
    audience: Optional[str] = Query(None),
):
    filtered = list(ARTICLES)

    if topics:
        topic_list = [t.strip() for t in topics.split(",") if t.strip()]
        if topic_list:
            filtered = [a for a in filtered if any(t in a["topics"] for t in topic_list)]

    if audience:
        audience_list = [a.strip() for a in audience.split(",") if a.strip()]
        if audience_list:
            filtered = [a for a in filtered if any(aud in a["audience"] for aud in audience_list)]

    total = len(filtered)
    start = (page - 1) * limit
    end = start + limit
    page_items = filtered[start:end]

    return {
        "articles": page_items,
        "total": total,
        "page": page,
        "limit": limit,
        "has_more": end < total,
    }
