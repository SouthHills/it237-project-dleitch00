import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Employee} from "../entities/Employee.js";
import {hashPassword, comparePasswords, generateToken, redirectNonAdmins} from "../utils/authentication.js";


const router = Router();

router.get('/employees', redirectNonAdmins, async(req, res) =>
{
    const employees = await AppDataSource.getRepository(Employee).find();

    res.json(employees);
});

// Register endpoint MUST come before /:id routes to prevent route matching conflicts
router.put('/employees/register', async (req, res) =>
{
    try
    {
        const { employeeID, employeeUsername, employeePassword } = req.body;

        if (!employeeID || !employeeUsername || !employeePassword)
        {
            res.status(400).json({ message: "Employee ID, username, and password are required." });
            return;
        }

        const employeeRepository = AppDataSource.getRepository(Employee);
        const employee = await employeeRepository.findOneBy({ employeeID, employeeUsername });

        if (!employee)
        {
            res.status(404).json({ message: "Employee not found with the provided ID and username." });
            return;
        }

        employee.employeePassword = await hashPassword(employeePassword);
        await employeeRepository.save(employee);

        res.json({ message: "Password updated successfully." });


    }
    catch (error)
    {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error updating password.', error });
    }
});

router.post('/employees/login', async (req, res) =>
{
    const { employeeUsername, employeePassword } = req.body;

    if (!employeeUsername || !employeePassword)
    {
        res.status(400).json({ message: "Username and password are required." });
        return;
    }

    const employeeRepository = AppDataSource.getRepository(Employee);

    try
    {
        const employee = await employeeRepository.findOneBy({ employeeUsername });

        if (!employee)
        {
            res.status(404).json({ message: "Employee not found with the provided username." });
            return;
        }

        const isPasswordValid = await comparePasswords(employeePassword, employee.employeePassword);

        if (!isPasswordValid)
        {
            res.status(401).json({ message: "Invalid password." });
            return;
        }

        const token = generateToken({
            employeeID: employee.employeeID,
            employeeIsAdmin: employee.employeeIsAdmin,
            plantID: employee.plantID,
        } as any);
        employee.employeeToken = token;
        await employeeRepository.save(employee);

        res.json({ message: "Login successful.", token, user: employee });
    }
    catch (error)
    {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login.', error });
    }
})


router.get('/employees/:id', redirectNonAdmins, async(req, res) =>
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

router.put('/employees/:id', redirectNonAdmins, async(req, res) =>
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

router.post('/employees', redirectNonAdmins, async (req, res) =>
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

router.delete('/employees/:id', redirectNonAdmins, async (req, res) =>
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
