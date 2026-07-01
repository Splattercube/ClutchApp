from flask import Blueprint, request
from werkzeug.utils import secure_filename
import os

from models import db, Clip, Like

clips_bp = Blueprint("clips", __name__)

UPLOAD_FOLDER = "uploads"

@clips_bp.route("/clips", methods=["GET"])
def get_clips():
    clips = Clip.query.order_by(Clip.created_at.desc()).all()

    clipList = []

    for clip in clips:
        clipList.append({
            "id":clip.id, "caption":clip.caption, "video_path":clip.video_path, 
            "agent":clip.agent, "rank":clip.rank, "likes":clip.likes, "created_at":str(clip.created_at),
            "user_id":clip.user_id, "username":clip.user.username
        })
    return {"clips":clipList}


@clips_bp.route("/clips", methods=["POST"])
def upload_clip():
    user_id = request.form.get("user_id")
    caption = request.form.get("caption")
    agent = request.form.get("agent")
    rank = request.form.get("rank")

    video = request.files.get("video")

    if not user_id or not video:
        return {"error":"Missing user_id or video"}, 400
    
    filename = secure_filename(video.filename)
    video_path = os.path.join(UPLOAD_FOLDER, filename)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    video.save(video_path)

    new_clip = Clip( user_id=user_id, caption=caption, agent=agent, rank=rank,
                    video_path=video_path)
    
    db.session.add(new_clip)
    db.session.commit()

    return {
        "message": "Clip uploaded successfully",
        "clip": {
            "id": new_clip.id, "caption": new_clip.caption, "video_path": new_clip.video_path,
            "agent": new_clip.agent, "rank": new_clip.rank, "user_id": new_clip.user_id
        }
    }, 201



@clips_bp.route("/clips/<int:clip_id>/like", methods=["POST"])
def like_clip(clip_id):
    user_id = request.json.get("user_id")

    if not user_id:
        return {"error": "Missing user_id"}, 400

    clip = Clip.query.get(clip_id)

    if not clip:
        return {"error": "Clip not found"}, 404

    existing_like = Like.query.filter_by(
        user_id=user_id,
        clip_id=clip_id
    ).first()

    if existing_like:
        db.session.delete(existing_like)
        clip.likes -= 1
        db.session.commit()

        return {
            "message": "Clip unliked",
            "likes": clip.likes
        }, 200

    new_like = Like(
        user_id=user_id,
        clip_id=clip_id
    )
    clip.likes += 1

    db.session.add(new_like)
    db.session.commit()

    return {
        "message": "Clip liked",
        "likes": clip.likes
    }, 200