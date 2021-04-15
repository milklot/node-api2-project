// implement your posts router here
const express = require('express');
const db = require('./posts-model');

const router = express.Router();

router.get("/api/posts", (req, res) => {
	db.find(req.query)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch(() => {
			res.status(500).json({
				message: "The posts information could not be retrieved"
			})
		});
});

router.get("/api/posts/:id", (req, res) => {
	db.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			}
			else {
				res.status(404).json({
					message: "The post with the specified ID does not exist"
				})
			}
		})
		.catch(() => {
			res.status(500).json({
				message: "The post information could not be retrieved"
			})	
		})
});

router.post("/api/posts", (req, res) => {
	if (!req.body.title || ! req.body.contents) {
		return res.status(400)
	}

	db.insert(req.body)
		.then((newPost) => {
			res.status(201).json(newPost);
		})
		.catch(() => {
			res.status(500).json({
				message: "There was an error while saving the post to the database"
			})
		})
});

router.put("/api/posts/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Please provide title and contents for the post"
		})
	}

	db.update(req.params.id, req.body)
		.then((updatedPost) => {
			if (updatedPost) {
				res.status(200).json(updatedPost);
			}
			else {
				res.status(404).json({
					message: "The post with the specified ID does not exist"
				})
			}
		})
		.catch(() => {
			res.status(500).json({
				message: "The post information could not be modified"
			})
		})
});

router.delete("/api/posts/:id", (req, res) => {
	db.remove(req.params.id)
		.then((deletedPost) => {
			if (deletedPost) {
				console.log(`post with ${req.params.id} id was deleted successfuly`)
				res.status(200).json(deletedPost);
			}
			else {
				console.log(`post with ${req.params.id} doesn't exist`)
				res.status(404).json({
					message: "The post with the specified ID does not exist"
				})
			}
		})
		.catch(() => {
			res.status(500).json({
				message: "The post could not be removed"
			})
		})
});

router.get("/api/posts/:id/comments", (req, res) => {
	db.findPostComments(req.params.id)
		.then((comments) => {
			if (!comments) {
				res.status(404).json({
					message: "The post with the specified ID does not exist"
				})
			}
			else {
				res.status(200).json(comments);
			}
		})
		.catch(() => {
			res.status(500).json({
				message: "The comments information could not be retrieved"
			})
		})
});






module.exports = router;