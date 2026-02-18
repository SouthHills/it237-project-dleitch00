import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Employee} from "../entities/Employee.js";


const router = Router();

router.get('/employees', async(req, res) =>
{
    const employees = await AppDataSource.getRepository(Employee).find();

    res.json(employees);
});

router.get('/employees/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(id);
    const employee = await AppDataSource
        .getRepository(Employee)
        .findOneBy({
            employeeID: id
        });

    if (!employee) res.json({ message: `Employee with ID ${id} not found.`})

    else res.json(employee);
});

router.put('/employees/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    const employeeData = req.body;

    const employeeRepository = AppDataSource.getRepository(Employee);
    const existingEmployee = await employeeRepository.findOneBy({ employeeID: id});
    if(!existingEmployee)
    {
        res.status(404).json({ message: `Employee with id ${id} not found.`});
        return;
    }

   employeeRepository.merge(existingEmployee, employeeData);
    try
    {
        const updatedEmployee = await employeeRepository.save(existingEmployee);
        res.json(updatedEmployee);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating employee.', error });
    }
});

router.post('/employees', async (req, res) =>
{
    const employeeData = req.body;
    console.log(employeeData);


    const requiredFields = [
        'employeeID',
        'employeeJobTitle',
        'employeeStatus',
        'employeeIsAdmin',
        'employeeFirstName',
        'employeeMiddleInitial',
        'employeeLastName',
        'employeeSalary',
        'employeeBirthday',
        'employeeUsername',
        'employeePassword',
        'plantID'
    ];

    if (requiredFields.some(field => employeeData[field] == undefined || employeeData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const employeeRepository = AppDataSource.getRepository(Employee);

    try
    {
        const newEmployee = employeeRepository.create(employeeData);

        const savedEmployee = await employeeRepository.save(newEmployee);

        res.status(201).json(savedEmployee);
    }
    catch (error)
    {
        console.error('Error creating employee', error);
        res.status(500).json({message: 'Failed to create employee', error});
    }
});

router.delete('/employees/:id', async (req, res) =>
{
    const id = parseInt(req.params.id);

    const employeeRepository = AppDataSource.getRepository(Employee);

    const employee = await employeeRepository.findOneBy({employeeID: id});

    if (!employee)
    {
        res.status(404).json({ message: `Employee with id ${id} not found` });
        return;
    }

    try
    {
        await employeeRepository.remove(employee)

        res.json({ message: `Employee with ID ${id} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting employee', error);
        res.status(500).json({ message: "Failed to delete the employee", error});
    }
});


export default router
