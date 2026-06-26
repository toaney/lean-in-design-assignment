from fastapi import APIRouter
from ..data.home import HOME_STATS, HERO_IMAGES, FEATURED_ARTICLE_IDS
from ..data.articles import ARTICLES

router = APIRouter(prefix="/api/home", tags=["home"])


@router.get("/stats")
def get_home_stats():
    return HOME_STATS


@router.get("/featured")
def get_featured():
    id_set = set(FEATURED_ARTICLE_IDS)
    featured = [a for a in ARTICLES if a["id"] in id_set]
    featured.sort(key=lambda a: FEATURED_ARTICLE_IDS.index(a["id"]))
    return {"articles": featured, "hero_images": HERO_IMAGES}
