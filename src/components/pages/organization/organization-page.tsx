import type { Roles, Employees } from "../../organization/role";
import { pixellRiverLeadershipRoles } from "../../organization/role";
import OrganizationList from "../../organization/organization";

function Organization() {
    return(
        <>
        <main>
        <OrganizationList />
        </main>
        </>
    )
}

export default Organization