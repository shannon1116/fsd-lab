import React from "react";
import type { Employees } from "../../components/organization/role";
import { useFormInput } from "../../hooks/useFormRoleInput";

type OrganizationFormProps = {
  onSubmit: (roleName: string, employee: Employees) => void;
};

export function OrganizationForm({ onSubmit }: OrganizationFormProps) {
  const { firstName, lastName, roleName, errors, valueChangeHandler, inputReset, validate, getEmployee } = useFormInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const employee = getEmployee();
    if (!employee) return;

    onSubmit(roleName, employee);
    inputReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(employee) => valueChangeHandler("firstName", employee.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(employee) => valueChangeHandler("lastName", employee.target.value)}
        />
      </label>
      <label>
        Role Name:
        <input
          type="text"
          value={roleName}
          onChange={(employee) => valueChangeHandler("roleName", employee.target.value)}
        />
      </label>
      {errors.map((error, index) => (
        <p key={index} style={{ color: "red" }}>{error}</p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}