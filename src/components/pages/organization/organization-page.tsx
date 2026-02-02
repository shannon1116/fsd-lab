import type { Roles, Employees } from "../../organization/role";
import { pixellRiverLeadershipRoles } from "../../organization/role";
import OrganizationList from "../../organization/organization";

function Organization(
    {
        roles
    }:
    {
        roles: Roles[]
    }
) {
    return(
        <>
        <main>
        <h2>Leadership and Management</h2>
        <OrganizationList />
        </main>
        </>
    )
}

export default Organization