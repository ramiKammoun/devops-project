const {requestCounter, total_Students, total_senior_students } = require('../metrics')
const {rootLogger} = require('../logs')
const crypto = require('crypto');

const express = require('express');
const router = express.Router();

// Student model
const Students = require('../models/students');

//requestLogger = rootLogger.child({ service: 'Students-list' });

function getRequestId() {
  let uuid = crypto.randomUUID();
  return uuid;
}

// @route   GET /api/students/
// @desc    Get all students
// @access  Public
router.get('/', async (req, res) => {
  try {
    const students = await Students.find({});

    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.info('Get the list of all students', {request_id: reqID, user_ip: ip});

    //requestCounter.inc({'method':'Get', 'route': '/api/students', 'status_code': 200, 'many':true})
    res.send({ students })
  } catch(err) {
    //requestCounter.inc({'method':'Get', 'route': '/api/students', 'status_code': 400, 'many':true})
    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.error('Get the list of all students', {request_id: reqID, user_ip: ip});
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  try {

    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.info('Get the student with the ID', {student_id:req.params.id,request_id: reqID, user_ip: ip});

    //requestCounter.inc({'method':'Get', 'route': '/api/students/:id', 'status_code': 200, 'many':false})
    const student = await Students.findById(req.params.id);
    res.send({ student });
    //requestLogger.info('Creating a new task', { request_id: req.requestId});
  } catch (err) {

    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.error('Student with the following ID does not exist', {student_id:req.params.id,request_id: reqID, user_ip: ip});

    //requestCounter.inc({'method':'Get', 'route': '/api/students/:id', 'status_code': 400, 'many':false})
    res.status(404).send({ message: 'Student not found!' });
  }
});

// @route   POST /api/students/
// @desc    Create a student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newStudent = await Students.create({ name: req.body.name, email: req.body.email, enrollnumber: req.body.enrollnumber });
    
    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.info('Adding a new student');
    
    res.send({ newStudent });
    //requestCounter.inc({'method':'Post', 'route': '/api/students', 'status_code': 200, 'many':false})
    //total_Students.inc();
    //Senior Students have an enrollement number bigger than 100
    /*if(newStudent.enrollnumber>100) {
      total_senior_students.inc();
    }*/
  } catch(err) {

    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.error('Failed to add a new student', {request_id: reqID, user_ip: ip});

    //requestCounter.inc({'method':'Post', 'route': '/api/students', 'status_code': 400, 'many': false})
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body);
    
    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.info('Student with the following ID has been updated', {student_id:req.params.id,request_id: reqID, user_ip: ip});
    
    //requestCounter.inc({'method':'Put', 'route': '/api/students', 'status_code': 200, 'many':false})
    res.send({ message: 'The student was updated' });
  } catch(err) {
    //requestCounter.inc({'method':'Put', 'route': '/api/students', 'status_code': 400, 'many':false})
    
    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.error('Student with the following ID does not exist', {student_id:req.params.id,request_id: reqID, user_ip: ip});
    
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    //requestCounter.inc({'method':'Delete', 'route': '/api/students/:id', 'status_code': 200, 'many':false})
    
    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.info('Student with the following ID has been deleted', {student_id:req.params.id,request_id: reqID, user_ip: ip});

    const removeStudent = await Students.findByIdAndRemove(req.params.id);
    /*total_Students.dec();
    if(total_senior_students > 100) {
      total_senior_students.dec()
    }*/
    res.send({ message: 'The student was removed' });
  } catch(err) {
    //requestCounter.inc({'method':'Get', 'route': '/api/students', 'status_code': 400, 'many':false})
    
    //var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //let reqID = getRequestId();
    //rootLogger.error('Student with the following ID does not exist', {student_id:req.params.id,request_id: reqID, user_ip: ip});
    
    res.status(400).send({ error: err });
  }
});


module.exports = router;