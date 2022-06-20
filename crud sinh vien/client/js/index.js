import dbHandler from './db.js';
import { empty } from './utility.js';

let studentList = [];

// --------------------------------------------------------------------------------------------------

// - get instances

const $ = document.querySelector.bind(document);
const stt = $('input[name="stt"]');
const msv = $('input[name="msv"]');
const _name = $('input[name="name"]');
const _class = $('input[name="class"]');
const btnReset = $('.action-reset');
const btnCreate = $('.action-create');
const btnSave = $('.action-save');
const table = $('table');
const body = $('body');

// --------------------------------------------------------------------------------------------------

// - functions

// + reset input form
function handleResetForm() {
  stt.value = '';
  msv.value = '';
  _name.value = '';
  _class.value = '';

  checkButtonStatus();
}

// + create template content of tr tag
function createTemplateContent(data) {
  const { id, name: __name, msv, class: __class } = data;
  const tr = document.createElement('tr');
  tr.innerHTML = `
        <td>${id}</td>
        <td>${msv}</td>
        <td>${__name}</td>
        <td>${__class}</td>
        <td><button class="btn-action--edit" data-id=${id}>Edit</button></td>
        <td><button class="btn-action--delete" data-id=${id}>Delete</button></td>
    `;
  tr.querySelector('.btn-action--edit').onclick = handleEditStudent;
  tr.querySelector('.btn-action--delete').onclick = handleDeleteStudent;
  return tr;
}

// + check is edit or create student

function checkButtonStatus() {
  if (empty(stt.value)) {
    btnCreate.removeAttribute('disabled');
    btnSave.setAttribute('disabled', true);
  } else {
    btnSave.removeAttribute('disabled');
    btnCreate.setAttribute('disabled', true);
  }
}

// + get all students
async function getAllStudents() {
  try {
    const result = await dbHandler.getAllStudents();

    if (!result) return alert('Can not get students');

    studentList = [...result];
    // insert content to table
    table.innerHTML =
      '<tr><th>STT</th><th>Mã sinh viên</th> <th>Họ và tên</th><th>Lớp</th><th></th><th></th></tr>';

    result.forEach((student) =>
      table.appendChild(createTemplateContent(student))
    );
    checkButtonStatus();
  } catch (e) {
    alert(e.message);
  }
}

// + handle create student
async function handleCreateStudent() {
  try {
    if (empty(msv.value, _name.value, _class.value))
      return alert('Please full fill all field !');

    // create student
    const student = { msv: msv.value, name: _name.value, class: _class.value };

    const result = await dbHandler.createStudent(student);

    if (!result) return alert('Create student failure');

    studentList.push(result);
    // insert to table
    table.appendChild(createTemplateContent(result));

    // reset form
    handleResetForm();
  } catch (e) {
    alert(e.message);
  }
}

// + handle edit student
async function handleEditStudent(e) {
  try {
    // get student id
    const studentId = e.target.getAttribute('data-id');
    // update input form
    const student = studentList.find((stu) => stu.id === +studentId);

    if (student) {
      stt.value = student.id;
      msv.value = student.msv;
      _name.value = student.name;
      _class.value = student.class;
    }
    checkButtonStatus();
  } catch (err) {
    alert(err.message);
  }
}

// + handle save student
async function handleSaveStudent() {
  try {
    if (empty(stt.value)) return alert('Please select student to edit !');
    const student = studentList.find((stu) => stu.id === +stt.value);

    if (!student) return alert('Please select student to edit !');
    // update student
    if (
      msv.value === student.msv &&
      _name.value === student.name &&
      _class.value === student.class
    )
      return alert('Edit success!');

    const student_updated = await dbHandler.editStudent(student.id, {
      msv: msv.value,
      name: _name.value,
      class: _class.value,
    });

    // update student list
    studentList = studentList.map((str) =>
      str.id === student_updated.id ? student_updated : str
    );

    // update DOM

    table.replaceChild(
      createTemplateContent(student_updated),
      document.querySelector(`button[data-id ="${student_updated.id}"]`)
        .parentNode.parentNode
    );

    alert('Edit success!');
  } catch (err) {
    alert(err.message);
  }
}

// + handle delete student
async function handleDeleteStudent(e) {
  try {
    if (window.confirm('Are you sure you want to delete this student')) {
      // get student id
      const studentId = e.target.getAttribute('data-id');
      // delete student
      await dbHandler.deleteStudent(studentId);

      // remove element in DOM
      e.target.parentNode.parentNode.remove();
    }
  } catch (err) {
    alert(err.message);
  }
}

// --------------------------------------------------------------------------------------------------

// - add event listeners

// + reset btn
btnReset.addEventListener('click', handleResetForm);

// + create student btn
btnCreate.addEventListener('click', handleCreateStudent);

// + get all students
body.onload = getAllStudents;

// + update student
btnSave.addEventListener('click', handleSaveStudent);
