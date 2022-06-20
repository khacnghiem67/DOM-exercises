import { handlePromise } from './utility.js';

const BASE_URL = 'http://localhost:3000/students';

const dbHandler = {
  async getAllStudents() {
    try {
      const [err, result] = await handlePromise(fetch(BASE_URL));

      if (err) throw new Error(err);

      return result;
    } catch (e) {
      return undefined;
    }
  },
  async createStudent(student) {
    try {
      const [err, result] = await handlePromise(
        fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        })
      );

      if (err) throw new Error(err);

      return result;
    } catch (e) {
      return undefined;
    }
  },
  async editStudent(studentId, student) {
    try {
      const [err, result] = await handlePromise(
        fetch(BASE_URL + `/${studentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        })
      );
      if (err) throw new Error(err);

      return result;
    } catch (e) {
      return undefined;
    }
  },
  async deleteStudent(studentId) {
    try {
      const [err, result] = await handlePromise(
        fetch(BASE_URL + `/${studentId}`, {
          method: 'DELETE',
        })
      );

      if (err) throw new Error(err);

      return result;
    } catch (e) {
      return undefined;
    }
  },
};

export default dbHandler;
