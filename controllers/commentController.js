const TaskComment = require('../models/taskCommentModel');
const Task = require('../models/taskmodels');
const Project = require('../models/projectModel');
const Belong = require('../models/belongModel');


async function addComment(req, res) {
  try {
    const { comment_text } = req.body;
    const task_id = req.params.taskId;
    const user_id = req.user.id;
    if (!comment_text) return res.status(400).json({ error: 'Comment text is required' });

    const commentId = await TaskComment.create(comment_text, task_id, user_id);

    res.status(201).json({ commentId, message: 'Comment added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error adding comment' });
  }
}

async function getComments(req, res) {
    try {
        const task_id = req.params.taskId;
        const comments = await TaskComment.findAllByTask(task_id);
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching comments' });
    }
}

async function deleteComment(req, res) {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;


    const comment = await TaskComment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const task = await Task.findById(comment.task_id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const project = await Project.findById(task.project_id);
    if (!project) return res.status(404).json({ error: "Project not found" });


    const teamId = project.team_id;
    const isOwner = comment.user_id === userId;
    const role = await Belong.getRole(userId, teamId);
    const isAdmin = role === "admin";


    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not allowed to delete this comment" });
    }

    await TaskComment.delete(commentId);
    res.json({ message: "Comment deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting comment" });
  }
}

module.exports = { addComment, getComments, deleteComment };