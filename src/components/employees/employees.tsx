export default function EmployeeForm() {
    return (
    <>
    <form>
    <label>
    Employee Input: <input className="employeeInput" />
    </label>
    <label>
    Department:
    <select>
    <option value="Administration">Administration</option>
    <option value="Audit">Audit</option>
    </select>
    </label>
    </form>
    </>
    )
}