import Model from '../models/model.js';

const employeesModel = new Model('employees');

export const searchEmployeesByName = async (name, orderBy) => {
  const searchName = `WHERE name ilike '%${name || ''}%' ORDER BY name ${orderBy || 'ASC'}`
  const data = await employeesModel.select('id, name, age, username, title, hireDate', searchName)
  return data.rows
}

export const deleteEmployeeById = async (id) => {
  const condition = `WHERE id = '${id}'`
  try {
    const data = await employeesModel.delete(condition)
    return "success"
  } catch(e) {
    return e
  }
}
