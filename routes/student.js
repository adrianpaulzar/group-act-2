const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete one student by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndRemove(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all students
router.delete('/', async (req, res) => {
  try {
    await Student.deleteMany({});
    res.json({ message: 'All students deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
    try {
      const { course } = req.query;
      const students = await Student.find({ course });
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
router.put('/update', async (req, res) => {
try {
    const { age } = req.query;
    const updateFields = req.body;

    // Update students matching the criteria
    const result = await Student.updateMany({ age }, updateFields);

    res.json({ message: `${result.nModified} students updated` });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});
router.delete('/delete', async (req, res) => {
    try {
      const { age } = req.query;
  
      // Delete students matching the criteria
      const result = await Student.deleteMany({ age });
  
      res.json({ message: `${result.deletedCount} students deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
