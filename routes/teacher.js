const express = require('express');
const router = express.Router();
const Teacher = require('../Models/teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new teacher
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a teacher by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete one teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(deletedTeacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all teachers
router.delete('/', async (req, res) => {
  try {
    await Teacher.deleteMany({});
    res.json({ message: 'All teachers deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
    try {
      const { department } = req.query;
      const teachers = await Teacher.find({ department });
      res.json(teachers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put('/update', async (req, res) => {
try {
    const { department } = req.query;
    const updateFields = req.body;

    // Update teachers matching the criteria
    const result = await Teacher.updateMany({ department }, updateFields);

    res.json({ message: `${result.nModified} teachers updated` });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});
router.delete('/delete', async (req, res) => {
    try {
      const { department } = req.query;
  
      // Delete teachers matching the criteria
      const result = await Teacher.deleteMany({ department });
  
      res.json({ message: `${result.deletedCount} teachers deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
