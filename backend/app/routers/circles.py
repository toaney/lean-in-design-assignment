from fastapi import APIRouter
from ..data.circles import CIRCLES, CIRCLE_STEPS, CIRCLE_STATS

router = APIRouter(prefix="/api/circles", tags=["circles"])


@router.get("")
def get_circles():
    return {"circles": CIRCLES}


@router.get("/steps")
def get_circle_steps():
    return {"steps": CIRCLE_STEPS}


@router.get("/stats")
def get_circle_stats():
    return {"stats": CIRCLE_STATS}
